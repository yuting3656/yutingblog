---
layout: 'post'
title: 'daily Programming: numpy clip'
permalink: 'daily-programming/numpy-clip'
tags: daily-programming numpy
---

> 魔鬼都在細節裡!

> 在寫 Coursera DL 的作業時，gradient descent 的練習竟然用到這招!! 好厲害的 `紅螞蟻` 阿!!

- [np.clip](https://docs.scipy.org/doc/numpy-1.13.0/reference/generated/numpy.clip.html){:target="_back"}

~~~python
### GRADED FUNCTION: clip

def clip(gradients, maxValue):
    '''
    Clips the gradients' values between minimum and maximum.
    
    Arguments:
    gradients -- a dictionary containing the gradients "dWaa", "dWax", "dWya", "db", "dby"
    maxValue -- everything above this number is set to this number, and everything less than -maxValue is set to -maxValue
    
    Returns: 
    gradients -- a dictionary with the clipped gradients.
    '''
    
    dWaa, dWax, dWya, db, dby = gradients['dWaa'], gradients['dWax'], gradients['dWya'], gradients['db'], gradients['dby']
   
    ### START CODE HERE ###
    # clip to mitigate exploding gradients, loop over [dWax, dWaa, dWya, db, dby]. (≈2 lines)
    for gradient in [dWax, dWaa, dWya, db, dby]:
        np.clip(gradient, -maxValue, maxValue, out=gradient)
    ### END CODE HERE ###
    
    gradients = {"dWaa": dWaa, "dWax": dWax, "dWya": dWya, "db": db, "dby": dby}
    
    return gradients
~~~