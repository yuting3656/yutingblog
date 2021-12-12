---
layout: "single"
title: 'aiacademy: 機器學習 K-nearest neighbors (knn) & 實作:ch03'
permalink: 'aiacademy/week3/K-nearest-neighbors'
tags: aiacademy machine-learning knn
---

### K-nearest neighbors


<iframe src="https://www.youtube.com/embed/0RIJUK0il2I" fra
meborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- K-nearest neighbors
   - K 很大 容易 underfit
   - k 很小 容易 overfit

- feature normalization [我的筆記](https://yuting3656.github.io/yutingblog/ml-coursera/week2/multivariate-linear-regression){:target="_back"}
   - Scale to [0, 1]
   - Scale tp [-1, 1]
   - Normalized to N(0, 1)

- KNN 優缺點
   - 優點:
      - 訓練速度快
      - 不用對模型進行泛化
      - 也可以做regression

   - 缺點
      - 預測時速度慢，且佔用很大的 記憶體空間 
      - 需要對feature normalize 
      - 不適合用在高維度資料

[Github-Ipyb](https://github.com/yuting3656/aiacademy/tree/master/week2/machine-learning/Chapter3){:target="_back"}






