---
layout: "single"
title: 'Bias VS. Variance'
permalink: 'ml-coursera/week6/bias-vs-variance'
tags: coursera-machine-learning
---

## [Diagnosing Bias vs. Variance](https://www.coursera.org/learn/machine-learning/lecture/yCAup/diagnosing-bias-vs-variance){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/81vp0/diagnosing-bias-vs-variance){:target="_back"}

__Degress of the polynomial d / underfitting or overfitting of hypothesis__

   
   - **bias** or **variance** is the problem contributing to bad predictions
   - High bias is underfitting
   - High variance is overfitting

   ![Imgur](https://i.imgur.com/OmrKvp5.gif)
__Summary:__

![Imgur](https://i.imgur.com/giDkd2t.gif)

## [Regularization and Bias/Variance](https://www.coursera.org/learn/machine-learning/lecture/4VDlf/regularization-and-bias-variance){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/JPJJj/regularization-and-bias-variance){:target="_back"}

![Imgur](https://i.imgur.com/G6LPK5f.gif)

### __J train,cv,test 都不加 regularization parameter__
![Imgur](https://i.imgur.com/SpGAdSh.gif)

- In the figure above, we see that as λ increases, our fit becomes more rigid. On the other hand, as λ approaches 0, we tend to over overfit the data. So how do we choose our parameter λ to get it 'just right' ? In order to choose the model and the regularization term λ, we need to:
   - Create a list of lambdas (i.e. λ∈{0,0.01,0.02,0.04,0.08,0.16,0.32,0.64,1.28,2.56,5.12,10.24});
   - Create a set of models with different degrees or any other variants.
   - Iterate through the λs and for each λ go through all the models to learn some Θ.
   - Compute the cross validation error using the learned Θ (computed with λ) on the JCV(Θ) without regularization or λ = 0.
   - Select the best combo that produces the lowest error on the cross validation set.
   - Using the best combo Θ and λ, apply it on Jtest(Θ) to see if it has a good generalization of the problem

### EX:
 
 ![Imgur](https://i.imgur.com/WYiJ838.gif) 

 - ans:

   ![Imgur](https://i.imgur.com/nZlfBjOh.gif)