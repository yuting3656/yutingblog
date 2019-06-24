---
layout: post
title: '機器學習 - multivariate linear regression'
permalink: 'ml-coursera/week2/multivariate-linear-regression'
tags: machine-learning
---

## [Multiple features](https://www.coursera.org/learn/machine-learning/lecture/6Nj1q/multiple-features){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/WKgbA/multiple-features){:target="_back"}

| Size (feet^2) | Number of bedrooms | Number of floors | Age of home (years) | Price ($1000) |
| 2104 | 5 | 1 | 45 | 460 |
| 1416 | 3 | 2 | 40 | 232 |
| 1534 | 3 | 2 | 30 | 315 |
|  852 | 2 | 1 | 36 | 178 |
|  ... | ... | ... | ... | ... |

__Notataion:__
- n = number of features
- x^(i) = input (features) of i^th training example.
-   ~~~
      ^(i)
     x     = value of feature j in i ^ th training example
      j   
    ~~~

**EX:**

~~~
         | 1416 |
         |    3 |
x^(2) =  |    2 |
         |   40 |

  ^(2)
 x     = 2 (Number of floors)
  3   
~~~

__Hypothesis:__

~~~
Hypothesis : 
    hθ(x) = θ0 + θ1x1 + θ2x2 + θ3x3 + θ4x4 

ex: 
    hθ(x) = 80 + 0.1x1 + 0.01x2 + 3x3 + -2x4 
                     |        |     |      |  
                 (feet) (bedrooms) (floor) (age)
~~~

__Hypothesis form:__
~~~
hθ(x) = θ0 + θ1x1 + θ2x2 + ... + θnxn

for convenience of notation, define x0 = 1  (x^(i) = 1)
=> 
hθ(x) = θ0x0 + θ1x1 + θ2x2 + ... + θnxn
~~~

## [Gradient Descent for Multiple Variables](https://www.coursera.org/learn/machine-learning/lecture/Z9DKX/gradient-descent-for-multiple-variables){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/aEN5G/gradient-descent-for-multiple-variables){:target="_back"}

~~~
Hypothesis:
    hθ(x) = θ0x0 + θ1x1 + θ2x2 + ... + θnxn
Parameters: 
    θ0,θ1,θ2,θ3, ... ,θn (n+1 dimensional vector)
Cost Function:
    J(θ0, θ1, ... , θn) = 1/2m * ∑ ( hθ * ( x^(i) ) - y^(i) )^2
Gradient descent:
    Repeat {
        θj := θj -  α * ∂/∂θj * J(θ0, ... ,θn)
    }   (simultaneously update for every j=0,...n)

~~~

![gradienDescent][gradient-descent]



## [Gradient Descent in practice I - Feature](https://www.coursera.org/learn/machine-learning/lecture/xx3Da/gradient-descent-in-practice-i-feature-scaling){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/CTA0D/gradient-descent-in-practice-i-feature-scaling){:target="_back"}




[gradient-descent]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/MYm8uqafEeaZoQ7hPZtKqg_c974c2e2953662e9578b38c7b04591ed_Screenshot-2016-11-09-09.07.04.png?expiry=1561507200000&hmac=kUYZ0TO2dpcwLOMSw_GhuxdjyJYsFYBkm3g662LNydk


