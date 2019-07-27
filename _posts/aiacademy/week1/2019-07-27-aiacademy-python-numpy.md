---
layout: 'post'
title: 'python numpy'
permalink: 'aiacademy/week1/python-numpy'
tags: aiacademy python numpy
---

- Example of exis
   - one axis
      ~~~python
      [1, 3, 5]
      ~~~
   - 2 axis
      ~~~python
      [[1, 3, 5],
       [2, 4, 6]]
      ~~~

- create ndarray
   ~~~python
   import numpy as np

   x = np.arange(3) # array([0, 1, 2])

   print(type(x)) # <class 'numpy.ndarray'>

   # check if ndarray type
   isinstance(x, np.ndarray)  # True

   # be excplicitly specified type
   y = np.arange(3, dtype="float64")  # [0. 1. 2.]
   ~~~

   ~~~python
   import numpy as np

   existed_list = [18, 15, 21, 10, 88, 76, 29, 20]
   np_arrary = np.array(existed_list)

   print(np_arrary) # [18 15 21 10 88 76 29 20]
   ~~~

- Attributes of ndarray

   ~~~python
   import numpy as np

   x = np.arange(3)

   # ndim - the number of axes (dimensions) of the array.
   print(x.ndim) # 3

   # shape - the dimensions of the array. 
   print(x.shape) # (3,)

   # size - the total number of elements of the array.
   print(x.size) # 3

   # dtype - the type of the elements in the array. 
   print(x.dtype) # int64
   ~~~

- Axes reshape

   ~~~python
   x = np.arange(6)
   print(x)  # [0 1 2 3 4 5]

   new_shape = x.reshape(2, 3)
   print(new_reshape)  # [[0 1 2]
                       #  [3 4 5]]
   # equivalently 
   new_shape = x.reshape(x, (2, 3))

   # 一行搞定!
   y = np.arange(6).reshape(2, 3)                           
   ~~~

- Initial placeholder content
   
   - zeros
      ~~~python
      np.zeros(3)  # array([0., 0., 0.])

      np.zeros((2, 3))  # array([[0., 0., 0.], 
                        #        [0., 0., 0.]])
      ~~~

   - ones
      ~~~python
      np.ones((2, 3)) # array([[1., 1., 1.],
                      #        [1., 1., 1.]])
      ~~~
   
   - identity: a square array with ones on the main diagonal
      ~~~python
      np.identity(3)  # array([[1., 0., 0.],
                      #        [0., 1., 0.],
                      #        [0., 0., 1.]]) 
      ~~~


- Array Index 

   - 1-D array
      ~~~python
      x = np.arange(6)  # array([0, 1, 2, 3, 4, 5])
      x[2] # 2
      x[-2] # 4
      ~~~
    
   - 2-D array
      ~~~python
      x = np.arange(6).reshape(2, 3) # array([[0, 1, 2],
                                     #        [3, 4, 5]])
      x[0, 2] # 2
      x[1, -1] # 5
      ~~~

- Array Slice & Stride
   
   - 1-D array
      ~~~python
      x = np.arange(6)  # array([0, 1, 2, 3, 4, 5])

      x[1:5] # [1, 2, 3, 4]
      X[:2] # [0, 1]
      x[1:5:2] # [1, 3]
      ~~~ 

   - 2-D array
      ~~~python
      x = np.arange(6).reshape(2, 3) # array([[0, 1, 2],
                                     #        [3, 4, 5]])

      x[0, 0:2] # [0, 1]

      x[:, 1:]  # array([[1, 2],
                #        [4, 5]])
      
      x[::1, ::2]  # array([[0, 2],
                   #        [3, 5]]) 
      ~~~

- Boolean / Mask Index

   ~~~python
   x = np.arange(6) # array([0, 1, 2, 3, 4, 5])

   condition = x < 3
   x[condition] # array([0, 1, 2])

   x[condition] = 0
   x           # array([0, 0, 0, 3, 4, 5])
   ~~~


- Why called mask ?
   ~~~python
   x = np.arange(6)
   condition = x < 3
   condition
   array([ True,  True,  True, False, False, False])
   
   x[condition] = 0
   x            # array([0, 0, 0, 3, 4, 5])
   ~~~

- Concatenate 串接
   ~~~python
   import numpy as np

   a = np.array([[1, 2, 3],[4, 5, 6]])
   b = np.array([[7, 8, 9]])

   # axis = 0 , 從 row 的方向串接 
   np.concatenate((a, b), axis = 0)
                                   #　array([[1, 2, 3],
                                   #         [4, 5, 6],
                                   #         [7, 8, 9]])
   
   # axis = 1, 從　column 的方向串接
   c = [[0], [0]]
   np.concatenate((a, c), axis = 1)
                                    # array([[1, 2, 3, 0],
                                    #        [4, 5, 6, 0]])　
   ~~~

- Basice Operations

   ~~~python
   import numpy as np
   a = np.array([[1, 2], [3, 4]])
   b = np.array([[5, 6], [7, 8]])
   print(a + b)  # array([[6, 8], [10, 12]])
   print(a - b)  # array([[-4, -4], [-4, -4]])
   print(a * b)  # array([[5, 12], [21, 32]])
   print(a / b)  # array([[0.2, 0.33333333], [0.42857143, 0.5]]
   print(a - 1)  # array([[0, 1], [2, 3]])
   print(a * 2)  # array([[2, 4], [6, 8]])
   ~~~

- Basic Linear Algebra
   - 轉置矩陣：m * n 矩陣在向量空間上轉置為 n * m 矩陣
   - 逆矩陣：n * n 矩陣 A 存在一個 n * n 矩陣 B，使得 AB = BA = I

   ~~~python
   import numpy as np 
   a = np.array([[0, 1],
                 [2, 3]])

   # 轉置矩陣
   print(a.T) # array([[0, 2],
              #        [1, 3]])

   
   # 逆矩陣
   inverse = np.linalg.inv(a)
   print(inverse) # array([[-1.5,  0.5],
                  #        [ 1. ,  0. ]])

   # 內積
   np.dot(a, inverse)
                  # array([[1., 0.],
                  #        [0., 1.]])
   ~~~

- Vector Stacking
   ~~~python
   import numpy as np

   a = np.array([[0, 1],
                 [2, 3]])

   b = np.array([[4, 5],
                [6, 7]])

   c = np.array([[8,  9],
                 [10, 11]])

   # vertical
   v = np.vstack((a, b, c))
   print(v.shape)   # (6, 2) 
   print(v)
           # array([[ 0,  1],
           #     [ 2,  3],
           #     [ 4,  5],
           #     [ 6,  7],
           #     [ 8,  9],
           #     [10, 11]])

   # horizontal
   h = np.hstack((a, b, c))
   print(h.shape)   # (2, 6)
   print(h)
           # array([[ 0,  1,  4,  5,  8,  9],   
           #        [ 2,  3,  6,  7, 10, 11]])
   
   # stack: axis 想要增加維度的方向
   h = np.stack([a, b, c], axis=0)
   print(s.shape)  # (3, 2, 2) 三個維度的　2*2 array
   print(s)
                 #   array([[[ 0,  1],
                 #        [ 2,  3]],
                 #
                 #       [[ 4,  5],
                 #        [ 6,  7]],
                 #
                 #       [[ 8,  9],
                 #        [10, 11]]])

   ~~~