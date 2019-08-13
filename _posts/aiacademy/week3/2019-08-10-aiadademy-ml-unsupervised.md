---
layout: 'post'
title: 'aiacademy: 機器學習 Unsupervised Learning'
permalink: 'aiacademy/week3/unsupervised-learning'
tags: aiacademy machine-learning unsupervised-learning dimensionality-reduction
---


### Unsupervised Learning

<iframe src="https://www.youtube.com/embed/K1nA0mzEnLw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Outline 

   - Unsupervised learning 
   - Dimension reduction
      
      - Principal component analysis (PCA)
      - T-Distributed Stochastic Neighbor Embedding (t-SNE)

   - Clustering 

      - K-means 
      - Hierarchical clustering



### Dimension Reduction

> 跟 Coursera 的 Data Compression 一樣

<iframe src="https://www.youtube.com/embed/eC5DzAzUbPQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Why dimension reduction ?

   - compress data preserve useful information
   - Data visulization


### Principlal Component analysis (PCA)

> 先作筆記，等看到　coursera 的時候再來複習！！！

<iframe src="https://www.youtube.com/embed/EkXPla7rweY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- PCA
   - 把高維度的點，投影到低維度上面，且希望在低維度空間中保有在高維度中的性質！

![Imgur](https://i.imgur.com/URFeYGy.gif)
 

![Imgur](https://i.imgur.com/DNGdHUO.gif)


__PCA in general__

  - Perform PCA by computing the eigenvectors of the k largest eigenvalues of the covariance matrix 

__PCA on MNIST__

 
 ![pca_mnist](https://zeta-learn.com/_images/mnist_pca.png)

### T-SNE (T-distributed Stochastic Neighbor Embedding)

 <iframe src="https://www.youtube.com/embed/IMqKFq7Yj3o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

 - Goal: find locations in low dimensions such that the distance between points are preserved

 - T-SNE allows __non-linear transforms__ from the original data point to the new data point 


__T-SNE__

 ![Imgur](https://i.imgur.com/nmkWvDv.gif)


__Why different silmilarity measures?__

   - Crowding problem: distance between distant data points in the low dimension will not be large enough by SNE, which uses the same similarity measure for both low and high dimensional space


![Imgur](https://i.imgur.com/UmK2ix5.gif)


__T-SNE on MNIST__

![tsn-onmnist](https://miro.medium.com/max/875/1*o6oyu2S9DP1VpjyK1LUDtA.png)


__Summary__

 - Both PCA and t-SNE project data points into low dimension
    
    - PCA allows only linear projection
    - T-SNE allows non-linear projection
    
 - Adv of PCA
    
    - Interpretability
    - Can project new data points
    
 - Adv of t-SNE
 
    - Visualization


### Clustering

<iframe src="https://www.youtube.com/embed/AiTbVJLEhCM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Hierarchical clustering

<iframe src="https://www.youtube.com/embed/siWSor6CfIs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Types of hierarchical clustering 

   - Agglomerative (bottom-up)
      - Start with each data point as a cluster
      - Merge two closest clusters until only one cluster left

   - Divisive (top-down)
      - Start with one cluster 
      - Each step split a cluster until each cluster contains one data point


__Agglomerateive example__

![Imgur](https://i.imgur.com/mfsB9hM.gif)

![Imgur](https://i.imgur.com/USs2ZrH.gif) 

__Different cluster result__

![Imgur](https://i.imgur.com/UhKE28p.gif)


__Summary__

- Clustering
   - k-means and hierachical clustering 
