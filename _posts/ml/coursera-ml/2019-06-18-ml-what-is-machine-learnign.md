---
layout: "single"
title: '機器學習 - introduction'
permalink: "ml-coursera/week1/introduction"
tags: coursera-machine-learning
---

### What is Machine Learning?

> 
 "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E." by **Tom Mitchell**

 

### 機器學習大致可分成
 
 >
   ![supervised/unsupervised learnign][ml-image]
  - [Supervised Learning](https://www.coursera.org/learn/machine-learning/lecture/1VkCb/supervised-learning){:target="_black"} : [article](https://www.coursera.org/learn/machine-learning/supplement/NKVJ0/supervised-learning){:target="_black"}
    - Regression Problems: Predict continuous valued output
    - Classification Problems: Discrete valued optput
  - [Unsupervised Learning](https://www.coursera.org/learn/machine-learning/lecture/olRZo/unsupervised-learning){:target="_black"} : [article](https://www.coursera.org/learn/machine-learning/supplement/1O0Bk/unsupervised-learning){:target="_back"}
    - Clustering Problems:
    > EX: Organize computing clusters、Social network analysis、Market segmentation、 Astronomical data analysis
    - [Cocktail party problem](https://www.youtube.com/watch?time_continue=3407&v=UzxYlbK2c7E){:target="_back"}:
    > Cocktail party problem algorithm:
    [`Octave`](https://www.gnu.org/software/octave/){:target="_back"}
    ```
    [W,s,v] = svd((repmat(sum(x.*x,1),size(x,1),1).*x)*x')
    ```






[ml-image]: https://qph.fs.quoracdn.net/main-qimg-c7e79d0a41977b0ad967d54c039851f4