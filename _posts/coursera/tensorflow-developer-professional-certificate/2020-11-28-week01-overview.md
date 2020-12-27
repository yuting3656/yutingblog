---
layout: 'post'
title: 'Coursera Tensorflow Developer Professional Certificate - intro tensorflow Week01'
permalink: 'coursera-tensorflow-developer-professional-certificate/intro-tensorflow/week01-overview'
tags: coursera-tensorflow-developer-professional-certificate
---


整個課程:

1. [Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning](https://www.coursera.org/learn/introduction-tensorflow)
2. [Convolutional Neural Networks in TensorFlow](https://www.coursera.org/learn/convolutional-neural-networks-tensorflow)
3. [Natural Language Processing in TensorFlow](https://www.coursera.org/learn/natural-language-processing-tensorflow)
4. [Sequences, Time Series and Prediction](https://www.coursera.org/learn/tensorflow-sequences-time-series-and-prediction)

# [Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning](https://www.coursera.org/learn/introduction-tensorflow){:target="_back"}

- [week 01](https://www.coursera.org/learn/introduction-tensorflow/home/week/1){:target=""_back}

---

<br/>

> 原來我之前已經完成 week01! XDD
>
> 那就速度把重要筆記 記錄下來 :)


## Get started with Google Colaboratory (Coding TensorFlow)

<iframe src="https://www.youtube.com/embed/inN8seMm7UI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<br/>

## [AI Hub](https://aihub.cloud.google.com/){:target="_back"}
- 各種 資料, model, service, ml container, tf module, vm image, trained model, techical guide ~~ 


<br/>
<br/>
<br/>

## Exercise_1_House_Prices_Question

> In this exercise you'll try to build a neural network that predicts the price of a house according to a simple formula.
> 
> So, imagine if house pricing was as easy as a house costs 50k + 50k per bedroom, so that a 1 bedroom house costs 100k, a 2 bedroom house costs 150k etc.
> 
> How would you create a neural network that learns this relationship so that it would predict a 7 bedroom house as costing close to 400k etc.
> 
> Hint: Your network might work better if you scale the house price down. You don't have to give the answer 400...it might be better to create something that > predicts the number 4, and then your answer is in the 'hundreds of thousands' etc.

~~~py
import tensorflow as tf
import numpy as np
from tensorflow import keras

# GRADED FUNCTION: house_model
def house_model(y_new):
    xs = np.array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0,  ], dtype=float)
    ys = np.array([1, 1.5, 2., 2.5, 3.0, 3.5, 4.0, 4.5, ], dtype=float)
    model = keras.Sequential([keras.layers.Dense(units=1, input_shape=[1])])
    model.compile(optimizer='sgd', loss='mean_squared_error')
    model.fit(xs, ys, epochs=500)
    return model.predict(y_new)[0]
~~~

~~~py
prediction = house_model([7.0])
print(prediction)
~~~

~~~note
WARNING: Logging before flag parsing goes to stderr.
W1128 07:32:25.905068 140150206101312 deprecation.py:506] From /usr/local/lib/python3.6/dist-packages/tensorflow/python/ops/init_ops.py:1251: calling VarianceScaling.__init__ (from tensorflow.python.ops.init_ops) with dtype is deprecated and will be removed in a future version.
Instructions for updating:
Call initializer instance with the dtype argument instead of passing it to the constructor
Epoch 1/500
8/8 [==============================] - 2s 274ms/sample - loss: 57.6285
Epoch 2/500
8/8 [==============================] - 0s 201us/sample - loss: 12.9565
Epoch 3/500
8/8 [==============================] - 0s 175us/sample - loss: 2.9200
Epoch 4/500
8/8 [==============================] - 0s 172us/sample - loss: 0.6651
...
...
...
Epoch 497/500
8/8 [==============================] - 0s 160us/sample - loss: 2.2577e-04
Epoch 498/500
8/8 [==============================] - 0s 163us/sample - loss: 2.2397e-04
Epoch 499/500
8/8 [==============================] - 0s 10ms/sample - loss: 2.2218e-04
Epoch 500/500
8/8 [==============================] - 0s 206us/sample - loss: 2.2041e-04
[4.0079846]
~~~

-  寫到這邊整個 很開心 很感動! 加油! 把 [TensorFlow Developer Certificate](https://www.tensorflow.org/certificate){:target="_back"} 討取吧 ! :)

   - [TF_Certificate_Candidate_Handbook.pdf](https://www.tensorflow.org/extras/cert/TF_Certificate_Candidate_Handbook.pdf){:target="_back"}