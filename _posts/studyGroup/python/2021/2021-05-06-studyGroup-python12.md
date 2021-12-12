---
layout: "single"
title: 'Study Group: 巾凡哥出品 品質保證 python 12 (numpy)'
permalink: 'stydeGroup/python-12'
tags: 讀書會 python jupyter-notebook numpy
---

~~~py 
a = np.array([1, 2, 3, 4, 5])

"""
array([1, 2, 3, 4, 5, 6])
"""
~~~

~~~py
np.zeros(10)

"""
array([0., 0., 0., 0., 0., 0., 0., 0., 0., 0.])
"""
~~~

~~~py
a = np.ones(10)

"""
array([1., 1., 1., 1., 1., 1., 1., 1., 1., 1.])
"""
~~~

~~~py
np.empty(5)

"""
array([ 1.  ,  2.75,  6.  , 10.75, 17.  ])
"""
~~~

~~~py
np.arange(5)

np.arange(2, 9, 2)

"""
array([2, 4, 6, 8])
"""
~~~

~~~py
np.linspace(1, 100, num=10)

"""
array([  1.,  12.,  23.,  34.,  45.,  56.,  67.,  78.,  89., 100.])
"""
~~~

~~~py
np.ones(10, dtype=np.float64)

"""
array([1., 1., 1., 1., 1., 1., 1., 1., 1., 1.])
"""
~~~


~~~py
v = np.array([2, 1, 5, 3, 7, 4, 6, 8])
np.sort(v)

"""
array([1, 2, 3, 4, 5, 6, 7, 8])
"""
~~~

~~~py
a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])
np.concatenate((a,b))

"""
array([1, 2, 3, 4, 5, 6, 7, 8])
"""
~~~

~~~py
np.array([[0,1,2,3],[4,5,6,7]])

"""
array([[0, 1, 2, 3],
       [4, 5, 6, 7]])
"""
~~~

~~~py
array_example = np.array([  [ [0, 1, 2, 3],
                              [4, 5, 6, 7]],
                            
                           [[0, 1, 2, 3],
                            [4, 5, 6, 7]],
                            
                           [[0 ,1 ,2, 3],
                            [4, 5, 6, 7]]])
array_example.ndim  # dimension


"""
3
"""
~~~

~~~py
array_example.size
"""
24
"""
~~~

~~~py
array_example.shape

"""
(3, 2, 4)
"""
~~~

~~~py
a =np.arange(12)
a

"""
array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11])
"""

a < 4


"""
array([ True,  True,  True,  True, False, False, False, False, False,
       False, False, False])
"""
~~~

~~~py
a[a==4]

"""
array([4])

"""
~~~


~~~py
a = np.array([[1 , 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
a

"""
array([[ 1,  2,  3,  4],
       [ 5,  6,  7,  8],
       [ 9, 10, 11, 12]])
"""
~~~

~~~py
a[ (a > 5) & (a<10) ]

"""
array([6, 7, 8, 9])
"""

a

"""
array([[ 1,  2,  3,  4],
       [ 5,  6,  7,  8],
       [ 9, 10, 11, 12]])
"""
~~~

~~~py
np.nonzero( (a > 5) & (a<10))

"""
(array([1, 1, 1, 2]), array([1, 2, 3, 0]))

"""
~~~

~~~py
a1 = np.array([[1, 1],
               [2, 2]])
               
a2 = np.array([[3, 3],
               [4, 4]])

a1

"""
array([[1, 1],
       [2, 2]])
"""

a2

"""
array([[3, 3],
       [4, 4]])
"""
~~~

~~~py
np.vstack((a1, a2))


"""
array([[1, 1],
       [2, 2],
       [3, 3],
       [4, 4]])
"""
~~~

~~~py
np.concatenate((a1, a2))

"""
array([[1, 1],
       [2, 2],
       [3, 3],
       [4, 4]])
"""
~~~

~~~py
np.hstack((a1, a2))


"""
array([[1, 1, 3, 3],
       [2, 2, 4, 4]])
"""
~~~


~~~py
x = np.arange(1, 25).reshape(4, 6)
x

"""
array([[ 1,  2,  3,  4,  5,  6],
       [ 7,  8,  9, 10, 11, 12],
       [13, 14, 15, 16, 17, 18],
       [19, 20, 21, 22, 23, 24]])
"""
~~~

~~~py
np.vsplit(x, 4)


"""
np.vsplit(x, 4)
np.vsplit(x, 4)
[array([[1, 2, 3, 4, 5, 6]]),
 array([[ 7,  8,  9, 10, 11, 12]]),
 array([[13, 14, 15, 16, 17, 18]]),
 array([[19, 20, 21, 22, 23, 24]])]
"""
~~~

~~~py
np.hsplit(x, 3)

"""
[array([[ 1,  2],
        [ 7,  8],
        [13, 14],
        [19, 20]]),
 array([[ 3,  4],
        [ 9, 10],
        [15, 16],
        [21, 22]]),
 array([[ 5,  6],
        [11, 12],
        [17, 18],
        [23, 24]])]
"""
~~~


~~~py
a = np.arange(5)
b = np.arange(1,6)

a

"""
array([0, 1, 2, 3, 4])
"""

b 

"""
array([1, 2, 3, 4, 5])
"""
~~~


~~~py
 a / 5

 """
 array([0. , 0.2, 0.4, 0.6, 0.8])

 """
~~~

~~~py
a.max()
# 4

a.min()
# 0

a.sum()
# 10
~~~