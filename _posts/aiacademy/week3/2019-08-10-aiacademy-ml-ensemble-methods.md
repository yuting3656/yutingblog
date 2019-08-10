---
layout: 'post'
title: 'aiacademy: 機器學習 Ensemble Methods '
permalink: 'aiacademy/week3/ensemble-method'
tags: aiacademy machine-learning ensemble-methods
---


### Ensemble 

<iframe src="https://www.youtube.com/embed/HvJsTAQ4mXY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Ensemble methods 

   - Bagging: resample training data
      
      - Random forest

   - Boosting: reweight training data

      - AdaBoost

      - Gradient Boosting


   - Stacking: blendding weak learners


### Bagging

<iframe src="https://www.youtube.com/embed/tkYoWXHf1Ok" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Bootstrap
   - random sampling with replacement 


### AdaBoost

<iframe src="https://www.youtube.com/embed/G5sSqvOr7QA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Boosting

   ![Imgur](https://i.imgur.com/pEMLwKp.gif)


### Gradient boosting

- 老師推薦好書:
   - [The Elements of Statistical Learning](https://www.amazon.com/Elements-Statistical-Learning-Prediction-Statistics/dp/0387848576/ref=sr_1_1?qid=1565404502&refinements=p_lbr_one_browse-bin%3AJ.+H.+Friedman&s=books&sr=1-1){:target="_back"}

<iframe src="https://www.youtube.com/embed/sEvvfD84Qyk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



- Gradien boosting vs random forest 

   - Random forset generates many trees; these trees are independent to each other 

   - Gradient boosting many trees one by one, the new trees try to __correct__ to predictions of previous trees



###　Stacking 


<iframe src="https://www.youtube.com/embed/cw09YM6T2KQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Imgur](https://i.imgur.com/mMN2ZJE.gif)


### Summary

- Ensemble to imrove the base learners 

- Bagging : resample training data 

   - Random forest: __每一棵樹只能看到某些features，看到些features？也是random決定的__


- Boosting: iteratively create new models to compensate the old models

   - AdaBoost, gradient boosting 


- Stacking: blending weark learners