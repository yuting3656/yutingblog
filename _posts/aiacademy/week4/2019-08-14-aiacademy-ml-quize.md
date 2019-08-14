---
layout: 'post'
title: 'aiacademy: 機器學習 考試講解'
permalink: 'aiacademy/week4/ml-quiz'
tags: aiacademy machine-learning
---

### 1. KNN 選擇 K 值越小，最有可能出現以下哪種情況 

-  training error 越小，validation error 越大 


### 2. 選出所有用來衡量分類問題的指標 

- accuracy
- f1-score
- recall
- AUC
   - 好 [棒棒網站，介紹AUC-ROC](https://towardsdatascience.com/understanding-auc-roc-curve-68b2303cc9c5){"target="_back"}


### 3. 分類模型預測出來的機率，調高閾值(threshold)對於正樣本分類最有可能出現以下 哪種結果?

- recall 下降，precision 上升 

~~~
precision =   TP / TP + FP 
recall = TP / TP + FN
~~~

### 4. f1-score 是同時考慮哪兩個指標的調和平均?

-  precision and recall 

~~~
f1-score = 2 * PR/ P + R
~~~

### 5. ROC curve 的 X 軸與 Y 軸指標以下何者正確

- X 軸 FPR，Y 軸 TPR


### 6. 以下哪些問題是回歸(Regression problem)問題 

- 預測明天股票價格
- 預測花瓣的長度

### 7. 以下關於 Lasso 與 Ridge 敘述何者正確? 

-  Lasso 會有較多係數(coefficients)為 0 
> LASSO

<iframe width="560" height="315" src="https://www.youtube.com/embed/NGf0voTMlcs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 8. SVM 的參數 C(cost) 代表的意義

- 對錯誤的容忍度，越高代表容忍度越低 


### 9. overfitting 代表下列何者? 

- model 對 training data 預測誤差較小，但對 test data 的預測誤差較大


### 10. Which of the following algorithm doesn’t uses learning Rate as of one of its hyperparameter? 

- Decision tree 
- Random Forest 

