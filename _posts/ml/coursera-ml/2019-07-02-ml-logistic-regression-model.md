---
layout: 'post'
title: 'Logistic Regression Model'
permalink: 'ml-coursera/week3/logistic-regression-model'
tags: machine-learning
---

## [Cost Function](https://www.coursera.org/learn/machine-learning/lecture/1XG8G/cost-function){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/bgEt4/cost-function){:target="_back"}

__Cost Function:__

~~~
Linear regression: J(θ) = 1/m Σ 1/2 * ( hθ * (x^(i)) - y^(i) )^2
~~~

- 推倒:

    1. J(θ) = 1/m Σ `1/2 * ( hθ * (x^(i)) - y^(i) )^2`
    2. J(θ) = 1/m Σ `cost( hθ * (x^(i)) , y)`
    3.  ~~~
        # ignore (i)
        cost( hθ * (x) , y) = 1/2 * ( hθ * (x) - y )^2
        ~~~

> 用 logistic regression 來看

- 會造成 __non-convex__ 的情況

![nonConvex][non-convex]


__Logistic regression cost function:__

- ~~~ 
                   
  Cost(hθ(x), y) = {    -log(hθ(x))  if y = 1
                   {  -log(1-hθ(x))  if y = 0
  ~~~ 

  - Cost = 0 if y = 1, hθ(x) = 1
     * But as hθ(x) -> 0
     *        Cost --> ∞
  - Captures intuition that if hθ(x) = 0,
    `(predict P(y=1|x;θ) = 0)`, but y = 1, we'll penalize learning algorithm by a very large cost.
  - ![costFunction][cost-function]

- Summary
   * Cost(hθ(x), y) = 0 if hθ(x) = y
   * Cost(hθ(x), y) -> ∞ if y = 0 and  hθ(x) -> 1
   * Cost(hθ(x), y) -> ∞ if y = 1 and  hθ(x) -> 0
![logisticRegressionSummary][summary]



[non-convex]: https://i.imgur.com/wAxUdLJ.jpg?1

[cost-function]: https://i.imgur.com/70XZTK1.jpg
[summary]: https://i.imgur.com/mpDgpIm.jpg