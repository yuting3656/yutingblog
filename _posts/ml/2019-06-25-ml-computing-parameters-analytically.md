---
layout: 'post'
title: '機器學習 - computing parameters analytically'
permalink: 'ml-coursera/week2/computing-parameters-analytically'
tags: machine-learning
---

## [Normal Equation](https://www.coursera.org/learn/machine-learning/lecture/2DKxQ/normal-equation){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/bjjZW/normal-equation){:target="_back"}

| Size (feet^2) | Number of bedrooms | Number of floors | Age of home (years) | Price ($1000) |
| 2104 | 5 | 1 | 45 | 460 |
| 1416 | 3 | 2 | 40 | 232 |
| 1534 | 3 | 2 | 30 | 315 |
|  852 | 2 | 1 | 36 | 178 |

> -  take data set add a new column

![example1][example-1]

| [x0]  | Size (feet^2) [x1] | Number of bedrooms [x2] | Number of floors [x3] | Age of home (years) [x4] | Price ($1000) [y] |
| 1 | 2104 | 5 | 1 | 45 | 460 |
| 1 | 1416 | 3 | 2 | 40 | 232 |
| 1 | 1534 | 3 | 2 | 30 | 315 |
| 1 |  852 | 2 | 1 | 36 | 178 |

~~~
example: m =4

    | 1 2104 5 1 45 |        | 460 |
    | 1 1416 3 2 40 |        | 232 |
x = | 1 1534 3 2 30 |    y = | 315 |     
    | 1  852 2 1 36 |        | 178 |

      m x ( n + 1 )          m - dimensional vector

重要公式：　<<<  θ = ( x^T * x )^-1 * x^T * y  >>>
~~~

> 花生什麼事！？

- 來解釋拉:

    ~~~
    m examples (x^(1), y(1)), ..., (x^(m), y^(m)); n features
    
    
            ｜ x1^(i) ｜
            ｜ x1^(i) ｜
            ｜ x1^(i) ｜
    x^(i) = ｜   .　  ｜ ⊂ R^n+1
            ｜   .　  ｜
            ｜   .　  ｜
            ｜ x1^(i) ｜
    
    ~~~
    
    ~~~
    design matrix:
                     ｜ (x1^(1))^T ｜
                     ｜ (x1^(2))^T ｜
                     ｜ (x1^(3))^T ｜
          x     =    ｜     .　    ｜ 
        (design      ｜     .　    ｜
         matrix)     ｜     .　    ｜
                     ｜ (x1^(m))^T ｜
    ~~~
- EX:

    ~~~
               |  1     |
    if x^(i) = | x1^(i) |
    
        | 1  x1^(1) |       | y^(1) |   
        | 1  x1^(2) |       | y^(2) |    
        | 1    .    |       |   .   |   
    x = | 1    .    |   y = |   .   |  
        | 1    .    |       |   .   |   
        | 1  x1^(m) |       | y^(m) | 
    
     θ = ( x^T * x )^-1 * x^T * y
    ~~~

__θ = ( x^T * x )^-1 * x^T * y :__

> ( x^T * x )^-1 is inverse of matrix x^T * x


- There is __NO NEED__ to do feature scaling with the normal equation. 


- comparison of gradient descent and the normal equation:
>
| `Gradient Descent` |  `Normal Equation` |
| Need to choose alpha | No need to choose alpha |
| noeeds many iterations | No need to iterate |
| O (kn^2) | O (k^3), need to calculate inverse of x^T * x  |
| work well when n is large | slow if n is very large |


## [Normal Equation Noninvertibility](https://www.coursera.org/learn/machine-learning/lecture/zSiE6/normal-equation-noninvertibility){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/66bi5/normal-equation-noninvertibility){:target="_back"}

__Normal equation:__

> θ = ( x^T * x )^-1 * x^T * y

- What if x^T * x is non-invertible ? (sigular/degenerate)

- Octave:
   ~~~octave
   pinv(x'*x)*x'*y
   ~~~

__What if x^T * x is non-invertible?__

- Redundant features (linearly dependent)
~~~
Ex:
    x1 = size in feet^2
    x2 = sinze in m^2     (1m = 3.28 feet)
  ===>  x1 = (3.28)^2 * x2
~~~

- Too many features (ex: m ≤ n)
    - Delete some features, or use regularization

[example-1]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/dykma6dwEea3qApInhZCFg_333df5f11086fee19c4fb81bc34d5125_Screenshot-2016-11-10-10.06.16.png?expiry=1561593600000&hmac=rYlzZLWGJlND-XVPxkukhPJPP3U2E0VOPaiUsdhZAvo