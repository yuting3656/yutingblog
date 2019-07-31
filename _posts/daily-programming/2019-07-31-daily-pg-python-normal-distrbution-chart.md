---
layout: 'post'
title: 'daily Programming: python normal distribution chart'
permalink: 'daily-programming/normal-distribution-chart'
tags: daily-programming python 
---

> 飆了一整天的統計，就來最基本的常態分佈圖吧！

~~~python
import matplotlib.pyplot as plt
import numpy as np
import scipy.stats as stats
import math

mu = 0
variance = 1
sigma = math.sqrt(variance)
x = np.linspace( mu - 3 *sigma, mu + 3*sigma, 100 )
plt.plot(x, stats.nprm.pdf(x, mu, sigma))
plt.show()
~~~

![Imgur](https://i.imgur.com/tNTxAH0.gif)