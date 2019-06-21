---
layout: "post"
title: "機器學習 - parameter learning"
permalink: "ml/03"
tags: machine-learning
---

### [Gradient Descent](https://www.coursera.org/learn/machine-learning/lecture/8SpIM/gradient-descent){:target="_bakc"} : [article](https://www.coursera.org/learn/machine-learning/supplement/2GnUg/gradient-descent){:target="_back"}
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
__Simulaneous update :__
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
- The point of all this is that if we start with a guess for our hypothesis and then repeatedly apply these gradient descent equations, our hypothesis will become more and more accurate.

[simultaneous-img]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/yr-D1aDMEeai9RKvXdDYag_627e5ab52d5ff941c0fcc741c2b162a0_Screenshot-2016-11-02-00.19.56.png?expiry=1561161600000&hmac=n0EtFnyq8dLpYejSNB_E5e_nMCdlMzoG1JfwyD0H6Eo

[simplified-img]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/SMSIxKGUEeav5QpTGIv-Pg_ad3404010579ac16068105cfdc8e950a_Screenshot-2016-11-03-00.05.06.png?expiry=1561161600000&hmac=Nex-naOQ0vZWlcGT8dbCWIDwOQ_ZRjVXYcE2ONX-jr4

[adjusting-params]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/UJpiD6GWEeai9RKvXdDYag_3c3ad6625a2a4ec8456f421a2f4daf2e_Screenshot-2016-11-03-00.05.27.png?expiry=1561161600000&hmac=iZDXnWBWd9ACx2j7kHv-bjoNWqPajSmTtHYke-gkU4g

[learning-rate-fixed]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/RDcJ-KGXEeaVChLw2Vaaug_cb782d34d272321e88f202940c36afe9_Screenshot-2016-11-03-00.06.00.png?expiry=1561161600000&hmac=ZlHwEtOt9w5siAX2j1OtKMhvsOmNJk1SKJBvBpzGC3E

[new-form-derivative]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/QFpooaaaEea7TQ6MHcgMPA_cc3c276df7991b1072b2afb142a78da1_Screenshot-2016-11-09-08.30.54.png?expiry=1561161600000&hmac=V974QdsDdO5Cjzg-A4OJNekZ3ESotm4OjS7ptP1YXbs