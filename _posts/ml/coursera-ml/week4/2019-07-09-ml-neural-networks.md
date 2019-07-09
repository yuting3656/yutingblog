---
layout: 'post'
title: 'Neural Networks'
permalink: 'ml-coursera/week4/Neural Networks'
tags: machine-learning neural-networks
---

## [Model Representation I](https://www.coursera.org/learn/machine-learning/lecture/ka3jK/model-representation-i){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/Bln5m/model-representation-i){:target="_back"}

__Neuron in the brain__

> Neural networks were develpoed as simulating neurons or networks of neurons in the brain

- __Neural networks are a set of algorithms__

> 原本 7/8 號要寫完這篇~ 結果 顆顆顆~~ 哈哈哈

> 今天生日耶~~ 祝我生日快樂~ :cake: 

![Imgur](https://i.imgur.com/5K9PzyN.jpg)

- __Terminology:__
    ![Imgur](https://i.imgur.com/2tn7gwk.jpg)
    - Sigmoid (logistic) activation function
    - θ (theta) parameters ---> in nerual networks fields called **weight**<br/>
      終於知道為啥之前學的 **[CS231](https://www.youtube.com/watch?v=vT1JzLTH4G4&list=PLC1qU-LWwrF64f4QKQT-Vg5Wr4qEE1Zxk){:target="_back"}** 都用`w`來解釋了~


**Neural Network**
![Imgur](https://i.imgur.com/iMzSiQ8.jpg)
-    ~~~
      (j)
     a   =  "activation" of unit i in layer j
      i
     ~~~
-    ~~~
      (j)
     Θ  = matrix of weights controlling function mapping from layer j to layer j+1
     ~~~
-    ~~~
     If network has s  units in layer j,
                     j
                                     (j)
     s     units in layer j+1, then Θ    will be of dimension s    * ( s  +  1 )
      j+1                                                      j+1      j
     ~~~

- EX:    

    ~~~
    If layer 1 has 2 input nodes and layer 2 has 4 activation nodes. 
    
                  (1)
    Dimension of Θ   is going to be 4×3 
    
    where s  = 2  and  
           j
    
    s  +  1 = 4,  so 
     j
    
    s        *  ( s  + 1 ) = 4 * 3
     j + 1         j
    ~~~ 