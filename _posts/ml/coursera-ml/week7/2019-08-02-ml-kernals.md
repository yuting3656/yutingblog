---
layout: 'post'
title: 'kernels'
permalink: 'ml-coursera/week7/kernels'
tags: coursera-machine-learning SVM
---

## [Kernels I](https://www.coursera.org/learn/machine-learning/lecture/YOMHn/kernels-i){:target="_back"}

![Imgur](https://i.imgur.com/VZ31oPR.jpg)
> 有沒有更好的方式來算　features f1, f2, f3 ...

![Imgur](https://i.imgur.com/yjJ83lv.jpg)

![Imgur](https://i.imgur.com/1fDVdtE.gif)

![Imgur](https://i.imgur.com/lNgq9Qj.gif)


## [Kernels II](https://www.coursera.org/learn/machine-learning/lecture/hxdcH/kernels-ii){:target="_back"}

> 大神　takeaway: 不要自己刻 SVM!!　請拿好心叔叔伯伯姐姐阿姨提供的 package 來使用~

- Chossing the landmarks

![Imgur](https://i.imgur.com/Jfkhu1o.gif)

![Imgur](https://i.imgur.com/F80fNER.gif)

- SVM parameters:

   - C (= 1 / λ). 
      - Large C: Lower bias, high variance.
      - Small C: Higher bias, low variance.

   - σ^2
      - Large σ^2: Features fi vary more smoothly.
      <br/> Hiner bias, lower variance.

      - Small σ^2: Features fi vary less smoothly. 
      <br/> Lower bias, highter variance. 

   ![Imgur](https://i.imgur.com/PlwVfdw.gif)

   - EX: <br/>Suppose you train an SVM and find it overfits your training data. Which of these would be a reasonable next step? 

      - Decrease C
      - Increase σ^2



