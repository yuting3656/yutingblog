---
layout: 'post'
title: 'Classification and Representation'
permalink: 'ml-coursera/week3/classification-and-representation'
tags: machine-learning
---
> 7 月第一天!!! oh~~ Summer~~ :sunny: GOGO!
<br/>

> 你有多自律，就有多自由。

## [Classification](https://www.coursera.org/learn/machine-learning/lecture/wlPeP/classification){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/fDCQp/classification){:target="_back"}

__Classification:__

- EX:
   1. Email: Spam / Not Spam?
   2. Online Transactions: Fraudulent (Yes / No)?
   3. Tumor: Malignant / Benign?

   ~~~
   # binary classification problem
   y ⊂ {0, 1}    
   0: "Negative Class" (e.g., benign tumor)
   1: "Positive Class" (e.g., malignant tumor)  

   # multiclass classification problem
   y ⊂ {0, 1, 2, 3, ...}
   ~~~

- 使用 linear regression 來做 classification problems 通常**不優!**<br/>
  從大神的圖可以看到，如果再加一數值進到資料集裡面，曲線又會再做更便兒~
![linearRegressionWithClassification][linear-regression-with-class]


- 讓我們再想想

   ~~~
   Classdification: y = 0 or 1
   
   hθ(x) can be > 1 or < 0
   ~~~

__Logistic Regression is actually a classification algorithm:__
> Logistic Regression: 0 ≤ hθ(x) ≤ 1


## [Hypothesis Representation](https://www.coursera.org/learn/machine-learning/supplement/AqSH6/hypothesis-representation){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/AqSH6/hypothesis-representation){:target="_back"}


__Logistic Regression Model:__

- Want 0 ≤ hθ(x) ≤ 1
   ~~~
   hθ(x) = g ( θ^T * x )
   ~~~


- __Sigmoid function (Logistic function):__
   ~~~
   g(z) = 1 / 1 + e^-z
   ~~~

*We Got:*
-  ~~~
   hθ(x) = 1 / 1 + e^-(θ^T * x)
   ~~~
- ![sigmoidFunction][sigmoid-function]

__Interpretation of Hypothesis Output:__

> hθ(x) = estimated probability that y = 1 on input x

- EX:  
   ~~~
          | x0 |   |     1     |
   if x = | x1 | = | tumorSize |
   hθ(x) = 0.7
   ~~~

   - Tell patient that 70 % chance of tumor being malignant
   - **hθ(x) = P(y=1|x;θ), y = 0 or 1** "Probability that y = 1, given x, parameterized by θ"
   ~~~
   P(y=0|x;θ) + P(y=1|x;θ) = 1
   P(y=0|x;θ) = 1 - P(y=1|x;θ)
   ~~~

## [Decision Boundary](https://www.coursera.org/learn/machine-learning/lecture/WuL1H/decision-boundary){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/N8qsm/decision-boundary){:target="_back"}

__Logistic regression:__

~~~
hθ(x) = g ( θ^T * x )
g(z) = 1 / 1 + e^-z
~~~
- y = 1  `(θ^T * x) ≥ 0`
- y = 0  `(θ^T * x) < 0`

![logisticRegression][logistic-regression]

__Decision Boundary:__

![decisionBoundary][decision-boundary]


__Non-linear decision boundaries:__

[linear-regression-with-class]: https://i.imgur.com/ES9IacAm.jpg
[sigmoid-function]: https://i.imgur.com/jha4DSem.jpg
[logistic-regression]: https://i.imgur.com/MJUZtFL.jpg
[decision-boundary]: https://i.imgur.com/NXoLVK8.jpg