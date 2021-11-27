---
layout: "single"
title: 'octave tutorial 2'
permalink: 'ml-coursera/week2/octave-tutorial-2'
tags: octave
---

## [Computing on Data](https://www.coursera.org/learn/machine-learning/lecture/Y6uuC/computing-on-data){:target="_back"}

- matrix multiply
    ~~~
    a = [1 2; 3 4; 5 6]
    a =
    
       1   2
       3   4
       5   6

    b = [11 22; 33 44; 55 66]
    b =
    
       11   22
       33   44
       55   66

    
    c = [1 1; 2 2]
    c =
    
       1   1
       2   2

    a * c 
    >>
    ans =

        5    5
       11   11
       17   17

    % 單乘一個 (times element y only)
    a .* b
    ans =
    
        11    44
        99   176
       275   396

    % .(times element y only) 
    a .^2
    ans =

     1    4
     9   16
    25   36
    
    v = [1; 2; 3]
    v =
    
       1
       2
       3
    
    1 ./ v
    ans =
    
       1.00000
       0.50000
       0.33333
    ~~~

- log
    - [wiki][log-wiki]{:target="_back"}
    - [khan-academy][log-kh]{:target="_back"}
 
    ~~~
    v = [1; 2; 3]
    v =
    
       1
       2
       3
    
    log(v)
    ans =
    
       0.00000
       0.69315
       1.09861
    
    ~~~

- exp
    - [wiki][exp-wiki]{:target="_back"}
    - [khan-academy][log-kh]{:target="_back"}

    ~~~
    exp(v)
    ans =

    2.7183
    7.3891
   20.0855 
    ~~~

- transpose
   ~~~
   A = [1 2; 3 4; 5 6]
   A =

   1   2
   3   4
   5   6

   A'
   ans =

   1   3   5
   2   4   6
   ~~~

- max
  ~~~
  a = [1 15 2 0.5]
  a =

    1.00000   15.00000    2.00000    0.50000 

  max(a)
  15

  A = [1 2; 3 4; 5 6];
  max(A)
  ans = 
     5  6


  a < 3
  ans =

  1  0  1  1

  find(a< 3)
  ans =

   1   3   4
  ~~~




- magic
   ~~~
   % A magic square is an arrangement of the integers '1:n^2' such that
     the row sums, column sums, and diagonal sums are all equal to the
     same value.
    
   A = magic(3)
   A =

   8   1   6
   3   5   7
   4   9   2

   A = magic(9)
   A =
   
      47   58   69   80    1   12   23   34   45
      57   68   79    9   11   22   33   44   46
      67   78    8   10   21   32   43   54   56
      77    7   18   20   31   42   53   55   66
       6   17   19   30   41   52   63   65   76
      16   27   29   40   51   62   64   75    5
      26   28   39   50   61   72   74    4   15
      36   38   49   60   71   73    3   14   25
      37   48   59   70   81    2   13   24   35
   
   sum(A, 1)
   ans =
   
      369   369   369   369   369   369   369   369   369

   sum(A, 2)
   ans =
   
      369
      369
      369
      369
      369
      369
      369
      369
      369
   ~~~

- sum
- prod
- floor
- ceil


- flipud
   ~~~
       flipud(eye(9))
   ans =
   
   Permutation Matrix
   
      0   0   0   0   0   0   0   0   1
      0   0   0   0   0   0   0   1   0
      0   0   0   0   0   0   1   0   0
      0   0   0   0   0   1   0   0   0
      0   0   0   0   1   0   0   0   0
      0   0   0   1   0   0   0   0   0
      0   0   1   0   0   0   0   0   0
      0   1   0   0   0   0   0   0   0
      1   0   0   0   0   0   0   0   0
    ~~~

- pinv
   ~~~
   A = magic(3)
   A =
   
      8   1   6
      3   5   7
      4   9   2
   
   pinv(A)
   ans =
   
      0.147222  -0.144444   0.063889
     -0.061111   0.022222   0.105556
     -0.019444   0.188889  -0.102778
   
   temp = pinv(A);
   temp* A
   ans =
   
      1.00000   0.00000  -0.00000
     -0.00000   1.00000   0.00000
      0.00000   0.00000   1.00000
   ~~~


## [Plotting Data](https://www.coursera.org/learn/machine-learning/lecture/I7gx3/plotting-data)

- plot 
   ~~~
   t = [0 : 0.01 : 0.98]
   y1 = sin(2*pi*4*t)
   plot(t, y1)
   y2 = cos(2*pi*4*t)
   plot(t, y2)
   ~~~
- plot in the same plot 
   ~~~
   t = [0 : 0.01 : 0.98]
   y1 = sin(2*pi*4*t)
   y2 = cos(2*pi*4*t)
   plot(t, y1)
   hold on;
   plot(t, y2, 'r') % 紅色的線
   xlabel('time')
   ylabel('value')
   legend('sin', 'cos')
   title('my plot')
   ~~~

- 出圖
   ~~~
   print -dpng 'xxx.png'
   ~~~

- close
  - close plot

- figure
   ~~~
   figure(1): plot(t, y1);
   figure(2): plot(t, y2)
   ~~~

- subplot
   ~~~
   subplot(1, 2, 1); % Divides plot a 1 x2 grid, access first element
   plot(t,y1)
   subplot(1, 2, 2)
   plot(t,y2)
   ~~~

- imagesc % 水水的格子
   ~~~
   A = magic(9);
   imagesc(A)

   % colorbar
   imagesc(A), colorbar, colormap gray;
   ~~~






 [log-wiki]: https://en.wikipedia.org/wiki/Logarithm
 [log-kh]: https://www.khanacademy.org/math/algebra2/exponential-and-logarithmic-functions
 [exp-wiki]: https://en.wikipedia.org/wiki/Exponential_function