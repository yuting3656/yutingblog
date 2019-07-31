---
layout: 'post'
title: 'Using Large Data Sets'
permalink: 'ml-coursera/week6/using-large-data-sets'
tags: coursera-machine-learning  
---

> 瘋狂的一週開始! 很多要補完! 速度上工拉~!

## [Data For Machine Learning](https://www.coursera.org/learn/machine-learning/lecture/XcNcz/data-for-machine-learning){:target="_back"}

__Dsigning a high accuracy learning system__

> 研究這主題的大神 : [Banko and Brill 2011](https://www.aclweb.org/anthology/P01-1005){:target="_back"}

~~~
E.G. Classify between confusable words.
   {to, two, too}, {then, than}
For breakfast I ate _____ eggs.
~~~

#### Algorithms
   - Perceptron (Logistic regression)
   - Winnow
   - Memory-based
   - Naive Bayes
   
- ![Imgur](https://i.imgur.com/eB8iP6jm.gif)
>> "It's not who has the best algorithm that wins. It's who has the most data."
>> <br/>So, When is this true and when is this not true?


### Large data rationale

Useful test: Given the input x, can a human expert confidently predict y ?

Use a learning algorithm with many parameters (e.g. logistic regression/linear regression with many features; neural network with many hidden units)

Use a very large training set(unlikely to overfit)

![Imgur](https://i.imgur.com/djjFtSUh.gif)

The large training set is __unlikely__ to help when:
   - The features x do not contain enough information to predict y accurately (such as predicting a house’s price from only its size), and we are using a simple learning algorithm such as logistic regression

   -  The features x do not contain enough information to predict y accurately (such as predicting a house’s price from only its size), even if we are using a neural network with a large number of hidden units.


### For reference:

- Accuracy = (true positives + true negatives) / (total examples)
- Precision = (true positives) / (true positives + false positives)
- Recall = (true positives) / (true positives + false negatives)
- F1 score = (2 * precision * recall) / (precision + recall)