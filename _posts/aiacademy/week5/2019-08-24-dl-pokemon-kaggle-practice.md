---
layout: 'post'
title: 'aiacademy: 深度學習 神奇寶貝!!! pokemon-kaggle'
permalink: 'aiacademy/week5/deep-learning-neural-network-pokemon-kaggle'
tags: aiacademy tensorflow keras
---

> 超級好玩的兒~ AIA 在 [Kaggle 創建的 Pokemon 比賽](https://www.kaggle.com/c/aia-dnn-classification-pokemongo-tpe-5){:target="_back"}


### FEATURES 

> 超級重要!!!

- 資料欄位

   - appearedTimeOfDay - time of the day of a sighting (night, evening, afternoon, morning)
   
   - appearedHour/appearedMinute - local hour/minute of a sighting (numeric)
   
   - terrainType - terrain where pokemon appeared described with help of GLCF Modis Land Cover (numeric)
   
   - closeToWater - did pokemon appear close (100m or less) to water (Boolean, same source as above)
   
   - city - the city of a sighting (nominal)
   
   - continent (not always parsed right) - the continent of a sighting (nominal)
   
   - weather - weather type during a sighting (Foggy Clear, PartlyCloudy, MostlyCloudy, Overcast, *Rain, BreezyandOvercast, LightRain, Drizzle, BreezyandPartlyCloudy, HeavyRain, **    BreezyandMostlyCloudy, Breezy, Windy, WindyandFoggy, Humid, Dry, WindyandPartlyCloudy, DryandMostlyCloudy, DryandPartlyCloudy, DrizzleandBreezy, LightRainandBreezy,    HumidandPartlyCloudy, HumidandOvercast, RainandWindy)
   
   - temperature - temperature in celsius at the location of a sighting (numeric)
   
   - windSpeed - speed of the wind in km/h at the location of a sighting (numeric)
   
   - pressure - atmospheric pressure in bar at the location of a sighting (numeric)
   
   - weatherIcon - a compact representation of the weather at the location of a sighting (fog, clear-night, partly-cloudy-night, partly-cloudy-day, cloudy, clear-day, rain, wind)
   
   - population density - what is the population density per square km of a sighting (numeric, Source)
   
   - urban-rural - how urban is location where pokemon appeared (Boolean, built on Population density, =200 and =400 and 800 for urban)
   
   - gymDistanceKm, pokestopDistanceKm - how far is the nearest gym/pokestop in km from a sighting? (numeric, extracted from this dataset)
   
   - gymIn100m-pokestopIn5000m - is there a gym/pokestop in 100/200/etc meters? (Boolean)
   
   - cooc 1-cooc 151 - co-occurrence with any other pokemon (pokemon ids range between 1 and 151) within 100m distance and within the last 24 hours (Boolean) List of Pokémon by National Pokédex number

- 練習方向

   - Data preprocessing and feature engineering
   - DNN model construction and hyper-parameter tuning
   - Metrics: Accuracy

### 跑出這張真的感動!!!

- 只有在大神教課的時候看到，真的自己跑出來的時候 __超級開心~~__:heart::heart::heart:，雖然是 overfitting XDD 但真的港決慢慢上軌道了! 哈哈 好險 前面近兩個月我有堅持住!!! GOGOG!! 繼續加油! :)

   - feature engineering 超級重要!!
   - 我是認真做 feature engineering 後，訓練才大大進步的兒
   - Gradient Descent in practice I - Feature: [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week2/multivariate-linear-regression){:target="_back"}

- 怎麼解!? 看 [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week6/bias-vs-variance){:target="_back"}

![Imgur](https://i.imgur.com/BQfoT2u.jpg)


### Keras 跑 early stop & 存取檔案！

- 先做 callback funcs

   ~~~python
   import tensorflow as tf
   from tensorflow.keras.callbacks import EarlyStopping
   from tensorflow.keras.callbacks import ModelCheckpoint
   from tensorflow.keras.layers import Dense, Dropout
   
   # early stop
   es = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=200)
   
   # model checkpoint
   mc = ModelCheckpoint('best_model.h5', monitor='val_acc', mode='max', verbose=1, save_best_only=True)
   ~~~

- 在 fit 中放入　callback function

   ~~~python
   # 建模
   model = tf.keras.Sequential()
   model.add(Dense(50, activation='elu', input_shape=(225, ), ))
   model.add(Dropout(0.45))
   model.add(Dense(25, activation='elu', kernel_regularizer=regularizers.l2(0.02),))
   model.add(Dropout(0.45))
   model.add(Dense(12, activation='relu', kernel_regularizer=regularizers.l2(0.02)))
   model.add(Dense(6, activation='sigmoid'))
   
   # compile
   model.compile(loss='categorical_crossentropy',
                optimizer=tf.keras.optimizers.Adam(),
                metrics=['accuracy'])
   
   # fit
   model_history = model.fit(x=x_train_best, 
                             y=y_train_hot,
                             batch_size=80, 
                             epochs=1000,
                             validation_split= 0.08,
                             shuffle=True,
                             callbacks=[es, mc]
                             )
   ~~~


- 讀取

   ~~~python
   # load saved h5 model
   best_model = tf.keras.models.load_model('best_model.h5')
   y_predict = best_model.predict_classes(x_test_best)
   ~~~