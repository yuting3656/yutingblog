---
layout: "single"
title: 'aiacademy: 深度學習 CNN Kaggle-Image-Classification'
permalink: 'aiacademy/week7/deep-learning-kaggle-image-classification'
tags: aiacademy cnn kaggle
---

> 超級好玩的兒~ AIA 在 [Kaggle 創建的 Pokemon 比賽](https://www.kaggle.com/c/aia-cnn-classification-whereami-tpe-5/overview){:target="_back"}

### Image Classification 總共 15 個地點類別!

![Imgur](https://i.imgur.com/twMXA2B.jpg)


### 練習方向:

- Data preprocessing and data augmentation
- DNN/CNN model construction and hyper-parameter tuning
- Metrics: Accuracy


### 先看我自己刻的　transfer learning model: mobilenet

   -  acc: 0.87 多

1. import 

   ~~~python
   import numpy as np
   import os
   import keras
   import matplotlib.pyplot as plt
   from keras.layers import Dense,GlobalAveragePooling2D, Dropout
   from keras.applications import MobileNet, MobileNetV2, VGG16, VGG19, Xception
   from keras.preprocessing import image
   from keras.applications.mobilenet import preprocess_input
   
   from keras.preprocessing.image import ImageDataGenerator
   from keras.models import Model
   from keras.optimizers import Adam
   ~~~

2. Base_model

    ~~~python
    base_model = MobileNet(
        weights='imagenet',
        include_top=False # 如果是 true 表示要拿這model的classes 來分類
        )
    ~~~

3. Build model: Functional Programming

    ~~~python
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x) 
    x = Dense(1024, activation='relu')(x)
    x = Dense(512, activation='relu')(x)
    preds = Dense(15, activation='softmax')(x)
    model = Model(inputs=base_model.input, outputs=preds)
    ~~~

    - Base_model 的層數不要 train

       - 留下上面的全連結層(Dense)

       ~~~python
       for layer in model.layers[:-4]:
       layer.trainable=False
       
       for layer in model.layers[-4:]:
       layer.trainable=True
       ~~~


4. model 細節

   ~~~python
   __________________________________________________________________________________________________
   Layer (type)                    Output Shape         Param #     Connected to                     
   ==================================================================================================
   input_1 (InputLayer)            (None, None, None, 3 0                                            
   __________________________________________________________________________________________________
   block1_conv1 (Conv2D)           (None, None, None, 3 864         input_1[0][0]                    
   __________________________________________________________________________________________________
   block1_conv1_bn (BatchNormaliza (None, None, None, 3 128         block1_conv1[0][0]               
   __________________________________________________________________________________________________
   block1_conv1_act (Activation)   (None, None, None, 3 0           block1_conv1_bn[0][0]            
   __________________________________________________________________________________________________
   block1_conv2 (Conv2D)           (None, None, None, 6 18432       block1_conv1_act[0][0]           
   __________________________________________________________________________________________________
   block1_conv2_bn (BatchNormaliza (None, None, None, 6 256         block1_conv2[0][0]               
   __________________________________________________________________________________________________
   block1_conv2_act (Activation)   (None, None, None, 6 0           block1_conv2_bn[0][0]            
   __________________________________________________________________________________________________
   block2_sepconv1 (SeparableConv2 (None, None, None, 1 8768        block1_conv2_act[0][0]           
   __________________________________________________________________________________________________
   block2_sepconv1_bn (BatchNormal (None, None, None, 1 512         block2_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block2_sepconv2_act (Activation (None, None, None, 1 0           block2_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block2_sepconv2 (SeparableConv2 (None, None, None, 1 17536       block2_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block2_sepconv2_bn (BatchNormal (None, None, None, 1 512         block2_sepconv2[0][0]            
   __________________________________________________________________________________________________
   conv2d_1 (Conv2D)               (None, None, None, 1 8192        block1_conv2_act[0][0]           
   __________________________________________________________________________________________________
   block2_pool (MaxPooling2D)      (None, None, None, 1 0           block2_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   batch_normalization_1 (BatchNor (None, None, None, 1 512         conv2d_1[0][0]                   
   __________________________________________________________________________________________________
   add_1 (Add)                     (None, None, None, 1 0           block2_pool[0][0]                
                                                                    batch_normalization_1[0][0]      
   __________________________________________________________________________________________________
   block3_sepconv1_act (Activation (None, None, None, 1 0           add_1[0][0]                      
   __________________________________________________________________________________________________
   block3_sepconv1 (SeparableConv2 (None, None, None, 2 33920       block3_sepconv1_act[0][0]        
   __________________________________________________________________________________________________
   block3_sepconv1_bn (BatchNormal (None, None, None, 2 1024        block3_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block3_sepconv2_act (Activation (None, None, None, 2 0           block3_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block3_sepconv2 (SeparableConv2 (None, None, None, 2 67840       block3_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block3_sepconv2_bn (BatchNormal (None, None, None, 2 1024        block3_sepconv2[0][0]            
   __________________________________________________________________________________________________
   conv2d_2 (Conv2D)               (None, None, None, 2 32768       add_1[0][0]                      
   __________________________________________________________________________________________________
   block3_pool (MaxPooling2D)      (None, None, None, 2 0           block3_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   batch_normalization_2 (BatchNor (None, None, None, 2 1024        conv2d_2[0][0]                   
   __________________________________________________________________________________________________
   add_2 (Add)                     (None, None, None, 2 0           block3_pool[0][0]                
                                                                    batch_normalization_2[0][0]      
   __________________________________________________________________________________________________
   block4_sepconv1_act (Activation (None, None, None, 2 0           add_2[0][0]                      
   __________________________________________________________________________________________________
   block4_sepconv1 (SeparableConv2 (None, None, None, 7 188672      block4_sepconv1_act[0][0]        
   __________________________________________________________________________________________________
   block4_sepconv1_bn (BatchNormal (None, None, None, 7 2912        block4_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block4_sepconv2_act (Activation (None, None, None, 7 0           block4_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block4_sepconv2 (SeparableConv2 (None, None, None, 7 536536      block4_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block4_sepconv2_bn (BatchNormal (None, None, None, 7 2912        block4_sepconv2[0][0]            
   __________________________________________________________________________________________________
   conv2d_3 (Conv2D)               (None, None, None, 7 186368      add_2[0][0]                      
   __________________________________________________________________________________________________
   block4_pool (MaxPooling2D)      (None, None, None, 7 0           block4_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   batch_normalization_3 (BatchNor (None, None, None, 7 2912        conv2d_3[0][0]                   
   __________________________________________________________________________________________________
   add_3 (Add)                     (None, None, None, 7 0           block4_pool[0][0]                
                                                                    batch_normalization_3[0][0]      
   __________________________________________________________________________________________________
   block5_sepconv1_act (Activation (None, None, None, 7 0           add_3[0][0]                      
   __________________________________________________________________________________________________
   block5_sepconv1 (SeparableConv2 (None, None, None, 7 536536      block5_sepconv1_act[0][0]        
   __________________________________________________________________________________________________
   block5_sepconv1_bn (BatchNormal (None, None, None, 7 2912        block5_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block5_sepconv2_act (Activation (None, None, None, 7 0           block5_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block5_sepconv2 (SeparableConv2 (None, None, None, 7 536536      block5_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block5_sepconv2_bn (BatchNormal (None, None, None, 7 2912        block5_sepconv2[0][0]            
   __________________________________________________________________________________________________
   block5_sepconv3_act (Activation (None, None, None, 7 0           block5_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   block5_sepconv3 (SeparableConv2 (None, None, None, 7 536536      block5_sepconv3_act[0][0]        
   __________________________________________________________________________________________________
   block5_sepconv3_bn (BatchNormal (None, None, None, 7 2912        block5_sepconv3[0][0]            
   __________________________________________________________________________________________________
   add_4 (Add)                     (None, None, None, 7 0           block5_sepconv3_bn[0][0]         
                                                                    add_3[0][0]                      
   __________________________________________________________________________________________________
   block6_sepconv1_act (Activation (None, None, None, 7 0           add_4[0][0]                      
   __________________________________________________________________________________________________
   block6_sepconv1 (SeparableConv2 (None, None, None, 7 536536      block6_sepconv1_act[0][0]        
   __________________________________________________________________________________________________
   block6_sepconv1_bn (BatchNormal (None, None, None, 7 2912        block6_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block6_sepconv2_act (Activation (None, None, None, 7 0           block6_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block6_sepconv2 (SeparableConv2 (None, None, None, 7 536536      block6_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block6_sepconv2_bn (BatchNormal (None, None, None, 7 2912        block6_sepconv2[0][0]            
   __________________________________________________________________________________________________
   block6_sepconv3_act (Activation (None, None, None, 7 0           block6_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   block6_sepconv3 (SeparableConv2 (None, None, None, 7 536536      block6_sepconv3_act[0][0]        
   __________________________________________________________________________________________________
   block6_sepconv3_bn (BatchNormal (None, None, None, 7 2912        block6_sepconv3[0][0]            
   __________________________________________________________________________________________________
   add_5 (Add)                     (None, None, None, 7 0           block6_sepconv3_bn[0][0]         
                                                                    add_4[0][0]                      
   __________________________________________________________________________________________________
   block7_sepconv1_act (Activation (None, None, None, 7 0           add_5[0][0]                      
   __________________________________________________________________________________________________
   block7_sepconv1 (SeparableConv2 (None, None, None, 7 536536      block7_sepconv1_act[0][0]        
   __________________________________________________________________________________________________
   block7_sepconv1_bn (BatchNormal (None, None, None, 7 2912        block7_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block7_sepconv2_act (Activation (None, None, None, 7 0           block7_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block7_sepconv2 (SeparableConv2 (None, None, None, 7 536536      block7_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block7_sepconv2_bn (BatchNormal (None, None, None, 7 2912        block7_sepconv2[0][0]            
   __________________________________________________________________________________________________
   block7_sepconv3_act (Activation (None, None, None, 7 0           block7_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   block7_sepconv3 (SeparableConv2 (None, None, None, 7 536536      block7_sepconv3_act[0][0]        
   __________________________________________________________________________________________________
   block7_sepconv3_bn (BatchNormal (None, None, None, 7 2912        block7_sepconv3[0][0]            
   __________________________________________________________________________________________________
   add_6 (Add)                     (None, None, None, 7 0           block7_sepconv3_bn[0][0]         
                                                                    add_5[0][0]                      
   __________________________________________________________________________________________________
   block8_sepconv1_act (Activation (None, None, None, 7 0           add_6[0][0]                      
   __________________________________________________________________________________________________
   block8_sepconv1 (SeparableConv2 (None, None, None, 7 536536      block8_sepconv1_act[0][0]        
   __________________________________________________________________________________________________
   block8_sepconv1_bn (BatchNormal (None, None, None, 7 2912        block8_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block8_sepconv2_act (Activation (None, None, None, 7 0           block8_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block8_sepconv2 (SeparableConv2 (None, None, None, 7 536536      block8_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block8_sepconv2_bn (BatchNormal (None, None, None, 7 2912        block8_sepconv2[0][0]            
   __________________________________________________________________________________________________
   block8_sepconv3_act (Activation (None, None, None, 7 0           block8_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   block8_sepconv3 (SeparableConv2 (None, None, None, 7 536536      block8_sepconv3_act[0][0]        
   __________________________________________________________________________________________________
   block8_sepconv3_bn (BatchNormal (None, None, None, 7 2912        block8_sepconv3[0][0]            
   __________________________________________________________________________________________________
   add_7 (Add)                     (None, None, None, 7 0           block8_sepconv3_bn[0][0]         
                                                                    add_6[0][0]                      
   __________________________________________________________________________________________________
   block9_sepconv1_act (Activation (None, None, None, 7 0           add_7[0][0]                      
   __________________________________________________________________________________________________
   block9_sepconv1 (SeparableConv2 (None, None, None, 7 536536      block9_sepconv1_act[0][0]        
   __________________________________________________________________________________________________
   block9_sepconv1_bn (BatchNormal (None, None, None, 7 2912        block9_sepconv1[0][0]            
   __________________________________________________________________________________________________
   block9_sepconv2_act (Activation (None, None, None, 7 0           block9_sepconv1_bn[0][0]         
   __________________________________________________________________________________________________
   block9_sepconv2 (SeparableConv2 (None, None, None, 7 536536      block9_sepconv2_act[0][0]        
   __________________________________________________________________________________________________
   block9_sepconv2_bn (BatchNormal (None, None, None, 7 2912        block9_sepconv2[0][0]            
   __________________________________________________________________________________________________
   block9_sepconv3_act (Activation (None, None, None, 7 0           block9_sepconv2_bn[0][0]         
   __________________________________________________________________________________________________
   block9_sepconv3 (SeparableConv2 (None, None, None, 7 536536      block9_sepconv3_act[0][0]        
   __________________________________________________________________________________________________
   block9_sepconv3_bn (BatchNormal (None, None, None, 7 2912        block9_sepconv3[0][0]            
   __________________________________________________________________________________________________
   add_8 (Add)                     (None, None, None, 7 0           block9_sepconv3_bn[0][0]         
                                                                    add_7[0][0]                      
   __________________________________________________________________________________________________
   block10_sepconv1_act (Activatio (None, None, None, 7 0           add_8[0][0]                      
   __________________________________________________________________________________________________
   block10_sepconv1 (SeparableConv (None, None, None, 7 536536      block10_sepconv1_act[0][0]       
   __________________________________________________________________________________________________
   block10_sepconv1_bn (BatchNorma (None, None, None, 7 2912        block10_sepconv1[0][0]           
   __________________________________________________________________________________________________
   block10_sepconv2_act (Activatio (None, None, None, 7 0           block10_sepconv1_bn[0][0]        
   __________________________________________________________________________________________________
   block10_sepconv2 (SeparableConv (None, None, None, 7 536536      block10_sepconv2_act[0][0]       
   __________________________________________________________________________________________________
   block10_sepconv2_bn (BatchNorma (None, None, None, 7 2912        block10_sepconv2[0][0]           
   __________________________________________________________________________________________________
   block10_sepconv3_act (Activatio (None, None, None, 7 0           block10_sepconv2_bn[0][0]        
   __________________________________________________________________________________________________
   block10_sepconv3 (SeparableConv (None, None, None, 7 536536      block10_sepconv3_act[0][0]       
   __________________________________________________________________________________________________
   block10_sepconv3_bn (BatchNorma (None, None, None, 7 2912        block10_sepconv3[0][0]           
   __________________________________________________________________________________________________
   add_9 (Add)                     (None, None, None, 7 0           block10_sepconv3_bn[0][0]        
                                                                    add_8[0][0]                      
   __________________________________________________________________________________________________
   block11_sepconv1_act (Activatio (None, None, None, 7 0           add_9[0][0]                      
   __________________________________________________________________________________________________
   block11_sepconv1 (SeparableConv (None, None, None, 7 536536      block11_sepconv1_act[0][0]       
   __________________________________________________________________________________________________
   block11_sepconv1_bn (BatchNorma (None, None, None, 7 2912        block11_sepconv1[0][0]           
   __________________________________________________________________________________________________
   block11_sepconv2_act (Activatio (None, None, None, 7 0           block11_sepconv1_bn[0][0]        
   __________________________________________________________________________________________________
   block11_sepconv2 (SeparableConv (None, None, None, 7 536536      block11_sepconv2_act[0][0]       
   __________________________________________________________________________________________________
   block11_sepconv2_bn (BatchNorma (None, None, None, 7 2912        block11_sepconv2[0][0]           
   __________________________________________________________________________________________________
   block11_sepconv3_act (Activatio (None, None, None, 7 0           block11_sepconv2_bn[0][0]        
   __________________________________________________________________________________________________
   block11_sepconv3 (SeparableConv (None, None, None, 7 536536      block11_sepconv3_act[0][0]       
   __________________________________________________________________________________________________
   block11_sepconv3_bn (BatchNorma (None, None, None, 7 2912        block11_sepconv3[0][0]           
   __________________________________________________________________________________________________
   add_10 (Add)                    (None, None, None, 7 0           block11_sepconv3_bn[0][0]        
                                                                    add_9[0][0]                      
   __________________________________________________________________________________________________
   block12_sepconv1_act (Activatio (None, None, None, 7 0           add_10[0][0]                     
   __________________________________________________________________________________________________
   block12_sepconv1 (SeparableConv (None, None, None, 7 536536      block12_sepconv1_act[0][0]       
   __________________________________________________________________________________________________
   block12_sepconv1_bn (BatchNorma (None, None, None, 7 2912        block12_sepconv1[0][0]           
   __________________________________________________________________________________________________
   block12_sepconv2_act (Activatio (None, None, None, 7 0           block12_sepconv1_bn[0][0]        
   __________________________________________________________________________________________________
   block12_sepconv2 (SeparableConv (None, None, None, 7 536536      block12_sepconv2_act[0][0]       
   __________________________________________________________________________________________________
   block12_sepconv2_bn (BatchNorma (None, None, None, 7 2912        block12_sepconv2[0][0]           
   __________________________________________________________________________________________________
   block12_sepconv3_act (Activatio (None, None, None, 7 0           block12_sepconv2_bn[0][0]        
   __________________________________________________________________________________________________
   block12_sepconv3 (SeparableConv (None, None, None, 7 536536      block12_sepconv3_act[0][0]       
   __________________________________________________________________________________________________
   block12_sepconv3_bn (BatchNorma (None, None, None, 7 2912        block12_sepconv3[0][0]           
   __________________________________________________________________________________________________
   add_11 (Add)                    (None, None, None, 7 0           block12_sepconv3_bn[0][0]        
                                                                    add_10[0][0]                     
   __________________________________________________________________________________________________
   block13_sepconv1_act (Activatio (None, None, None, 7 0           add_11[0][0]                     
   __________________________________________________________________________________________________
   block13_sepconv1 (SeparableConv (None, None, None, 7 536536      block13_sepconv1_act[0][0]       
   __________________________________________________________________________________________________
   block13_sepconv1_bn (BatchNorma (None, None, None, 7 2912        block13_sepconv1[0][0]           
   __________________________________________________________________________________________________
   block13_sepconv2_act (Activatio (None, None, None, 7 0           block13_sepconv1_bn[0][0]        
   __________________________________________________________________________________________________
   block13_sepconv2 (SeparableConv (None, None, None, 1 752024      block13_sepconv2_act[0][0]       
   __________________________________________________________________________________________________
   block13_sepconv2_bn (BatchNorma (None, None, None, 1 4096        block13_sepconv2[0][0]           
   __________________________________________________________________________________________________
   conv2d_4 (Conv2D)               (None, None, None, 1 745472      add_11[0][0]                     
   __________________________________________________________________________________________________
   block13_pool (MaxPooling2D)     (None, None, None, 1 0           block13_sepconv2_bn[0][0]        
   __________________________________________________________________________________________________
   batch_normalization_4 (BatchNor (None, None, None, 1 4096        conv2d_4[0][0]                   
   __________________________________________________________________________________________________
   add_12 (Add)                    (None, None, None, 1 0           block13_pool[0][0]               
                                                                    batch_normalization_4[0][0]      
   __________________________________________________________________________________________________
   block14_sepconv1 (SeparableConv (None, None, None, 1 1582080     add_12[0][0]                     
   __________________________________________________________________________________________________
   block14_sepconv1_bn (BatchNorma (None, None, None, 1 6144        block14_sepconv1[0][0]           
   __________________________________________________________________________________________________
   block14_sepconv1_act (Activatio (None, None, None, 1 0           block14_sepconv1_bn[0][0]        
   __________________________________________________________________________________________________
   block14_sepconv2 (SeparableConv (None, None, None, 2 3159552     block14_sepconv1_act[0][0]       
   __________________________________________________________________________________________________
   block14_sepconv2_bn (BatchNorma (None, None, None, 2 8192        block14_sepconv2[0][0]           
   __________________________________________________________________________________________________
   block14_sepconv2_act (Activatio (None, None, None, 2 0           block14_sepconv2_bn[0][0]        
   __________________________________________________________________________________________________
   global_average_pooling2d_1 (Glo (None, 2048)         0           block14_sepconv2_act[0][0]       
   __________________________________________________________________________________________________
   dense_1 (Dense)                 (None, 1024)         2098176     global_average_pooling2d_1[0][0] 
   __________________________________________________________________________________________________
   dense_2 (Dense)                 (None, 1024)         1049600     dense_1[0][0]                    
   __________________________________________________________________________________________________
   dense_3 (Dense)                 (None, 512)          524800      dense_2[0][0]                    
   __________________________________________________________________________________________________
   dense_4 (Dense)                 (None, 15)           7695        dense_3[0][0]                    
   ==================================================================================================
   Total params: 24,541,751
   Trainable params: 3,680,271
   Non-trainable params: 20,861,480
   __________________________________________________________________________________________________
   ~~~


5. 懶人拆資料方法 (ImageDataGenerator)

   ~~~python
   target_size = (224, 224)
   batch_size = 32
   ~~~

   - 當training set 和 valid set 都在同一個資料夾的時候

   ~~~python
   train_datagen = ImageDataGenerator(preprocessing_function=preprocess_input,
                                      validation_split=0.1)
   ~~~

      - train image gen

      ~~~python
      train_image_gen = train_datagen.flow_from_directory('train',
                                               target_size=target_size,
                                               batch_size=batch_size,
                                               class_mode='categorical',
                                               classes={ 
                                                   'kitchen' : 0,
                                                   'street' : 1,
                                                   'industrial' : 2,
                                                   'insidecity' : 3,
                                                   'forest' : 4,
                                                   'livingroom' : 5,
                                                   'opencountry' : 6,
                                                   'PARoffice' : 7,
                                                   'mountain' : 8,
                                                   'CALsuburb' : 9,
                                                   'coast' : 10,
                                                   'store' : 11,
                                                   'bedroom' : 12,
                                                   'tallbuilding' : 13,
                                                   'highway' :14
                                               },
                                               subset='training')
      ~~~



      - valid image gen

      ~~~python
       valid_image_gen = train_datagen.flow_from_directory('train',
                                               target_size=target_size,
                                               batch_size=batch_size,
                                               class_mode='categorical',
                                               classes={ 
                                                   'kitchen' : 0,
                                                   'street' : 1,
                                                   'industrial' : 2,
                                                   'insidecity' : 3,
                                                   'forest' : 4,
                                                   'livingroom' : 5,
                                                   'opencountry' : 6,
                                                   'PARoffice' : 7,
                                                   'mountain' : 8,
                                                   'CALsuburb' : 9,
                                                   'coast' : 10,
                                                   'store' : 11,
                                                   'bedroom' : 12,
                                                   'tallbuilding' : 13,
                                                   'highway' :14
                                               },
                                               subset='validation')
      ~~~


6. Complie Train 一發!

   - Compile

   ~~~python
   model.compile(loss='categorical_crossentropy',
                 optimizer='RMSprop',
                 metrics=['accuracy'])
   ~~~

   - callBack

   ~~~python
   from keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
   import os
   
   checkpoint = ModelCheckpoint('kaggle-image-classification.hdf5', monitor='val_acc', save_best_only=True, mode='auto', verbose=1)
   earlystop = EarlyStopping(monitor='val_acc', mode='min', patience=20, verbose=1)
   reduce_lr = ReduceLROnPlateau(monitor='val_acc', factor=0.2,patience=5, min_lr=0.001)
   ~~~


   - Train

   ~~~python
   model_history = model.fit_generator(train_image_gen,
                                 epochs=40,
                                 steps_per_epoch=(train_image_gen.samples//batch_size),
                                 validation_data=valid_image_gen,
                                 validation_steps=(valid_image_gen.samples//batch_size),
                                 callbacks=[
                                     checkpoint,
                                     earlystop,
                                     reduce_lr
                                 ])
   ~~~


7. Test, Predict

   - Load hdf5

   ~~~python
   from keras.models import load_model
   hdf5_model = load_model('kaggle-image-classification.hdf5')
   ~~~

   - Load Test Data

   ~~~python
   import os
   from keras.preprocessing import image as k_image
   import re
   import numpy as np
   
   r_image = re.compile(r'.*\.(jpg|png|gif)$')
   test_image = []
   test_image_id = []
   for file in os.listdir('./testset/'):
           img = k_image.load_img(os.path.join('./testset/{}'.format(file)), target_size=target_size)
           img = k_image.img_to_array(img)
           test_image.append(img)
           test_image_id.append(file.split('.')[0])
   ~~~

   - image preprocessing

   ~~~python
   test_train = np.array(test_image)
   test_train_id = np.array(test_image_id)
   test_train = test_train * 1./255
   ~~~

   - Predict

   ~~~python
   ans = hdf5_model.predict(test_train)
   result = np.argmax(ans,axis=1) # 因為用 Modle 建 model
   ~~~

   - CSV

   ~~~python
   result = result.reshape((-1, 1))
   test_train_id = test_train_id.reshape((-1, 1))

   import csv
   with open('result_transfer_learning.csv', 'a') as a_writer:
       for i in range(len(result)):
           result_r = csv.writer(a_writer, lineterminator='\n')
           result_r.writerow([test_image_id[i], str(result[i]).lstrip('[').rstrip(']')])
   ~~~