---
layout: "single"
title: 'aiacademy: 機器學習 - 實作: ch08 (practical concers) '
permalink: 'aiacademy/week3/practical-concerns-practice'
tags: aiacademy machine-learning ml-practical-concerns
---

> [github-aiacademy](https://github.com/yuting3656/aiacademy/tree/master/week2/machine-learning/Chapter8){:target="_back"}


### Model Parameters Selection

<iframe src="https://www.youtube.com/embed/G5ZxDR4IVNY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Grid Search Cross Validation


<iframe src="https://www.youtube.com/embed/YSLOm1VjsSE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Gride Search for SVM Parameters

   ~~~python
   from sklearn.model_selection import GridSearchCV
   parameters= {'kernel':['linear', 'rbf'], 'C':[0.01,0.1,1,10], 'gamma':[0.01,0.1,1,10]}
   model = svm.SVC()
   model.fit(X, y)
   best_model = GridSearchCV(model, parameters, cv=5, scoring='accuracy',    return_train_score='cv_results_')
   best_model.fit(X, y)
   ~~~

