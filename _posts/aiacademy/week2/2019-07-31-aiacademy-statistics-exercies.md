---
layout: 'post'
title: '機率與統計: 練習'
permalink: 'aiacademy/week2/statistics-exercies'
tags: aiacademy statistics
---

> 可以觀看　[github](https://github.com/yuting3656/aiacademy){:target="_back"}

### 畫 CDF 

~~~python
import scipy.stats as stats
import matplotlib.pyplot as plt
import numpy as np

# 請查看 P(X <= -1)，X服從標準常態分佈：
norm_cdf = stats.norm.cdf
print("P(X <= -1) = ", norm_cdf(-1, loc = 0, scale = 1))

# 請畫出標準常態分佈的累積機率函數（CDF），範圍從-3至3：
x = np.linspace(-3, 3, 1000)
norm_cdf = stats.norm.cdf

plt.plot(x, norm_cdf(x, loc = 0, scale = 1))
plt.arrow(-1, 0, 0, norm_cdf(-1, loc = 0, scale = 1), head_width=0.02, width=0.005, head_length=0.02, color='r')
plt.arrow(-1, norm_cdf(-1, loc = 0, scale = 1), -3, 0, head_width=0.02, width=0.005, head_length=0.02, color='g')
plt.show()
~~~

> 好不浪費時間～　繼續讀書哈哈阿　自己去看　[github](https://github.com/yuting3656/aiacademy/blob/master/week2/StatPython_part1/AI_hmw_StatPython_2-1.ipynb){:target="_back"}


### Exercise 4-1

- [github](https://github.com/yuting3656/aiacademy/blob/master/week2/StatPython_part2/AI_hmw_StatPython_4-1.ipynb){:target="_back"}

> 靠杯！！！　要炸掉拉～　ＸＤＤ

> 量好多　ＸＤＤ


### Exercise 4-2
  
  __小圓籃球細胞！！！__　

- [github](https://github.com/yuting3656/aiacademy/blob/master/week2/StatPython_part2/AI_hmw_StatPython_4-2.ipynb){:target="_back"}


### Exercise 5-2

- [github](https://github.com/yuting3656/aiacademy/blob/master/week2/StatPython_part2/AI_hmw_StatPython_5-2%20.ipynb){:target="_back"}


### Exercise 7-1

- [github](https://github.com/yuting3656/aiacademy/blob/master/week2/StatPython_part2/AI_hmw_StatPython_7-1.ipynb){:target="_back"}


> 不管了，反正我都有練到沒丟上　blog 的就自己去看　github XDD


### Exercise 8-1: 資料轉換

- [github](https://github.com/yuting3656/aiacademy/blob/master/week2/StatPython_part3/AI_hmw_StatPython_8-1.ipynb){:target="_back"}