---
layout: 'post'
title: 'aiacademy: 機器學習 logistci regression & 實作:ch04'
permalink: 'aiacademy/week3/K-nearest-neighbors'
tags: aiacademy machine-learning knn precision-recall-f1Score
---

<iframe src="https://www.youtube.com/embed/cZ-lAVT80KE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### logistic regression

![Imgur](https://i.imgur.com/PBcStCU.gif)

![Imgur](https://i.imgur.com/dcWfKCB.gif)


### gradient ascent

> 和大神教的有點不一樣　ＬＯＬ...

<iframe src="https://www.youtube.com/embed/RHX62jeV5jg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/ErGFgUz.gif)

![Imgur](https://i.imgur.com/kgjiVon.gif)

> 靠一樣！只是 __負號__  提出來
 - [我的筆記](https://yuting3656.github.io/yutingblog/ml-coursera/week3/logistic-regression-model){:target="_back"}
> 
> ![Imgur](https://i.imgur.com/6YKY0OC.gif)

- Similarly, we can apply gradient descent, stochastic gradient descent, and mini-batch gradient descent to solve logistic regression

__Multi-calss logistic regression__

> 這邊介紹到 softmax function
<br/>
> 就要看[這篇](http://dataaspirant.com/2017/03/07/difference-between-softmax-function-and-sigmoid-function/){:target="_back"}

![Imgur](https://i.imgur.com/cWZxlJA.gif)


### Q & A

- Quize:

   - What is logistic regression? 
   
   - Why do we usually maximize log-likelihood function (instead of likelihood function)? 
   
   - What is the cross entropy loss (for logistic regression)

- Answer:

  <iframe src="https://www.youtube.com/embed/fTl78CHMWWI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



### Evaluation (classification)

> 看看 Coursera [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week6/handling-skewed-data){:target="_back"}

<iframe src="https://www.youtube.com/embed/ITX-NsE01Aw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Classification metrics
   - Accuracy
   - Precision
   - Recall
   - F1 score
   - Precision recall curve
   - ROC curve and AUC (Area Under Curve)

__Accuracy__

![Imgur](https://i.imgur.com/BCEAaRo.gif)

__Confusino matrix__

![Imgur](https://i.imgur.com/wuqOEZt.gif)

__Precision__

![Imgur](https://i.imgur.com/QiVPwKL.gif)

__Recall__

![Imgur](https://i.imgur.com/E27PL8w.gif)

__Precision and recall tradeoff__

- if we want a very high precision
   - return only the most confident positive instances

- if we wnat a very high recall
   - return all the instance 

- the two metrics are ususally a tradeoff

__F1 Score__

![Imgur](https://i.imgur.com/SM4uW1f.gif)

__ROC Curve__

![Imgur](https://i.imgur.com/X2k4OEy.gif)

- Precisions, recalls (TPRs), and FPRs of different thresholds

![Imgur](https://i.imgur.com/9go69Bi.gif)

- ROC Curve

![Imgur](https://i.imgur.com/EmhCh8N.gif)