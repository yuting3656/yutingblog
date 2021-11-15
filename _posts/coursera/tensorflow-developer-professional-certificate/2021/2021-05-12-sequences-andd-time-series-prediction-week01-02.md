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

   - In practice few real-life time series have such a smooth signal. They usually have some noise, and the signal-to-noise ratio can sometimes be very low. Let's generate some white noise:

~~~py
def white_noise(time, noise_level=1, seed=None):
    rnd = np.random.RandomState(seed)
    return rnd.randn(len(time)) * noise_level
~~~

~~~py
noise_level = 5
noise = white_noise(time, noise_level, seed=42)

plt.figure(figsize=(10, 6))
plot_series(time, noise)
plt.show()
~~~

![Imgur](https://i.imgur.com/KU4FaYw.png)

- Now let's add this white noise to the time series:

~~~py
series += noise

plt.figure(figsize=(10, 6))
plot_series(time, series)
plt.show()
~~~

![Imgur](https://i.imgur.com/d8qURol.png)


### All right, this looks realistic enough for now. Let's try to forecast it. We will split it into two periods: the training period and the validation period (in many cases, you would also want to have a test period). The split will be at time step 1000.

~~~py
split_time = 1000
time_train = time[:split_time]
x_train = series[:split_time]
time_valid = time[split_time:]
x_valid = series[split_time:]
~~~

~~~py
def autocorrelation(time, amplitude, seed=None):
    rnd = np.random.RandomState(seed)
    φ1 = 0.5
    φ2 = -0.1
    ar = rnd.randn(len(time) + 50)
    ar[:50] = 100
    for step in range(50, len(time) + 50):
        ar[step] += φ1 * ar[step - 50]
        ar[step] += φ2 * ar[step - 33]
    return ar[50:] * amplitude
~~~

~~~py
def autocorrelation(time, amplitude, seed=None):
    rnd = np.random.RandomState(seed)
    φ = 0.8
    ar = rnd.randn(len(time) + 1)
    for step in range(1, len(time) + 1):
        ar[step] += φ * ar[step - 1]
    return ar[1:] * amplitude
~~~

~~~py
series = autocorrelation(time, 10, seed=42)
plot_series(time[:200], series[:200])
plt.show()
~~~

![Imgur](https://i.imgur.com/2ASO9Kc.png)

~~~py
series = autocorrelation(time, 10, seed=42) + trend(time, 2)
plot_series(time[:200], series[:200])
plt.show()
~~~

![Imgur](https://i.imgur.com/VqStT78.png)


~~~py
series = autocorrelation(time, 10, seed=42) + seasonality(time, period=50, amplitude=150) + trend(time, 2)
plot_series(time[:200], series[:200])
plt.show()
~~~

![Imgur](https://i.imgur.com/NDeANcs.png)

~~~py
series = autocorrelation(time, 10, seed=42) + seasonality(time, period=50, amplitude=150) + trend(time, 2)
series2 = autocorrelation(time, 5, seed=42) + seasonality(time, period=50, amplitude=2) + trend(time, -1) + 550
series[200:] = series2[200:]
#series += noise(time, 30)
plot_series(time[:300], series[:300])
plt.show()
~~~

![Imgur](https://i.imgur.com/abh5Sn4.png)


~~~py
def impulses(time, num_impulses, amplitude=1, seed=None):
    rnd = np.random.RandomState(seed)
    impulse_indices = rnd.randint(len(time), size=10)
    series = np.zeros(len(time))
    for index in impulse_indices:
        series[index] += rnd.rand() * amplitude
    return series    
~~~

~~~py
series = impulses(time, 10, seed=42)
plot_series(time, series)
plt.show()
~~~

![Imgur](https://i.imgur.com/NmBBNAb.png)

~~~python
def autocorrelation(source, φs):
    ar = source.copy()
    max_lag = len(φs)
    for step, value in enumerate(source):
        for lag, φ in φs.items():
            if step - lag > 0:
              ar[step] += φ * ar[step - lag]
    return ar
~~~

~~~py
signal = impulses(time, 10, seed=42)
series = autocorrelation(signal, {1: 0.99})
plot_series(time, series)
plt.plot(time, signal, "k-")
plt.show()
~~~

![Imgur](https://i.imgur.com/v2PDUCr.png)

~~~py
signal = impulses(time, 10, seed=42)
series = autocorrelation(signal, {1: 0.70, 50: 0.2})
plot_series(time, series)
plt.plot(time, signal, "k-")
plt.show()
~~~

![Imgur](https://i.imgur.com/QdtsLcR.png)

~~~py
series_diff1 = series[1:] - series[:-1]
plot_series(time[1:], series_diff1)
~~~

![Imgur](https://i.imgur.com/aUKt3Ce.png)


~~~py
from pandas.plotting import autocorrelation_plot

autocorrelation_plot(series)
~~~

![Imgur](https://i.imgur.com/o7c2QDH.png)


~~~py
from statsmodels.tsa.arima_model import ARIMA

model = ARIMA(series, order=(5, 1, 0))
model_fit = model.fit(disp=0)
print(model_fit.summary())
~~~

![Imgur](https://i.imgur.com/3dhrShM.png)