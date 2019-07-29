---
layout: 'post'
title: 'python matplotlib'
permalink: 'aiacademy/week1/matplotlib'
tags: aiacademy python matplotlib
---

> 哈~ 靠晚了很久捏　XDD

__[Matplotlib](https://matplotlib.org/api/_as_gen/matplotlib.pyplot.html#module-matplotlib.pyplot){:target="_back"}__

### Plotting

   ~~~python
   import matplotlib.pyplot as plt
   import numpy as np
   
   x = np.arange(0, 3 * np.pi, 0.1)
   
   # X
   # array([0. , 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1. , 1.1, 1.2,
   #        1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2. , 2.1, 2.2, 2.3, 2.4, 2.5,
   #        2.6, 2.7, 2.8, 2.9, 3. , 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8,
   #        3.9, 4. , 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5. , 5.1,
   #        5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6. , 6.1, 6.2, 6.3, 6.4,
   #        6.5, 6.6, 6.7, 6.8, 6.9, 7. , 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7,
   #        7.8, 7.9, 8. , 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9. ,
   #        9.1, 9.2, 9.3, 9.4])
   
   y_sin = np.sin(x)
   
   # Y
   # array([ 0.        ,  0.09983342,  0.19866933,  0.29552021,  0.38941834,
   #         0.47942554,  0.56464247,  0.64421769,  0.71735609,  0.78332691,
   #         0.84147098,  0.89120736,  0.93203909,  0.96355819,  0.98544973,
   #         0.99749499,  0.9995736 ,  0.99166481,  0.97384763,  0.94630009,
   #         0.90929743,  0.86320937,  0.8084964 ,  0.74570521,  0.67546318,
   #         0.59847214,  0.51550137,  0.42737988,  0.33498815,  0.23924933,
   #         0.14112001,  0.04158066, -0.05837414, -0.15774569, -0.2555411 ,
   #        -0.35078323, -0.44252044, -0.52983614, -0.61185789, -0.68776616,
   #        -0.7568025 , -0.81827711, -0.87157577, -0.91616594, -0.95160207,
   #        -0.97753012, -0.993691  , -0.99992326, -0.99616461, -0.98245261,
   #        -0.95892427, -0.92581468, -0.88345466, -0.83226744, -0.77276449,
   #        -0.70554033, -0.63126664, -0.55068554, -0.46460218, -0.37387666,
   #        -0.2794155 , -0.1821625 , -0.0830894 ,  0.0168139 ,  0.1165492 ,
   #         0.21511999,  0.31154136,  0.40484992,  0.49411335,  0.57843976,
   #         0.6569866 ,  0.72896904,  0.79366786,  0.85043662,  0.8987081 ,
   #         0.93799998,  0.96791967,  0.98816823,  0.99854335,  0.99894134,
   #         0.98935825,  0.96988981,  0.94073056,  0.90217183,  0.85459891,
   #         0.79848711,  0.7343971 ,  0.66296923,  0.58491719,  0.50102086,
   #         0.41211849,  0.31909836,  0.22288991,  0.12445442,  0.02477543])
   ~~~
- 出圖

   ![Imgur](https://i.imgur.com/qglyTvUl.gif)
   ~~~python
   x = np.arange(0, 3 * np.pi, 0.1)
   y_sin = np.sin(x)
   y_cost = np.cos(x)
   
   title_name = "I have a dream"
   
   plt.plot(x, y_sin)
   plt.plot(x, y_cos)
   plt.xlabel("x axis label")
   plt.ylabel("y axis label")
   plt.title(title_name)
   
   # legend : loc 
   plt.legend(["Sine", "Cosine"], loc=4)
   plt.show()
   ~~~

    ![Imgur](https://i.imgur.com/RicQpvol.gif)

   - legend 位置 - [API](https://matplotlib.org/3.1.1/api/_as_gen/matplotlib.pyplot.legend.html){:target="_back"}

      |Location String| Location Code|
      |best|           	0|
      |upper right|           	1|
      |upper left|           	2|
      |lower left|           	3|
      |lower right|           	4|
      |right|           	5|
      |center left|           	6|
      |center right|           	7|
      |lower center|           	8|
      |upper center|           	9|
      |center|           	10|


### Object Oriendted Method
- [Axes](https://matplotlib.org/api/axes_api.html){:target="_back"}

> 注意
- set_xlabel
- set_ylabel
- set_title

   ~~~python
   fig = plt.figure()
   axes = fig.add_axes([0.1, 0.1, 0.8, 0.8]) # 像一張畫布
   
   axes.plot(x, y_sin)
   axes.plot(x, y_cos)
   axes.set_xlabel("x axis label")
   axes.set_ylabel("y axis label")
   axes.set_title("Using Obejct Oriented Method")
   plt.legend(["Sine", "Cosine"], loc=5)
   plt.show()
   ~~~

   ![Imgur](https://i.imgur.com/Zua1HzKl.gif)

