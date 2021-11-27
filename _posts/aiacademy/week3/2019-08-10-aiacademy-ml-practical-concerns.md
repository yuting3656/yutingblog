---
layout: "single"
title: 'aiacademy: 機器學習 Practical Concerns '
permalink: 'aiacademy/week3/practical-concerns'
tags: aiacademy machine-learning ml-practical-concerns
---

### Data Preprocessing

<iframe src="https://www.youtube.com/embed/DucQmHOwMxg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Transforming features

    - Min-max scaling: linearly scale each feature to the range [1,1] or [0,1]
    - Standardize: scale each feature to N(0,1)
    - Robust scaling: scale features by removing the outliers
    - Thresholding
    - Applying log or exponential function


- Why scaling ?

  - For KNN, scaling prevents the distance scores being dominated by few features 
 
  - For linear regression, logistic regression, SVM, scaling helps the optimization
 
  - For decision trees and random forest, scaling or not is not important


- Why log or exponential ?

   - positive skewed ---> log
      - 原本小的做完log還是小，原本大的做完log還是大。

   - negative skweded ---> exponential 
      - 原本小的做完log還是小，原本大的做完log還是大。

   ![Imgur](https://i.imgur.com/tYyOjGU.gif)


- Missing values

   - If the type of the feature is categorical
      - Replace the missing values with the most frequent value
   
   - If the type of the feature is numerical
   
      - Replace the missing values with the mean or median 
      
   - Some more advanced techniques
   
      - Predict the missing values, usually by interpolation and extrapolation 

- Imbalanced classification

   - Most classification algorithms perform optimally when the number of samples in each class is similar 
  
   - Common techniques for imbalanced dataset
      - Under-sample the majority class 
      - Over-sample the minority class
      - A combination of both under-sampling and over-sampling
     
  - Some more advanced techniques
     - “Generate” simulated instances from the minority class


- Data Preprocessing Summary

   - Consider transforming features

   - Fill missing values 

   - Consider generating synthetic instances



### Hyper-parameters


<iframe src="https://www.youtube.com/embed/Q-XXrbFSPts" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Selecting hyper-parameters

   - Example of hyper-parameters

      - K in KNN
      - C in the regularized linear classification
      - step size in gradient descent


  - Strategies

     - __Grid search__
        - A fancy name of exhaustive search
        - Manually specify subset of the hyper-parameter space and step size
        - Try all parameter combinations and check thier performance
     - __Random search__
        - Suprisingly good performance
           - Among the tunable parameters, important ones are only a few
     - __Bayesian optimization__
        - Iteratively picking hyper-parameters for experiments
        - Picking strategy: tradeoff between
           - Exploration (hyper-parameters for which the outcome is most uncertain), and 

           - Exploitation (hy-er-parameters which are expected to have a good outcome)




- Random serch is surprisingly good 

    ![Imgur](https://i.imgur.com/L6dWEkf.gif)



- Validating selected hyper-patameters

   ![Imgur](https://i.imgur.com/c9HOK2v.gif)
   ![Imgur](https://i.imgur.com/NKMIU8p.gif)
   ![Imgur](https://i.imgur.com/PuavFNl.gif)

- Summary of hyper-parameter tuning

   - Grid search, random search, and Bayesian optimization
   - Training, validation, and test dataset


### Multi-class classification

<iframe src="https://www.youtube.com/embed/cEY-98hYz0s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Some models can handle multi-class classification naturally

   - KNN
   - Decision trees
   - Neural networks

- Leverage on binary classifiers

   - One-vs.-rest (aka one-vs-all)
      - [我的筆記](https://yuting3656.github.io/yutingblog/ml-coursera/week4/neural-networks-applications){:target="_back"}
   - One-vs.-one


### Model Selection

<iframe src="https://www.youtube.com/embed/5EPAzA4mD3k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Bias vs variance 

   - The test error comes from 
      - Bias: the error from the difference between the true model and the learning model 

      - Variance: the error from sensifivity to the small fluctuations in the training data 

      - Noise: the error from the data per se.


   ![Imgur](https://i.imgur.com/OjdIW4q.gif)


- Model Complexity vs error

   ![Imgur](https://i.imgur.com/8AA8Xtr.gif)


- Training size vs error 

> [我的筆記](https://yuting3656.github.io/yutingblog/ml-coursera/week6/evaluating-a-learning-algrithm2){:target="_back"}

![Imgur](https://i.imgur.com/D2WJMD8.gif)


- Data size vs model complexity

   ![Imgur](https://i.imgur.com/cgb2Gmv.gif)


- Model selection summary

   - Domain knowledge is important
      - if you know the relationship between x and y is linear, why choose quadratic?

   - Model complexity is important

      - Applying simple models on massive data tends to underfitting 
      - Select an algorithm that is complex enough to fit the training data well


   - Data size is important 

      - Applying complex models on small data tends  to overfitting 

      - Collect data taht is large enough to prevent overfitting 