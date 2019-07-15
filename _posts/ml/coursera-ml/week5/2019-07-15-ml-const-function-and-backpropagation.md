---
layout: 'post'
title: 'Cost Function and Backpropagation'
permalink: 'ml-coursera/week5/cost-function-and-backpropagation'
tags: machine-learning neural-networks backpropagation
---

## [Cost Function](https://www.coursera.org/learn/machine-learning/lecture/na28E/cost-function){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/afqGa/cost-function){:target="_back"}

### Neural Network (Classification)

**L, sl, K:**
   - L = total number of layers in the network
   - sl = number of units (not counting bias unit) in layer l
   - K = number of output units/classes

**EX:**
- L: 總共的 layer 數
   ~~~
   L = 4
   ~~~
- Sl: 每一 layer 上的  unit(Neuron) 數
   ~~~
   s1 = 3, s2 = 5, s4 = sL = 4
   ~~~

> ![Imgur](https://i.imgur.com/OxWLyBEh.jpg)


### Binbary classification & Multi-class classification (K classes)

| Binary classification  | Multi-class classification (K classes) |
|  y = 0 or 1 | y = ℝ^K  |
| 1 output unit | K output units |
| sL = 1 (K = 1)  |  sL = k (k ≥ 3)|

- 當 K 超過2種以上就要用 Multi-calss classification

![Imgur](https://i.imgur.com/K2yyX6Ah.jpg)

### Cost function

- Logistic regression:
   ![Imgur](https://i.imgur.com/ksMl0Chh.gif)

- Neural network:
   ![Imgur](https://i.imgur.com/zrOVzo3h.gif)

![Imgur](https://i.imgur.com/ed9XUlHh.jpg)

## [Backpropagation Algorithm](https://www.coursera.org/learn/machine-learning/lecture/1z9WW/backpropagation-algorithm){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/pjdBA/backpropagation-algorithm){:target="_back"}

> Coursea :heart: 提示這章超級重要~ 偶的學長學姊都這樣說~~ 所以要多看遍 多多熟悉唷~~