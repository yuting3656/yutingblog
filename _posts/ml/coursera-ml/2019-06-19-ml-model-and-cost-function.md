---
layout: 'post'
title: '機器學習 - model and cost function'
permalink: "ml-coursera/week1/model-and-cost-function"
tags: coursera-machine-learning
---

### [Model Representation](https://www.coursera.org/learn/machine-learning/lecture/db3jS/model-representation){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/cRa2m/model-representation){:target="_back"}
>
__Housing Prices__
>
![housingPrices][housing-prices]
- Supervised Learning:
   - Regression Problems :ok_hand:
   - Classification Problems

>
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

---
>

### [Cost Function](https://www.coursera.org/learn/machine-learning/lecture/rkTp3/cost-function){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/nhzyF/cost-function){:target="_back"}

>
   **_Cost function_ : will let us figure out how to fit the best possible straight line to our data**

>
__Linear Regression :__
~~~
Hypothesis : hθ(x) = θ0 + θ1x
θi's : Parameters
Linear Regression Model:
J( θ0, θ1 ) =  1/2m * ∑ ( hθ * ( x^(i) ) - y^(i) )^2
~~~
> 
![idaeLinearRegression][idea-linear-regression]
> 
Sometimes cost function is also called the __squared error function__

---
>

### [Cost Function - Intuition i](https://www.coursera.org/learn/machine-learning/lecture/N09c6/cost-function-intuition-i){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/u3qF5/cost-function-intuition-i){:target="_back"}

>
- __Goal :__ try to minimize the cost function J(θ0, θ1)
>
   ![Imgur](https://i.imgur.com/ctltK73.jpg)
   ~~~
Simplified: θ0 = 0
J(θ0, θ1) ---> J(θ1)
~~~
~~~
when θ1 = 1
J(θ1) = 0
~~~
>
   ![Imgur](https://i.imgur.com/upWmtZI.jpg) 
~~~
when θ1 = 0.5
~~~
   ![Imgur](https://i.imgur.com/KIdbXdf.jpg)


~~~
when θ1 = 0
~~~
   ![Imgur](https://i.imgur.com/2RBumeO.jpg)

>
- We can find out in this case θ1 = 1 is our **goal**
>
   ~~~
when θ1 = 1
J(θ1) = 0
~~~
>
   ![Imgur](https://i.imgur.com/p6kUpfw.jpg)

---
>

### [Cost Fuction - Intuition ii](https://www.coursera.org/learn/machine-learning/lecture/nwpe2/cost-function-intuition-ii){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/9SEeJ/cost-function-intuition-ii){:target="_back"}

>
 ![Imgur](https://i.imgur.com/upBjkxs.jpg)

> 
- When we have 2 parameters the plot will be a 3D plot 
>
   ~~~
EX:
θ0 = 50
θ1 = 0.06
hθ = 50 + 0.06x
~~~
>
- J(θ0, θ1): 2 parameters
>
![Imgur](https://i.imgur.com/muf0OWw.jpg)

>
- [Contour graphs][contour-maps]{:target="_back"}
>
   - hθ(x) θ0 + θ1x
   ![Imgur](https://i.imgur.com/1wINy2y.jpg)
>
   - hθ(x) 360
    ~~~
θ0 = 360
θ1 = 0
    ~~~
 ![Imgur](https://i.imgur.com/z70emJm.jpg)
>
   - minimize the cost function 
   ![Imgur](https://i.imgur.com/pE7PX4C.jpg)




[housing-prices]: https://2.bp.blogspot.com/-hLzpkK0ki_0/Wnvx-hb-CbI/AAAAAAAAGr8/RUXx7lffmYE5KVobjun1wfiU3Tl5LqOSQCLcBGAs/s640/ml1.png

[hypothesis-function]: https://raw.githubusercontent.com/ritchieng/machine-learning-stanford/master/w1_linear_regression_one_variable/hypothesis.png

[idea-linear-regression]: https://raw.githubusercontent.com/ritchieng/machine-learning-stanford/master/w1_linear_regression_one_variable/minimisation.png

[simplified-cost-function]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/_B8TJZtREea33w76dwnDIg_3e3d4433e32478f8df446d0b6da26c27_Screenshot-2016-10-26-00.57.56.png?expiry=1561075200000&hmac=rPoJzPHlAz6xqKjAb4ImFg--WfT7q0YQK7KYnsdoWMI

[thetaOne0.5-cost-function]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/8guexptSEeanbxIMvDC87g_3d86874dfd37b8e3c53c9f6cfa94676c_Screenshot-2016-10-26-01.03.07.png?expiry=1561075200000&hmac=HTkKNTn8jsF4-DbUN_UsUCCTRMk3Jz0Zy8lF6EQSRsA

[minimize-cost-function]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/fph0S5tTEeajtg5TyD0vYA_9b28bdfeb34b2d4914d0b64903735cf1_Screenshot-2016-10-26-01.09.05.png?expiry=1561075200000&hmac=_wEsB_lGth1Ho1v-nOLeTxse4d0xgSDzsSgodrVJNpA

[3d-plot]: https://raw.githubusercontent.com/ritchieng/machine-learning-stanford/master/w1_linear_regression_one_variable/2_params.png

[contour-maps]: https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/contour-maps

[contour-1]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/N2oKYp2wEeaVChLw2Vaaug_d4d1c5b1c90578b32a6672e3b7e4b3a4_Screenshot-2016-10-29-01.14.37.png?expiry=1561075200000&hmac=r213RUKcd82bE2AOw2ytVe_f3qy50dcujGQ8Uje7jlc

[contour-2]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/26RZhJ34EeaiZBL80Yza_A_0f38a99c8ceb8aa5b90a5f12136fdf43_Screenshot-2016-10-29-01.14.57.png?expiry=1561075200000&hmac=IhZBNMef7-n9_ShygWGwlsIqTnlv1kDlitwQxny7UJw

[contour-3]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/hsGgT536Eeai9RKvXdDYag_2a61803b5f4f86d4290b6e878befc44f_Screenshot-2016-10-29-09.59.41.png?expiry=1561075200000&hmac=f8KFeeyy011aptmEVuJ3jdmXlUl2_N0kEeU6ugVW71g
