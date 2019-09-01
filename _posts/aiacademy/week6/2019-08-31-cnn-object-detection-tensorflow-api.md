---
layout: 'post'
title: 'aiacademy: 深度學習 CNN Object Recognition tensorflow api'
permalink: 'aiacademy/week6/deep-learning-cnn-object-detection-tensorflow-api'
tags: aiacademy cnn object-detection tensorflow
---


### Object Detection

[GitHub-tensorflow](https://github.com/tensorflow/models/tree/master/research/object_detection){:target="_back"}

> 要自己花時間，去把教學看完，裝到本機唷～～


<iframe src="https://www.youtube.com/embed/rxCKvAmu9cA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Object Detection 手把手教學

<iframe src="https://www.youtube.com/embed/gbemcbAzoxY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/uvLcbfr.jpg)

- Semantic Segmentation (對各個像素區塊進行分類)

- Classification + Localiztion (除了分類結果並給予目標定位)

- Object Detection (對於多目標進行分類並定位)

- Instance Segmentation (對多目標物件進行像素區塊分類)


#### 概念

![Imgur](https://i.imgur.com/t86gP5O.jpg)

### TensorFlow Object Detection API 手把手

[GitHub-tensorflow](https://github.com/tensorflow/models/tree/master/research/object_detection){:target="_back"}

> 要自己花時間，去把教學看完，裝到本機唷～～

主要的步驟其實不多，詳述如下：
1. 下載 dataset，包含圖片與 label (annotations) (由於希望能讓學員快速體驗，裡面已經有從資料集取出4張圖片，而後續步驟也只用4張圖片進行訓練，體驗完後，學員可以將完整個資料集進行下載，嘗試用大量的圖片資料又或者使用自己Label的圖片進行嘗試)
2. 將資料集的類別製作成txt格式，之後轉成 .pbtxt格式，方便Tensorflow使用
3. 將 label 與圖片轉檔成 tf_record 格式 (tensorflow 記錄檔案的格式，會把圖片跟標籤融合在一起)
4. 下載 pre-train 好的 model
   - [GitHub: Tensorflow detection model zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md#coco-trained-models-coco-models){:target="_back"}
5. 修改官方的 config 檔 (告訴程式碼資料放在哪裡、訓練的參數等細節都在這個 config 檔)
   - [GitHub: Tensorflow object detection configs](https://github.com/tensorflow/models/tree/master/research/object_detection/samples/configs){:target="_back"}
6. 硬 train 一發囉！！
7. 將訓練完畢的權重保存下來以供使用
8. 實際測試訓練效果

<iframe src="https://www.youtube.com/embed/GsU-amKeiZo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- 資料集

   - [PASCAL Visual Object Classes Challenge 2007](http://host.robots.ox.ac.uk/pascal/VOC/voc2007/index.html){:target="_blank"}
<br/>
- Tensorflow detection model zoo

   - [GitHub: Tensorflow detection model zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md#coco-trained-models-coco-models){:target="_back"}
<br/>
- Tensorflow object detection configs
  
   - [GitHub: Tensorflow object detection configs](https://github.com/tensorflow/models/tree/master/research/object_detection/samples/configs){:target="_back"}

#### YOLO

> 個人覺得不賴的影片～

<iframe src="https://www.youtube.com/embed/4eIBisqx9_g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



