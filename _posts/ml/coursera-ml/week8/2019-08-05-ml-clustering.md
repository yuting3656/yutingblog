---
layout: 'post'
title: 'Clustering'
permalink: 'ml-coursera/week8/clustering'
tags: coursera-machine-learning clustering k-means
---

### [Unsupervised learning introduction](https://www.coursera.org/learn/machine-learning/lecture/czmip/unsupervised-learning-introduction){:target="_back"}

![Imgur](https://i.imgur.com/BUXsDcM.gif)

- Which of the following statements are true? Check all that apply?

   - Clustering is an example of unsupervised learning.

   - In unsupervised learning, you are given an unlabeled dataset and are asked to find "structure" in the data.

   - In unsupervised learning, the training set is of the form {x^{(1)},x^{(2)}, ... ,x^{(m)}} without labels y^(i)


### [K-means algorithm](https://www.coursera.org/learn/machine-learning/lecture/93VPG/k-means-algorithm){:target="_back"}

__K-means algorithm__

- input:
   - K (number of clusters)
   - Training set {x^(1), x^(2), ... ,x^(m)}
   ~~~
   x^(i) ∊ R^n (drop x0=1 convention)
   ~~~

- Randomly initialize K cluster centroids μ1, μ2, ... , μk ∊ R^n
   ~~~
   Repeat {
      for i = 1 to m
         c^(i) := index (from 1 to k) of cluster centroid closest to x^(i)
      for k = 1 to k
         μk := average (mean) of points assigned to cluster k
   }
   ~~~

![Imgur](https://i.imgur.com/LLSoQdR.gif)

![Imgur](https://i.imgur.com/45rMkg6.gif)

__K-means for non-separated clusters__

![Imgur](https://i.imgur.com/JTvbhfh.gif)

