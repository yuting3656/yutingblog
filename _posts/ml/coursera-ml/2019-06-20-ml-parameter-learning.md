---
layout: "post"
title: "機器學習 - parameter learning"
permalink: "ml-coursera/week1/parameter-learning"
tags: coursera-machine-learning gradient-descent
---

### [Gradient Descent](https://www.coursera.org/learn/machine-learning/lecture/8SpIM/gradient-descent){:target="_bakc"} : [article](https://www.coursera.org/learn/machine-learning/supplement/2GnUg/gradient-descent){:target="_back"}

- Gradient Descent ---> to minimize the J(θ0, θ1)

>
__Outline :__ <br/>
start with some (θ0, θ1)<br/>keep changing θ0, θ1 to reduce J(θ0, θ1) until we hopefully end up at a minimum
>
~~~
Have some function J(θ0, θ1)
Want min[θ0, θ1]  J(θ0, θ1)
~~~

>
__Gradien descent algorithm :__
>
~~~
repeat until convergence {
  θj := θj − α * ∂/∂θj * J(θ0,θ1)
}
(for j = 0, and j = 1)
~~~
>
- Assignment : [ computer operation ]
~~~
a := b
a := a + 1 
~~~
- Truth assertion :
~~~
a = b
~~~
>
- α : Learngin rate
>
   θj := θj − `α` * ∂/∂θj * J(θ0,θ1)
- ∂/∂θj * J(θ0,θ1) : derivative term
>
   θj := θj − α * `∂/∂θj * J(θ0,θ1)`
>
---
>
__Simultaneous update :__
>
- Simultaneously update  θ0 and θ1 : `θj := θj − α * ∂/∂θj * J(θ0,θ1)`
![simbultaneousImg][simultaneous-img]



### [Gradient Descent Intuition](https://www.coursera.org/learn/machine-learning/lecture/GFFPB/gradient-descent-intuition){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/QKEdR/gradient-descent-intuition){:target="_back"}
> 
__Simplified:__
- Repeat until convergence :
~~~
 θ1 := θ1 − α * d/dθ1 * J(θ1) 
~~~
slope :
~~~
d/dθ1​
~~~
   - When the slope is negative, the value of θ1 increases and when it is positive, the value of θ1 decreases.
![simplifiedImg][simplified-img]
>
<br/>
>
- Adjusting our parameter **α** :
<br/>
 to ensure that the gradient descent algorith coverges in a reasonable time.
<br/>
 **θ1 := θ1 − α * d/dθ1 * J(θ1)**
   - if **α** is too small, gradient descent can be slow.
   - if **α** is too large, gradient descetnt can overshoot the minimum. It may fail to converege, or even diverge.
 ![adjustingParams][adjusting-params]
>
 <br/>
>
- if θ1 is at a local optimum of J(θ1), gradient descent will leave θ1, unchange!
~~~
θ1 := θ1 - α * 0
~~~
<br/>
>
- Gradient descent can converage to a local minimum, even with the learning rate α fixed.
>
![learningRateFixed][learning-rate-fixed]


### [Gradient Descent For Linear Regression](https://www.coursera.org/learn/machine-learning/lecture/kCvQc/gradient-descent-for-linear-regression){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/U90DX/gradient-descent-for-linear-regression){:target="_back"}
>
- When specifically applied to the case of linear regression, a new form of the gradient descent equation can be derived:
>
   - Gradient descent algorithm :
<br/>
repeat until convergence {
<br/>
**θj := θj − α * ∂/∂θj * J( θ0, θ1 )**
<br/>
(for j=1 and j=0)
<br/> 
}
   - Linear Regression Model :
<br/>
**J( θ0, θ1 ) =  1/2m * ∑ ( hθ * ( x^(i) ) - y^(i) )^2**
>
   - ![newFormDerivative][new-form-derivative]
>
   - ![newFormDerivative2][new-form-derivative-2]
>
- The point of all this is that if we start with a guess for our hypothesis and then repeatedly apply these gradient descent equations, our hypothesis will become more and more accurate.

[simultaneous-img]: https://i.imgur.com/vmAAoMnh.gif

[simplified-img]: https://i.imgur.com/sWgZnCOh.gif

[adjusting-params]: https://i.imgur.com/DdKw4nmh.gif

[learning-rate-fixed]: https://i.imgur.com/PZCa5w4h.gif

[new-form-derivative]: https://i.imgur.com/TQah4m9h.gif

[new-form-derivative-2]: https://i.imgur.com/wJrCq3Mh.gif