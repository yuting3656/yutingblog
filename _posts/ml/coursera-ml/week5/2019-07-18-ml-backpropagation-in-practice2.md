---
layout: 'post'
title: 'Backpropagation in Practice 2'
permalink: 'ml-coursera/week5/backpropagation-in-practice2'
tags: coursera-machine-learning neural-networks
---

> Blog 滿月~　滿月~ 滿月~

## [Putting it Together](https://www.coursera.org/learn/machine-learning/lecture/Wh6s3/putting-it-together){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/Uskwd/putting-it-together){:target="_back"}

- First, pick a network architecture; choose the layout of your neural network, including how many hidden units in each layer and how many layers in total you want to have.
   - Number of input units = dimension of features x^(i)
   - Number of output units = number of classes
   - Number of hidden units per layer = usually more the better (must balance with cost of computation as it increases with more hidden units)
   - Defaults: 1 hidden layer. If you have more than 1 hidden layer, then it is recommended that you have the same number of units in every hidden layer.

### Training a Neural Network
   1. Randomly initialize the weights
   2. Implement forward propagation to get hΘ(x(i)) for any x^(i)
   3. Implement the cost function
   4. Implement backpropagation to compute partial derivatives
   5. Use gradient checking to confirm that your backpropagation works. Then disable gradient checking.
   6. Use gradient descent or a built-in optimization function to minimize the cost function with the weights in theta.

- When we perform forward and back propagation, we loop on every training example:

   ~~~
   for i = 1:m,
   Perform forward propagation and backpropagation using example (x(i),y(i))
   (Get activations a(l) and delta terms d(l) for l = 2,...,L
   ~~~

> [棒棒複習網站](https://www.cnblogs.com/wft1990/p/4448518.html){:target="_back"}
