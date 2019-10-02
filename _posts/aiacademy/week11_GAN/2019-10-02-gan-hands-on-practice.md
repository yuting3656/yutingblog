---
layout: 'post'
title: '手做 VanillaGAN & ConditionalGAN '
permalink: 'aiacademy/week11/vanillagan-conditionalgan'
tags: aiacademy GAN conditional-gan
---

# VanillaGAN

<iframe  src="https://www.youtube.com/embed/UH4th3AsLhY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- import

~~~python
''' basic package '''
import os
# 告訴系統要第幾張卡被看到。 Ex. 硬體總共有8張顯卡，以下設定只讓系統看到第1張顯卡
# 若沒設定，則 Tensorflow 在運行時，預設會把所有卡都佔用
# 要看裝置內顯卡數量及目前狀態的話，請在終端機內輸入 "nvidia-smi"
# 若你的裝置只有一張顯卡可以使用，可以忽略此設定
os.environ["CUDA_VISIBLE_DEVICES"] = '0'
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

''' tensorflow package '''
import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data
~~~

- Config

~~~python
batch_size = 128
Z_dim = 100        # demesion of noise vector z for generator input
max_iter = 5000
mnist = input_data.read_data_sets('./data/examples/MNIST_data', one_hot=True)
~~~


- Train

   - 定義 generator & discriminator

   - |![Imgur](https://i.imgur.com/7ctR6eg.jpg)|

~~~python
def xavier_init(size):
    in_dim = size[0]
    xavier_stddev = 1. / tf.sqrt(in_dim / 2.)
    return tf.random_normal(shape=size, stddev=xavier_stddev)

#### Define model ####
def generator(z):
    with tf.variable_scope('generator', reuse=tf.AUTO_REUSE): 
        with tf.variable_scope('hidden_layer'):
            G_W1 = tf.get_variable(name='weight_1', dtype=tf.float32, initializer=xavier_init([100, 128]))
            G_b1 = tf.get_variable(name='bias_1', dtype=tf.float32, initializer=tf.zeros(shape=[128]))
            G_h1 = tf.nn.relu(tf.matmul(z, G_W1) + G_b1)

        with tf.variable_scope('output_layer'):
            G_W2 = tf.get_variable(name='weight_2', dtype=tf.float32, initializer=xavier_init([128, 784]))
            G_b2 = tf.get_variable(name='bias_2', dtype=tf.float32, initializer=tf.zeros(shape=[784]))
            G_prob = tf.nn.sigmoid(tf.matmul(G_h1, G_W2) + G_b2)

    return G_prob

def discriminator(x):
    with tf.variable_scope('discriminator', reuse=tf.AUTO_REUSE):
        with tf.variable_scope('hidden_layer'):
            D_W1 = tf.get_variable(name='weight_1', dtype=tf.float32, initializer=xavier_init([784, 128]))
            D_b1 = tf.get_variable(name='bias_1', dtype=tf.float32, initializer=tf.zeros(shape=[128]))
            D_h1 = tf.nn.relu(tf.matmul(x, D_W1) + D_b1)

        with tf.variable_scope('output_layer'):
            D_W2 = tf.get_variable(name='weight_2', dtype=tf.float32, initializer=xavier_init([128, 1]))
            D_b2 = tf.get_variable(name='bias_2', dtype=tf.float32, initializer=tf.zeros([1]))
            D_logit = tf.matmul(D_h1, D_W2) + D_b2
            D_prob = tf.nn.sigmoid(D_logit)

    return D_prob, D_logit
~~~


- Tensorflow - 建立靜態圖

~~~python
main_graph = tf.Graph()
sess = tf.Session(graph=main_graph)

with main_graph.as_default():
    
   #### placeholder ####
    Z = tf.placeholder(name='z', dtype=tf.float32, shape=[None, 100])                # generator input
    input_img = tf.placeholder(name='real_img', dtype=tf.float32, shape=[None, 784]) # discriminator input

    #### GAN model output ####  
    G_sample = generator(Z)
    D_real, D_logit_real = discriminator(input_img)
    D_fake, D_logit_fake = discriminator(G_sample)

    #### loss ####
    D_loss_real = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(logits=D_logit_real, labels=tf.ones_like(D_logit_real)))
    D_loss_fake = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(logits=D_logit_fake, labels=tf.zeros_like(D_logit_fake)))
    D_loss = D_loss_real + D_loss_fake
    G_loss = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(logits=D_logit_fake, labels=tf.ones_like(D_logit_fake)))

    #### variable list ####
    varList = tf.trainable_variables()
    G_varList = [var for var in varList if 'generator' in var.name]
    D_varList = [var for var in varList if 'discriminator' in var.name]
    
    #### update ####
    D_optimizer = tf.train.AdamOptimizer().minimize(D_loss, var_list=D_varList)
    G_optimizer = tf.train.AdamOptimizer().minimize(G_loss, var_list=G_varList)

    init = tf.global_variables_initializer()
~~~

- Tensorflow - 初始化模型

~~~python
#### initialize model ####
sess.run(init)
~~~

- Tensorflow - 實際執行模型訓練

~~~python
def sample_Z(m, n):
        return np.random.uniform(-1., 1., size=[m, n])

def plot(samples):
    fig = plt.figure(figsize=(4, 4))
    gs = gridspec.GridSpec(4, 4)
    gs.update(wspace=0.05, hspace=0.05)

    for i, sample in enumerate(samples):
        ax = plt.subplot(gs[i])
        plt.axis('off')
        ax.set_xticklabels([])
        ax.set_yticklabels([])
        ax.set_aspect('equal')
        plt.imshow(sample.reshape(28, 28), cmap='Greys_r')

    return fig
~~~

~~~python
for it in range(max_iter):

    #### train ####
    X, _ = mnist.train.next_batch(batch_size)

    _, D_loss_curr = sess.run([D_optimizer, D_loss], feed_dict={input_img: X, Z: sample_Z(batch_size, Z_dim)})
    _, G_loss_curr = sess.run([G_optimizer, G_loss], feed_dict={Z: sample_Z(batch_size, Z_dim)}) 

    if it % 1000 == 0:
        print('Iter: {}'.format(it))
        print('D loss: {:.4}'. format(D_loss_curr))
        print('G_loss: {:.4}'.format(G_loss_curr))
                                     
        samples = sess.run(G_sample, feed_dict={Z: sample_Z(16, Z_dim)})
        fig = plot(samples)
        plt.show()
        plt.close(fig)
        print('############################')
~~~

# ConditionalGAN 

<iframe src="https://www.youtube.com/embed/2N0o9TKZ768" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Github](https://github.com/phillipi/pix2pix/blob/master/README.md){:target="_back"}

- import package

~~~python
'''Basic package'''
import os
# 告訴系統要第幾張卡被看到。 Ex. 硬體總共有8張顯卡，以下設定只讓系統看到第1張顯卡
# 若沒設定，則 Tensorflow 在運行時，預設會把所有卡都佔用
# 要看裝置內顯卡數量及目前狀態的話，請在終端機內輸入 "nvidia-smi"
# 若你的裝置只有一張顯卡可以使用，可以忽略此設定
os.environ["CUDA_VISIBLE_DEVICES"] = "0"


import cv2          #影像處理
import numpy as np
import pandas as pd
import random
from tqdm import tqdm_notebook as tqdm #進度條
import matplotlib.pyplot as plt        #繪圖

# 自定義 library
from generator import data_generators
from callbacks import *

'''Tensorflow package'''
import tensorflow as tf

'''Data augmentation package'''
from imgaug import augmenters as iaa
import imgaug as ia
~~~

- Config

~~~python
# input image
img_size = 256
data_list = 'data_list/'

# model
model_name= 'pix2pix'
batch_size = 5
nb_epoch = 150
n_batch = 368
L1_lambda = 100
~~~

- Preprocess

~~~python
def preprocessed_img(id_list, aug = False):
    x = []
    y = []
    file = []
    
    for idx, row in id_list.iterrows():
        A = row['A']  #轉換前的影像
        B = row['B']  #轉換後的影像
        ID = row[0]
        
        A = cv2.imread(A)[:,:,::-1] # cv2 預設讀進來是 BGR, 我們要轉回 RGB
        B = cv2.imread(B)[:,:,::-1]  
        
        # random crop: 將影像放大 30 pixel，再裁減回原始的大小
        A = cv2.resize(A, (img_size+30, img_size+30))
        B = cv2.resize(B, (img_size+30, img_size+30))
        r_x = random.randint(0, 30)
        r_y = random.randint(0, 30)
        A = A[r_y:r_y+img_size, r_x:r_x+img_size, :]
        B = B[r_y:r_y+img_size, r_x:r_x+img_size, :]
        
        seq = iaa.Sequential([
            iaa.Fliplr(0.5)     # 有五成的機率會左右翻轉
        ])
        seq.to_deterministic()
 
        A = seq.augment_image(A)
        B = seq.augment_image(B)
        
        #像素值壓縮到 [-1, 1]
        A = ((A.astype('float32') / 255) - 0.5)*2
        B = ((B.astype('float32') / 255) - 0.5)*2
        
        x.append(A)
        y.append(B)
        
        file.append(ID)
        
    x = np.array(x)
    y = np.array(y)
    
    return x, y, file
~~~

- Callback

~~~python
model_dict = {
    'model_name' : model_name,
    'checkpoint' : Model_checkpoint(os.path.join('model', model_name), save_best_only=False),
    'train_batch_log' : History(['g_loss', 'd_loss']),
    'val_batch_log' : History(['g_loss', 'd_loss']),
    'history' : {
        'train_g_loss':[],
        'train_d_loss':[],
        'val_g_loss':[],
        'val_d_loss':[]
    }
}

callback_dict = {
    'on_session_begin':[], # start of a session
    'on_batch_begin':[], # start of a training batch
    'on_batch_end':[], # end of a training batch
    'on_epoch_begin':[], # start of a epoch
    'on_epoch_end':[
        model_dict['checkpoint']
    ], # end of a epoch
    'on_session_end':[] # end of a session
}
callback_manager = Run_collected_functions(callback_dict)
~~~

- Load data

~~~python
train_df = pd.read_csv(os.path.join(data_list, 'train.csv'))
val_df = pd.read_csv(os.path.join(data_list, 'val.csv'))
~~~

~~~python
generators = data_generators(batch_size, [train_df, val_df], preprocessed_img)
~~~

~~~python
generators.load_val()
generators.start_train_threads()
~~~

- Train 

   - 定義 generator & discrminator

~~~python
def generator(x, dim, out_dim):
    '''
    論文當中的 generator 採用 U-Net，前半段 Encoder feature maps 連結到後半段 Decoder 對應 feature maps
    '''
    # encoder, decoder 每層 filter 數量
    e_dims = [dim] + [dim*2] + [dim*4] + [dim*8]*5
    d_dims = e_dims[::-1][1:]
    e_list = []
    
    with tf.variable_scope('generator', reuse=tf.AUTO_REUSE):
        # Encoder: 影像->特徵向量
        for i in range(8):
            if i == 0:
                x = tf.layers.conv2d(x, e_dims[i], 4, strides=2, padding='SAME')
            elif i == 7:
                x = tf.nn.leaky_relu(x)
                x = tf.layers.conv2d(x, e_dims[i], 4, strides=2, padding='SAME')
            else:
                x = tf.nn.leaky_relu(x)
                x = tf.layers.conv2d(x, e_dims[i], 4, strides=2, padding='SAME')
                x = tf.layers.batch_normalization(x, training=True)

            e_list.append(x)

        e_list = e_list[::-1][1:]

        # Decoder: 特徵向量->影像
        for i in range(7):
            
            x = tf.nn.relu(x)
            x = tf.layers.conv2d_transpose(x, d_dims[i], 4, strides=2, padding='SAME')
            x = tf.layers.batch_normalization(x, training=True)

            if i < 3:
                x = tf.nn.dropout(x, 0.5)

            x = tf.concat([x, e_list[i]], 3)

        x = tf.nn.relu(x)
        x = tf.layers.conv2d_transpose(x, out_dim, 4, strides=2, padding='SAME')

        x = tf.nn.tanh(x)
    return x
    
def discriminator(x, dim, is_training = True):
    with tf.variable_scope('discriminator', reuse=tf.AUTO_REUSE):
        
        x = tf.layers.conv2d(x, dim, 4, strides=2, padding='SAME')
        x = tf.nn.leaky_relu(x)
        
        for i in range(3):
            if i == 2:
                stride = 1
            else:
                stride = 2
                
            x = tf.layers.conv2d(x, dim*(2**(i+1)), 4, strides=stride, padding='SAME')
            x = tf.layers.batch_normalization(x, trainable=is_training)
            x = tf.nn.leaky_relu(x)

        x = tf.layers.flatten(x)
        x = tf.layers.dense(x, 1)
        
    return x
~~~

- Tensorflow - 建立靜態圖


~~~python
main_graph = tf.Graph()
sess = tf.Session(graph=main_graph)

with main_graph.as_default():
    #### optimizer ####
    G_opt = tf.train.AdamOptimizer(2e-4, beta1=0.5, beta2=0.999)
    D_opt = tf.train.AdamOptimizer(2e-4, beta1=0.5, beta2=0.999)
    
    G_global_step = tf.Variable(0, name='global_step',trainable=False)
    D_global_step = tf.Variable(0, name='global_step',trainable=False)
    
    #### placeholder ####
    real_img_A = tf.placeholder(dtype=tf.float32, shape=(None, img_size, img_size, 3))
    real_img_B = tf.placeholder(dtype=tf.float32, shape=(None, img_size, img_size, 3))
    is_train_bool = tf.placeholder(tf.bool)
    
    ####  GAN model output  ####
    fake_img_B = generator(real_img_A, 64, 3)
    real_pair = tf.concat([real_img_A, real_img_B], 3)
    fake_pair = tf.concat([real_img_A, fake_img_B], 3)
    
    D_fake = discriminator(fake_pair, 64, is_training = True)
    D_real = discriminator(real_pair, 64, is_training = True)
    
    #### loss ####
    D_loss = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(labels=tf.ones_like(D_real), logits=D_real)) + \
             tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(labels=tf.zeros_like(D_fake), logits=D_fake))
    G_loss = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(labels=tf.ones_like(D_fake), logits=D_fake)) + \
             L1_lambda * tf.reduce_mean(tf.abs(real_img_B - fake_img_B)) # L1 loss
    
    #### variable list ####
    varList = tf.trainable_variables()
    G_varList = [var for var in varList if 'generator' in var.name]
    D_varList = [var for var in varList if 'discriminator' in var.name]
        
    #### update ####
    G_update_ops = tf.get_collection(tf.GraphKeys.UPDATE_OPS, scope='generator') #使用內建的 batch normalization layer, 必須執行
    with tf.control_dependencies(G_update_ops):                                  #tf.GraphKeys.UPDATE_OPS 才會更新到 BN 層的 mean, variance
        G_update = G_opt.minimize(G_loss, var_list=G_varList, global_step=G_global_step) 
        
    D_update_ops = tf.get_collection(tf.GraphKeys.UPDATE_OPS, scope='discriminator')
    with tf.control_dependencies(D_update_ops):
        D_update = D_opt.minimize(D_loss, var_list=D_varList, global_step=D_global_step)
    
    #### other ####
    init = tf.global_variables_initializer()
    saver = tf.train.Saver()    
~~~

- Tensorflow - 初始化模型

~~~python
#### initialize model ####
sess.run(init)
~~~

- Tensorflow - 實際執行模型訓練

~~~python
def plot(img_pair):

    fig, axarr = plt.subplots(4, 2, figsize=(5,10))
    
    for row in range(4):
        real_img = ((img_pair[0][row]/2+0.5)*225).astype(np.uint8)
        gen_img =  ((img_pair[1][row]/2+0.5)*225).astype(np.uint8)
        axarr[row, 0].imshow(real_img) 
        axarr[row, 1].imshow(gen_img)
        if row == 0:
            axarr[row, 0].set_title('real image')
            axarr[row, 1].set_title('generated image')
    
    # Fine-tune figure; hide x ticks for top plots and y ticks for right plots
    plt.setp([a.get_xticklabels() for a in axarr[0, :]], visible=False)
    plt.setp([a.get_yticklabels() for a in axarr[:, 1]], visible=False)

    return fig
~~~

~~~python
epoch_bar = tqdm(range(nb_epoch), desc="epoch", unit="epoch")
for epoch in epoch_bar:

    ### train ###
    train_batch_bar = tqdm(range(n_batch), desc="train_batch", unit="batch", leave=False)

    for batch in train_batch_bar:
        x, y = generators.train_queue.get()
        
        # 執行 loss & update (train)
        _, discriminator_loss = sess.run([D_update, D_loss], feed_dict={real_img_A:x, real_img_B:y })
        model_dict['train_batch_log'].push({'d_loss':discriminator_loss})
        
        _, generator_loss = sess.run([G_update, G_loss], feed_dict={real_img_A:x, real_img_B:y })
        model_dict['train_batch_log'].push({'g_loss':generator_loss})
    
    model_dict['history']['train_g_loss'].append(model_dict['train_batch_log'].avg_value('g_loss'))
    model_dict['history']['train_d_loss'].append(model_dict['train_batch_log'].avg_value('d_loss'))
    model_dict['train_batch_log'].reset()

    ### val ###
    val_batch_bar = tqdm(generators.iter_val(), total=generators.val_len, desc="val_batch" , unit="batch", leave=False)

    val_image_pair = []
    for x, y, length in val_batch_bar:
        # 執行 loss and generate image (val)
        # 小提醒： model 有使用 batch normalization。所以在非 training 階段， 
        # is_training要記得設定為 False。這樣 BN 層內的 mean, variance 才不會更新。
        generator_loss, discriminator_loss, generate_img = sess.run([G_loss, D_loss, fake_img_B], 
                                                                    feed_dict={real_img_A: x, real_img_B: y, is_train_bool: False})
        # 選四對真實和生成的影像
        val_image_pair = [y[:4], generate_img[:4]] 
        model_dict['val_batch_log'].push({'g_loss':generator_loss, 'd_loss':discriminator_loss}, length)


    model_dict['history']['val_g_loss'].append(model_dict['val_batch_log'].avg_value('g_loss'))
    model_dict['history']['val_d_loss'].append(model_dict['val_batch_log'].avg_value('d_loss'))
    model_dict['val_batch_log'].reset()

    
    ### callback ###
    print('Epoch: {}/{}'.format(epoch,nb_epoch))
    print('train_G_loss: {:.3f}'.format(model_dict['history']['train_g_loss'][-1]),
         'train_D_loss: {:.3f}'.format(model_dict['history']['train_d_loss'][-1]))
    print('val_G_loss: {:.3f}'.format(model_dict['history']['val_g_loss'][-1]),
         'val_D_loss: {:.3f}'.format(model_dict['history']['val_d_loss'][-1]))

    
    ### draw image ###
    if epoch%2 == 0:
        fig = plot(val_image_pair)
        plt.show()
        plt.close(fig)

    callback_manager.run_on_epoch_end(val_loss = model_dict['history']['val_g_loss'][-1],
                                      sess = sess,
                                      saver = saver,
                                      nth_epoch = epoch)
    print('############################')
~~~