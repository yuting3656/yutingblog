---
layout: 'post'
title: 'aiacademy: 深度學習 transfer-learning tensorflow example'
permalink: 'aiacademy/week8/transfer-learning-tensorflow-example'
tags: aiacademy transfer-learning tensorflow
---

### 1

<iframe src="https://www.youtube.com/embed/exzNpK1gsm8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 2

<iframe src="https://www.youtube.com/embed/u-oc925UZ7w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 3 

<iframe src="https://www.youtube.com/embed/tPApgmSC3Do" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 4

<iframe src="https://www.youtube.com/embed/w33DYkX8fBk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 5 

<iframe src="https://www.youtube.com/embed/LGhKiNkpUoA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 6

<iframe src="https://www.youtube.com/embed/olXuQKUo8Ag" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 7

<iframe  src="https://www.youtube.com/embed/oHECJ6Il3Po" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


> 直接來看　code!!!

### import package 

~~~python
'''Basic package'''
import os
# 告訴系統要第幾張卡被看到。 Ex. 硬體總共有8張顯卡，以下設定只讓系統看到第1張顯卡
# 若沒設定，則 Tensorflow 在運行時，預設會把所有卡都佔用
# 要看裝置內顯卡數量及目前狀態的話，請在終端機內輸入 "nvidia-smi"
# 若你的裝置只有一張顯卡可以使用，可以忽略此設定
os.environ["CUDA_VISIBLE_DEVICES"] = "0"

import queue
import cv2          #影像處理
import scipy.misc   #影像處理
import numpy as np
import pandas as pd
from tqdm import tqdm_notebook as tqdm #進度條
import matplotlib.pyplot as plt #繪圖


# 自定義 library
from generator import data_generators
from callbacks import *


'''Tensorflow package'''
import tensorflow as tf
import tensorflow.contrib.slim as slim
import tensorflow.contrib.slim.nets as slimNet


'''Data augmentation package'''
from imgaug import augmenters as iaa
import imgaug as ia

from ipywidgets import IntProgress
~~~


### config

~~~python
# input image
img_size = 200 # 建議和 pre-trained 訓練的大小相近
num_class = 2  # 資料集總共有幾個類別

# model
batch_size = num_class*48 # generator 在取訓練資料的時候，會做類別平衡的動作 (batch data 裡面每個類別影像的數量一樣多)
                          # batch size 要取類別數量的倍數
nb_epoch = 150
n_batch = 300
fold = str(0) 
model_name = 'pretrain_'+fold # 為自己的模型取個名字 :)
~~~


### Preprocess

~~~python
def preprocess_data(id_list, num_class, aug = False):
    
    x = []
    y = []
    file = []

    for idx, row in id_list.iterrows():
        kind = row[1]
        path = row[0]

        img = cv2.imread(path)
        img = cv2.resize(img, (img_size, img_size))
        img = img[:,:,::-1] # cv2 預設讀進來是 BGR, 我們要轉回 RGB
        
        if aug:
            seq = iaa.Sequential([
                    iaa.Fliplr(0.5),               # 左右翻轉
                    iaa.Flipud(0.5),               # 上下翻轉
                    iaa.Affine(rotate=(-180, 180), # 旋轉
                    scale=(0.6, 1.4),              # 縮放
                    mode = 'wrap',                 # 影像翻轉造成區塊缺值的補值方式
                    translate_percent={"x": (-0.2, 0.2), "y": (-0.2, 0.2)})]) # 平移
            img = seq.augment_image(img)

        # zero-mean
        # pre-trained model 使用 ImageNet 做訓練
        # ImageNet 的所有影像 RGB 平均值 [123.68, 116.78, 103.94]
        img = img.astype('float32') - np.array([123.68, 116.78, 103.94]) 
        
        
        #append to list
        x.append(img)
        y.append(kind)
        
        file.append(path)
    try:
        x = np.array(x)
    except:
        print([i.shape for i in x])
    y = np.eye(num_class)[np.array(y)] # one-hot encoding

    return [x],y,file
~~~

### CallBack

~~~python
model_dict = {
    'model_name' : model_name,
    'reduce_lr' : ReduceLROnPlateau(lr=1.7e-4, factor=0.5, patience=3),
    'earlystop' : EarlyStopping(min_delta = 1e-4, patience= 10),
    'checkpoint' : Model_checkpoint(os.path.join('model', model_name)),
    'train_batch_log' : History(['loss']),
    'val_batch_log' : History(['loss']),
    'history' : {
        'train_loss':[],
        'val_loss':[]
    },
    'testing' : {
        'y_true' : [],
        'y_pred' : [],
        'files'   : []
    }
}

callback_dict = {
    'on_session_begin':[], # start of a session
    'on_batch_begin':[], # start of a training batch
    'on_batch_end':[], # end of a training batch
    'on_epoch_begin':[], # start of a epoch
    'on_epoch_end':[
        model_dict['reduce_lr'],
        model_dict['earlystop'],
        model_dict['checkpoint']
    ], # end of a epoch
    'on_session_end':[] # end of a session
}
callback_manager = Run_collected_functions(callback_dict)
~~~


### Load Data

~~~python
#load train/test set
test_dog = pd.read_csv(os.path.join("data_list/cat_dog/k_fold","test_dog_" + fold +".csv"))
test_cat = pd.read_csv(os.path.join("data_list/cat_dog/k_fold","test_cat_" + fold +".csv"))

train_dog = pd.read_csv(os.path.join("data_list/cat_dog/k_fold","train_dog_" + fold +".csv"))
train_cat = pd.read_csv(os.path.join("data_list/cat_dog/k_fold","train_cat_" + fold +".csv"))

val_dog = pd.read_csv(os.path.join("data_list/cat_dog/k_fold","val_dog_" + fold +".csv"))
val_cat = pd.read_csv(os.path.join("data_list/cat_dog/k_fold","val_cat_" + fold +".csv"))
~~~


~~~python
'''data_generators 參數說明

bz: batch size

dataframes:
    dataframes for generators
    should inpt in the format
    [
    [kind1_train, kind1_val, kind1_test],
    [kind2_train, kind2_val, kind2_test]
    ]

num_class: number classes of data

preprocess: preprocess function
            will receive a dataframe
            and should out put in the format
            [x1, x2], y, file/id
'''

generators = data_generators(batch_size, [[train_dog, val_dog, test_dog], [train_cat, val_cat, test_cat]], num_class, 
                             preprocess_data)
~~~

~~~python
generators.load_val() # validation data 不多且每個 epoch 的資料固定，可以預先全部載入記憶體
~~~

~~~python
generators.start_train_threads() # 開啟訓練集的執行緒 (支援多執行緒，但為了不造成伺服器負擔，預設只開一個執行緒)
~~~


### Train

- Tensorflow - 建立靜態圖 

~~~python
def classifier(x, num_class):
    x = tf.reduce_mean(x, [1,2]) # global average pooling
    x = tf.layers.dense(x, num_class)
    return x
~~~


~~~python
'''graph

這部分就像一張計畫圖一樣，定義我們計算的流程
此部分沒辦法直接被執行，必須靠 session 才能實際執行運算

'''

main_graph = tf.Graph()
sess = tf.Session(graph=main_graph)
with main_graph.as_default():
    #### optimizer ####
    lr = tf.placeholder(tf.float32, shape=[])
    optimizer = tf.train.AdamOptimizer(lr)
        
    #### placeholder ####
    input_img = tf.placeholder(dtype=tf.float32, shape=(None, img_size, img_size, 3))
    y_true = tf.placeholder(dtype=tf.float32, shape=(None, num_class))
    is_training = tf.placeholder(dtype=tf.bool, shape=[])
    
    #### model ####
    with slim.arg_scope(slimNet.resnet_utils.resnet_arg_scope(batch_norm_decay=0.99)):
        _, layers_dict = slimNet.resnet_v2.resnet_v2_50(input_img, global_pool=False, is_training=is_training)
        conv_output = layers_dict['resnet_v2_50/block4']
    
    with tf.variable_scope('CLASS_1'):
        pred = classifier(conv_output, num_class)
        pred_softmax = tf.nn.softmax(pred)
    
    #### loss ####
    loss = tf.losses.softmax_cross_entropy(y_true, pred)
    
    #### udpate ####
    update_ops = tf.get_collection(tf.GraphKeys.UPDATE_OPS) #使用內建的 batch normalization layer, 必須執行
    with tf.control_dependencies(update_ops):               #tf.GraphKeys.UPDATE_OPS 才會更新到 BN 層的 mean, variance
        update = optimizer.minimize(loss) 
        
    #### other ####
    var_list = tf.trainable_variables() # 與 tf.get_collection(tf.GraphKeys.TRAINABLE_VARIABLES) 相同    
    saver = tf.train.Saver() # 處理模型儲存、載入
    init = tf.global_variables_initializer()
~~~

- Tensorflow- 初始化模型 / 載入模型參數 

~~~python
#### initialize model ####
sess.run(init)

#### load weights from pre-train model ####
saver_restore = tf.train.Saver([v for v in var_list if 'resnet_v2_50' in v.name])
saver_restore.restore(sess, 'tf_pretrain_model/resnet_v2_50.ckpt')
~~~

- Tensorflow- 實際執行模型訓練

~~~python
epoch_bar = tqdm(range(nb_epoch), desc="epoch", unit="epoch")
for epoch in epoch_bar:

    ### train ###
    train_batch_bar = tqdm(range(n_batch), desc="train_batch", unit="batch", leave=False)

    for batch in train_batch_bar:
        x, y = generators.train_queue.get()
        
        # 執行 loss & update (train)
        _, train_loss = sess.run([update, loss], feed_dict={input_img:x[0], y_true:y, 
                                                           is_training:True, lr:model_dict['reduce_lr'].lr})
        model_dict['train_batch_log'].push({'loss':train_loss})

    model_dict['history']['train_loss'].append(model_dict['train_batch_log'].avg_value('loss'))
    model_dict['train_batch_log'].reset()

    ### val ###
    val_batch_bar = tqdm(generators.iter_val(), total=generators.val_len, desc="val_batch" , unit="batch", leave=False)

    for x, y, length in val_batch_bar:
        # 執行 loss (val)
        # 小提醒：Restnet model 有使用 batch normalization。所以在非 training 階段， 
        # is_training要記得設定為 False。這樣 BN 層內的 mean, variance 才不會更新。
        val_loss, = sess.run([loss], feed_dict={input_img: x[0], y_true: y,
                                                is_training: False})
        
        model_dict['val_batch_log'].push({'loss':val_loss}, length)


    model_dict['history']['val_loss'].append(model_dict['val_batch_log'].avg_value('loss'))
    model_dict['val_batch_log'].reset()

    ### callback ###
    print('Epoch: {}/{}'.format(epoch,nb_epoch))
    print('trai loss: {} | val loss: {}'.format(model_dict['history']['train_loss'][-1], 
                                                model_dict['history']['val_loss'][-1]))
    print('learning rate: ', model_dict['reduce_lr'].lr)
    print()
    
    ### draw loss curve ###
    plt.plot(model_dict['history']['train_loss'], label='train_loss')
    plt.plot(model_dict['history']['val_loss'], label='val_loss')
    plt.legend()
    plt.show()

    callback_manager.run_on_epoch_end(val_loss = model_dict['history']['val_loss'][-1],
                                      sess = sess,
                                      saver = saver,
                                      nth_epoch = epoch)
    if model_dict['earlystop'].stop:
        break
~~~


### Test

~~~python
''' load model '''
saver.restore(sess, os.path.join('model', model_name) + '.ckpt')
~~~

~~~python
for x, y, file in generators.get_test_data():
    y_pred = sess.run(pred_softmax, feed_dict={input_img: x[0], is_training: False})
    
    model_dict['testing']['y_true'].extend(y[:, 1].tolist())
    model_dict['testing']['y_pred'].extend(y_pred[:, 1].tolist())
    model_dict['testing']['files'].extend(file)
~~~

~~~python 
df = pd.DataFrame({"files":model_dict['testing']['files'],
                   "y_true":model_dict['testing']['y_true'],
                   "y_pred":model_dict['testing']['y_pred']})

~~~

~~~python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(df['y_true'], df['y_pred'].round())
print('Accuracy on testing set is {}'.format(accuracy))
~~~

~~~python
os._exit(0)
~~~