---
layout: 'post'
title: 'Neural Networks: Applications'
permalink: 'ml-coursera/week4/neural-networks-applications'
tags: machine-learning neural-networks
---

## [Examples and Intuitions I](https://www.coursera.org/learn/machine-learning/lecture/rBZmG/examples-and-intuitions-i){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/kivO9/examples-and-intuitions-i){:target="_back"}


### Non-linear classification example: XOR/XNOR

- XOR
<table>
<tr> 
  <th colspan="2">Input</th>
  <th>Output</th>
</tr>

  <tr>
    <td>A</td>
    <td>B</td>
    <td> A XOR B </td>
  </tr>
  <tr>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
    <td>1</td>
    <td>0</td>
  </tr>
  
</table>

- XNOR
<table>
<tr> 
  <th colspan="2">Input</th>
  <th>Output</th>
</tr>

  <tr>
    <td>A</td>
    <td>B</td>
    <td> A XNOR B </td>
  </tr>
  <tr>
    <td>0</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>1</td>
    <td>1</td>
  </tr>
  
</table>




> x1, x2 are bindary ( 0 or 1 )

![Imgur](https://i.imgur.com/4ZMpbDh.jpg)

---
<br/>
### Simple example: AND 

![Imgur](https://i.imgur.com/AUyf8e8.jpg)

- Sigmoid Chart

> 純正阿廷手工藝品!
   - 在 z 為 4.6 時候 **快要為 1**
   - 在 z 為 - 4.6 時候 **快要為 0**
>
![Imgur](https://i.imgur.com/gqoiDvfh.jpg)

- 運算:

~~~
hΘ(x) = g ( -30 + 20 * x1 + 20 * x2)
~~~

| x1 | x2 | hΘ(x) |
|  0 |  0 | g(-30) ≈ 0   |
|  0 |  1 | g(-10) ≈ 0   |
|  1 |  0 | g(-10) ≈ 0   |
|  1 |  1 | g(10)  ≈ 1  |

計算出的結果 **hΘ(x) ≈ x1 AND x2**

![Imgur](https://i.imgur.com/UIFNZWWh.jpg)

---

<br/>
### Simple example: OR
> 很好!! 超懶 XDDD

![Imgur](https://i.imgur.com/AjnnxRth.jpg)

<br/>


## [Examples and Intuitions II](https://www.coursera.org/learn/machine-learning/lecture/solUx/examples-and-intuitions-ii){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/5iqtV/examples-and-intuitions-ii){:target="_back"}


### Negation: Not x1

![Imgur](https://i.imgur.com/iPx1MJvh.jpg)

### Putting it together: x1 XNOR x2

![Imgur](https://i.imgur.com/5MpS1DGh.jpg)

### Handwritten digit classification

> 用上面學的 Neural Networks 來做手寫辨識!!

> 影片來大神介紹的另一位神人 [Yann LeCun](http://yann.lecun.com/){:target="_back"}

<iframe width="560" height="315" src="https://www.youtube.com/embed/yxuRnBEczUU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## [Multiclass Classification](https://www.coursera.org/learn/machine-learning/lecture/gFpiW/multiclass-classification){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/xSUml/multiclass-classification){:target="_back"}

__Multiple output units: One-vs-all__

- ex: 辨別四種- Pedestrian, Car, Motorcycle, Truck
- 在 output layer 的 地方會有 four output units

![Imgur](https://i.imgur.com/e6T8d92.jpg)


- 看 y^(i) 時候，改用 vector 的方式呈現

![Imgur](https://i.imgur.com/Xaz949Sh.jpg)