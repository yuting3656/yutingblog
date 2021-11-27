---
layout: "single"
title: 'Photo OCR (Optical Character Recognition)'
permalink: 'ml-coursera/week11/photo-ocr'
tags: coursera-machine-learning getting-more-data
---

### [Photo OCR: Problem Description and Pipeline](https://www.coursera.org/learn/machine-learning/lecture/iDBMm/problem-description-and-pipeline){:target="_back"}

- OCR: Optical Character Recognition


![Imgur](https://i.imgur.com/gryvYpv.jpg)

![Imgur](https://i.imgur.com/aUqbCfZ.jpg)

![Imgur](https://i.imgur.com/HHEzfcy.jpg)



### [OCR example: Sliding Windows](https://www.coursera.org/learn/machine-learning/lecture/bQhq3/sliding-windows){:target="_back"}

![Imgur](https://i.imgur.com/vzfgD1o.jpg)

![Imgur](https://i.imgur.com/oSS4dqW.jpg)

![Imgur](https://i.imgur.com/nmLNMRG.jpg)

![Imgur](https://i.imgur.com/0zoNzK4.jpg)

![Imgur](https://i.imgur.com/V5dQ3Pl.jpg)

![Imgur](https://i.imgur.com/owSQex4.jpg)

![Imgur](https://i.imgur.com/aUqbCfZ.jpg)


### [Artificial data synthesis](https://www.coursera.org/learn/machine-learning/lecture/K0XQT/getting-lots-of-data-and-artificial-data){:target="_back"}

![Imgur](https://i.imgur.com/QrkdNdz.jpg)

![Imgur](https://i.imgur.com/QCmMQFm.jpg)

![Imgur](https://i.imgur.com/JRYo3nl.jpg)

![Imgur](https://i.imgur.com/GKAfI3R.jpg)


#### Dissussion on getting more data

1. Make sure you have a low bias classifier before expending the effort. (Plot learnign curves) E.g. keep increasing the number of features/number or hidden units neural network until you have a low bias classifier.

2. "How much work would it be to get 10x as much data as we currently have?"

   - Artificial data synthesis
   - Collect / label it yourself
      
      ~~~python
      # 有時候就真的靜下好好 label 一番，
      # 仔細算也不過一兩天(幾小時)的事情，
      # 卻可以讓模型變成好棒棒的兒~ 
      #
      # ex: M = 1,000 筆數
      #     人工 label 一筆 10 秒
      #    總共花 1,000 * 10 秒
      ~~~

   - "Croed source" (E.g. Amazon Mechanical Turk)


### [Ceiling analysis: What part of the pipeline to work on next](https://www.coursera.org/learn/machine-learning/lecture/LrJbq/ceiling-analysis-what-part-of-the-pipeline-to-work-on-next){:target="_back"}

![Imgur](https://i.imgur.com/9pctQl6.jpg)

![Imgur](https://i.imgur.com/NZHdpsY.jpg)

![Imgur](https://i.imgur.com/JNCsZNO.jpg)

__Face Recognition Example__

![Imgur](https://i.imgur.com/xT97rnM.jpg)

![Imgur](https://i.imgur.com/h8jUTwR.jpg)

![Imgur](https://i.imgur.com/r6EW9F6.jpg)

### [Conclusion: Summary and Thank you](https://www.coursera.org/learn/machine-learning/lecture/eYaD4/summary-and-thank-you){:target="_back"}

> 我好棒棒阿!!!!!!!!!!!!  :heart:

#### Supervise Learning
   
   - Linear regression, logistic regression, neural networks, SVMs

#### Unsupervised Learning

   - K-means, PCA, Anomaly detection

#### Special applications/special topics

   - Recommender systems, large scale machine learning

#### Advice on building a machine learning system

   - Bias/variance, regularization; deciding what to work on next: evaluation of learning algorithms, learning curves, error analysis, ceiling analysis

  
