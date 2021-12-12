---
layout: "single"
title: 'numpy 基本練習 dot'
permalink: 'python/numpy/basic-practice-dot'
tags: python numpy
---
> Coursera linear algebra 的練習題，要算到 matrix 相乘，熊熊想到 numpy 的基本用法都不熟阿～～


__不熟就來蹲馬步:__
~~~python
import numpy as np

x = np.array(
      [[ 1,  2,  1,  5],
       [ 0,  3,  0,  4],
       [-1, -2,  0,  0]])

y = np.array(
    [ [1],
      [3],
      [2],
      [1]])
~~~
很直覺的 x * y 就直接:
~~~python
x * y
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: operands could not be broadcast together with shapes (3,4) (4,1)
~~~
> 叉燒包拉！！！

**numpy array 相乘請使用:**
   - [numpy.dot](https://docs.scipy.org/doc/numpy/reference/generated/numpy.dot.html){:target="_back"}

~~~python
import numpy as np

x = np.array(
      [[ 1,  2,  1,  5],
       [ 0,  3,  0,  4],
       [-1, -2,  0,  0]])

y = np.array(
    [ [1],
      [3],
      [2],
      [1]])

z = np.dot(x, y)
~~~
看看 z 變成甚麼：
~~~python
z.shape >>> (3, 1)

z >>>
array([[14],
       [13],
       [-7]])
~~~
> x[ 3, 4 ] * y[ 4, 1 ] = z[ 3, 1 ] 