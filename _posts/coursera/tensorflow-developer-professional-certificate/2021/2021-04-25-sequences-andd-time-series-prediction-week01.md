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


# Intorductin to time series in [python](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%204%20-%20S%2BP/S%2BP_Week_1_Lesson_2.ipynb){:target="_back"}

~~~py
import numpy as np
import matplotlib.pyplot as plt
~~~

~~~py
def plot_series(times, series, format="-"):
    plt.figure(figsize=[10, 6])
    plt.plot(time, series, format)
    plt.xlabel("time")
    plt.ylabel("value")
    plt.grid(True)
~~~

~~~py
def trend(time, slope=0):
    return slope * time
~~~

~~~py
time = np.arange( 4 * 365 + 1)
"""
array([   0,    1,    2, ..., 1458, 1459, 1460])
"""
~~~

~~~py
baseline = 10
series = trend(time, 0.1)
plot_series(time, series)
plt.show()
~~~

![Imgur](https://i.imgur.com/PnVx7Zb.png)

- Seasonal Pattern

~~~py
def seasonal_pattern(season_time):
    return np.where(season_time < 0.4,
                    np.cos(season_time * 2 * np.pi),
                    1 / np.exp(3 * season_time))
~~~

~~~py
def seasonality(time, period, amplitude=1, phase=0):
    season_time = ((time + phase) % period) / period
    return amplitude * seasonal_pattern(season_time)
~~~

~~~py
baseline = 10
amplitude = 40
series = seasonality(time, period=365, amplitude=amplitude)
plot_series(time, series)
plt.show()
~~~

![Imgur](https://i.imgur.com/SVLRcmW.png)

~~~py
slope = 0.05
series = baseline + trend(time, slope) + seasonality(time, period=365, amplitude=amplitude)
plot_series(time, series)
plt.show()
~~~

![Imgur](https://i.imgur.com/xnaqp32.png)

- with **NOISE**

~~~py
def noise(time, noise_level=1, seed=None):
    rnd = np.random.RandomState(seed)
    return rnd.randn(len(time)) * noise_level
~~~

~~~py
noise_level = 15
noisy_series = series + noise(time, noise_level, seed=42)
plot_series(time, noisy_series)
plt.show()
~~~

![Imgur](https://i.imgur.com/GKevTfn.png)