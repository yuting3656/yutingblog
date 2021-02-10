---
layout: 'post'
title: 'Coursera Tensorflow Developer Professional Certificate - nlp in tensorflow week03 (Sequence models)'
permalink: 'coursera-tensorflow-developer-professional-certificate/nlp-in-tensorflow/week03'
tags: coursera-tensorflow-developer-professional-certificate tensorflow nlp sequence-encoding rnn LSTM
---

> 加油啊!!! 錢已經刷惹! 過完年就把 全部課程飆完! 然後 準備討取吧!! 哈哈哈

# Sequence Models


| ![Imgur](https://i.imgur.com/DEtZwHh.png) |![Imgur](https://i.imgur.com/cMfNxD6.png) |
|![Imgur](https://i.imgur.com/FS0JiWW.png)|![Imgur](https://i.imgur.com/FaSMo5F.png)|

- RNN

   - [之前認真上的兒](https://yuting3656.github.io/yutingblog/blog/tag#coursera-deep-learning){:target="_back"}

|![Imgur](https://i.imgur.com/20uctwR.png)|![Imgur](https://i.imgur.com/2xzyPQi.png)|

|![Imgur](https://i.imgur.com/GFxRycR.png)|![Imgur](https://i.imgur.com/BTbIHuB.png)|![Imgur](https://i.imgur.com/MUHqQxr.png)|![Imgur](https://i.imgur.com/9VWcVie.png)|


# [LSTMs](https://www.coursera.org/learn/nlp-sequence-models/lecture/KXoay/long-short-term-memory-lstm){:target="_back"}

   - [認真的我](https://yuting3656.github.io/yutingblog//dl-coursera-sequence-models/week1/rnn-sequence-models2){:target="_back"}

- `Today has a beauriful blue <...>`
   - `Today has a beauriful blue SKY`

- `I lived in Ireland, so at school they made me learn how to speak <...>`
   - `I lived in Ireland, so at school they made me learn how to speak Gaelic`
   - |![Imgur](https://i.imgur.com/CeLLF5M.png)| 
   - |![Imgur](https://i.imgur.com/F1ZAfdD.png) |
   - cell state bidirection
      - |![Imgur](https://i.imgur.com/Up7W2rx.png)|

# Implementing LSTM in code

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(tokenizer.vocab_size, 64),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
~~~

![Imgur](https://i.imgur.com/87YahQ9.png)

- 多層

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(tokenizer.vocab_size, 64),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64), return_sequence=True),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
~~~

![Imgur](https://i.imgur.com/1ZJvPYI.png)

# [IMDB Subwords 8K with Single Layer LSTM](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%203%20-%20Lesson%201a.ipynb){:target="_back"}

~~~python
from __future__ import absolute_import, division, print_function, unicode_literals

import tensorflow_datasets as tfds
import tensorflow as tf
print(tf.__version__)
~~~

~~~python
dataset, info = tfds.load('imdb_reviews/subwords8k', with_info=True, as_supervised=True)
train_dataset, test_dataset = dataset['train'], dataset['test']
~~~

~~~python
print(info.features)

"""
FeaturesDict({
    'label': ClassLabel(shape=(), dtype=tf.int64, num_classes=2),
    'text': Text(shape=(None,), dtype=tf.int64, encoder=<SubwordTextEncoder vocab_size=8185>),
})
"""
~~~

~~~python
tokenizer = info.features['text'].encoder
~~~

~~~python
BUFFER_SIZE = 10000
BATCH_SIZE = 64

train_dataset = train_dataset.shuffle(BUFFER_SIZE)
train_dataset = train_dataset.padded_batch(BATCH_SIZE, tf.compat.v1.data.get_output_shapes(train_dataset))
test_dataset = test_dataset.padded_batch(BATCH_SIZE, tf.compat.v1.data.get_output_shapes(test_dataset))
~~~

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(tokenizer.vocab_size, 64),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
~~~

~~~python
model.summary()

"""
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding (Embedding)        (None, None, 64)          523840    
_________________________________________________________________
bidirectional (Bidirectional (None, 128)               66048     
_________________________________________________________________
dense (Dense)                (None, 64)                8256      
_________________________________________________________________
dense_1 (Dense)              (None, 1)                 65        
=================================================================
Total params: 598,209
Trainable params: 598,209
Non-trainable params: 0
_________________________________________________________________
"""
~~~

~~~python
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
~~~

~~~python
import matplotlib.pyplot as plt

def plot_graphs(history, string):
    plt.plot(history.history[string])
    plt.plot(history.history['val_' + string])
    plt.xlabel("Epochs")
    ply.ylabel(stirng)
    plt.legend([string, 'val_' + string])
    plt.show()
~~~

~~~python
plot_graph(history, 'accuracy')
~~~

~~~python
plot_graphs(history, 'loss')
~~~


# [IMDB Subwords 8K with Multi Layer LSTM](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%203%20-%20Lesson%201b.ipynb){:target="_back"}