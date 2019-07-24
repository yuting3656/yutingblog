---
layout: 'post'
title: 'evaluating a learning algrithm 2'
permalink: 'ml-coursera/week6/evaluating-a-learning-algrithm2'
tags: machine-learning 
---

## [Learning Curves](https://www.coursera.org/learn/machine-learning/lecture/Kont7/learning-curves){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/79woL/learning-curves){:target="_back"}

### Learning Curves
- 當訓練集增加，error也增加
- error 會趨於穩定，當訓練集多過一定量
![Imgur](https://i.imgur.com/YeXNsZO.gif)

<br/>
<br/>


### High Bias
- 如果 learning algorithm 是在 high bias 的狀態，__增加多的 training data 不會有影響。__
![Imgur](https://i.imgur.com/3OZl1t3.gif)

- ![Imgur](https://i.imgur.com/v2gLE8w.gif)

<br/>
<br/>

### High Variance
-如果 learning algorithm 是在 high variance 的狀態，__增加多的 training data 可能會有幫助唷。__
![Imgur](https://i.imgur.com/w3fsOg1.gif)

- ![Imgur](https://i.imgur.com/X5G33Rd.gif)


## [Deciding Waht to Do Next Revisited](https://www.coursera.org/learn/machine-learning/lecture/zJTzp/deciding-what-to-do-next-revisited){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/llc5g/deciding-what-to-do-next-revisited){:target="_back"}

- Our decision process can be broken down as follows:
   - __Getting more training examples__: Fixes high variance
   - __Trying smaller sets of features__: Fixes high variance
   - __Adding features__: Fixes high bias
   - __Adding polynomial features__: Fixes high bias
   - __Decreasing λ__: Fixes high bias
   - __Increasing λ__: Fixes high variance

### Diagnosting Neural Networks
- A neural network with fewer parameters is **prone to underfitting**. It is also **computationally cheaper**.
- A large neural network with more parameters is **prone to overfitting**. It is also **computationally expensive**. In this case you can use regularization(increaseλ) to address the overfitting.

> 用一層 (a single hidden layer) 是很棒棒的 default 開始.

### Model Complexity Effects:

- Lower-order polynomials (low model complexity) have high bias and low variance. In this case, the model fits poorly consistently.

- Higher-order polynomials (high model complexity) fit the training data extremely well and the test data extremely poorly. These have low bias on the training data, but very high variance.

- In reality, we would want to choose a model somewhere in between, that can generalize well but also fits the data reasonably well.