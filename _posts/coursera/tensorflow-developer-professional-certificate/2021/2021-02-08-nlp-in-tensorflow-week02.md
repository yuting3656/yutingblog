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

def decode_review(text):
    return ' '.join([reverse_word_index.get(i, '?') for i in text])

print(decode_review(padded[0]))
print(training_sentences[0])
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


# [NoteBook](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%202%20-%20Lesson%201.ipynb#scrollTo=nWVbUhu6co72) (IMBD datasets)

>  幹! 真的超級好玩的兒!!!


# Sarcasem Dataset

~~~python
import json
import tensorflow as tf

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequencs


voca_size = 10000
embedding_dim = 16
max_length = 32
trunc_type = 'post'
padding_type = 'post'
oov_tok = "<OOV>"
training_size = 2000

~~~

- [download link](http://storage.googleapis.com/laurencemoroney-blog.appspot.com/sarcasm.json){:target="_back"}

~~~cmd
!wget --no-check-certificate \
 http://storage.googleapis.com/laurencemoroney-blog.appspot.com/sarcasm.json \
 -O /tmp/sarcasm.json
~~~

~~~python
with open("/tmp/sarcasm.json", 'r') as f:
    datastore = json.load(f)

sentences = []
labels = []

for item in datastore:
    sentences.append(item['headline'])
    labels.append(item['is_sarcastic'])
~~~


~~~python
training_sentences = sentences[0: training_size]
testing_sentences = sentecnes[training_size:]
training_labels = labels[0:training_size]
testing_labels = labels[training_size:]
~~~

~~~python
tokenizer = Tokenzer(num_words=vocab_size, oov_token=oov_tok)
tokenizer.fit_on_texts(training_sentences)

word_index = tokenizer.word_index

training_sequences = tokenizer.texts_to_sequences(training_sentences)
training_padded = pad_sequences(training_sequences, maxlen=max_length,
                                padding=padding_type, truncating=trunc_type)

testing_sequences = tokenizer.text_to_sequences(teting_sentences)
testing_padded = pad_sequences(testing_sequences, maxlen=max_length,
                               padding=padding_type, truncating=trunc_type)
~~~

~~~python
mdoel = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.GlobalAveragePolling1D(),
    tf.keras.layers,Dense(24, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metris=['accuracy'])
model.summary()
~~~

![Imgur](https://i.imgur.com/APCP9qP.png)


~~~python
num_epochs = 30

history = model.fit(training_padded, training_labels, epochs=num_epochs, 
                    validation_data=(testing_padded, testing_labels), verbose=2)
~~~


~~~python
import matplotlib.pyplot as plt

def plot_graphs(history, string):
    plt.plot(history.history[string])
    plt.plot(history.history['val_' + string])
    plt.xlabel("Epochs")
    plt.ylabel(string)
    plt.legend([string, 'val_' + string])
    plt.show()

plot_graphs(history, 'acc')
plot_graphs(history, 'loss')
~~~

![Imgur](https://i.imgur.com/zKBhYNI.png)


### 調超參數 loss function 

|參數|loss 圖表|
|:---:|:---:|
|![Imgur](https://i.imgur.com/Rq6D500.png)|![Imgur](https://i.imgur.com/oQhFGxq.png)|
|![Imgur](https://i.imgur.com/HOEsgSv.png)|![Imgur](https://i.imgur.com/h6VLtIN.png)|


## [NoteBook](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%202%20-%20Lesson%202.ipynb){:target="_back"} (Sarcasem Dataset)


# tensorflow datasets


- [github](https://github.com/tensorflow/datasets/tree/master/docs/catalog){:target="_back"}
- [overview](https://www.tensorflow.org/datasets/catalog/overview){:target="_back"}

---

# [imbd_reviews](https://github.com/tensorflow/datasets/blob/master/docs/catalog/imdb_reviews.md){:target="_back"}

   - imbd_reviews/subwords32k


## imdb_reviews/subwords8k

*   **Config description**: Uses `tfds.deprecated.text.SubwordTextEncoder` with
    8k vocab size

*   **Features**:

```python
FeaturesDict({
    'label': ClassLabel(shape=(), dtype=tf.int64, num_classes=2),
    'text': Text(shape=(None,), dtype=tf.int64, encoder=<SubwordTextEncoder vocab_size=8185>),
})
```

*   **Examples**
    ([tfds.as_dataframe](https://www.tensorflow.org/datasets/api_docs/python/tfds/as_dataframe)):


~~~python
import tensorflow_datasets as tfds
imdb, info = tfds.load("imbd_reviews/subwords8k", with_into=True, as_supervised=True)
~~~

~~~python
train_data, test_data = imdb['train'], imdb['test']
~~~

~~~python
tokenizer = info.features['text'].encoder

tensorflow.org/datasets/api_docs/python/tfds/features/text/SubwordTextEncoder
tensorflow.org/datasets/api_docs/python/tfds/deprecated/text/SubwordTextEncoder
~~~

![Imgur](https://i.imgur.com/H3YMIM8.png)

~~~python
sample_string = 'TensorFlow, from basics to mastery'

tokenized_string = tokenizer.encode(sample_string)
print('Tokenized string is {}'.format(tokenized_string))

original_string = tokenizer.decode(tokenized_string)
print('The original string: {}'.format(original_string))

~~~

![Imgur](https://i.imgur.com/KhYQukB.png)

~~~python
for ts in tokenized_string:
    print('{} ----> {}'.format(ts, tokenizer.decode([ts])))
~~~

![Imgur](https://i.imgur.com/aXsDXkQ.png)

~~~python
embedding_dim = 64
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(tokenizer.vocab_size, embedding_dim),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.summary()
~~~

![Imgur](https://i.imgur.com/TXHFD6T.png)


~~~python
num_epochs = 10

model.compile(loss="binary_crossentropy", 
              optimizer="adam",
              metrics=["accuracy"])

history = model.fit(train_data,
                    epochs=num_epochs,
                    validation_data=test_data)
~~~


~~~python
import matploylib.pyplot as plt

def plot_graphs(history, string):
    plt.plot(history.history[string])
    plt.plot(history.history['val_' + string])
    plt.xlabel("Epochs")
    plt.ylabel(string)
    plt.legend([string, 'val_' + string])
    plt.show()

plot_graphs(history, "acc")
plot_graphs(history, "loss")
~~~

![Imgur](https://i.imgur.com/ULevSgg.png)

# [ＮoteBook](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%202%20-%20Lesson%203.ipynb){:target="_back"} (mdb_reviews/subwords8k)


# Quiz 2 (錯一題)

1. What is the name of the TensorFlow library containing common data that you can use to train and test neural networks?

   - TensorFlow Datasets

2. How many reviews are there in the IMDB dataset and how are they split?

   - 50,000 records, 50/50 train/test split

3. How are the labels for the IMDB dataset encoded?

   - Reviews encoded as a number 0-1

4. What is the purpose of the embedding dimension?

   - It is the number of dimensions for the vector representing the word encoding

5. When tokenizing a corpus, what does the num_words=n parameter do?

   - It specifies the maximum number of words to be tokenized, and picks the most common ‘n’ words

6. To use word embeddings in TensorFlow, in a sequential layer, what is the name of the class?

   - tf.keras.layers.Embedding

7. IMDB Reviews are either positive or negative. What type of loss function should be used in this scenario?

   - Binary crossentropy

8. When using IMDB Sub Words dataset, our results in classification were poor. Why?

   - Sequence becomes much more important when dealing with subwords, but we’re ignoring word positions

