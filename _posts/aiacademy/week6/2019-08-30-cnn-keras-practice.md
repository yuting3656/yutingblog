---
layout: 'post'
title: 'aiacademy: 深度學習 CNN wtih keras (cifar10)'
permalink: 'aiacademy/week6/deep-learning-cnn-keras-cifar10'
tags: aiacademy cnn keras
---

### cnn with keras

<iframe src="https://www.youtube.com/embed/VfaUErFiOkw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


#### 不要混用亂 import

![Imgur](https://i.imgur.com/5kzbEdo.jpg)



### 1. Load CIFAR-10 Dataset by Keras

~~~python
import keras
from keras.datasets import cifar10
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.callbacks import EarlyStopping, ModelCheckpoint

import matplotlib.pyplot as plt
import os

batch_size = 128
num_classes = 10
epochs = 100

(x_train, y_train), (x_test, y_teset) = cifar10.load_data()

print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

# x_train shape: (50000, 32, 32, 3)
# 50000 train samples
# 10000 test samples
~~~
  
- Convert class vectors to binary class matrices.

   ~~~python
   y_train = keras.utils.to_categorical(y_train, num_classes)
   y_test = keras.utils.to_categorical(y_test, num_classes)
   ~~~

   ![Imgur](https://i.imgur.com/YNB8Gxi.jpg)

   > 就是 `灣哈應摳定` 拉!

### 2. Building CNN model

![Imgur](https://i.imgur.com/xjGK75Q.jpg)

~~~python
model = Sequential()
model.add(Conv2D(64, (3,3), padding='same', input_shape=x_train.shape[1:]))
model.add(Activation('relu'))
model.add(Conv2D(128, (3,3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Conv2D(64, (3,3), padding='same'))
model.add(Activation('relu'))
model.add(Conv2D(64, (3,3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Faltten())
model.add(Dense(512)) 
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(10)) # output layer
model.add(Activation('softmax'))

print(model.summary())

# _________________________________________________________________
# Layer (type)                 Output Shape              Param #   
# =================================================================
# conv2d_1 (Conv2D)            (None, 32, 32, 64)        1792      
# _________________________________________________________________
# activation_1 (Activation)    (None, 32, 32, 64)        0         
# _________________________________________________________________
# conv2d_2 (Conv2D)            (None, 30, 30, 128)       73856     
# _________________________________________________________________
# activation_2 (Activation)    (None, 30, 30, 128)       0         
# _________________________________________________________________
# max_pooling2d_1 (MaxPooling2 (None, 15, 15, 128)       0         
# _________________________________________________________________
# dropout_1 (Dropout)          (None, 15, 15, 128)       0         
# _________________________________________________________________
# conv2d_3 (Conv2D)            (None, 15, 15, 64)        73792     
# _________________________________________________________________
# activation_3 (Activation)    (None, 15, 15, 64)        0         
# _________________________________________________________________
# conv2d_4 (Conv2D)            (None, 13, 13, 64)        36928     
# _________________________________________________________________
# activation_4 (Activation)    (None, 13, 13, 64)        0         
# _________________________________________________________________
# max_pooling2d_2 (MaxPooling2 (None, 6, 6, 64)          0         
# _________________________________________________________________
# dropout_2 (Dropout)          (None, 6, 6, 64)          0         
# _________________________________________________________________
# flatten_1 (Flatten)          (None, 2304)              0         
# _________________________________________________________________
# dense_1 (Dense)              (None, 512)               1180160   
# _________________________________________________________________
# activation_5 (Activation)    (None, 512)               0         
# _________________________________________________________________
# dropout_3 (Dropout)          (None, 512)               0         
# _________________________________________________________________
# dense_2 (Dense)              (None, 10)                5130      
# _________________________________________________________________
# activation_6 (Activation)    (None, 10)                0         
# =================================================================
# Total params: 1,371,658
# Trainable params: 1,371,658
# Non-trainable params: 0
~~~

~~~python
# initiate Adam optimizer
opt = keras.optimizers.Adam()

model.compile(loss='categorical_crossentropy',
              optimizer=opt,
              metrics=['accuracy'])

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255.
x_test /= 255.
~~~

### 2.1 ImageDataGenerator (Data Augmentation)

~~~python
from keras.preprocessing.image import ImageDataGenerator
datagen = ImageDataGenerator(
    rotation_range = 30, # randomly rotate imagesg in the range (degree, 0 to 180)
    width_shift_range = 0.1 # randomly shift images horizontally (fraction of total width)
    height_shift_range = 0.1 # 
    horizontal_flip = True, # randomly flip images
    vertical_flip = False, # randomly flip images
)

# write 'saved_models' path
save_dir = os.path.join(os.getcwd(), 'saved_models')
# model name
model_name = 'keras_cifar10_trained_model.h5'

if not os.path.isdir(save_dir):
    os.makedirs(save_dir)
model_path = os.path.join(save_dir, model_name)

# 存最棒棒的 weights
checkpoint = ModelCheckpoint(model_path, monitor='val_loss', save_best_only=True, verbose=1)
# earlystop
earlystop = EarlyStopping(monitor='val_loss', patience=5, verbose=1)

# Fit the model on the batches generated by datagen.flow()
model_history = model.fit_generator(
    datagen.flow(
        x_train, y_train,batch_size=batch_size),
    steps_per_epoch = len(x_train) / 32,
    epochs = epochs,
    validation_data = (x_test, y_test),
    workers = 4,
    callbacks = [earlystop, checkpoint]
)
~~~

###　3. Loading our save model

~~~python
model = load_model(model_path)

# Score trained model
scores = model.evaluate(x_test, y_test, verbose = 1)
print('Test loss:', scores[0])
print('Test accuracy:', scores[1])
~~~