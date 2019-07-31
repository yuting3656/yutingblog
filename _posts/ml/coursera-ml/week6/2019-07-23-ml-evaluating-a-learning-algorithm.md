---
layout: 'post'
title: 'evaluating a learning algrithm'
permalink: 'ml-coursera/week6/evaluating-a-learning-algrithm'
tags: coursera-machine-learning
---
> 喔喔喔~~~ 明天第一天上課 好期待 :)



## [Deciding What to Try Next](https://www.coursera.org/learn/machine-learning/lecture/OVM4M/deciding-what-to-try-next){:target="_back"}

- When you test your hypothesis on a new set of houses, you find that it makes unacceptably large errors in its predictions. <br/> What should you try next?

   - Get more training examples 

   - Try smaller sets of features
   
   - Try getting additional features
   
   - Try adding polynomial featyres
   
   - Try decreasing λ
   
   - Try increasing λ
<br/>
- Machine learning diagnostic:
   - Diagnostic: A test that you can run to gain insight what is/isn't working with a learning algorithm, and gain guidance as to how best to improve its performance.

   - Diagnostics can take time to implement, but doing so can be very good use of your time.

   - A diagnostic can sometimes rule out certain courses of action (changes to your learning algorithm) as being unlikely to improve its performance significantly


## [Evaluating a Hypothesis](https://www.coursera.org/learn/machine-learning/lecture/yfbJY/evaluating-a-hypothesis){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/lecture/QGKbr/model-selection-and-train-validation-test-sets){:target="_back"}

- Once we have done some trouble shooting for errors in our predicions by:
   
   - Getting more training examples 
   
   - Trying smaller sets of features
   
   - Trying addiontal features
   
   - Trying polynomial features
   
   - Increasing or decreasing λ

- 把資料集合分成 __training set__ 和 __test set__，通常比例分成 70% 和 30 %
   - The new procedure using these two sets is then:
      
      1. Learn Θ and minimize **J**train(Θ) using the training set
      
      2. Compute the test set error **J**test(Θ)

### The test set error 

1. For linear regression
![Imgur](https://i.imgur.com/fEgJszE.jpg?1)
2. For Classification ~ Misclassification error (aka 0/1 misclassification error):
![Imgur](https://i.imgur.com/tNuGJxn.jpg)


## [Model Selection and Train/Validation/Test Sets](https://www.coursera.org/learn/machine-learning/lecture/QGKbr/model-selection-and-train-validation-test-sets){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/XHQqO/model-selection-and-train-validation-test-sets){:target="_back"}

__Model Selection:__
> 用 test set 來去抓J(θ)，結果會造成
![Imgur](https://i.imgur.com/EIGyOY9.gif)

__Train / Validation / Test Sets__
![Imgur](https://i.imgur.com/4oZ4c9g.gif)

__Train / Validation / Test Sets Error__
![Imgur](https://i.imgur.com/oD5TIA6.gif)
