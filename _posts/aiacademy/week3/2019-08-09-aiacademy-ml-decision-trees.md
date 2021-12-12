---
layout: "single"
title: 'aiacademy: 機器學習 Decision Trees '
permalink: 'aiacademy/week3/decicion-trees'
tags: aiacademy machine-learning decision-trees
---

- Decision Trees: Introduction

<iframe src="https://www.youtube.com/embed/8MR5sRyd6zQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> 要如何訓練出一棵樹？

<iframe src="https://www.youtube.com/embed/w_zsmInRBlw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Goodness function
   - Used to select the attribute to be aplit at a tree node during the tree generation phase

- Different algorithms may use different goodness functions:

   - Information gain (used in ID3)

   - Gain ratio (used in C4.5)

   - Gini index (used in CART)


- Expected Infor maiton (Entropy)

>　Entropy: 亂度的指標 

![Imgur](https://i.imgur.com/yCpdM55.gif)

__Information gain__

![Imgur](https://i.imgur.com/RbQFn3w.gif)

### Gain ratio

> gain ratio 可想成做過　normalization 的 information gain

<iframe src="https://www.youtube.com/embed/0UoPqSbmfdk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Gini index

<iframe src="https://www.youtube.com/embed/EsIgKzqRi2A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Decision Trees Overfitting

<iframe src="https://www.youtube.com/embed/weCaluXsBVo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/u9lKN2X.gif)

### misc

<iframe src="https://www.youtube.com/embed/qICHitE2Dks" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

__Quiz__

- If all features are numerical, which of the following classifier requires more time in the prediction phase? KNN, logistic regression, or decision tree classifier

<br/>
- 解釋：
     <br/>
     __KNN__ 在預測的時候要看過所有資料，所以需要比較久的時間 
     <br/>
     __logistic regrssion__ 只要把trianing set 看過一次，如果data量不多的話，logistic regression 是不錯快的
     <br/>
     __Decision tree__ 可能比logistic regression 略慢一些，因為在每一個node狀態下，同一種feature 有機會會被問多次！



 