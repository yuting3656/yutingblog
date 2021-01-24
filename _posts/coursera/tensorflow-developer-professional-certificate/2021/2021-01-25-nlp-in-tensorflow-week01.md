---
layout: 'post'
title: 'Coursera Tensorflow Developer Professional Certificate - nlp in tensorflow week01'
permalink: 'coursera-tensorflow-developer-professional-certificate/nlp-in-tensorflow/week01'
tags: coursera-tensorflow-developer-professional-certificate tensorflow nlp 
---

> 已經一半拉!! 加油! 加油! :) 


整個課程:

1. [Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning](https://www.coursera.org/learn/introduction-tensorflow) :heavy_check_mark:
2. [Convolutional Neural Networks in TensorFlow](https://www.coursera.org/learn/convolutional-neural-networks-tensorflow) :heavy_check_mark:
3. [Natural Language Processing in TensorFlow](https://www.coursera.org/learn/natural-language-processing-tensorflow)
4. [Sequences, Time Series and Prediction](https://www.coursera.org/learn/tensorflow-sequences-time-series-and-prediction)


# Word Based Encodings

- [ASCii](https://en.wikipedia.org/wiki/ASCII){:target="_back"}

   ~~~
   076  073  083  084  069  078
   L    I    S    T    E    N
   ~~~
   
   ~~~
   083  073  076  069  078  084
   S    I    L    E    N    T
   ~~~

~~~
001  002     003   004
I    Love    my    dog
~~~

~~~
001  002     003   005
I    Love    my    dog
~~~


# Using APIs

~~~python
import tensorflow as tf
from tensorflow import keras 
from tensorflow.keras.preprocessing.text import Tokenizer

sentences = [
   "I love my dog",
   "I love my cat"
]

tokenizer = Tokenizer(num_words = 100)
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index
print(word_index)
~~~