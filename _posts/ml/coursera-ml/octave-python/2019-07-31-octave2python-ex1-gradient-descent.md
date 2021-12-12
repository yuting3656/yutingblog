---
layout: "single"
title: 'octave2python: ex1-gradient-descent'
permalink: 'octave2python/ex1-gradient-descent'
tags: coursera-machine-learning octave2python
---

> 馬步扎穩!! 我發現這練習真的太棒了!

- [exercise 1 IPYNB](https://github.com/dibgerge/ml-coursera-python-assignments/tree/master/Exercise1){:target="_back"}


### EX1: gradient descent

- Octave

~~~
function [theta, J_history] = gradientDescent(X, y, theta, alpha, num_iters)
%GRADIENTDESCENT Performs gradient descent to learn theta
%   theta = GRADIENTDESCENT(X, y, theta, alpha, num_iters) updates theta by 
%   taking num_iters gradient steps with learning rate alpha

% Initialize some useful values
m = length(y); % number of training examples
J_history = zeros(num_iters, 1);

for iter = 1:num_iters

    % ====================== YOUR CODE HERE ======================
    % Instructions: Perform a single gradient step on the parameter vector
    %               theta. 
    %
    % Hint: While debugging, it can be useful to print out the values
    %       of the cost function (computeCost) and gradient here.
    %

    % predictions = X * theta
    % errors = predictions - y
    % delta = (1/m) * X' * errors
    % theta = theta - alpha * delta

    

    x = X(:,2);
    h = theta(1) + (theta(2)*x);

    theta_zero = theta(1) - alpha * (1/m) * sum(h-y);
    theta_one  = theta(2) - alpha * (1/m) * sum((h - y) .* x);

    theta = [theta_zero; theta_one];


    % ============================================================

    % Save the cost J in every iteration    
    J_history(iter) = computeCost(X, y, theta);

end

end
~~~

- python

~~~python
def gradientDescent(X, y, theta, alpha, num_iters):
    """
    Performs gradient descent to learn `theta`. Updates theta by taking `num_iters`
    gradient steps with learning rate `alpha`.
    
    Parameters
    ----------
    X : array_like
        The input dataset of shape (m x n+1).
    
    y : arra_like
        Value at given features. A vector of shape (m, ).
    
    theta : array_like
        Initial values for the linear regression parameters. 
        A vector of shape (n+1, ).
    
    alpha : float
        The learning rate.
    
    num_iters : int
        The number of iterations for gradient descent. 
    
    Returns
    -------
    theta : array_like
        The learned linear regression parameters. A vector of shape (n+1, ).
    
    J_history : list
        A python list for the values of the cost function after each iteration.
    
    Instructions
    ------------
    Peform a single gradient step on the parameter vector theta.

    While debugging, it can be useful to print out the values of 
    the cost function (computeCost) and gradient here.
    """
    # Initialize some useful values
    m = y.shape[0]  # number of training examples
    
    # make a copy of theta, to avoid changing the original array, since numpy arrays
    # are passed by reference to functions
    theta = theta.copy()
    
    J_history = [] # Use a python list to save cost in every iteration
    
    for i in range(num_iters):
        # ==================== YOUR CODE HERE =================================
        theta = theta - (alpha/m) * np.sum((np.dot(X, theta)-y)[:, None]*X, axis=0)
        J_history.insert(i, computeCost(X, y, theta))
        print('Cost function: ', J_history[i])
        # =====================================================================
        
        # save the cost J in every iteration
        # J_history.append(computeCost(X, y, theta))
    
    return theta, J_history
~~~