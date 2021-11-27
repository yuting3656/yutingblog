---
layout: "single"
title: 'python matplotlib 2'
permalink: 'aiacademy/week1/matplotlib2'
tags: aiacademy python matplotlib
---

## Legend 
   > 上一回自己寫了，原來這邊就有XD 正所謂英雄所見略同，就是這意思啦! XDD

   - `plt.legend(loc = "lower center") # loc = 8(lower center)`
   
   -  legend 位置 - [API](https://matplotlib.org/3.1.1/api/_as_gen/matplotlib.pyplot.legend.html){:target="_back"}

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


## Annotate

  - [API](https://matplotlib.org/3.1.1/api/_as_gen/matplotlib.pyplot.annotate.html){:target="_back"}


## Using Axes

   ~~~python
   fig = plt.figure()
   
   # new Figure 的　axes (left, bottom, width, heigh)的比例 介於(0~1)
   axes1 = fig.add_axes([0.05, 0.05, 0.425, 0.8])
   axes2 = fig.add_axes([0.55, 0.05, 0.425, 0.8])
   
   # axes1
   axes1.plot(edu.Year, edu["Physical Sciences"], color="blue")
   axes1.set_xlabel('Year')
   axes1.set_ylabel('Physical Sciences')
   axes1.set_title('Year vs. PS')
   
   # axes2
   axes2.plot(edu.Year, edu["Computer Science"], color="red")
   axes2.set_xlabel('Year')
   axes2.set_ylabel('CS')
   axes2.set_title('Year vs. CS')
   
   #  整張大圖
   fig.suptitle('Comparision', fontsize=16, fontweight="bold")
   plt.show()
   ~~~

   ![Imgur](https://i.imgur.com/83SHT3W.gif)


### Using subplot

   ~~~python
   plt.figure()
   
   # ax1
   ax1 = plt.subplot(2,2,1)
   ax1.plot(edu.Year, edu["Physical Sciences"], color="blue")
   ax1.title.set_text("Physical Sciences")
   
   # ax2
   ax2 = plt.subplot(2,2,2)
   ax2.plot(edu.Year, edu["Computer Science"], color="red")
   ax2.title.set_text("Computer Science")
   
   # ax3
   ax3 = plt.subplot(2,2,3)
   ax3.plot(edu.Year, edu["Health Professions"], color="green")
   ax3.title.set_text("Health Professions")
   
   # ax4
   ax4 = plt.subplot(2,2,4)
   ax4.plot(edu.Year, edu["Education"], color="yellow")
   ax4.title.set_text("Education")
   
   # impove the spacing between sublots and display them
   plt.tight_layout()
   plt.show()
   ~~~

   ![Imgur](https://i.imgur.com/ywp4tjO.gif)

### Using xlim(), ylim()

   ~~~python
   plt.plot(edu.Year, edu['Computer Science'], color='red')
   plt.plot(edu.Year, edu['Physical Sciences'], color='blue')
   
   plt.xlim([1990, 2010])
   plt.ylim([0 , 50])
   ~~~
   
   ![Imgur](https://i.imgur.com/c1417jT.gif)

### 圖畫風格
 - 查詢:
    - plt.style.available
    ~~~python
    ['bmh',
     'classic',
     'dark_background',
     'fast',
     'fivethirtyeight',
     'ggplot',
     'grayscale',
     'seaborn-bright',
     'seaborn-colorblind',
     'seaborn-dark-palette',
     'seaborn-dark',
     'seaborn-darkgrid',
     'seaborn-deep',
     'seaborn-muted',
     'seaborn-notebook',
     'seaborn-paper',
     'seaborn-pastel',
     'seaborn-poster',
     'seaborn-talk',
     'seaborn-ticks',
     'seaborn-white',
     'seaborn-whitegrid',
     'seaborn',
     'Solarize_Light2',
     'tableau-colorblind10',
     '_classic_test']
    ~~~

- 使用:
   - plt.style.use("xxx")
