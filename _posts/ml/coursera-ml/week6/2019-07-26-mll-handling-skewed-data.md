---
layout: 'post'
title: 'Handling Skewed Data'
permalink: 'ml-coursera/week6/handling-skewed-data'
tags: machine-learning 
---

## [Error Metrics for Skewed Classes](https://www.coursera.org/learn/machine-learning/lecture/tKMWX/error-metrics-for-skewed-classes){:target="_back"}


![Imgur](https://i.imgur.com/tahDdm1.gif)

### Precision / Recall 
![Imgur](https://i.imgur.com/N7nDZfU.gif)
- Precision
  <br/>(Of all patients where we predicted y = 1, what fraction actually has cancer?)

   ~~~
     True positives               True positives
   ___________________   = ______________________________
   # predicted positive    True positive + False Positive
   ~~~
- Recall
  <br/>(Of all patients that actually have cancer, what fraction did we correctly detect as having cancer ?)

   ~~~
     True positives            True positives
   __________________ = _____________________________
   # actual positive    True positive + False negative
   ~~~


> a classifier of a high precision or high recall actually is a good classifier

> if a classifier is getting high precision and high recall, then we are actually confident that the algorithm has to be doing well, even if we have very skewed classes. by 大神 !

## [Trading Off Precision and Recall](https://www.coursera.org/learn/machine-learning/lecture/CuONQ/trading-off-precision-and-recall){:target="_back"}


- Trading off precision and recall
   - Logistic regression: 0 ≤ hθ(x) ≤ 1
   - Predict 1 if hθ(x) ≥ 0.5
   - Predict 0 if hθ(x) < 0.5
   <br/>
   <br/>
   __Higher precision, lower recall__
      - 很確切的知道病患有得癌症的機率才告知，避免病患緊張過度!
   ![Imgur](https://i.imgur.com/pRWBgVI.gif)
   <br/>
   <br/>
   __Higher recall, lower precision__
      - 有可能罹患癌症的時候就告知，怕錯過深度觀察或著治療等
   ![Imgur](https://i.imgur.com/CDFb2ha.gif)

___以上兩種都可以用各自的觀點解讀唷!__

---

   __Precision / Recall curve__

   - More generally: Predict 1 if hθ(x) ≥ threshold

       ![Imgur](https://i.imgur.com/oBYZ0ttm.gif)

       - different shape :

          ![Imgur](https://i.imgur.com/1yv2JbXm.gif)




   __F1 Score(F score)__
   - How to compare precision/recall numbers?

      ![Imgur](https://i.imgur.com/hJQC76ch.gif)