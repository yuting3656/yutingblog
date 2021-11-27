---
layout: "single"
title: 'aiacademy: 機器學習 - 實作: ch06 (decision trees)'
permalink: 'aiacademy/week3/decision-trees-practice'
tags: aiacademy machine-learning decision-trees
---

> [github-aiacademy](https://github.com/yuting3656/aiacademy/tree/master/week2/machine-learning/Chapter6){:target="_back"}

### decision tree 1

<iframe src="https://www.youtube.com/embed/dd6_Uuk_EMA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### decision tree 2

<iframe src="https://www.youtube.com/embed/S1SVttFK2sc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## decision tree 3

<iframe src="https://www.youtube.com/embed/zGfP_WvsTHQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

__Summary__

![Imgur](https://i.imgur.com/ng3caxq.gif)


### code

~~~python
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

iris = load_iris()

# random_seed
random_seed = 5
X_train, x_test, Y_train, y_test = train_test_split(iris.data, iris.target, random_state=random_seed)

dt_clf = DecisionTreeClassifier()
dt_clf.fit(X_train, Y_train)

y_pred = dt_clf.predict(x_test)
print(y_pred)
print(x_test)

~~~