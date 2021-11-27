---
layout: "single"
title: 'aiacademy: 深度學習 Computer Vision and Convolutional Neural Networks'
permalink: 'aiacademy/week6/deep-learning-cv-and-cnn'
tags: aiacademy cnn 
---


### cv introduction

- 之前　[Udemy](https://www.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning){:target="_back"} 認真的筆記：）

![Imgur](https://i.imgur.com/oXwz6vX.jpg)

<iframe src="https://www.youtube.com/embed/8_BMVCgamZc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### kernel/filter

<iframe src="https://www.youtube.com/embed/Ie4xZsFpOr0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### kernel/filter:examples

- Shift, Blur, Sharpening, Gaussian Filter, ... etc.

<iframe src="https://www.youtube.com/embed/qinJWO0GbOM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/ZxByWIc.jpg)


### Convolutional Neural Network for Computer Vision Applicaions

> 說到介紹　cnn 還是要再一次好好的介紹　[CS231](https://www.youtube.com/watch?v=vT1JzLTH4G4&list=PLC1qU-LWwrF64f4QKQT-Vg5Wr4qEE1Zxk){:target="_back"}

<iframe  src="https://www.youtube.com/embed/bQa-m1PJtJM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Topics 
   1. CV: object recongnition<br/>
      ML: multiple kernel learning

   2. CV: image segementation<br/>
      ML: graphical model

   3. CV: face detection<br/>
      ML: multi-task boosting

      ![Imgur](https://i.imgur.com/Z5R0Zbt.jpg)

   4. CV: action recognition<br/>
      ML: low-rank reconstruction

   5. CV: multi-view people counting<br/>
      ML: transfer learning

   6. CV: image matching<br/>
      ML: energy minimization

      ![Imgur](https://i.imgur.com/8k3InZ4.jpg)

   7. CV: fine-grained object recognition
      ML: CNNs with co-occurrence layer

   8. CV: patch descriptor learning
      ML: CNNs with adaptive learning rate

   9. CV: gesture recognition
      ML: DNNs with adaptive hidden layer

      ![Imgur](https://i.imgur.com/3kHmLWi.jpg)

   10. CV: face age estimation
       ML: CNNs for hierarchical regression

   11. CV: image co-segmentation
       ML: Unsupervised CNNs

      ![Imgur](https://i.imgur.com/lgkNdGx.jpg)




### Conventional approach vs. Deep Learning


<iframe src="https://www.youtube.com/embed/OSpqTRgk2x8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


#### Conventional approach to object recognition

   - Training phase
   
      - image collection 
      - feature extraction
      - classifier training 
      - `trained classifier`

   - Training phase
   
      - test image 
      - feature extraction
      - `trained classifier` 
      - prediction

![Imgur](https://i.imgur.com/7bP8WrS.jpg)


#### Features are the keys

> 抓特徵！！！

   - off-the-shelf visual features
   
      - SIFT 
      - HoG
      - Constellation model
      - DPM

![Imgur](https://i.imgur.com/RY5BQhB.jpg)


   - Features are the keys to recent progress in classification
   - Are handcrafted features optimal ?
   - The optimal features for classification in general vary from task to task, even from category to category

![Imgur](https://i.imgur.com/lVtx9nn.jpg)


#### Conventional approaches vs. Deep Learning

![Imgur](https://i.imgur.com/vUZgOpa.jpg)


#### Deep Learning = Learning hierarchical representations

![Imgur](https://i.imgur.com/2hKTIbe.jpg)


### Neural Network

<iframe src="https://www.youtube.com/embed/wuCJ5EuGYt8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


#### Neural nerworks and neurons

![Imgur](https://i.imgur.com/bSpFxWr.jpg)

#### A sigle neuron

> 這邊可複習　cs231

- CS231: Lecture 4

<iframe src="https://www.youtube.com/embed/d14TUNcbn1k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- CS231: Lecture 5

<iframe src="https://www.youtube.com/embed/bNb2fEVKeEo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/3rbarzR.jpg)
![Imgur](https://i.imgur.com/9YnCOHz.jpg)


#### What is deep neural networks (DNN)

![Imgur](https://i.imgur.com/KcBTwgu.jpg)


### CNN Intro


<iframe src="https://www.youtube.com/embed/6IZ6oul_HYI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- imagenet

![Imgur](https://i.imgur.com/qsL8oNl.jpg)


- Deep Neural Networks

![Imgur](https://i.imgur.com/oXgjgJ1.jpg)

![Imgur](https://i.imgur.com/P3QhgE8.jpg)

- Ordinary Feedforward DNN with Image

![Imgur](https://i.imgur.com/yvcvoN7.jpg)


- Characteristics of Image

![Imgur](https://i.imgur.com/ghaBoEK.jpg)

- CNN Structure

![Imgur](https://i.imgur.com/IOGukTd.jpg)


### Convolutional neural networks

<iframe src="https://www.youtube.com/embed/geAoPhbHwo0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/CtOn3He.jpg)

- Reduce # of parameters

   - local connectivity
   
      ![Imgur](https://i.imgur.com/Tr7bsxA.jpg)
   
   - weight sharing
   
      ![Imgur](https://i.imgur.com/qGBcpJ9.jpg)

- Increate # of parameters

   - CNN with multiple input channels

      ![Imgur](https://i.imgur.com/aMX4Uzz.jpg)

   - CNN with multople output maps

      ![Imgur](https://i.imgur.com/2XdyD2P.jpg)


#### Putting them together

![Imgur](https://i.imgur.com/sEqgAga.jpg)

#### Convolutional Neural Networks

- input image 
- Convolution (Learned)
- Non-linearity
- Spatial pooling
- Normalization
- Feature maps



   - Convolution(Learned)

      ![Imgur](https://i.imgur.com/P5OdPev.jpg)

   - Non-Linearity

      ![Imgur](https://i.imgur.com/Yx4g14g.jpg)

   - Spatial pooling

      ![Imgur](https://i.imgur.com/b5N5wyK.jpg)

   - Normalization
     
      ![Imgur](https://i.imgur.com/TpwMsNY.jpg)


#### AlexNet (代表性！！)

![Imgur](https://i.imgur.com/cIxR409.jpg)


#### Object Recognition (2012 ~ 2014)

![Imgur](https://i.imgur.com/RahZ98q.jpg)





