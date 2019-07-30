---
layout: 'post'
title: 'daily Programming: python coursera-machine-learning octave2python ex1'
permalink: 'daily-programming/coursera-machine-learning-octave2python-ex1'
tags: daily-programming python octave
---

> 速度看看別人的 code 才能長高長胖!
- [exercise 1 IPYNB](https://github.com/dibgerge/ml-coursera-python-assignments/tree/master/Exercise1){:target="_back"}

### import 的資料

   ~~~python
   # used for manipulating directory paths
   import os
   
   # Scientific and vector computation for python
   import numpy as np
   
   # Plotting library
   from matplotlib import pyplot
   from mpl_toolkits.mplot3d import Axes3D  # needed to plot 3-D surfaces
   
   # library written for this exercise providing additional functions for assignment    submission, and others
   import utils
   
   # define the submission/grader object for this exercise
   grader = utils.Grader()
   ~~~

### Octave: Compute cost for one variable

~~~
function J = computeCost(X, y, theta)
%COMPUTECOST Compute cost for linear regression
%   J = COMPUTECOST(X, y, theta) computes the cost of using theta as the
%   parameter for linear regression to fit the data points in X and y

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta
%               You should set J to the cost.

predictions = X * theta;
sqrError = (predictions - y) .^2;

J = 1/(2 *m) * sum(sqrError);


% =========================================================================

end
~~~

### python

~~~python
def computeCost(X, y, theta):
    """
    Compute cost for linear regression. Computes the cost of using theta as the
    parameter for linear regression to fit the data points in X and y.
    
    Parameters
    ----------
    X : array_like
        The input dataset of shape (m x n+1), where m is the number of examples,
        and n is the number of features. We assume a vector of one's already 
        appended to the features so we have n+1 columns.
    
    y : array_like
        The values of the function at each data point. This is a vector of
        shape (m, ).
    
    theta : array_like
        The parameters for the regression function. This is a vector of 
        shape (n+1, ).
    
    Returns
    -------
    J : float
        The value of the regression cost function.
    
    Instructions
    ------------
    Compute the cost of a particular choice of theta. 
    You should set J to the cost.
    """
    
    # initialize some useful values
    m = y.size  # number of training examples
    
    # You need to return the following variables correctly
    J = 0
    
    # ====================== YOUR CODE HERE =====================

    J = 1/(2*m) * (np.sum((np.dot(X, theta)-y)**2))
    # ===========================================================
    return J
~~~

### 這練習超棒!! 一堆眉梅角腳~~

 - python 的[解答](https://github.com/deyachatterjee/ml-andrewng-python){:target="_back"}

 - 寫好後丟上[github](https://github.com/yuting3656/ml-coursera-octave2python){:target="_back"}，這樣馬步紮得穩！


> 開工！