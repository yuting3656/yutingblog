---
layout: 'post'
title: 'octave tutorial'
permalink: 'ml-coursera/week2/octave-tutorial'
tags: octave
---

## [Octave - Basic Operations](https://www.coursera.org/learn/machine-learning/lecture/9fHfl/basic-operations){:target="_back"}

- 基本
    ~~~
    # 普通運算
    5 + 6 
    3 - 2
    5 * 8
    1 / 2 
    2 ^ 8
    
    # 判斷
    1 == 2  (等於) --->  0 [false]
    1 ~= 2  (不等於) ---> 1 [true]
    
    # 邏輯
    
    1 && 0 (AND)
    1 || 0 (OR)
    
    xor(1,0)
    ~~~
- 變數
    ~~~
    a = 3
    >> a = 3

    % semicolon supressing output
    a = 3;
    ~~~
- print 出來
    ~~~octave
    a = 3;
    a
    >> a = 3

    b = pi; 
    disp(b)
    >> 3.1416

    % 印string
    disp(sprintf('2 decimals: %0.2f', b))
    >> 2 decimals: 3.14

    % formt
    format long
    b
    >> b = 3.141592653589793

    format short 
    b 
    >> b =  3.1416
    ~~~

- vectors and matrix
    ~~~
    % Matrix:
    A = [1 2; 3 4; 5 6]
    A =
  
     1   2
     3   4
     5   6

    % (1,3) matrix
    v = [1 2 3]
    v =
       1   2   3
    
    % column vector 
    % (3,1) vector:

    v = [1; 2; 3]
    v =
         1
         2
         3

    
    % v = (start):(increment step):(end)
    v = 1:0.1:2 
    v =
        1.0000    1.1000    1.2000    1.3000    1.4000    1.5000    1.6000    1.7000    1.8000    1.9000    2.0000
        % (1,11) matrix

    
    % ones matrix
    ones(2,3)
    ans =

       1   1   1
       1   1   1

    c = 2 * ones(2,3)
    c =

       2   2   2
       2   2   2

    
    % zeros matrix
    w = zeros(1, 3)
    z =

        0   0   0

    % random matrix
    rand(3, 3)
    ans =

        0.423904   0.116361   0.585396
        0.372444   0.481492   0.365303
        0.079343   0.557110   0.843614
    
    % random normal distribution
    randn(1, 3)

    ans =
    
      -0.051417   1.221825  -0.964078

    
    % identity matrix
    eye(4)
    ans =

        Diagonal Matrix
        
           1   0   0   0
           0   1   0   0
           0   0   1   0
           0   0   0   1

    ~~~

- 出圖
    ~~~
    w = -6 + sqrt(10)*(randn(1, 10000));
    hist(w)
    
    % 
    eye()
    ~~~
- help

    ~~~
    help eye 
    >>
    'eye' is a built-in function from the file libinterp/corefcn/data.cc

    eye (N)
    eye (M, N)
    eye ([M N])
    eye (..., CLASS)
     Return an identity matrix.

     If invoked with a single scalar argument N, return a square NxN
     identity matrix.

     If supplied two scalar arguments (M, N), 'eye' takes them to be the
     number of rows and columns.  If given a vector with two elements,
     'eye' uses the values of the elements as the number of rows and
     columns, respectively.  For example:

          eye (3)
           =>  1  0  0
               0  1  0
               0  0  1

     The following expressions all produce the same result:

          eye (2)
          ==
          eye (2, 2)
          ==
          eye (size ([1, 2; 3, 4]))

     The optional argument CLASS, allows 'eye' to return an array of the
     specified type, like

          val = zeros (n,m, "uint8")

     Calling 'eye' with no arguments is equivalent to calling it with an
     argument of 1.  Any negative dimensions are treated as zero.  These
     odd definitions are for compatibility with MATLAB.

    See also: speye, ones, zeros.
    ~~~


## [Moving Data Around](https://www.coursera.org/learn/machine-learning/lecture/SZJIc/moving-data-around){:target="_back"}

- size & length
    ~~~
    A = [1 2; 3 4; 5 6]
    A =

       1   2
       3   4
       5   6
    size(A)
    ans = 
        3  2

    size(A, 1)
    >> ans = 3
    size(A, 2)
    >> ans = 2


    % length --> return the longest value (row or column)
    v = [1, 3, 4, 5, 9]
    length(v)
    >> ans = 5

    length(A)
    >> ans = 3

    length([10;22;33;44;55;100])
    >> ans = 6
    ~~~

- load data
    ~~~
    % pwd (show current directory)
    Ex:
    pwd 
    >>  ans = E:\Coursera\Machine_Learning\octave-5.1.0-w64

    % cd 
    你知我知

    % ls 
    我知你知

    % load
    load xxx.files
    load('xxx.files')

    % who - showing what variables in octave 
    EX:
    who
    >>
    Variables in the current scope:

    A    a    ans  b    c    v    w    z

    % whos - give you detail
    EX:
    whos
    >>
    Variables in the current scope:
    
       Attr Name        Size                     Bytes  Class
       ==== ====        ====                     =====  =====
            A           3x2                         48  double
            a           1x1                          8  double
            ans         1x45                        45  char
            b           1x1                          8  double
            c           2x3                         48  double
            v           1x4                         32  double
            w           1x10000                  80000  double
            z           1x3                         24  double
    
    Total is 10066 elements using 80213 bytes


    % clear - clear variable
    EX:
    clear A
    whos
    >>
    Variables in the current scope:
    
       Attr Name        Size                     Bytes  Class
       ==== ====        ====                     =====  =====
            a           1x1                          8  double
            ans         1x45                        45  char
            b           1x1                          8  double
            c           2x3                         48  double
            v           1x4                         32  double
            w           1x10000                  80000  double
            z           1x3                         24  double
    
    Total is 10066 elements using 80213 bytes

    % save - save file 
    EX:
    save xxx.txt a %save variable a to xxx.txt in current pwd
    ~~~

- manipulate variable
   ~~~
   A = [1 2; 3 4; 5 6]
   A =
   
      1   2
      3   4
      5   6

   A(3,2)
   ans = 6

   % ":" means every element along that row/column
   A(2, :)
   ans = 

    3  4
 
   A(:, 2)
   ans =
  
     2
     4
     6
   
   A(:, 2) = [10; 11; 12]
   A =

     1   10
     3   11
     5   12
   
   % append another column vector to right
   A = [A, [100; 101; 102]]

   A =

     1    10   100
     3    11   101
     5    12   102

   % put all elements of A into a single vector
   A(:)
   ans =

      1
      3
      5
     10
     11
     12
    100
    101
    102
 
   % concat matrix
   A = [ 1 2; 3 4; 5 6]
   B = [11 12; 13 14; 15 16]
   C = [A B]

   C =

    1    2   11   12
    3    4   13   14
    5    6   15   16

   C = [A; B]
   C =

     1    2
     3    4
     5    6
    11   12
    13   14
    15   16
   ~~~