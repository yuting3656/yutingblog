---
layout: 'post'
title: 'SVMs in Practice'
permalink: 'ml-coursera/week7/SVMs-in-practice'
tags: coursera-machine-learning SVM
---

## [Using An SVM](https://www.coursera.org/learn/machine-learning/lecture/sKQoJ/using-an-svm){:target="_back"}

- Using SVM software package to solve for parameters θ

- Need to specify:
   - Choice of parameter C.
   - Choice of kenel (similarity function):
      - No kernel ("linear kernel")

      ~~~                                     
       Predict "y = 1" if θ ^T * x ≥ 0   
       
       θ0 + θ1x1 + ... θnxn ≥ 0,
       ---> n large, m small
      ~~~

      - Gaussian kernel:
      ![Imgur](https://i.imgur.com/sq7r77Wl.gif)

> DO perform __feature scaling__ before using the Gaussian kernel

![Imgur](https://i.imgur.com/SsZZuhFl.gif)


### Other choices of kernel 

![Imgur](https://i.imgur.com/Z2qBLOsl.gif)

### Multi-class clasification

![Imgur](https://i.imgur.com/kgemastl.gif)

### Logistic regression VS. SVMs

~~~
n = number of features
m = number of training examples
~~~

- if `n` is large (relative to `m`):
   - Use **logistic regeression, or SVM without a kernel** ("linear kernel")

- if `n` is small, `m` is intermediate:
   - Use SVM with Gaussian kernel**

- if `n` is small, `m` is large:
   - Create / add more feature, then use **logistic regression or SVM without a kernel**

- Neural nerwork likely to work well for most of these settings, but may be slower to train.

![Imgur](https://i.imgur.com/sTFYFRpl.gif)