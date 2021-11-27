---
layout: "single"
title: 'aiacademy: 深度學習 老師來拉!!!!'
permalink: 'aiacademy/week5/deep-learning-teacher-is-here'
tags: aiacademy deep-learning neural-networks
---


- 找到好的結構對到相對應的 data

- bias 為什麼通常給 0
   - 實測出來的!

- Deep Learning 中大概要幾層 Neural Nerwork
   - try and error
   - 做久了有自己的偏好 :)
   - 可以用: auto ml

- cnn convolution 可視為再做一種 feature engineering

- 非監督式學習: 
   - 找資料和資料的關西
   - 不用人工去 label

- sgd 下降時亂時的權重值會讓訓練時間變長?
   - 會! 有可能
   - 一開始找了一條很糟的路

- 要怎麼判斷 local or global min ?
   - 不確定!

- linear function:
   - 丟什麼數值，就回什麼答案

- activation function: sigmoid
   - 就要用 batch normalization!

- 在 custom 你的 loss function 時候:
   - 要確定 loss function 是全域可以微分的
   - `Relu 沒辦法!! 全域可微分`




### 實際案例:

- 資料科學與線上教育
   - coursera 
   - edx
   - NTUMOOC
   - 均一教育平台

- 建立適性測驗模型
   - 從練習題記錄建立使用者模型
      - 預測一個學生正確回答指定練習題的機率

   - ROC curve
      - 曲線越接近左上角，越來越棒棒棒

- Crowdsourcing 群眾外包
  - 無法自動化，需要人力判斷的工作
  - 可以切割、分散成獨立的細小工作
  - 量大、但是不需要特殊技能就能處理的工作

- 挖別人的　Domain knowledge!

- 一開始可用隨機森來側


- 簡單說明 CNN
   - 甚麼是　Convolution
   - 模糊、銳利、凸版

- Sobel Edge Detection
  - 學橫線
  - 學邊緣

- 資料不夠的時候怎麼半？

   - Data Augmentation

- Transfer Learning
   