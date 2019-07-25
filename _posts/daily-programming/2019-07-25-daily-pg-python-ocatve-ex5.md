---
layout: 'post'
title: 'daily Programming: python coursera-machine-learning octave2python'
permalink: 'daily-programming/coursera-machine-learning-octave2python'
tags: daily-programming python octave
---

> 昨天第一天上課，下午上課: **人工智慧概觀** ，把 4 個多月的課一次講完超快 ! XD 
> <br/>__BUT__，因為自己規劃的 [coursera: machine-learning](https://www.coursera.org/learn/machine-learning){:target="_back"} 這禮拜已經到 week6~
> <br/>所以整堂聽得超過癮的兒~~~ 很有感覺 :smile:  YA ! 棒棒 !
> <br/>coursera 課的程式實作是 octave，接下來 aiacademy 用的都是 python
> <br/>為了讓讀書更有效率且可以兼顧 coursera & aiacademy 的課 那就把 octave 轉成 python 吧~~

- 好:heart:的大神們整理的: [ml-coursera-python-assignments](https://github.com/dibgerge/ml-coursera-python-assignments)

- 那今天的小練習，就練習 week6 的 ex5 裡面的: __Regularized linear regression cost function__ 
   ![Imgur](https://i.imgur.com/6houez3.gif)

- 甚麼是 learning cure ? [看我的筆記~~~](https://yuting3656.github.io/yutingblog/ml-coursera/week6/evaluating-a-learning-algrithm2){:target="_back"}


### Octave

~~~octave
function [J, grad] = linearRegCostFunction(X, y, theta, lambda)
%LINEARREGCOSTFUNCTION Compute cost and gradient for regularized linear 
%regression with multiple variables
%   [J, grad] = LINEARREGCOSTFUNCTION(X, y, theta, lambda) computes the 
%   cost of using theta as the parameter for linear regression to fit the 
%   data points in X and y. Returns the cost in J and the gradient in grad

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;
grad = zeros(size(theta));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost and gradient of regularized linear 
%               regression for a particular choice of theta.
%
%               You should set J to the cost and grad to the gradient.
%


h = X * theta;
errors = h -y;
J = sumsq(errors) / (2*m);
grad = (1/m) * X' * errors;

% regularization
J = J + (lambda / (2 * m)) * sumsq(theta(2:end));
grad = grad + (lambda /m) * [0; theta(2:end)];



% =========================================================================

grad = grad(:);

end

~~~


### Python

~~~python
def linearRegCostFunction(X, y, theta, lambda_=0.0):
    """
    Compute cost and gradient for regularized linear regression 
    with multiple variables. Computes the cost of using theta as
    the parameter for linear regression to fit the data points in X and y. 
    
    Parameters
    ----------
    X : array_like
        The dataset. Matrix with shape (m x n + 1) where m is the 
        total number of examples, and n is the number of features 
        before adding the bias term.
    
    y : array_like
        The functions values at each datapoint. A vector of
        shape (m, ).
    
    theta : array_like
        The parameters for linear regression. A vector of shape (n+1,).
    
    lambda_ : float, optional
        The regularization parameter.
    
    Returns
    -------
    J : float
        The computed cost function. 
    
    grad : array_like
        The value of the cost function gradient w.r.t theta. 
        A vector of shape (n+1, ).
    
    Instructions
    ------------
    Compute the cost and gradient of regularized linear regression for
    a particular choice of theta.
    You should set J to the cost and grad to the gradient.
    """
    # Initialize some useful values
    m = y.size # number of training examples

    # You need to return the following variables correctly 
    J = 0
    grad = np.zeros(theta.shape)

    # ====================== YOUR CODE HERE ======================
    theta = np.array([1, 1])
    J, _ = linearRegCostFunction(np.concatenate([np.ones((m, 1)), X], axis=1), y, theta, 1)

    print('Cost at theta = [1, 1]:\t   %f ' % J)
    print('This value should be about 303.993192)\n' % J)


    # ============================================================
    return J, grad
~~~

> YA! 開工~
> 接下來 就從 ex1 一題一題的練起來 :)
