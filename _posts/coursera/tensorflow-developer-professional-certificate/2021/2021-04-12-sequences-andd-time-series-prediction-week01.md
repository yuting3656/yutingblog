---
layout: 'post'
title: 'Coursera Tensorflow Developer Professional Certificate - Sequences, Time Series and Prediction week01-02'
permalink: 'coursera-tensorflow-developer-professional-certificate/sequences-time-series-and-prediction/week01-02'
tags: coursera-tensorflow-developer-professional-certificate time-series sequences
---


# Introduction to time series in python

~~~python
import numpy as np
import matplotlib.pyplot as plt
~~~

~~~python
def plot_series(time, series, format="-"):
    plt.figure(figsize=(10, 6))
    plt.plot(time, series, format)
    plt.xlabel("time")
    plt.ylabel("value")
    plt.grid(True)
~~~

~~~python
def trend(time, slope=0):
    return slop * time
~~~

~~~python
time = np.aragne(4 * 365 + 1)
baseline = 10
series = trend(time, 0.1)
plot_series(time, series)
plt.show()
~~~

|![Imgur](https://i.imgur.com/UsdQ6nj.png)|