---
layout: "single"
title: 'Multiclass Classification'
permalink: 'ml-coursera/week3/multiclass-classification'
tags: coursera-machine-learning
---

> 這兩天都當優質保母九九~~ 哈哈哈

## [Multiclass classificaiton](https://www.coursera.org/learn/machine-learning/lecture/68Pol/multiclass-classification-one-vs-all){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/HuE6M/multiclass-classification-one-vs-all){:target="_back"}

__Multiclass classification:__

- Email foldering/tagging: Work, Friends, Family, Hobby
- Medical diagrams: Not ill, Cold, Flu
- Weather: Sunny, Cloudy, Rain, Snow

__One-vs-all (one-vs-rest) :__
- Train a logistic regression classifier hθ^(i) * (x) for each class i to predict the probability that y = i 
- To make a prediction on a new x, pick the class that mazimizes hθ(x)

![OneVsAll][one-vs-all]
- 


[one-vs-all]: https://i.imgur.com/ByVvkKs.jpg