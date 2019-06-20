---
layout: "post"
title: "機器學習 - parameter learning"
permalink: "ml/03"
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
- Assignment : [computer operation]
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

[simultaneous-img]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/yr-D1aDMEeai9RKvXdDYag_627e5ab52d5ff941c0fcc741c2b162a0_Screenshot-2016-11-02-00.19.56.png?expiry=1561161600000&hmac=n0EtFnyq8dLpYejSNB_E5e_nMCdlMzoG1JfwyD0H6Eo