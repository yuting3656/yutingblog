---
layout: 'post'
title: 'Solving the Problem of Overfitting'
permalink: 'ml-coursera/week3/solving-the-problem-of-overfitting'
tags: machine-learning
---

## [The Problem of Overfitting](https://www.coursera.org/learn/machine-learning/lecture/ACpTQ/the-problem-of-overfitting){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/VTe37/the-problem-of-overfitting){:target="_back"}


__Linear Regression/Logistic Regression:__

|   弱弱   |    剛好    |  吃太補  |
| underfit | just right | overfit |
| High bias |  just right | high variance  |


![overfit-chart][overfitting]

> *Overfitting:* If we have too many features, the learned hypothesis may fit the training ser very well, but fail to generalize to new examples.

__Addressing overfitting:__
1. Reduce number of features
   - Manually select which features to keep.
   - Model selection algorithm.
2. Regularization
   - Keep all the features, but reduce magnitude/ value of parameters θj.
   - Works well when we have a lot of features, each of which contributes a bit to predicting y.

   
    
[overfitting]: https://i.imgur.com/fMTYhcE.jpg