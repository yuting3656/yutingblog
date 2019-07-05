---
layout: 'post'
title: 'Solving the Problem of Overfitting 2'
permalink: 'ml-coursera/week3/solving-the-problem-of-overfitting2'
tags: machine-learning
---

## [Cost Function](https://www.coursera.org/learn/machine-learning/lecture/B1MnL/cost-function){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/1tJlY/cost-function){:target="_back"}


__Regularization:__

- Small values for parameters θ0, θ1, ..., θn
   - "Simpler" hypothesis
   - Less prone to overfitting

- Regularization:
   
   ~~~
   J(θ) = 1 / 2m * [ Σ ( hθ * (x^(i)) - y^(i) )^2 + λ Σ θj^2 ]
   ~~~

> 有趣的來了，如果 λ 給超級大，會怎麼樣?

- GG拉! 會 **underfit !!** 

![Imgur](https://i.imgur.com/YBY0Np8.jpg)