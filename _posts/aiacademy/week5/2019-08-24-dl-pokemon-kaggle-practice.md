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


### 跑出這張真的感動!!!

- 只有在大神教課的時候看到，真的自己跑出來的時候 __超級開心~~__:heart::heart::heart:，雖然是 overfitting XDD 但真的港決慢慢上軌道了! 哈哈 好險 前面近兩個月我有堅持住!!! GOGOG!! 繼續加油! :)

   - feature engineering 超級重要!!
   - 我是認真做 feature engineering 後，訓練才大大進步的兒
   - Gradient Descent in practice I - Feature: [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week2/multivariate-linear-regression){:target="_back"}

- 怎麼解!? 看 [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week6/bias-vs-variance){:target="_back"}

![Imgur](https://i.imgur.com/BQfoT2u.jpg)

