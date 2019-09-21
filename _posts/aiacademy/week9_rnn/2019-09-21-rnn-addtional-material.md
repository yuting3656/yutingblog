---
layout: 'post'
title: 'aiacademy: 深度學習 RNN 補充資料 & seq2seq'
permalink: 'aiacademy/week9/rnn-additional-materials'
tags: aiacademy rnn
---

## Encoder-Decoder 架構

<iframe width="560" height="315" src="https://www.youtube.com/embed/4PwCkoW4M_k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

|![Imgur](https://i.imgur.com/4pTYes3.gif)|![Imgur](https://i.imgur.com/eYtIx3l.gif)|
|![Imgur](https://i.imgur.com/aP7l9um.gif)|![Imgur](https://i.imgur.com/zogOE34.gif)|

## seq2seq

<iframe src="https://www.youtube.com/embed/GsQc_5QXBM0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

|![Imgur](https://i.imgur.com/alu5ybr.gif)|![Imgur](https://i.imgur.com/rU07wP5.gif)|
|![Imgur](https://i.imgur.com/0j1FUzd.gif)|![Imgur](https://i.imgur.com/RfdueVk.gif)|
|![Imgur](https://i.imgur.com/rdl0NXj.gif)|![Imgur](https://i.imgur.com/jIS4QHu.gif)|
|![Imgur](https://i.imgur.com/aYrYU7g.gif)|![Imgur](https://i.imgur.com/JDT7XdW.gif)|


__seq2seq in tensorflow__

- tf.contrib.seq2seq
- 重要的API
   - TrainingeHelper
      - user target data as next decoder input
   - GreedyEmbeddingHelper
      - use argmax of the output to next decoder input
   - BasicDecoder 
      - 處理流程
   - dynamic_decode
      - 產生 output

|![Imgur](https://i.imgur.com/6Yj4uxh.gif)|
|![Imgur](https://i.imgur.com/HbjzdJr.gif)|

## seq2seq code 

<iframe src="https://www.youtube.com/embed/jO8FO5gXIas" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- 用udacity 的練習檔案
 
 - [udacity GitHub](https://github.com/udacity/deep-learning/blob/master/seq2seq/sequence_to_sequence_implementation.ipynb){:target="_back"}