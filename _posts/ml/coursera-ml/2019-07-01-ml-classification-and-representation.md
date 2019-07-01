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
   hθ(x) = θ^T * x
   ~~~

[linear-regression-with-class]: https://i.imgur.com/ES9IacAm.jpg