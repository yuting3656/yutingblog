---
layout: 'post'
title: 'building a spam classifier'
permalink: 'ml-coursera/week6/building-a-spam-classifier'
tags: machine-learning 
---

> 對的事情做，不對的事情不要做，認真做。

> 每日一 seafood :fish: ~~~~

## [Prioitizing What to Work On](https://www.coursera.org/learn/machine-learning/lecture/4h5X4/prioritizing-what-to-work-on){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/0uu7a/prioritizing-what-to-work-on){:target="_back"}

__Machine learning System Design__

- Bulding a spam classifier as an example:

   - Supervised learning.
   
      ~~~
      x = features of email.
      y = spam(1) or not spam(0)
      Features x: Choose 100 words indicative of spam/not spam
      
      # Note: 
      In practice, take most frequently occurring n words (10,000 to 50,000) 
      in training set, rather than manually pick 100 words.

      ex:
         deal, buy, discont, now, andrew, ...

              | 0 | andrew
              | 1 | buy
              | 1 | deal
         x =  | 0 | discount
              | . | .
              | . | .
              | 1 | now
              | . | .
              | . | .          ,  xj = { 1 if word j appears in email
                                       { 0 otherwise
       --------------------------------------------
        From: cheeapsales@buystufffromme.com
        To: ang@cs.stanford.edu

        Deal of the week! Buy now!
      ~~~
   - improving the accuracy of this classifier
      - Collect lots of data
      - Develop sophisticated features (ex: using email header data in spam emails)
      - Develop algorithms to process your input in different ways (ex: recognizing misspellings in spam)

      `it is difficult to tell which of the options will be most helpful` 


## [Error Analysis](https://www.coursera.org/learn/machine-learning/lecture/x62iE/error-analysis){:target="_back"} : [article](https://www.coursera.org/learn/machine-learning/supplement/Z11RP/error-analysis){:target="_back"}

__Recommended approach__
   - Start with a simple algorithm that you can implement quickly. Implement it and test it on your cross-validation data.
   - `Plot leraning curves` to decide if more datra, more features, ect. are likely to help
   - Error analysis: Manually examine the examples (in cross validation set) that your algorithm made errors on. See if you spot any systematic trend in what type of examples it is making errors on. 


__Error Analysis__
![Imgur](https://i.imgur.com/9MFOWwI.gif)

- ![Imgur](https://i.imgur.com/LvvXWpZ.gif)

### VERY IMPORTANT: to get error results as __a single, numerical value.__ Otherwise it is difficult to assess your algorithm's performance.