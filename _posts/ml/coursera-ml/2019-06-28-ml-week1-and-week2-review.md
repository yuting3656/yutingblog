---
layout: 'post'
title: 'week1 ~ week2 自我整理複習'
permalink: 'ml-coursera/review/week1-week2'
tags: machine-learning
---

> 完美的兩週，準時把進度看完 __BUT__ 還是有些模糊的部分，打算用 _review_ 的方式來再一次熟悉唷~~

- 然後發生杯具得情況，就是過去完美的精美筆記的 __圖片連結__ 會過期 我哭~~ :sob:
  看來真的要自己截圖上傳 or 精美筆記手稿上傳了 :metal:

**Derivate :**
> 第一張在 imgur 的手稿圖XD

有時候，聽老師講都很懂阿 :)<br/>阿自己來練習一次的時候就... 哈哈 魔鬼都在細節~ <br/> 所以先來複習一下久違的 [Derivate](https://www.youtube.com/watch?v=9vKqVkMQHKk&list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr){:target="_back"}

![derivate][Imgur-derivate]




**為什麼多了 1/2 ?**
- cost function:

   ![costFunction][Imgur-cost-function]

   - 用谷哥大神查，說服自己理解的方式: 
      1. [MSE][mse]{:target="_back"} (Mean squared error)
      2. 當在做 Gradient descent 時候 為了後續計算 [方便][squared-root-function]{:target="_back"} 
      <br/> ![gradientDescent][gradient-descent]
      3. 使用了 [One Half Mean Squared Error][one-half-mean-squared-error]{:target="_back"}
      4. 不會影響到找 θj




[Imgur-derivate]: https://i.imgur.com/yotXm4Pm.jpg?1
[Imgur-cost-function]: https://i.imgur.com/XsaXu5wm.jpg?1
[squared-root-function]: https://datascience.stackexchange.com/questions/10188/why-do-cost-functions-use-the-square-error
[mse]: https://en.wikipedia.org/wiki/Mean_squared_error
[one-half-mean-squared-error]: https://mccormickml.com/2014/03/04/gradient-descent-derivation/
[gradient-descent]: https://i.imgur.com/Fsjj4yPm.jpg?1
