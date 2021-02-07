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
imdb, info = tfds.load("imbd_reviews", with_info = True, as_supervised=True)
~~~

- 用到這邊 剛好我的 tf 是 1.x 版 我乾脆直接升版本 到 2.x
   - `pip install --upgrade tensorflow`

~~~python
import numpy as np

train_data, test_data = imdb['train'], imdb['test']
~~~

~~~python
training_sentences = []
training_labels = []

testing_sentences = []
testing_labels = []

for s, l in train_data:
    training_sentences.append(str(s.numpy()))
    training_labels.append(l.numpy())

for s, l in test_data:
    testing_sentences.append(str(s.numpy()))
    testing_labels.append(l.numpy())

"""
train_data 
<PrefetchDataset shapes: ((), ()), types: (tf.string, tf.int64)>
"""
~~~

- [tf.Tensor](https://www.tensorflow.org/api_docs/python/tf/Tensor){:target="_back"}

   - ![Imgur](https://i.imgur.com/7EZJoJ2.png)
   - ![Imgur](https://i.imgur.com/zBlov77.png)


### Labels

~~~python
training_labels_final = np.array(training_labels)
testing_labels_final = np.array(testing_labels)
~~~


### Tokenizer

~~~python
vocab_size = 10000
embedding_dim = 16
max_length = 120
trunc_type = 'post'
oov_tok = '<OOV>'

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# tokenize init 設定要抓少個字 和 未出現字元(out of vocabulary)的 default 數值
tokenizer = Tokenizer(num_words= vocab_size, oov_token= oov_tok)
# 吃資料的句子
tokenizer.fit_on_texts(training_sentences)
# 把每個字標上 index
word_index = tokenizer.word_index
# 將句子轉成 index 的樣子
sequences = tokenizer.texts_to_sequences(training_sentences)
# 把所有 sequences 長度用成一樣 
padded = pad_sequences(sequences, maxlen=max_length, truncating=trunc_type)

testing_sequences = tokenizer.texts_to_sequences(testing_sentences)
testing_padded = pad_sequences(testing_sequences, maxlen=max_length)
~~~

### Model

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length = max_length),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
~~~

-  Vectors
   - `tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length = max_length),`
   - 舉例: 電影評論 `好/壞` 兩種可能 把句子打成向量的形式 然後 給予 label(`好/壞`) 這樣玩就簡單許多

   ![Imgur](https://i.imgur.com/eZhJBoq.png)


- GlobalAveragePolling1D

   - 比較快一點

   ~~~python
   model = tf.keras.Sequential([
       tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length = max_length),
       tf.keras.layers.GlobalAveragePooling1D(),
       tf.keras.layers.Dense(6, activation='relu'),
       tf.keras.layers.Dense(1, activation='sigmoid')
   ])
   ~~~

   - ![Imgur](https://i.imgur.com/MlMkCdM.png)

### Compile

~~~python
model.compile(loss='binary_crossentropy', 
              optimizer='adam',
              metrics=['accuracy'])
model.summary()
~~~

### Training

~~~python
num_epochs = 3
model.fit(padded,
          training_labels_final,
          epochs=num_epochs,
          validation_data=(testing_padded, testing_labels_final))
~~~


# Words Embedding Details


~~~python
e = model.layers[0]
weights = e.get_weights()[0]
print(weights.shape) # shape: (vocab_size, embedding_dim)
# (10000, 16)
~~~

![Imgur](https://i.imgur.com/kQliZnP.png)

~~~python
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])
~~~


~~~python
import io

out_v = io.open('vecs.tsv', 'w', encoding='utf-8')
out_m = io.open('meta.tsv', 'w', encoding='utf-8')

for word_num in range(1, vocab_size):
    word = reverse_word_index[word_num]
    embeddings = weights[word_num]
    out_m.write(word + "\n")
    out_v.write('\t'.join([str(x) for x  in embeddings]) + "\n")
out_v.close()
out_m.close()
~~~


- 到 [projector tensorflow](https://projector.tensorflow.org/)

  - 把剛剛寫出來的 vecs.tsv, meta.tsv 丟上去 句子打向量後的樣子 感受一下 :sunglasses: :heart:


# [NoteBook](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%202%20-%20Lesson%201.ipynb#scrollTo=nWVbUhu6co72)

>  幹! 真的超級好玩的兒!!!
