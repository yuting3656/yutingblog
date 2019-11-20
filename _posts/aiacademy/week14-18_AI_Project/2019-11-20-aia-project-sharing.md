---
layout: 'post'
title: 'aiacademy: 期末專題分享'
permalink: 'aiacademy/week14-18/aia-project-sharing'
tags: aiacademy ai-project
---

> 多聽多看多長智慧～

## Group-17: NewsLeopard 電子豹

- 電子郵件開信預測

   - 平均開信%: 15%

   - 降低開信negative 感覺

- 中文 NLP
   - 切字
   - 結疤doc2tVec: 整段話轉成向量


- prediction 

   - 以`人`為 unit

      - 當模型預測
      - skewed data: 收信超過100封　只佔1%
      - domain: 
         - gamil
         - yahoo
      
- Result

  - 調　threshold 到　0.99 比較具有商業價值
  - 可以降低寄信頻率　減少支出


## Group 18: 生命徵象異常測量值警示 1

- 看電影搂～

   - 長情的告白

- 生命徵象

   - 血壓
   - 血氧
   - 等...

- 資料平衡技巧
   - SMOTE
   - BalancedRandomForest
   - ADASYN
   - SMOTEENN
   - SMOTETomek


## Group 19: 生命徵象異常測量值警示 2

> 這是高手高手高高手！！！

- 標記

   - 使用護理紀錄: 找出有標註的護理紀錄
   - 著名紀錄

- 生命現象
   
   - 高度相關
      - BMI
      - Age 

   
- 9 種慢性疾病
- 也加入時間軸的

- Model

  - Random Forest
  - XGBoost
  - LightGbm
  - LightGbm
  - Hard Voting
  - Soft Voting

- 學理的判斷資訊

  - F1: 0.08, 
  - Recall: 0,71


- SHAP Value

   - [https://towardsdatascience.com/explain-your-model-with-the-shap-values-bc36aac4de3d](https://towardsdatascience.com/explain-your-model-with-the-shap-values-bc36aac4de3d){:target="_back"}



## Group 20 英文發音矯正系統

- Jella

- Object

   - 念錯字
   - 改進目標
   - 透過 AI 來判斷哪種發音是異常，現階段幾乎都是人工閱聽
   - 工具先預先判斷異常的發音

- Speech Recognition, Speech To Text, Speaker Recognition

- 單音糾正
   - HMM, GMM

- Data Preparation:

   - 聲音: 波型

      - STFT 

## Group 21 智慧健身教練

- 深蹲

- open-pose
   
   - 取得人體節點
   - [https://github.com/CMU-Perceptual-Computing-Lab/openpose](https://github.com/CMU-Perceptual-Computing-Lab/openpose){:target="_backs"}

- 光流

- 3d-cnn

- time-distributed

  -  [https://medium.com/smileinnovation/how-to-work-with-time-distributed-data-in-a-neural-network-b8b39aa4ce00](https://medium.com/smileinnovation/how-to-work-with-time-distributed-data-in-a-neural-network-b8b39aa4ce00){:target="_back"}


## Group 22 預測美元漲跌走勢及其價格區間

> KPMG, 國泰

- Prediction intervals of us dollar index

- AI Investment Platform
  - ML/DL: Predcitve Models
  - Open Financial Data

- Currentes, Stock, Bonds
- Model Center
   - NN /DNN
   - CNN
   - ML

- POC Stage

   - US Dollar Index 
   - 美元指數
     - EUR, JPY, GBP, CHF, CAD and SEK

- Mission

   - formulate price intervals output
   
- 選擇區間 unit 

 - daily
 - weekly

- Learning Rate Scheduler

   - [https://towardsdatascience.com/learning-rate-scheduler-d8a55747dd90]{:target="_back"}


## Group 23 音樂曲風辨識 

> 超棒～～～～～～～

- 辨識曲風

   - jazz, classical, hip-hpop, rock, and blue

- Data GTZAN

   - [http://marsyas.info/downloads/datasets.html](http://marsyas.info/downloads/datasets.html){:target="_back"}


- EDA

  - 每首歌切3s 

  - 3s music 轉 stft
  - mei filter bank
  - melspectrum

- Melspectrum

   - 各種曲風看出來的都會有自己的特色

- Model

   - CNN
   - Xception 
   - VGG16
      - VGG16 最棒棒

- 音色轉換

   - 鋼琴　-> 吉他


- 不同樂器的泛音

   - 都不一樣

- piano & guitar

   - guitar 高頻衰減比較少
      - guitar 會影響其他弦
   - piano 高頻衰減高

- HPSS
- tfrecod 可存音樂！！！　很快！！

- CycleGAN
- CQT 轉換
- unet ++


## Goup 24 新聞推薦系統

- Collaborative Filtering

   - collaborative filtering is said to memory based
   - user based
   - item based 


- Content based

 - TF IDF


- Data Preprocessing

- user-based vs. item-based recommendation
  

- Similarity
   - Pearson Correlation
   - Mean Squared Distance

- N-Neighbors User Based Collaborative Filtering Algorithm

- hitratio & ndcg

   - [https://zhuanlan.zhihu.com/p/38875570](https://zhuanlan.zhihu.com/p/38875570){:target="_back"}


## Group 25 手勢辨識與指尖追蹤 1


- EDA

- GANerated Hands / Rendered Handpose Dataset

   - GANerated Hands
      - [https://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/](https://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/){:target="_back"}

    
   - Rendered Hand pose Dataset
      - [https://lmb.informatik.uni-freiburg.de/resources/datasets/RenderedHandposeDataset.en.html](https://lmb.informatik.uni-freiburg.de/resources/datasets/RenderedHandposeDataset.en.html){:target="_back"}



## Group 26 手勢辨識與指尖追蹤 2

- moel

   - RegNet
      - Different loss weight for 2D and 3D

- GeoConGan

- video Demo 

   - 用手控制音樂撥放
   - 玩俄羅斯方塊
