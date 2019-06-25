---
layout: 'post'
title: '機器學習 - multivariate linear regression 2'
permalink: 'ml-coursera/week2/multivariate-linear-regression-2'
tags: machine-learning
---

> 昨日　2019/06/24 因為　2019/06/23 的 [**遊行**][623-taiwan-go]{:target="_back"}，在現場淋雨 5小!!! 進度有點順延～　哈哈　今日努力補回兒：）

> 所以我決定從此時此刻起，這筆記兒，要更有人性和我的個性相近，這樣未來我來複習或當文件參考時才會有共鳴阿～阿阿ㄚ一喔！

##  [Gradient Descent in practice II - Learning Rate](https://www.coursera.org/learn/machine-learning/lecture/3iawu/gradient-descent-in-practice-ii-learning-rate){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/TnHvV/gradient-descent-in-practice-ii-learning-rate){:target="_back"}

__確保 gradient descent 正常兒運作 :__
>
![gradientDescentWorkOk][gradient-descent-work-ok]{:target="_back"}

- For sufficiently small α, J(θ) should decrease on every iteration.
- But if α is too small, gradient descent can be slow to converge.

![gradientDescentWorkOk2][gradient-descent-work-ok-2]{:target="_back"}

**Summary:**
- If α is too small: slow convergence.
- If α is too large: J(θ) ￼may not decrease on every iteration and thus may not converge.

___

##  [Feature and Polynomial Regression](https://www.coursera.org/learn/machine-learning/lecture/Rqgfz/features-and-polynomial-regression){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/ITznZ/features-and-polynomial-regression){:target="_back"}

> 好... 說實話！　不懂．．．這篇主要要做啥　ＸＤＤ　那就先貼比大神的筆記吧～


- We can improve our features and the form of our hypothesis function in a couple different ways.

> We can combine multiple features into one. 
For example, we can combine x1 and x2 into a new feature x3 by taking __x1 * x2__.

__Polynomial Regression:__

- 就是當 hypothesis function 跑出來的曲線和預測的有出入時，就要來喬事情啦~~~(喬王：老柯＆老王)~~~！

> We can change the behavior or curve of our hypothesis function by making it a quadratic, cubic or square root function (or any other form).


- EX: if our hypothesis function is
   ~~~
   hθ(x) = θ0 + θ1x1 
   ~~~
   
   - then we can create additional features based on x1,
   to get **quadratic function** :
   ~~~
   hθ(x) = θ0 + θ1x1 + θ2x1^2
   ~~~
   
   - the **cubic function**
   ~~~
   hθ(x) = θ0 + θ1x1 + θ2x1^2 + θ3x1^3
   ~~~
   > in the cubic version, we have created new features x2 and x3 
   where x2 = x1^2 and x3 = x1^3 

   - square root function, we can do:
   ~~~
   hθ(x) = θ0 + θ1x1 + θ2√x1	
   ~~~
   > 注意瞜！！如果把 features 喬成這副德性　--> features scaling becomes very importnat!
   > ex: if x1 has range 1- 1000 then range of x1^2 becomes 1 - 100000 and that of x1^3 becomes 1 - 1000000000








[623-taiwan-go]: https://www.cna.com.tw/news/firstnews/201906235002.aspx
[gradient-descent-work-ok]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/FEfS3aajEea3qApInhZCFg_6be025f7ad145eb0974b244a7f5b3f59_Screenshot-2016-11-09-09.35.59.png?expiry=1561593600000&hmac=jcrSin13c0HyHcI96bksGc7H-BjKpRtYYt_hY6etBY0
[gradient-descent-work-ok-2]: https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/rC2jGKgvEeamBAoLccicqA_ec9e40a58588382f5b6df60637b69470_Screenshot-2016-11-11-08.55.21.png?expiry=1561593600000&hmac=9oOsDmsbDvZcjgVWYEuEa6XC_IzM4w-jMyKt3zPTQvc