---
layout: 'post'
title: 'aiacademy: 深度學習 貓狗大戰! model tuning'
permalink: 'aiacademy/week5/deep-learning-neural-network-dogs-and-cats-datasets'
tags: aiacademy deep-learning neural-networks model-tuning tensorflow
---

### 貓狗大戰

<iframe  src="https://www.youtube.com/embed/Dn84D8GxvZk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- import 

   ~~~python
   import numpy as np 
   import pandas as pd
   import matplotlib.pyplot as plt
   import cv2
   import tensorflow as tf
   from tqdm import tqdm_notebook
   from sklearn.model_selection import train_test_split
   from sklearn.utils import shuffle
   ~~~

- load data

   ~~~python
   df = pd.read_csv('cat_dog_df.csv')
   df.head(10)
   
   pic = cv2.imread(df.file_name[0], cv2.IMREAD_GRAYSCALE)
   print(pic.shape)
   plt.imshow(pic, cmap='gray')
   plt.show()
   ~~~

- split data adn preprocessing

   ~~~python
   train_df, test_df = train_test_split(df, test_size=0.2, stratify=df.type)
   
   def df_to_data(df, picsize):
       img_ls = []
       label_ls = []
   
       for file_name, label in tqdm_notebook(zip(df.file_name, df.type)):
           img = cv2.imread(file_name, cv2.IMREAD_GRAYSCALE)
           img = cv2.resize(img, (picsize, picsize))
           img_ls.append(img)
           
           onehot = np.zeros(2)  
           onehot[label] = 1
           label_ls.append(onehot)
   
       x_data = np.array(img_ls).reshape(len(df), -1)  # flatten image data
       x_data = x_data / 255.  # normalization
       y_data = np.array(label_ls)
       return x_data, y_data
   ~~~

   ~~~ptyhon
   picsize = 64
   X_train, y_train = df_to_data(train_df, picsize)
   X_test, y_test = df_to_data(test_df, picsize)
   
   print('size of training data:', X_train.shape, y_train.shape)
   print('size of testing data:', X_test.shape, y_test.shape)
   ~~~

- build the network

   ~~~python
   tf.reset_default_graph()
   
   with tf.name_scope('placeholder'):
       input_data = tf.placeholder(tf.float32, shape=[None, picsize*picsize], name='X')
       y_true = tf.placeholder(tf.float32, shape=[None, 2], name='y')
       
   with tf.variable_scope('network'):
       h1 = tf.layers.dense(input_data, 256, activation=tf.nn.sigmoid, name='hidden1')  # try to change the activation function
       h2 = tf.layers.dense(h1, 128, activation=tf.nn.sigmoid, name='hidden2') 
       h3 = tf.layers.dense(h2, 64, activation=tf.nn.sigmoid, name='hidden3')
       out = tf.layers.dense(h3, 2, name='output')
       
   with tf.name_scope('loss'):
       loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true, logits=out), name='loss')
       
   with tf.name_scope('accuracy'):
       correct_prediction = tf.equal(tf.argmax(tf.nn.softmax(out), 1), tf.argmax(y_true, 1))
       compute_acc = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
       
   with tf.name_scope('opt'):
       update = tf.train.GradientDescentOptimizer(learning_rate=0.001).minimize(loss) # try to change the optimuizer and learning rate
       
   init = tf.global_variables_initializer()
   ~~~

- show global variables

   ~~~python
   tf.global_variables()
   # [<tf.Variable 'network/hidden1/kernel:0' shape=(4096, 256) dtype=float32_ref>,
   #  <tf.Variable 'network/hidden1/bias:0' shape=(256,) dtype=float32_ref>,
   #  <tf.Variable 'network/hidden2/kernel:0' shape=(256, 128) dtype=float32_ref>,
   #  <tf.Variable 'network/hidden2/bias:0' shape=(128,) dtype=float32_ref>,
   #  <tf.Variable 'network/hidden3/kernel:0' shape=(128, 64) dtype=float32_ref>,
   #  <tf.Variable 'network/hidden3/bias:0' shape=(64,) dtype=float32_ref>,
   #  <tf.Variable 'network/output/kernel:0' shape=(64, 2) dtype=float32_ref>,
   #  <tf.Variable 'network/output/bias:0' shape=(2,) dtype=float32_ref>]
   ~~~

- 算總共的weights!!! 

   - 自許為一個AI工程師要懂得如何計算出所有的weight唷! :heart:

   - 畢卡葛手稿，幫助快速釐清
      ![Imgur](https://i.imgur.com/R0RnUEx.jpg)

   ~~~python
   var_sum = 0
   for tensor in tf.global_variables(scope='network'):
       if 'Adam' not in tensor.name:
           var_sum += np.product(tensor.shape.as_list())
       
   print('the total number of weights is', var_sum)  # 4096*256 + 256 + 256*128 + 128 + 128*64 + 64 + 64*2 + 2
   # the total number of weights is 1090114
   ~~~

- 訓練model啦!

   ~~~python
   epoch = 100
   bs = 32
   
   train_loss_epoch, train_acc_epoch = [], []
   test_loss_epoch, test_acc_epoch = [], []
   
   sess = tf.Session()
   sess.run(init)
   
   for i in tqdm_notebook(range(epoch)):
       
   # training part
       train_loss_batch, train_acc_batch = [], []
       
       total_batch = len(X_train) // bs
       
       for j in range(total_batch):
           
           X_batch = X_train[j*bs : (j+1)*bs]
           y_batch = y_train[j*bs : (j+1)*bs]
           batch_loss, batch_acc, _ = sess.run([loss, compute_acc, update], 
                                               feed_dict={input_data: X_batch, y_true: y_batch})
           
           train_loss_batch.append(batch_loss)
           train_acc_batch.append(batch_acc)
           
       train_loss_epoch.append(np.mean(train_loss_batch))
       train_acc_epoch.append(np.mean(train_acc_batch))
       
   # testing part
       batch_loss, batch_acc = sess.run([loss, compute_acc], 
                                       feed_dict={input_data: X_test, y_true: y_test})
   
       test_loss_epoch.append(batch_loss)
       test_acc_epoch.append(batch_acc)
       
       X_train, y_train = shuffle(X_train, y_train)
       
       if i%5 == 0:
           print('step: {:2d}, train loss: {:.3f}, train acc: {:.3f}, test loss: {:.3f}, test acc: {:.3f}'
                .format(i, train_loss_epoch[i], train_acc_epoch[i], test_loss_epoch[i], test_acc_epoch[i]))
       
   ~~~

- 看訓練過程

   ~~~python
   # step:  0, train loss: 0.742, train acc: 0.499, test loss: 0.693, test acc: 0.485
   # step:  5, train loss: 0.693, train acc: 0.507, test loss: 0.693, test acc: 0.546
   # step: 10, train loss: 0.692, train acc: 0.514, test loss: 0.693, test acc: 0.500
   # step: 15, train loss: 0.692, train acc: 0.529, test loss: 0.692, test acc: 0.559
   # step: 20, train loss: 0.692, train acc: 0.542, test loss: 0.692, test acc: 0.550
   # step: 25, train loss: 0.691, train acc: 0.542, test loss: 0.691, test acc: 0.555
   # step: 30, train loss: 0.691, train acc: 0.544, test loss: 0.691, test acc: 0.557
   # step: 35, train loss: 0.691, train acc: 0.552, test loss: 0.691, test acc: 0.502
   # step: 40, train loss: 0.690, train acc: 0.549, test loss: 0.690, test acc: 0.538
   # step: 45, train loss: 0.690, train acc: 0.551, test loss: 0.690, test acc: 0.554
   # step: 50, train loss: 0.690, train acc: 0.549, test loss: 0.690, test acc: 0.563
   # step: 55, train loss: 0.689, train acc: 0.552, test loss: 0.689, test acc: 0.561
   # step: 60, train loss: 0.689, train acc: 0.553, test loss: 0.689, test acc: 0.557
   # step: 65, train loss: 0.688, train acc: 0.555, test loss: 0.689, test acc: 0.562
   # step: 70, train loss: 0.688, train acc: 0.552, test loss: 0.688, test acc: 0.562
   # step: 75, train loss: 0.688, train acc: 0.555, test loss: 0.688, test acc: 0.563
   # step: 80, train loss: 0.687, train acc: 0.556, test loss: 0.688, test acc: 0.546
   # step: 85, train loss: 0.687, train acc: 0.559, test loss: 0.687, test acc: 0.562
   # step: 90, train loss: 0.687, train acc: 0.560, test loss: 0.687, test acc: 0.546
   # step: 95, train loss: 0.686, train acc: 0.560, test loss: 0.687, test acc: 0.558
   ~~~

- close session

   ~~~python
   sess.close()
   ~~~

- 出圖
   
   ~~~python
   plt.plot(train_loss_epoch, 'b', label='train')
   plt.plot(test_loss_epoch, 'r', label='test')
   plt.legend()
   plt.title("Loss")
   plt.show()
   
   plt.plot(train_acc_epoch, 'b', label='train')
   plt.plot(test_acc_epoch, 'r', label='test')
   plt.legend()
   plt.title("Accuracy")
   plt.show()
   ~~~

### 先看結論

- Loss & Accuracy

   ![Imgur](https://i.imgur.com/XIRseEu.gif)

   - 學太慢
   - Accuracy太低:
      - train_set 和 test_set 的準確率 __大約0.5!__ 我請我樓下三歲底笛來猜還比較準!!!

<br/>
### Model Tuning
1. 改變 learning rate

   - 學習速度太慢:
      
      - 提升 learning rate: 改成 0.1 `update = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(loss)`
   
         ~~~python
         tf.reset_default_graph()
         
         with tf.name_scope('placeholder'):
             input_data = tf.placeholder(tf.float32, shape=[None, picsize*picsize], name='X')
             y_true = tf.placeholder(tf.float32, shape=[None, 2], name='y')
             
         with tf.variable_scope('network'):
             h1 = tf.layers.dense(input_data, 256, activation=tf.nn.sigmoid, name='hidden1')  # try to change the activation function
             h2 = tf.layers.dense(h1, 128, activation=tf.nn.sigmoid, name='hidden2') 
             h3 = tf.layers.dense(h2, 64, activation=tf.nn.sigmoid, name='hidden3')
             out = tf.layers.dense(h3, 2, name='output')
             
         with tf.name_scope('loss'):
             loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true, logits=out), name='loss')
             
         with tf.name_scope('accuracy'):
             correct_prediction = tf.equal(tf.argmax(tf.nn.softmax(out), 1), tf.argmax(y_true, 1))
             compute_acc = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
             
         with tf.name_scope('opt'):
             update = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(loss) # try to change the optimuizer and learning rate
             
         init = tf.global_variables_initializer()
         ~~~
   
       - 結果
   
          - 學習速度變快
          - training set 也進步到 0.85 正確率!!
          - 有 overfitting 的情況發生!
   
       ![Imgur](https://i.imgur.com/IIS3DjD.gif)


2. 改變 activation function

   - sigmoid

      ![Imgur](https://i.imgur.com/qeAijByl.gif)
    
      - 把實數正無限大到負無限大映射到 1 ~ -1

      - sigmoid 多次微分後會造成 vanishing gradient:

         - 改善方法: 換其他的　activation function

   - Relu

      ![Imgur](https://i.imgur.com/yJYDUvUl.gif)

      - 大於零的資料: 不改變
      - 小於零的資料: 回傳零
      - 微分的狀態下:
         - 大於零的資料: 1
         - 小於零的資料: 0
      - Relu 特性資料通過不論幾次，樣子還是一樣

      - 把activation function 換relu `activation=tf.nn.relu`，learning rate: 0.001
         
         ~~~python
         tf.reset_default_graph()
         
         with tf.name_scope('placeholder'):
             input_data = tf.placeholder(tf.float32, shape=[None, picsize*picsize], name='X')
             y_true = tf.placeholder(tf.float32, shape=[None, 2], name='y')
             
         with tf.variable_scope('network'):
             h1 = tf.layers.dense(input_data, 256, activation=tf.nn.relu, name='hidden1')  # try to change the activation function
             h2 = tf.layers.dense(h1, 128, activation=tf.nn.relu, name='hidden2') 
             h3 = tf.layers.dense(h2, 64, activation=tf.nn.relu, name='hidden3')
             out = tf.layers.dense(h3, 2, name='output')
             
         with tf.name_scope('loss'):
             loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true, logits=out), name='loss')
             
         with tf.name_scope('accuracy'):
             correct_prediction = tf.equal(tf.argmax(tf.nn.softmax(out), 1), tf.argmax(y_true, 1))
             compute_acc = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
             
         with tf.name_scope('opt'):
             update = tf.train.GradientDescentOptimizer(learning_rate=0.001).minimize(loss) # try to change the optimuizer and learning rate
             
         init = tf.global_variables_initializer()
         ~~~

       - 結果

          - 和改 __learning rate__ 到 0.1 差不多
          - train set 準確率有超過8成
          - 還是有 overfitting 的情況發生!


          ![Imgur](https://i.imgur.com/n9Ud8HJl.gif)


3. 改變優化器　optimizer
   
   [我的筆記](https://yuting3656.github.io/yutingblog/aiacademy/week5/deep-learning-neural-network-model-tuning){:target="_back"}

   - Adam
      - 不會只計算現在的t度，而是會紀錄過去的t度為考量，而計算出更棒的兒數值

      - `update = tf.train.AdamOptimizer(learning_rate=0.001).minimize(loss)`

         ~~~python
         tf.reset_default_graph()
         
         with tf.name_scope('placeholder'):
             input_data = tf.placeholder(tf.float32, shape=[None, picsize*picsize], name='X')
             y_true = tf.placeholder(tf.float32, shape=[None, 2], name='y')
             
         with tf.variable_scope('network'):
             h1 = tf.layers.dense(input_data, 256, activation=tf.nn.relu, name='hidden1')  # try to change the activation function
             h2 = tf.layers.dense(h1, 128, activation=tf.nn.relu, name='hidden2') 
             h3 = tf.layers.dense(h2, 64, activation=tf.nn.relu, name='hidden3')
             out = tf.layers.dense(h3, 2, name='output')
             
         with tf.name_scope('loss'):
             loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true, logits=out), name='loss')
             
         with tf.name_scope('accuracy'):
             correct_prediction = tf.equal(tf.argmax(tf.nn.softmax(out), 1), tf.argmax(y_true, 1))
             compute_acc = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
             
         with tf.name_scope('opt'):
             update = tf.train.AdamOptimizer(learning_rate=0.001).minimize(loss) # try to change the optimuizer and learning rate
             
         init = tf.global_variables_initializer()
         ~~~
         
   - 看tensor variables過去的紀錄

   ![Imgur](https://i.imgur.com/twozIaP.gif)

   - 計算 weight
   
       - 會有三百多萬組，不是我們要的兒！
          
   ![Imgur](https://i.imgur.com/n5qExAC.gif) 

    
    - 加入 `‵if 'Adam' not in tensor.name:`

        ~~~python
        var_sum = 0
        for tensor in tf.global_variables(scope='network'):
            if 'Adam' not in tensor.name:
                var_sum += np.product(tensor.shape.as_list())
            
        print('the total number of weights is', var_sum)  # 4096*256 + 256 + 256*128 + 128 + 128*64 + 64 + 64*2 + 2
        # the total number of weights is 1090114
        ~~~

    - 結果
       - 7成多的成功率
       - 還是有　overfitting 的狀況！

　　　　![Imgur](https://i.imgur.com/TPDKwzg.gif)


### 本機程式實作

- 先抓貓圖!
   - 前行提要:
      - 因為圖片在hub裡面想在本機完成的話要去，kaggle [下載](https://www.kaggle.com/c/dogs-vs-cats/data){:target="_back"} 貓狗檔案
      - 助教給的csv `/data/...`，和我本機的位置不一樣
      <br/>所以偶去掉頭 `/` 寫 `df.file_name[0][1:]`
      <br/>

    ~~~python
    import numpy as np
    import pandas as pd
    import matplotlib.pyplot as plt
    import cv2
    import tensorflow as tf
    from sklearn.model_selection import train_test_split
    from sklearn.utils import shuffle
    
    
    df = pd.read_csv('cat_dog_df.csv')
    print(df)
    # .str 可將 pandas 轉成string
    print(df['file_name'].str[1:])
    
    pic = cv2.imread(df.file_name[0][1:], cv2.IMREAD_GRAYSCALE)
    print(pic.shape)
    plt.imshow(pic, cmap='gray')
    plt.show()
    ~~~