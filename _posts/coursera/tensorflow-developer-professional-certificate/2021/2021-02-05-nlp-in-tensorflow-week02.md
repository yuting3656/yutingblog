---
layout: 'post'
title: 'Coursera Tensorflow Developer Professional Certificate - nlp in tensorflow week02 (Word Embeddings)'
permalink: 'coursera-tensorflow-developer-professional-certificate/nlp-in-tensorflow/week02'
tags: coursera-tensorflow-developer-professional-certificate tensorflow nlp word-embeddings
---

# Embedding Projector

- [Embedding Projector](https://projector.tensorflow.org/){:target="_back"}


# [IMBD dataset](https://ai.stanford.edu/~amaas/data/sentiment/){:target="_back"}

- TensorFlow Data Services [TFDS](https://www.tensorflow.org/datasets/overview){:target="_back"}

 ![Imgur](https://i.imgur.com/JOhd101.png)


~~~python
import tensorflow as tf
print(tf.__version__)
~~~

- 如果用 tf 1.x 

   - 請 先打 `tf.enable_eager_execution()`

~~~python
import tensorflow_datasets as tfds
imbd, info = tfds.load("imbd_reviews", with_info = True, as_supervised=True)
~~~


- 用到這邊 剛好我的 tf 是 1.x 版 我乾脆直接升版本 到 2.x
   - `pip install --upgrade tensorflow`