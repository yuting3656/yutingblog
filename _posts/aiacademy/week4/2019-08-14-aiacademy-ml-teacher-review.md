---
layout: "single"
title: 'aiacademy: 機器學習 ML 講師來了！！！ Common mistakes in data science'
permalink: 'aiacademy/week4/common-mistakes-in-data-science'
tags: aiacademy machine-learning
---

> [__ACM tkdd__](https://tkdd.acm.org/){:target="_back"} 好棒棒的論文網站

### 棒棒資料

<iframe src="//www.slideshare.net/slideshow/embed_code/key/crXbQNkuxGDM7j" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/AIFrontiers/jeff-dean-trends-and-developments-in-deep-learning-research" title="Jeff Dean at AI Frontiers: Trends and Developments in Deep Learning Research" target="_blank">Jeff Dean at AI Frontiers: Trends and Developments in Deep Learning Research</a> </strong> from <strong><a href="https://www.slideshare.net/AIFrontiers" target="_blank">AI Frontiers</a></strong> </div>

### Common mistakes in data science

- A good learning model is more important than data size?

  - Or may be data size is he king?

- A better algorithm or more data?

   - Task Confusion se t disambiguation:
   
   - 5 Algorithms: n-gram table, ... 

## Lessons learned 1
    - All methods improved as the data size increases

    - Some methods may preform poorly initialy but end above the others
 
 > 有些時候　data size 重要，有些時候　model 重要


### Why overfitting may be harmful?

> 看過題目都會，沒看過的題目就不會那麼會

- Overfitting is like memorizing answers

### Why big data may help

- Overfitting is less likely when we have massive traininf data

   - Random noise tends to average out 
   - Training data may include most possible scenarios, so an over-complex model is problbly acceptable

### Exercise 1: random noises are average out with massive data 

![Imgur](https://i.imgur.com/PgdMRNB.jpg)

### Exercise 2: complex model may be fine, if data is big enough


### Exercise 3: massive data won't help if model is too simple

![Imgur](https://i.imgur.com/X4fGPxc.jpg)

### Model complexity and over/under-fitting

![img](https://www.d2l.ai/_images/capacity_vs_error.svg)


### Complex model works well on complex problems (with enough data)

![Imgur](https://i.imgur.com/gp98eJn.gif)


### Data size vs model complexity

![Imgur](https://i.imgur.com/cgb2Gmv.gif)

- 根據實驗結果-
   - 可以再拿資料： 　　
      - 如果在測試資料效果不好的話，抓更多的data。
      - 如果 overfitting，抓更多的data，可防止 overfitting


### Hyper-parameterws vs model complexity

- K in KNN
- lambda linear / logistic regression


### Quiz

![Imgur](https://i.imgur.com/FuxVflo.jpg)


### Lessons learned 2

![Imgur](https://i.imgur.com/YwVahOb.jpg)

### An typical workflow to write a research paper

> 重要唷！！！

- [我的筆記-bias_vs_variance](https://yuting3656.github.io/yutingblog/ml-coursera/week6/bias-vs-variance){:target="_back"}

- [我的筆記-evaluating_a_learning_algrithm](https://yuting3656.github.io/yutingblog/ml-coursera/week6/evaluating-a-learning-algrithm){:target="_back"}

- [我的筆記-evaluating_a_learning_algrithm2](https://yuting3656.github.io/yutingblog/ml-coursera/week6/evaluating-a-learning-algrithm2){:target="_back"}



### We probaly peek (and therfore overfit) benchmark datasets?

- Copmuter vision: imgenet, coco
- Audio/speech: AudioSet, openSLR
- NLP: IMDb, yelp, google Books, Ngram Viewer


### Lessons learned 3

![Imgur](https://i.imgur.com/s1yV1Vi.jpg)


### 切時間 (未來資料的資料)
> Time is a great teacher, but unfortunately it kills all its pupils

![Imgur](https://i.imgur.com/x3YiXGY.jpg)


### Days, weeks, months, years are all circulate

![Imgur](https://i.imgur.com/hv9nSkd.jpg)

![Imgur](https://i.imgur.com/Z2oCckH.jpg)

### 練習

- [http://archive.ics.uci.edu/ml/datasets/bike_sharing_dataset](http://archive.ics.uci.edu/ml/datasets/bike_sharing_dataset){:target="_back"}

去這個網站拿資料(每小時，每月借bike的數量)，來練習！

### Use cyclic features

![Imgur](https://i.imgur.com/i2YwcLE.jpg)

### 英國研究 中國製造 台灣報導 南韓起源

> 看起來統計數字有相關，可是真正的原因是沒有關西的　ＸＤＤＤ

> 剛好發生！！！

> [http://tylervigen.com/spurious-correlations](http://tylervigen.com/spurious-correlations){:target="_back"}

### Exercise: correlation occurs, when #features >> #instances

![Imgur](https://i.imgur.com/TX1iM5V.jpg)

![Imgur](https://i.imgur.com/ucBC9b6.jpg)

![Imgur](https://i.imgur.com/T2UiaET.jpg)


### Lessons learned 4

![Imgur](https://i.imgur.com/I5Yizza.jpg)

### Test environments is different from training

![Imgur](https://i.imgur.com/3Ry3jbb.jpg)

![Imgur](https://i.imgur.com/1IrQCda.jpg)

> 這不是個好方法

- Users have no chnage to click on the items that only appear in the new recommendation list but not in the original one


### A/B testing is probably the fairest solution

> 如果沒有方法，現在這個爛方法就是好方法！

![ab-test](https://www.invespcro.com/blog/images/blog-images/ab-testing-3.jpg)

### lessons learned 5

![Imgur](https://i.imgur.com/TdPqyfn.jpg)

### recap

![Imgur](https://i.imgur.com/eq6Mpym.jpg)



### 中華民國人工智慧學會

> [website](http://www.taai.org.tw/){:target="_back"}


### Pca vs. Lasso

- PCA: unsupervised
   - 與y無關
   - 只根據 x , 找到最大能保留 x 的ｋ方向

- LASSO: supervised 
   - 與y有關
   - X 與 y　無關的 features　所對應的　theta 很可能變成 0

### PCA 做降維　vs. autoencoder 



### Recommender system

- Netflix price competition

### Collaborative filtering (CF)

![img](https://upload.wikimedia.org/wikipedia/commons/5/52/Collaborative_filtering.gif)
 
 - user-based CF



 - item-based CF
 - model-based CF


### Matrix factorization

<iframe src="https://www.youtube.com/embed/9AP-DgFBNP4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Summary of MF

![Imgur](https://i.imgur.com/WJouGa4.jpg)

### Summary

![Imgur](https://i.imgur.com/u6El2pq.jpg)

![Imgur](https://i.imgur.com/A9Fomph.jpg)


### FM vs MF

![Imgur](https://i.imgur.com/QNz8bmq.jpg)