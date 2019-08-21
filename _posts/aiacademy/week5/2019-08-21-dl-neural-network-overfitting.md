---
layout: 'post'
title: 'aiacademy: 深度學習 Overfitting'
permalink: 'aiacademy/week5/deep-learning-neural-network-overfitting'
tags: aiacademy deep-learning neural-networks model-tuning
---

### Overfitting

- [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week3/solving-the-problem-of-overfitting){:target="_back"}
- [我的筆記2](https://yuting3656.github.io/yutingblog//ml-coursera/week3/solving-the-problem-of-overfitting2){:target="_back"}

<iframe src="https://www.youtube.com/embed/TyNPsJccgRw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- 避免overfitting

   - Regularization

      ![Imgur](https://i.imgur.com/6rbvpy0.gif)

      ![Imgur](https://i.imgur.com/G6PB0p9.gif)


   - Early Stopping

      ![Imgur](https://i.imgur.com/Dmd9ldT.gif) 

      - 準備考試最快的方法竟是　__放棄__
      - 假如 validation loss 沒什麼進步，就不要繼續訓練了


   - Dropout

      ![Imgur](https://i.imgur.com/oUy7QuC.gif)

      ![Imgur](https://i.imgur.com/YKt9Plm.gif)

   - Dropout & Model Ensmble

      ![Imgur](https://i.imgur.com/iGYf1Gn.gif)

      ![Imgur](https://i.imgur.com/7ketDm8.gif)

   - Dropout in Practice

      ![Imgur](https://i.imgur.com/ikp0tlu.gif)

      ![Imgur](https://i.imgur.com/eWANUQE.gif)


### Overfitting 實作

> 用貓狗大戰的 [例子](https://yuting3656.github.io/yutingblog/aiacademy/week5/deep-learning-neural-network-dogs-and-cats-datasets){:target="_back"} 繼續來練


<iframe src="https://www.youtube.com/embed/jFa38kKmIdQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


# 1. Early stopping and checkpoint

### Before
   ![Imgur](https://i.imgur.com/IIS3DjD.gif)

   - activation function: Relu
   - learning rate: 0.001
   - optimizer: GradientDescentOptimize

   ~~~python
   epoch = 100
   bs = 32
   
   train_loss_epoch, train_acc_epoch = [], []
   test_loss_epoch, test_acc_epoch = [], []
   
   sess = tf.Session()
   sess.run(init)
   
   best_loss = 1.
   patience = 5
   count = 0
   
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
           
       if batch_loss < best_loss:
           best_loss = batch_loss
           saver.save(sess, './bestweight.ckpt', global_step=i)
           count = 0  
       else:
           count += 1
       
       if count >= patience:
           print("The model didn't improve for {} rounds, break it!".format(patience))
           break
   ~~~

- 在 test part 中　加入這個

   ~~~python
       if i%5 == 0:
           print('step: {:2d}, train loss: {:.3f}, train acc: {:.3f}, test loss: {:.3f}, test acc: {:.3f}'
                .format(i, train_loss_epoch[i], train_acc_epoch[i], test_loss_epoch[i], test_acc_epoch[i]))
           
       if batch_loss < best_loss:
           best_loss = batch_loss
           saver.save(sess, './bestweight.ckpt', global_step=i)
           count = 0  
       else:
           count += 1
       
       if count >= patience:
           print("The model didn't improve for {} rounds, break it!".format(patience))
           break
   ~~~

- 看跑到什麼時候停住

　　　![Imgur](https://i.imgur.com/GBSt2w8.gif)

- 載入剛剛存到的最好的　weight

  ![Imgur](https://i.imgur.com/Nn2r4C5m.gif)

   - saver.restore(sess, tf.train.latest_checkpoint('./cd_class'))
   - saver.restore(sess, './cd_class/bestweight.ckpt-XX')

   ~~~python
   saver.restore(sess, tf.train.latest_checkpoint('./cd_class'))  # 自動從資料夾中拿最後的　checkpoint
   # saver.restore(sess, './cd_class/bestweight.ckpt-XX')
   print(sess.run(loss, feed_dict={input_data: X_test, y_true: y_test}))
   ~~~


### After 

![Imgur](https://i.imgur.com/DTzwkX6l.gif)



# 2. Regularization

![Imgur](https://i.imgur.com/nbMr12i.gif)

- tensorflow 實作 Regularization

    1. 新增一個 placeholder: lambda 正規化的係數
    2. 在各個 dense 中加入 `kernel_regularizer=tf.contrib.layers.l2_regularizer(scale=l2))`
    3. loss:
       
       ~~~python
        reg = tf.get_collection(tf.GraphKeys.REGULARIZATION_LOSSES)
        loss = cross_loss + tf.reduce_sum(reg)
       ~~~

~~~python
tf.reset_default_graph()

with tf.name_scope('placeholder'):
    input_data = tf.placeholder(tf.float32, shape=[None, picsize*picsize], name='X')
    y_true = tf.placeholder(tf.float32, shape=[None, 2], name='y')
    l2 = tf.placeholder(tf.float32, shape=[], name='l2_regulizer')
    
with tf.variable_scope('network'):
    h1 = tf.layers.dense(input_data, 256, activation=tf.nn.relu, name='hidden1',
                         kernel_regularizer=tf.contrib.layers.l2_regularizer(scale=l2)) 
    h2 = tf.layers.dense(h1, 128, activation=tf.nn.relu, name='hidden2',
                         kernel_regularizer=tf.contrib.layers.l2_regularizer(scale=l2)) 
    h3 = tf.layers.dense(h2, 64, activation=tf.nn.relu, name='hidden3',
                         kernel_regularizer=tf.contrib.layers.l2_regularizer(scale=l2))
    out = tf.layers.dense(h3, 2, name='output',
                          kernel_regularizer=tf.contrib.layers.l2_regularizer(scale=l2))
    
with tf.name_scope('loss'):
    cross_loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true, logits=out), 
                                name='cross_entropy')
    reg = tf.get_collection(tf.GraphKeys.REGULARIZATION_LOSSES)
    loss = cross_loss + tf.reduce_sum(reg)
    
with tf.name_scope('accuracy'):
    correct_prediction = tf.equal(tf.argmax(tf.nn.softmax(out), 1), tf.argmax(y_true, 1))
    compute_acc = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
    
with tf.name_scope('opt'):
    update = tf.train.GradientDescentOptimizer(learning_rate=0.001).minimize(loss)
    
init = tf.global_variables_initializer()
~~~


- 比較模型有加Regularization和沒加入Regularization

![Imgur](https://i.imgur.com/KkNjsVP.gif)

- 訓練

   - 在訓練程式外在加入一回圈，放 l2_reg 的數值，來看看各lambda 下的訓練狀況
      - 
      ~~~python
      for l2_reg in (0, 0.1, 0.01, 0.001):
          ...
      ~~~

      ~~~python
      history = {}
      for l2_reg in [0, 0.1, 0.01, 0.001]:
          
          epoch = 100
          bs = 32
      
          train_loss_epoch, train_acc_epoch = [], []
          test_loss_epoch, test_acc_epoch = [], []
      
          sess = tf.Session()
          sess.run(init)
      
          for i in tqdm_notebook(range(epoch)):
      
          #     training part
              train_loss_batch, train_acc_batch = [], []
      
              total_batch = len(X_train) // bs
      
              for j in range(total_batch):
      
                  X_batch = X_train[j*bs : (j+1)*bs]
                  y_batch = y_train[j*bs : (j+1)*bs]
                  batch_loss, batch_acc, _ = sess.run([loss, compute_acc, update], 
                                                      feed_dict={input_data: X_batch, y_true: y_batch, l2: l2_reg})
      
                  train_loss_batch.append(batch_loss)
                  train_acc_batch.append(batch_acc)
      
              train_loss_epoch.append(np.mean(train_loss_batch))
              train_acc_epoch.append(np.mean(train_acc_batch))
      
          #     testing part
              batch_loss, batch_acc = sess.run([loss, compute_acc], 
                                               feed_dict={input_data: X_test, y_true: y_test, l2: l2_reg})
      
              test_loss_epoch.append(batch_loss)
              test_acc_epoch.append(batch_acc)
      
              X_train, y_train = shuffle(X_train, y_train)
              
          sess.close()
          
          history[l2_reg] = [train_loss_epoch, train_acc_epoch, test_loss_epoch, test_acc_epoch]
      ~~~

   - 出圖

      ~~~python
      fig, axes = plt.subplots(2, 2, figsize=(15, 12))
      axes = axes.ravel()
      for ax, key in zip(axes, history.keys()):
          ax.plot(history[key][0], 'b', label='train')
          ax.plot(history[key][2], 'r', label='test')
          ax.set_title('Loss, $\lambda = {}$'.format(key))
          ax.legend()
          
      fig, axes = plt.subplots(2, 2, figsize=(15, 12))
      axes = axes.ravel()
      for ax, key in zip(axes, history.keys()):
          ax.plot(history[key][1], 'b', label='train')
          ax.plot(history[key][3], 'r', label='test')
          ax.set_title('Accuracy, $\lambda = {}$'.format(key))
          ax.legend()
      ~~~


   - 結果

      - loss
         - λ：0.1~ 0.01 GOOD

         ![Imgur](https://i.imgur.com/dsPSQUll.gif)

      - accuracy
         - λ: 0.01 GOOD

         ![Imgur](https://i.imgur.com/mwsSNSCl.gif)

# 3. Dropout

![Imgur](https://i.imgur.com/m1JTLVVl.gif)


- 比較模型有加 __Dropout__ 和沒加入 __Dropout__

![Imgur](https://i.imgur.com/rZpb5e7.jpg)


- tensorflow dropout 實作
   
   1. 新增 dropout, training 的 placeholder
      - `training = tf.placeholder(tf.bool, name='training')`
         - training: 只有在 training 中才做 dropout
   
   2. 在 scope 中新增 input_drop, hidden layer 中加入 `tf.layers.dropout`
      - `input_drop = tf.layers.dropout(inputs=input_data, rate=dropout, training=training, name='input_drop')`
         - training 算是一個　flag

   ~~~python
   tf.reset_default_graph()
   
   with tf.name_scope('placeholder'):
       input_data = tf.placeholder(tf.float32, shape=[None, picsize*picsize], name='X')
       y_true = tf.placeholder(tf.float32, shape=[None, 2], name='y')
       dropout = tf.placeholder(tf.float32, shape=[], name='dropout')
       training = tf.placeholder(tf.bool, name='training')
       
   with tf.variable_scope('network'):
       input_drop = tf.layers.dropout(inputs=input_data, rate=dropout, training=training, name='input_drop')
       
       h1 = tf.layers.dense(input_drop, 256, activation=tf.nn.relu, name='hidden1')
       h1 = tf.layers.dropout(h1, rate=dropout, training=training, name='h1_drop')
       
       h2 = tf.layers.dense(h1, 128, activation=tf.nn.relu, name='hidden2') 
       h2 = tf.layers.dropout(h2, rate=dropout, training=training, name='h2_drop')
       
       h3 = tf.layers.dense(h2, 64, activation=tf.nn.relu, name='hidden3')
       
       out = tf.layers.dense(h3, 2, name='output')
       
   with tf.name_scope('loss'):
       loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true, logits=out), name='loss')
       
   with tf.name_scope('accuracy'):
       correct_prediction = tf.equal(tf.argmax(tf.nn.softmax(out), 1), tf.argmax(y_true, 1))
       compute_acc = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
       
   with tf.name_scope('opt'):
       update = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(loss)
       
   init = tf.global_variables_initializer()
   ~~~


- 訓練

   - 在訓練程式外在加入一回圈，放 __droprate__ 的數值，來看看各 __droprate__ 下的訓練狀況\
      - 
      ~~~python
      for droprate in [0, 0.25, 0.5, 0.75]:
          ...
      ~~~

   ~~~python
   history = {}
   for droprate in [0, 0.25, 0.5, 0.75]:
       
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
                                                   feed_dict={input_data: X_batch, y_true: y_batch, 
                                                              dropout: droprate, training: True})
   
               train_loss_batch.append(batch_loss)
               train_acc_batch.append(batch_acc)
   
           train_loss_epoch.append(np.mean(train_loss_batch))
           train_acc_epoch.append(np.mean(train_acc_batch))
   
       # testing part
           batch_loss, batch_acc = sess.run([loss, compute_acc], 
                                            feed_dict={input_data: X_test, y_true: y_test, 
                                                       dropout: droprate, training: False})
   
           test_loss_epoch.append(batch_loss)
           test_acc_epoch.append(batch_acc)
   
           X_train, y_train = shuffle(X_train, y_train)
           
       sess.close()
       
       history[droprate] = [train_loss_epoch, train_acc_epoch, test_loss_epoch, test_acc_epoch]
   ~~~

   - 出圖

      ~~~python
      fig, axes = plt.subplots(2, 2, figsize=(15, 12))
      axes = axes.ravel()
      for ax, key in zip(axes, history.keys()):
          ax.plot(history[key][0], 'b', label='train')
          ax.plot(history[key][2], 'r', label='test')
          ax.set_title('Loss, dropout rate: {}'.format(key))
          ax.legend()
          
      fig, axes = plt.subplots(2, 2, figsize=(15, 12))
      axes = axes.ravel()
      for ax, key in zip(axes, history.keys()):
          ax.plot(history[key][1], 'b', label='train')
          ax.plot(history[key][3], 'r', label='test')
          ax.set_title('Accuracy, dropout rate: {}'.format(key))
          ax.legend()
      ~~~


    - 結果

       - loss
          - dropout rate: 0
             - train loss 下降
             - test loss 上升
          - dropout rate: 0.25
             - train loss 下降
             - test loss 持平
          - dropout rate: 0.5
             - train loss 下降
             - test loss 下降點點後持平          
          - dropout rate: 0.75
             - train loss 下降
             - test loss 下降          

          ![Imgur](https://i.imgur.com/gqf8kAU.jpg)

       - accuracy
          - dropout rate: 0
             - train accuracy 上降 到 0.9
             - test accuracy 持平
          - dropout rate: 0.25
             - train accuracy 上降 0.7
             - test accuracy 上降點點後持平
          - dropout rate: 0.5
             - train accuracy 0.64
             - test accuracy 快樂跳動          
          - dropout rate: 0.75
             - train accuracy 0.6  
             - test accuracy 瘋狂跳動

          ![Imgur](https://i.imgur.com/xtXOW1u.jpg)


         > 結論：不優阿！！！