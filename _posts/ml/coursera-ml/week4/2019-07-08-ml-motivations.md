---
layout: 'post'
title: 'Motivations: Neural Networkd [Non-linear hypotheses]'
permalink: 'ml-coursera/week4/motivation-neural-networks-non-linear-hypotheses'
tags: machine-learning neural-networks
---

## [Non-linear Hypotheses](https://www.coursera.org/learn/machine-learning/lecture/OAOhO/non-linear-hypotheses){:target="_back"}

> 今天是傳說中的 7/8 日!! 哈哈哈

- Motivation- Non-linear Classification:
    - 如果今天 features 有一堆!
    - ex: 房子/房價  
    ~~~
    x1 = size,        # quadratic features (o(n^2)) about: (n^2)/2  [n --> features]
    x2 = # bedrooms   ====> ≈ 5000 features
    x3 = # floors   
    x4 = age          
    .                 # cubic features (o(n^3))
    .                 ====> 170,000 features
    .                 
    x100
    ~~~ 
    - __for many machine learning problems: `n will be pretty large`__ 
>

- Example `n will be pretty large`: 
    - Compouter Vision: Car detection
    - EX:
    ~~~
       50 x 50 pixel images -> 2500 pixels
       n = 2500 (7500 if RGB)
       
                |   pixel 1 intensity   | ---> (0 ~ 255)
                |   pixel 2 intensity   |
           x =  |         .             |
                |         .             |
                |  pixel 2500 intensity |
                
       # Quadratic features (xi * xj): ≈ 3 million features
    ~~~

> 當 features 超級多的時候，用 logistic regression **不是**一棒棒的方法去學 complext nonlinear hypothese. 


## [Neurons and the Brain](https://www.coursera.org/learn/machine-learning/lecture/IPmzw/neurons-and-the-brain){:target="_back"}

__Neural Networks__
   - Origins: Algorithms that try to mimic the brain.
   - Was very widely used in 80s and early 90s; popularity diminised in late 90s.
   - Recent resurgence: State-of-the-art technique for many applications

> 不論送入甚麼訊號給大腦，大腦就是有能力可以去學習處裡它!!!