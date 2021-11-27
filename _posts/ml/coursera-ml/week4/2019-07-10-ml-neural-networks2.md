---
layout: "single"
title: 'Neural Networks 2'
permalink: 'ml-coursera/week4/neural-networks2'
tags: coursera-machine-learning neural-networks
---

> 認真的過每一天

> 快樂的過每一天

> 如果很困難的話，裝著過每一天

> 最困難的不是面對挫折打擊，最困難的是面對各種挫折打擊，卻沒有失去對人世間的熱情。

> 世俗成功的失敗，當生命中的一部分 :)

> 耶~ 開工前 聽阿北的演講一百回~~

## [Model Representation II](https://www.coursera.org/learn/machine-learning/lecture/Hw3VK/model-representation-ii){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/YlEVx/model-representation-ii){:target="_back"}

__Forward propagation: Vectorized implementation__

![Imgur](https://i.imgur.com/XTXWA6n.jpg?1)

> 上圖可以看到 layer 2 ( hidden layer ) 的計算細節

-  把  

    ~~~
      (j)                             (j)
    a   = g( ... ) 裡面的式子拿出來當 z
      k                               k
    ~~~

---
<br/>
### Neural Network learning its own features
![Imgur](https://i.imgur.com/HlqlBBN.jpg) 


#### Forward propagation
   - 記得每一個 layer 要加上一個 bias unit
   - 大神為了 運算/講解 方便，可把 input layer 的 x 看成 a^(1)
   - 
    ~~~
     (2)       (2)     (2)   (2)  
    a    = g( Z   );  a   , Z    ---> 為 three dimensional vector
    ~~~ 
   - 
   ~~~
     加上:

      (2)        (2)
     a   = 1 ; a    --->  為 four dimensional vector
      0
   ~~~

![Imgur](https://i.imgur.com/M7BlTO6.jpg)


### Summary

- vactor representation of x and z^j
 
   ~~~
        | x0 |           | z1^(j) |   
        | x1 |           | z2^(j) |     
    x = | .  |   z^(j) = |   .    |   
        | .  |           |   .    |
        | xn |           | zn^(j) |    
   ~~~

- Setting x = a ^ (1)

   ~~~
    (j)   (j−1)    (j−1)
   z   = Θ      * a
   ~~~

- we can get a vector of our **activation** node for layer j:

   ~~~
    (j)      (j)
   a   = g( z   )
   ~~~

- z Vector

   ~~~
    (j+1)   (j)   (j)
   z     = Θ   * a
   ~~~

- result

   ~~~
            (j+1)     (j+1)
   hΘ(x) = a     = g(z     )
   ~~~

