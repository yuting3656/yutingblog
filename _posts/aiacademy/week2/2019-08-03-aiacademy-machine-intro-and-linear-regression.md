---
layout: "single"
title: 'aiacademy: 機器學習 intro '
permalink: 'aiacademy/week2/ml-intro'
tags: aiacademy machine-learning
---

> 只 PO 不怎麼熟悉的主題

- [YouTube](https://www.youtube.com/playlist?list=PL1f_B9coMEeB9vVZLAVVY99Q6jUyMxxZ-){:target="_back"}


ML 1 (觀念): https://www.youtube.com/playlist?list=PL1f_B9coMEeB9vVZLAVVY99Q6jUyMxxZ-
ML 2 (實作): https://www.youtube.com/playlist?list=PL1f_B9coMEeAq0pcCCMx0UoxRkQ392hy2
ML 3 (觀念 & 實作): https://www.youtube.com/playlist?list=PL1f_B9coMEeB0uxQwlKLGGyDpI_Xs8iCY
ML 4 (觀念 & 實作 ): https://www.youtube.com/playlist?list=PL1f_B9coMEeCvbetNGYmW7fWUBSo0-D_i
ML 5 (觀念 & 實作 ): https://www.youtube.com/playlist?list=PL1f_B9coMEeDnlocZvO4vREgupj3TWhh5
ML 6 (觀念 & 實作 ): https://www.youtube.com/playlist?list=PL1f_B9coMEeDPl3dZ_ZmoDB1A2gjPa3hg
ML 7 (觀念 & 實作 ): https://www.youtube.com/playlist?list=PL1f_B9coMEeDMRTE71laJp3BYe9dOE_Ak


### Gradient Descent VS. Stochastic Gradient Descent

<iframe src="https://www.youtube.com/embed/93BIDobkD5A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- sgd:
   - 每次 __只看一筆資料__，走最好的方向

- GD VS. SGD:
   
   - # Steps:
      
      - GD: fewer steps
      - SGD: more steps

  - Computation of each step

     - GD: look through __all__ the training instances 
     - SGD: look onlu __one__ training instance

- Pros and Cons of SGD:

   - Pros:
      - When the training data is large with some (near) redundant instances, SGD is usually much faster to converge than GD

      - Supports online learning: model 比較能反映出 features 和 target variables 相對應得關係

      - Sometimes can pass local minimum

   - Cons:
      
      - Tends to bouncing around minimum


![Imgur](https://i.imgur.com/gTASud6.gif)


### Close form solution

<iframe src="https://www.youtube.com/embed/8Wn2jTR7YUw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> 庫ㄟ! 第一次聽到 __Close form solution__

- 當problem 是 multiple linear regerssion的時候算 θ: 
   
   - 可用 close form solution:
   ![Imgur](https://i.imgur.com/7J04maK.gif)


### Close form solution VS. Gradient Descent

<iframe src="https://www.youtube.com/embed/BL-KCFlCqFI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- If the number of features is small, close form solution is probably acceptable 

- However, if the number of features is large, using gradient descent is more efficient

- Moreove, gradient descent is capable of solving more complex optimization problem

- in many cases, `∂J(θ)/∂θ = 0` has no closed-from solution.... , But we can still apply gradient descent :smile:

