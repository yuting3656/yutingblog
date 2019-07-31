---
layout: 'post'
title: 'Solving the Problem of Overfitting 2'
permalink: 'ml-coursera/week3/solving-the-problem-of-overfitting2'
tags: coursera-machine-learning
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

## [Regularized Linear Regression](https://www.coursera.org/learn/machine-learning/lecture/QrMXd/regularized-linear-regression){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/pKAsc/regularized-linear-regression){:target="_back"}

__Regularized linear regression__

~~~
J(θ) = 1 / 2m * [ Σ ( hθ * (x^(i)) - y^(i) )^2 + λ Σ θj^2 ]

minJ(θ)
~~~

__Gradient Descent__

![Imgur](https://i.imgur.com/XTyObrK.gif)

__Normal Equation__
> 真懶惰! 直接貼大神的筆記 XDD
![Imgur](https://i.imgur.com/7uHZUd0.gif)

## [Regularized Logistic Regression](https://www.coursera.org/learn/machine-learning/lecture/4BHEy/regularized-logistic-regression){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/v51eg/regularized-logistic-regression){:target="_back"}

> 寫筆記的時候突然忘記 logistic regression 的 cost function 怎麼來的 XD <br/>
  速度看自己整理的筆記 + 大神的影片，很快地補腦回來! 哈哈哈 不錯! :smile: <br/>
  這就是我寫這筆記的初衷!!! ~~發大財~~ __自己的知識寶庫 :)__

![Imgur](https://i.imgur.com/tNT2GZ5.jpg?1)

- Gradient descent 
![Imgur](https://i.imgur.com/rPvntlf.gif)


__Advanced optimization:__

![Imgur](https://i.imgur.com/scAVWtt.gif)