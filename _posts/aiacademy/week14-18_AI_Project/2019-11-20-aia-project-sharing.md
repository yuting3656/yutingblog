---
layout: "single"
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


## Group 23 音樂曲風辨識 1

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


## Goup 24 新聞推薦系統 1

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


## Group 27 新聞推薦系統 2

- non-negative matrix factorization

## Group 28 音樂曲風辨識 2

- ai-音樂玩家

> 品味美、創造美

- Preprocess

   - music segementation: 8 s.


- 兩組都用　Melspectrum 

   - resullt & discussion
      - 把　pop and rock 拿掉 
       - 0.67 ---> 0.87

   - normalization 

      - min & max

- 創造美!

   - Genere Transfer 

   - Change Pich 
      - WGAN-GP
      - CycleGAN 

   - Change Velocity
      - RNN

   - 把所有樂器都壓成鋼琴

   - 天空之城　轉 jazz


   - RNN Architecture

      - pitch change
      - cycleGAN 可做 ---> music generation

## Group 29 美國股債轉折點預測與投資組合交易回測 1

> 最棒棒！！！！

## Group 30 美國股債轉折點預測與投資組合交易回測 2

- TA-lib (open source lib)

- 1年(252交易日)

- FB Prophet (open source)


## Group 31 埋葬蟲移動軌跡偵測（Tracking）與行為偵測 (Action)

- 社會性生物追蹤 與互動行為預測

- 行為

   - attck 
   - chase
   - escape
   - Wrestle
   
- object detection
   - yolov3, M2Det
   - M2Det
      - CFENet 對小物體駔最佳化
      - 比 Faster-CNN, yolo 還棒棒!
- object tracking
   - Sort, NASNet,

- Performance

   - IOU 

- Improve recall
   
   - recall 高
      - 盡量框出埋葬蟲

- Object Classification

   - NASNet

- SORT + NASNet

- Behavior Prediction

   - detection + tracking + classification +　behavior prediction

## Group 32 新聞推薦系統 News Recommendation System

- Objective

   - news 2018/01 ~ 2018/12
       - 最高點擊
          - July 
          - 5 pm 

- Open Data + Sentiment Analytics + User Click Log + News Content

   - 112 features

- Model

   - Wide & Deep
      - [https://ai.googleblog.com/2016/06/wide-deep-learning-better-together-with.html](https://ai.googleblog.com/2016/06/wide-deep-learning-better-together-with.html){:target="_back"}
   - K-means
      - 人分群
      - group n 

   - FM
      - [https://towardsdatascience.com/thrive-and-blossom-in-the-mud-fm-model-for-recommendation-system-1-95707839e235](https://towardsdatascience.com/thrive-and-blossom-in-the-mud-fm-model-for-recommendation-system-1-95707839e235){:target="_back"}
      - 計算人與人之見的相近程度


---
---

## Microsoft Azure Machine Learning

- AI global trend
- Clud or not (security)
- MS AI solution 


#### Adopting Advanced Analytics and AI in your company

- Where do you see your company today ?


#### 2020 3.9T

 1. decision support 
 2. virutal agents
 3. smart products 
 4. workflow sutomation


#### Digital Transformation

- Engage your `customers`

- Epower your `employees`

- Optimize your `operations`

- Transform your `products`

#### Momentum

- `194 billion` / External Requesets made to Azure App Service

- `750 million` / Azure Active Directory users

- `340 billion` / Azure SQL query requests processed/day

- `188 billion` / Hits to websites run on Azure Web App Service


#### Cybersecurity Reference Architecture

![security](https://www.microsoft.com/security/blog/wp-content/uploads/2018/06/SRA-1024x569.png)


#### Azure Data Center

- Microsoft Cloud Infrastructure and Operations Security starts with physical data center

- Azure Compliance Engineering

   - Certification
      - ISO
      - SOC I
      - ...

#### Continuous Compliance approach

#### Projec tBrainwave

- field-programmable gate array (FPGA)


#### ONNX and Azure Machine Learning: Create and accelerate ML models

- [https://docs.microsoft.com/en-us/azure/machine-learning/service/concept-onnx](https://docs.microsoft.com/en-us/azure/machine-learning/service/concept-onnx){:target="_back"}


#### Azure Cognitive Services

- most comprehensive pre-trained AI
   - Decision
   - Speech 
   - Language 
   - vision
   - web search


#### IOT + Edge 

- Azure IoT Edge

- Coud GeteWay + Insights + Actions

#### DevOps

- k8s

#### GPU
- Broad Range of GPU Scenarios in Azure

   - Visualization 
   - Rendering 
   - HPC/Simulation
   - Deep-Learning/AI

#### Autonomous 

#### Azure Batch AI

#### Automated machine learning 

- automated ML

#### Power BI with AI

-[https://powerbi.microsoft.com/en-us/](https://powerbi.microsoft.com/en-us/){:target="_back"}


- 丟掉、丟掉、丟掉、把不賺錢的都丟掉

- cloud first & mobile first


#### 微軟小冰！

- [https://www.bnext.com.tw/article/49211/microsoft-xiaoice-chat-bot-phone-call-demo](https://www.bnext.com.tw/article/49211/microsoft-xiaoice-chat-bot-phone-call-demo){:target="_back"} 

#### Microsoft Azure Data Lake

- 在 lake 裡面放各種資料，不同格式不同類型的資料。



#### Lambda architecture

-[https://en.wikipedia.org/wiki/Lambda_architecture](https://en.wikipedia.org/wiki/Lambda_architecture){:target=:"_back"}


### Cortana


#### Power BI

- Power BI Desktop

- Power BI Free

- Power BI Pro

- Power BI Premium


#### SQL2016, 2019

   - +R
   - +python, +java

#### SQL Serve 


- rxDTree & plot(create TreeView());

