---
layout: 'post'
title: '機器學習-model and cost function'
permalink: "ml/02"

---

### [Model Representation](https://www.coursera.org/learn/machine-learning/lecture/db3jS/model-representation){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/cRa2m/model-representation){:target="_back"}

__Housing Prices__
>
![housingPrices][housing-prices]
- Supervised Learning:
   - Regression Problems :ok_hand:
   - Classification Problems


__Training set of housing prices__
>
| Size in feet^2 (x)| Price ($) in 1000's (y) |
| 2104 | 460 |
| 1416 | 232 |
| 1534 | 315 |
| ... | ... |
>
~~~
Notation:
m = Number of training examples
x's = "input" variable / features
y's = "output" variable / "target" variable
~~~
> 
**Process of Hypothesis Function:**
>
![hypothesisFunction][hypothesis-function]
>
When the target variable that we’re trying to predict is continuous, such as in our housing example, we call the learning problem a regression problem. When y can take on only a small number of discrete values (such as if, given the living area, we wanted to predict if a dwelling is a house or an apartment, say), we call it a classification problem.


### [Cost Function](https://www.coursera.org/learn/machine-learning/lecture/rkTp3/cost-function){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/nhzyF/cost-function){:target="_back"}

>
   **_Cost function_ : will let us figure out how to fit the best possible straight line to our data**

>
__Linear Regression :__
~~~
Hypothesis : hθ(x) = θ0 + θ1x
 θi's : Parameters
~~~
> 
![idaeLinearRegression][idea-linear-regression]
> 
Sometimes cost function is also called the __squared error function__

[housing-prices]: https://2.bp.blogspot.com/-hLzpkK0ki_0/Wnvx-hb-CbI/AAAAAAAAGr8/RUXx7lffmYE5KVobjun1wfiU3Tl5LqOSQCLcBGAs/s640/ml1.png

[hypothesis-function]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/H6qTdZmYEeaagxL7xdFKxA_2f0f671110e8f7446bb2b5b2f75a8874_Screenshot-2016-10-23-20.14.58.png?expiry=1561075200000&hmac=rPmq4h26hvSz5mlGIVGUjaT-3hSCR8EchYPXzYUhBho

[idea-linear-regression]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/R2YF5Lj3EeajLxLfjQiSjg_110c901f58043f995a35b31431935290_Screen-Shot-2016-12-02-at-5.23.31-PM.png?expiry=1561075200000&hmac=N2MOILik4blFUbiBiNchuggHJo5NKHonwtBFsoEjsj0