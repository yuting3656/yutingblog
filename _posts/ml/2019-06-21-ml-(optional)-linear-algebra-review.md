---
layout: 'post'
title: '數學 - linear algebra review'
permalink: "ml-coursera/week1/linear-algebra-review"
tags: linear-algebra machine-learning
---

> 說到數學補腦好幫手，一定要推薦     [__Khan Academy__][ha-url]{:target="_back"}  ! 生活良伴，時不時看一看，身心清爽，
~~~發大財你   xX~~~，用過都說好棒棒。

## [Matrices and Vectors](https://www.coursera.org/learn/machine-learning/lecture/38jIT/matrices-and-vectors){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/Q6mSN/matrices-and-vectors){:target="_back"}

**[Matrix][matrix-url]{:target="_back"} : Rectangular array of numbers**
~~~
# Dimension of matrix: number of x number of columns

|2 3|
|1 3|  => 3 x 2 matrix
|0 1|
~~~
**[Martix Elements][matrix-elements]{:target="_back"}(entries of matrix)**
~~~
# Aij = " 'i,j entry' in the ith row, jth column. "

   |12 14  -3  6|
A =| 2 18 -10 12| 
   | 1 -9 -10 -2|
   | 3  3  6   1|

A2,4 = 12
A1,3 = -3
A4,2 = 3
A5,1 = undefined (error)
~~~
**[Vector][vector]{:target="_back"}:  An n x 1 matrix**
~~~
# 4 dimensional vector

    |460|
y = |232| 
    |315|
    |178|
-------------------------------    
# yi = ith element

y1 = 460
y2 = 232
-------------------------------
# 1-indexed vs 0-indexed:

    |y1|      |y0|
y = |y2|  y = |y1|   
    |y3|      |y2|
    |y4|      |y3|
1-indexed   0-indexed    
~~~

## [Addition and Scalar Multiplication](https://www.coursera.org/learn/machine-learning/lecture/R4hiJ/addition-and-scalar-multiplication){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/FenyC/addition-and-scalar-multiplication){:target="_back"}

**[Matrix Addition][matrix-addition]{:target="_back"}**
~~~
|1 0|   |4 0.5|   |5 0.5|   
|2 5| + |2   5| = |4  10|  
|3 1|   |0   1|   |3   2|
~~~
**Scalar Multiplication**
> Scalar = real number

~~~
    |1 0|   |3  0|   |1 0|
3 x |2 5| = |6 15| = |2 5| x 3  
    |3 1|   |9  3|   |3 1|

|4 0|            |4 0|   |  1   0 |
|6 3| / 4  = 1/4 |6 3| = | 3/2 3/4|   
~~~
**Combination of Operands**
~~~
# x: Scalar multiplication
# /: Scalar division

    |1|   |0|   |3|
3 x |4| + |0| - |0| / 3
    |2|   |5|   |2|

# +: matrix addition / vector addition
# -: matrix subtraction / vector subtraction

  | 3|   |0|   | 1 |
= |12| + |0| - | 0 |
  | 6|   |5|   |2/3|  

  |  2 |
= | 12 | --> # 3 x 1 matrix / 3-dimensional vector
  |31/3|
~~~

## [Matrix Vector Multiplication](https://www.coursera.org/learn/machine-learning/lecture/aQDta/matrix-vector-multiplication){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/cgVgM/matrix-vector-multiplication){:target="_back"}

~~~
# Example

|1 3|               | 16 |
|4 0|       |1|  =  |  4 |  
|2 1|   x   |5|     |  7 | 
3 x 2     2 x 1    3 x 1  matrix

# Details:
     A             X         x　          =            y
| 　      |                |   |   　       　       |   |
| 　      |        X       |   |   　     =　        |   |
| 　      |                |   |   　       　       |   |
m x n matrix              n x 1 matrix 
(m rows, n cloumns)       (n-dimentional vector)    m-dimensional vector
~~~

**Hypothesis Example:**
~~~
House sizes:
   2104
   1416               hθ(x) = -40 + 0.25x 
   1534
   852
 
(4,2) Matrix      (2,1) vector           (4,1) Matrix

| 1  2104 |                        | -40 x 1 + 2104 x 0.25 |
| 1  1416 |   x   | -40  |    =    | -40 x 1 + 1416 x 0.25 |
| 1  1534 |       | 0.25 |         | -40 x 1 + 1534 x 0.25 |
| 1   852 |                        | -40 x 1 +  852 x 0.25 |

DataMatrix    x    Parameters   =   prediction

~~~


## [Matrix Matrix Multiplication](https://www.coursera.org/learn/machine-learning/lecture/dpF1j/matrix-matrix-multiplication){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/l0myT/matrix-matrix-multiplication){:target="_back"}

~~~
     A             X           B      　        =              C
| 　      |                |         |   　       　       |       |
| 　      |        X       |         |   　     =　        |       |
| 　      |                |         |   　       　       |       |
m x n matrix              n x o matrix 
(m rows, n cloumns)       (n row, o columns)               m x o  matrix

~~~

**Example:**
~~~
|1  3|   |0 1|    |  9   7 | 
|2  5| x |3 2|  = | 15  12 |

# 可拆成這樣看：

|1  3|   |0|    | 1*0 + 3*3 |    | 9|
|2  5| x |3|  = | 2*0 + 5*3 | =  |15|    

|1  3|   |1|    | 1*0 + 3*3 |     | 7|
|2  5| x |2|  = | 2*0 + 5*3 |  =  |12|
~~~

**Hypothesis Example:**
~~~
House sizes:         Have 3 competing hypotheses:
   2104
   1416               1. hθ(x) = -40 + 0.25x 
   1534               2. hθ(x) = 200 + 0.1x
   852                3. hθ(x) = -150 + 0.4x
 
 Matrix          Matrix                        Matrix

| 1  2104 |                                | 486 410 692 |
| 1  1416 |   x   | -40  200 -150 |   =    | 314 342 416 |
| 1  1534 |       | 0.25 0.1  0.4 |        | 344 353 464 |
| 1   852 |                                | 173 285 191 |

DataMatrix    x    Parameters   =       prediction
                         | (prediction of 1:hθ) (prediction of 1:hθ) (prediction of 3:hθ)|
                         | (prediction of 1:hθ) (prediction of 1:hθ) (prediction of 3:hθ)| 
                         | (prediction of 1:hθ) (prediction of 1:hθ) (prediction of 3:hθ)| 
                         | (prediction of 1:hθ) (prediction of 1:hθ) (prediction of 3:hθ)| 
~~~


## [Matrix Multiplication Properties](https://www.coursera.org/learn/machine-learning/lecture/dpF1j/matrix-matrix-multiplication){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/Xl0xT/matrix-multiplication-properties){:target="_back"}

**Not Coummutative:**

> note: A and B be matrices. Then in general, A x B != B x A (not commutative)

~~~
# Example:

  A    x   B 

|1  1|   |0 0|    | 2  0 | 
|0  0| x |2 0|  = | 0  0 |

|0  0|   |1  1|    | 0  0 | 
|2  0| x |0  0|  = | 2  2 |

# A and B are matrices
A x B  !=  B x A

~~~


**Associative:**
~~~
3 x 5 x 2 

# Associative: 
3 x ( 5 x 2 ) = ( 3 x 5 ) x 2
3 x 10 = 30 = 15 x 2

Matirx:
A x B x C 
Let D = B x c, Compute A x D
Let E = A x B, Compute E x C 
~~~

**Identity Matrix**
> 1 is identiy,  1 x Z = Z x 1 = Z ( for any z )

~~~
# Denoted I (or I nxn)
# Examples of identity matrices:

 2 x 2        3 x 3         4 x 4
| 1 0 |     | 1 0 0 |     | 1 0 0 0 |                             
| 0 1 |     | 0 1 0 |     | 0 1 0 0 |                   
            | 0 0 1 |     | 0 0 1 0 |   
                          | 0 0 0 1 |          

For any matrix A:
A     *   I    =   I   *    A    =   A
(m, n)  (n, n)   (m, m)   (m, m)   (m, n )
~~~

## [Inverse and Transpose](https://www.coursera.org/learn/machine-learning/lecture/FuSWY/inverse-and-transpose){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/EcNto/inverse-and-transpose){:target="_back"}

**Inverse:**
~~~
1: identity
3 x ( 3^-1 ) = 1
12 x ( 12^-1 ) = 1
~~~
> Not all numbers have an inverse.
~~~
0(0^-1) ==> (0^0-1): undefined
~~~


**Matrix inverse:**
> if A is an `m x m [square matrix]` matrix, and __if it has an inverse__,

~~~
if A is an m x m matrix, and if it has an inverse,

A(A^-1) = (A^-1)A = I
~~~
> m x m `[square matrix]`
>
Example:
~~~
|3  4|   |  0.4   -0.1 |    | 1  0 | 
|2 16| x |-0.005  0.075|  = | 0  1 | =  I 2x2
  A             A^-1          A^-1A
~~~
- Matrices that don't have an inverse are "singular" or "degenerate"


**Matrix Transpose:**
~~~
Example:        
A  =  |1 2 0|      A^T = |1  3|
      |3 5 9|            |2  5|
                         |0  9|

Let A be an m x n matrix, and let B = A^T.
Then B is an n x m matrix, and 

B(i,j) = A(j,i)

~~~


[ha-url]: https://www.khanacademy.org/
[matrix-url]: https://www.khanacademy.org/math/precalculus/precalc-matrices
[matrix-elements]: https://www.khanacademy.org/math/precalculus/precalc-matrices/intro-to-matrices/e/understand-matrix-coordinates
[vector]: https://www.khanacademy.org/math/precalculus/vectors-precalc
[matrix-addition]: https://www.khanacademy.org/math/precalculus/precalc-matrices/adding-and-subtracting-matrices/e/matrix_addition_and_subtraction