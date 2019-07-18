---
layout: 'post'
title: 'Backpropagation in Practice'
permalink: 'ml-coursera/week5/backpropagation-in-practice'
tags: machine-learning neural-networks
---

> You ARE What You DO!

## [Implementation Note: Unrolling Parameters](https://www.coursera.org/learn/machine-learning/lecture/60Uxp/implementation-note-unrolling-parameters){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/v88ik/implementation-note-unrolling-parameters){:target="_back"}

- with neural networks, we are working with sets of matrics:
   ~~~
    (1)   (2)   (3)   
   Θ   , Θ   , Θ   ...  
   
    (1)   (2)   (3)   
   D   , D   , D   ...
   ~~~
 
![Imgur](https://i.imgur.com/UY0OMBq.gif)

### Octave Example
- Theta1
~~~
Theta1 = ones(10, 11)
Theta1 =

   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
   1   1   1   1   1   1   1   1   1   1   1
~~~

- Theta2
~~~
Theta2 = 2*ones(10, 11)
Theta2 =

   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
   2   2   2   2   2   2   2   2   2   2   2
~~~

- Theta3
~~~
Theta3 = 3*ones(1, 11)
Theta3 =

   3   3   3   3   3   3   3   3   3   3   3
~~~

- thetaVec
~~~
thetaVec = [ Theta1(:); Theta2(:); Theta3(:) ]
thetaVec =
   1
   1
   1
   1
   1
   1
   1
   1
   1
   1
   1
   1
   1
   1
   1
   .
   .
   .
   .
   .
   2
   2
   2
   2
   2
   2
   .
   .
   .
   .
   3
   3
   3
   3


   >> size(thetaVec)
   ans =
      231  1      
   ~~~

- reshape
   ~~~
   reshape(thetaVec(1:110), 10, 11)
   ans =
   
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
      1   1   1   1   1   1   1   1   1   1   1
    
   % reshape %

   reshape(thetaVec(111:220), 10, 11)
   ans =
   
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
      2   2   2   2   2   2   2   2   2   2   2
   
   % reshape %

   reshape(thetaVec(221:231), 1, 11)
   ans =
   
      3   3   3   3   3   3   3   3   3   3   3
    
   ~~~


- Summary

![Imgur](https://i.imgur.com/XYNLzs4.gif)



## [Gradient checking](https://www.coursera.org/learn/machine-learning/lecture/Y3s6r/gradient-checking){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/fqeMw/gradient-checking){:target="_back"}


__Numerical estimation of gradients__

![Imgur](https://i.imgur.com/a09xNLx.gif)

__Gradient Checking__
![Imgur](https://i.imgur.com/oIyouVD.gif)

### Octave example
~~~
for i = 1:n,
    thetaPlus = theta;
    thetaPlus(i) = thetaPlus(i) + EPSILON; % ϵ (EPSILON) %
    thetaMinus = theta;
    thetaMinus(i) = thetaMinus(i) - EPSILON;
    gradApprox(i) = (J(thetaPlus) - J(thetaMinus)) / (2*EPSILON);
end;
~~~

- We previously saw how to calculate the deltaVector. So once we compute our gradApprox vector, we can check that **gradApprox ≈ deltaVector**.


## [Random Initialzation](https://www.coursera.org/learn/machine-learning/lecture/ND5G5/random-initialization){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/KMzY7/random-initialization){:target="_back"}

> 我發現這幾篇開始，都跟實作有關西! 所以，我決定要用 python 來練習! 


- zero initialization ---> GG 不優

- Random initialization: Symmetry breaking --> Good! 棒棒～

![Imgur](https://i.imgur.com/usAKzYM.gif)