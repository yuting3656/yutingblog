---
layout: 'post'
title: 'Cost Function and Backpropagation 2'
permalink: 'ml-coursera/week5/cost-function-and-backpropagation2'
tags: machine-learning neural-networks backpropagation
---


## [Backpropagation Algorithm](https://www.coursera.org/learn/machine-learning/lecture/1z9WW/backpropagation-algorithm){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/pjdBA/backpropagation-algorithm){:target="_back"}

> Coursea :heart: 提示這章超級重要~ 偶的學長學姊都這樣說~~ 所以要多看遍 多多熟悉唷~~

![Imgur](https://i.imgur.com/hgJgmdA.jpg)

> 有一點 忘了後~ 速度複習一下!
- Neuron model: 
>
   ![Imgur](https://i.imgur.com/5K9PzyNl.jpg)
>
   - Neruon model: Logistic unit
>
   ![Imgur](https://i.imgur.com/2tn7gwkl.jpg)
>
- Nerual Network:
>
   ![Imgur](https://i.imgur.com/iMzSiQ8l.jpg)
>
- Forward Propagation: Vectorized implementation
>
   ![Imgur](https://i.imgur.com/HlqlBBNl.jpg)

### Gradien computation: Backpropagation algorithm


 ![Imgur](https://i.imgur.com/UrF34Ahh.gif)

> 要計算在每一 layer 下各個 unit 的 error
 ![Imgur](https://i.imgur.com/si172Qml.gif)

- For each output unit (layer L = 4)
   - ![Imgur](https://i.imgur.com/JJk7hwqt.gif)
   ~~~
    (4)         
   a    = (hΘ(x)) 
    j            j
   ~~~

   - 從 δ^(4) ----> δ^(1) 計算回去: 所以叫 **Backpropagation** 


### Backpropagation algorithm

![Imgur](https://i.imgur.com/dA88o4r.gif)