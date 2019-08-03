---
layout: 'post'
title: 'aiacademy: 機器學習-實作 ch02'
permalink: 'aiacademy/week2/ml-practice-ch02'
tags: aiacademy machine-learning
---


### sklearn 波士頓房價預測資料集

~~~python
import numpy as np
import pandas as pd
from sklearn.datasets import load_boston

#  metrics for Model evaluation: mae, mse , r2
from sklearn import metrics

import matplotlib.pyplot as plt
from matplotlib.pylab import rcParams
rcParams['figure.figsize'] = 15, 15

data = load_boston()

# print(data.keys())
# dict_keys(['data', 'target', 'feature_names', 'DESCR', 'filename'])

# print(data.DESCR)

fig = plt.figure()

for i in range(13):
    ax = fig.add_subplot(4, 4, i + 1)
    ax.scatter(data.data[:, i], data.target)

plt.show()

~~~