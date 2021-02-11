---
layout: 'post'
title: 'Coursera Tensorflow Developer Professional Certificate - nlp in tensorflow week03 (Sequence models)'
permalink: 'coursera-tensorflow-developer-professional-certificate/nlp-in-tensorflow/week03'
tags: coursera-tensorflow-developer-professional-certificate tensorflow nlp sequence-encoding rnn LSTM conv1d
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
tokenizer = info.features['text'].encoder
~~~

~~~python
BUFFER_SIZE = 10000
BATCH_SIZE = 64

train_dataset = train_dataset.shuffle(BUFFER_SIZE)
train_dataset = train_dataset.padded_batch(BATCH_SIZE, tf.compat.v1.data.get_output_shapes(train_dataset))
test_dataset = test_dataset.padded_batch(BATCH_SIZE,tf.compat.v1.data.get_output_shapes(test_dataset))
~~~

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(tokenizer.vocab_size, 64),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64, return_sequences=True)),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
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
bidirectional (Bidirectional (None, None, 128)         66048     
_________________________________________________________________
bidirectional_1 (Bidirection (None, 64)                41216     
_________________________________________________________________
dense (Dense)                (None, 64)                4160      
_________________________________________________________________
dense_1 (Dense)              (None, 1)                 65        
=================================================================
Total params: 635,329
Trainable params: 635,329
Non-trainable params: 0
_________________________________________________________________
"""
~~~

~~~python
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
~~~

~~~python
NUM_EPOCHS=2
history = model.fit(train_dataset, epochs=NUM_EPOCHS, validation_data=test_dataset)
~~~

~~~python
import matplotlib.pyplot as plt

def plot_graphs(history, string):
    plt.plot(history.history[string])
    plt.plot(history.history['val_' + string])
    plt.xlabel("Epochs")
    plt.ylabel(string)
    plt.legend([string, 'Val_' + string])
    plt.show()
~~~

~~~python
plot_graphs(history, 'accuracy')
~~~

~~~python
plot_graphs(history, 'loss')
~~~


# Accuracy and loss

|epoch|accuracy|loss|
|:---:|:---:|:---:|
|10|![Imgur](https://i.imgur.com/VAEp7Wm.png)|![Imgur](https://i.imgur.com/LTU0frt.png)|
|50|![Imgur](https://i.imgur.com/yMjxynJ.png)|![Imgur](https://i.imgur.com/ytt2zwr.png)|


## Looking into the code 

- 改成 LSTM

> |![Imgur](https://i.imgur.com/rBLIl7Q.png)|
>
> |![Imgur](https://i.imgur.com/HJ46iPQ.png)|
> 

-  Sarcasm dataset

> |![Imgur](https://i.imgur.com/XUW8xr2.png)|
>
> - val_acc 在 LSTM 中些微下降 代表有一點 over fitting 條一下 超參 應該會進步
>
> |![Imgur](https://i.imgur.com/5RmNNnM.png)|
>
> - val_loss 一樣的狀況 `the accuracy of the prediction increased, the confidence in it decreased`
>


# Convolutional network

> |![Imgur](https://i.imgur.com/yxVarVG.png)|
>
> |![Imgur](https://i.imgur.com/RfrvCI9.png)|
>


> |![Imgur](https://i.imgur.com/PohvMIx.png)|
>
> - 有 128 個 filter, 每次看五個字
>
> |![Imgur](https://i.imgur.com/zUXbfse.png)|
>
> - 長度 120 conv 5 個 5 個看 會去頭去尾 共四個 所以 116 


# [IMDB Subwords 8K with 1D Convolutional Layer](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%203%20-%20Lesson%201c.ipynb){:target="_back"}

~~~python
from __future__ import absolute_import, division, print_function, unicode_literals

import tensorflow_datasets as tfds
import tensorflow as tf
print(tf.__version__)
~~~

~~~python
# Get the data
dataset, info = tfds.load('imdb_reviews/subwords8k', with_info=True, as_supervised=True)
train_dataset, test_dataset = dataset['train'], dataset['test']
~~~

~~~python
tokenizer = info.features['text'].encoder
~~~

~~~python
BUFFER_SIZE = 10000
BATCH_SIZE = 64

train_dataset = train_dataset.shuffle(BUFFER_SIZE)
train_dataset = train_dataset.padded_batch(BATCH_SIZE, tf.compat.v1.data.get_output_shapes(train_dataset))
test_dataset = test_dataset.padded_batch(BATCH_SIZE,tf.compat.v1.data.get_output_shapes(test_dataset))
~~~

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(tokenizer.vocab_size, 64),
    tf.keras.layers.Conv1D(128, 5, activation='relu'),
    tf.keras.layers.GlobalAveragePooling1D(),
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
conv1d (Conv1D)              (None, None, 128)         41088     
_________________________________________________________________
global_average_pooling1d (Gl (None, 128)               0         
_________________________________________________________________
dense (Dense)                (None, 64)                8256      
_________________________________________________________________
dense_1 (Dense)              (None, 1)                 65        
=================================================================
Total params: 573,249
Trainable params: 573,249
Non-trainable params: 0
_________________________________________________________________
"""
~~~

~~~python
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
~~~

~~~python
NUM_EPOCHS = 1
history = model.fit(train_dataset, epochs=NUM_EPOCHS, validation_data=test_dataset)
~~~

~~~python
import matplotlib.pyplot as plt

def plot_graphs(history, string):
  plt.plot(history.history[string])
  plt.plot(history.history['val_'+string])
  plt.xlabel("Epochs")
  plt.ylabel(string)
  plt.legend([string, 'val_'+string])
  plt.show()
~~~

~~~python
plot_graphs(history, 'accuracy')
~~~

~~~python
plot_graphs(history, 'loss')
~~~

## model [save h5](https://www.tensorflow.org/tutorials/keras/save_and_load#save_the_entire_model){:target="_back"}

- [HDF5](https://en.wikipedia.org/wiki/Hierarchical_Data_Format) 

~~~python
# Create and train a new model instance.
model = create_model()
model.fit(train_images, train_labels, epochs=5)

# Save the entire model to a HDF5 file.
# The '.h5' extension indicates that the model should be saved to HDF5.
model.save('my_model.h5')
~~~

~~~python
# Recreate the exact same model, including its weights and the optimizer
new_model = tf.keras.models.load_model('my_model.h5')

# Show the model architecture
new_model.summary()
~~~


# Going back to IMBD dataset 大雜燴比較

- Word Embedding Only

> |![Imgur](https://i.imgur.com/4yQ1E8T.png)|
>
> |![Imgur](https://i.imgur.com/t0JkeYm.png)|
>
> |![Imgur](https://i.imgur.com/DoytpHf.png)|


- LSTM

> |![Imgur](https://i.imgur.com/IRQbR7P.png)|
>
> |![Imgur](https://i.imgur.com/0BquWvG.png)|
>
> |![Imgur](https://i.imgur.com/Bb9zBND.png)|

- GRU

> |![Imgur](https://i.imgur.com/oYoWvhn.png)|
>
> |![Imgur](https://i.imgur.com/OcdnIjh.png)|
>
> |![Imgur](https://i.imgur.com/DNGyEMu.png)|

- conv1D

> |![Imgur](https://i.imgur.com/hBVtUDl.png)|
>
> |![Imgur](https://i.imgur.com/zpE3AXF.png)|
>
> |![Imgur](https://i.imgur.com/Ssj27Kl.png)|

# [IMDB Reviews with GRU (and optional LSTM and Conv1D)](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%203%20-%20Lesson%202d.ipynb#scrollTo=nHGYuU4jPYaj){:target="_back"}

~~~python
import tensorflow as tf
print(tf.__version__)

# !pip install -q tensorflow-datasets
~~~

~~~python
import tensorflow_datasets as tfds
imdb, info = tfds.load("imdb_reviews", with_info=True, as_supervised=True)
~~~

~~~python
import numpy as np

train_data, test_data = imdb['train'], imdb['test']

training_sentences = []
training_labels = []

testing_sentences = []
testing_labels = []

# str(s.tonumpy()) is needed in Python3 instead of just s.numpy()
for s,l in train_data:
  training_sentences.append(str(s.numpy()))
  training_labels.append(l.numpy())
  
for s,l in test_data:
  testing_sentences.append(str(s.numpy()))
  testing_labels.append(l.numpy())
  
training_labels_final = np.array(training_labels)
testing_labels_final = np.array(testing_labels)
~~~

~~~python
vocab_size = 10000
embedding_dim = 16
max_length = 120
trunc_type='post'
oov_tok = "<OOV>"


from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
tokenizer.fit_on_texts(training_sentences)
word_index = tokenizer.word_index
sequences = tokenizer.texts_to_sequences(training_sentences)
padded = pad_sequences(sequences,maxlen=max_length, truncating=trunc_type)

testing_sequences = tokenizer.texts_to_sequences(testing_sentences)
testing_padded = pad_sequences(testing_sequences,maxlen=max_length)
~~~

~~~python
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])

def decode_review(text):
    return ' '.join([reverse_word_index.get(i, '?') for i in text])

print(decode_review(padded[1]))
print(training_sentences[1])
~~~

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Bidirectional(tf.keras.layers.GRU(32)),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
model.summary()

"""
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding (Embedding)        (None, 120, 16)           160000    
_________________________________________________________________
bidirectional (Bidirectional (None, 64)                9600      
_________________________________________________________________
dense (Dense)                (None, 6)                 390       
_________________________________________________________________
dense_1 (Dense)              (None, 1)                 7         
=================================================================
Total params: 169,997
Trainable params: 169,997
Non-trainable params: 0
______________________________________________________________
"""
~~~

~~~python
num_epochs = 50
history = model.fit(padded, training_labels_final, epochs=num_epochs, validation_data=(testing_padded, testing_labels_final))
~~~

~~~python
import matplotlib.pyplot as plt


def plot_graphs(history, string):
  plt.plot(history.history[string])
  plt.plot(history.history['val_'+string])
  plt.xlabel("Epochs")
  plt.ylabel(string)
  plt.legend([string, 'val_'+string])
  plt.show()

plot_graphs(history, 'accuracy')
plot_graphs(history, 'loss')
~~~

- LSTM

~~~python
# Model Definition with LSTM
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
model.summary()

"""
Model: "sequential_1"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding_1 (Embedding)      (None, 120, 16)           160000    
_________________________________________________________________
bidirectional_1 (Bidirection (None, 64)                12544     
_________________________________________________________________
dense_2 (Dense)              (None, 6)                 390       
_________________________________________________________________
dense_3 (Dense)              (None, 1)                 7         
=================================================================
Total params: 172,941
Trainable params: 172,941
Non-trainable params: 0
"""
~~~

- Conv1D

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Conv1D(128, 5, activation='relu'),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
model.summary()

"""
Model: "sequential_2"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding_2 (Embedding)      (None, 120, 16)           160000    
_________________________________________________________________
conv1d (Conv1D)              (None, 116, 128)          10368     
_________________________________________________________________
global_average_pooling1d (Gl (None, 128)               0         
_________________________________________________________________
dense_4 (Dense)              (None, 6)                 774       
_________________________________________________________________
dense_5 (Dense)              (None, 1)                 7         
=================================================================
Total params: 171,149
Trainable params: 171,149
Non-trainable params: 0
"""
~~~

# Exploring different sequence models

1. [Sarcasm with Bidirectional LSTM](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%203%20-%20Lesson%202.ipynb#scrollTo=g9DC6dmLF8DC){:target="_back"}


~~~python
import numpy as np

import json
import tensorflow as tf

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
~~~

~~~python
!curl https://storage.googleapis.com/laurencemoroney-blog.appspot.com/sarcasm.json --output .\sarcasm.json
~~~

~~~python
vocab_size = 1000
embedding_dim = 16
max_length = 120
trunc_type = 'post'
padding_type = 'post'
oov_tok = "<OOV>"
training_size = 20000

with open(".\sarcasm.json") as f:
    datastore = json.load(f)

sentences = []
labels = []
urls = []
for item in datastore:
    sentences.append(item['headline'])
    labels.append(item['is_sarcastic'])

training_sentences = sentences[0:training_size]
testing_sentences = sentences[training_size:]
training_labels = labels[0:training_size]
testing_labels = labels[training_size:]

tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_tok)
tokenizer.fit_on_texts(training_sentences)

word_index = tokenizer.word_index

# train
training_sequences = tokenizer.texts_to_sequences(training_sentences)
training_padded = pad_sequences(
    training_sequences, 
    maxlen=max_length, 
    padding=padding_type,
    truncating=trunc_type)

# test
testing_sequences = tokenizer.texts_to_sequences(testing_sentences)
testing_padded = pad_sequences(
   testing_sequences,
   maxlen=max_length,
   padding=padding_type,
   truncating=trunc_type
)
~~~


~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
    tf.keras.layers.Dense(24, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

"""
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding (Embedding)        (None, 120, 16)           16000     
_________________________________________________________________
bidirectional (Bidirectional (None, 64)                12544     
_________________________________________________________________
dense (Dense)                (None, 24)                1560      
_________________________________________________________________
dense_1 (Dense)              (None, 1)                 25        
=================================================================
Total params: 30,129
Trainable params: 30,129
Non-trainable params: 0
"""
~~~


~~~python
num_epochs = 10
training_padded = np.array(training_padded)
training_labels = np.array(training_labels)
testing_padded = np.array(testing_padded)
testing_labels= np.array(testing_labels)
history = model.fit(training_padded, training_labels, epochs=num_epochs, validation_data=(testing_padded, testing_labels), verbose=1)


"""

Epoch 1/10
625/625 [==============================] - 15s 24ms/step - loss: 0.3604 - accuracy: 0.8360 - val_loss: 0.3822 - val_accuracy: 0.8269
Epoch 2/10
625/625 [==============================] - 15s 24ms/step - loss: 0.3316 - accuracy: 0.8501 - val_loss: 0.3709 - val_accuracy: 0.8313
Epoch 3/10
625/625 [==============================] - 16s 26ms/step - loss: 0.3132 - accuracy: 0.8588 - val_loss: 0.3737 - val_accuracy: 0.8292
Epoch 4/10
625/625 [==============================] - 16s 26ms/step - loss: 0.3014 - accuracy: 0.8663 - val_loss: 0.3801 - val_accuracy: 0.8316
Epoch 5/10
625/625 [==============================] - 16s 26ms/step - loss: 0.2921 - accuracy: 0.8709 - val_loss: 0.3883 - val_accuracy: 0.8277
Epoch 6/10
625/625 [==============================] - 16s 26ms/step - loss: 0.2840 - accuracy: 0.8781 - val_loss: 0.3854 - val_accuracy: 0.8298
Epoch 7/10
625/625 [==============================] - 16s 26ms/step - loss: 0.2760 - accuracy: 0.8810 - val_loss: 0.3876 - val_accuracy: 0.8305
Epoch 8/10
625/625 [==============================] - 16s 26ms/step - loss: 0.2679 - accuracy: 0.8862 - val_loss: 0.3947 - val_accuracy: 0.8293
Epoch 9/10
625/625 [==============================] - 17s 28ms/step - loss: 0.2615 - accuracy: 0.8872 - val_loss: 0.3925 - val_accuracy: 0.8259
Epoch 10/10
625/625 [==============================] - 18s 29ms/step - loss: 0.2545 - accuracy: 0.8889 - val_loss: 0.4315 - val_accuracy: 0.8256
"""
~~~


~~~python
import matplotlib.pyplot as plt

def plot_graphs(histroy, string):
    plt.plot(history.history[string])
    plt.plot(history.history['val_' + string])
    plt.xlabel("Epochs")
    plt.ylabel(string)
    plt.legend([string, 'val_' + string])
    plt.show()
    
plot_graphs(history, 'accuracy')
plot_graphs(history, 'loss')
~~~

![Imgur](https://i.imgur.com/hMNVms2.png)


2. [Sarcasm with 1D Convolutional Layer](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%203%20-%20Lesson%202c.ipynb#scrollTo=g9DC6dmLF8DC){:target="_back"}


~~~python
import numpy as np

import json
import tensorflow as tf

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

vocab_size = 1000
embedding_dim = 16
max_length = 120
trunc_type = 'post'
padding_type = 'post'
oov_tok = "<OOV>"
training_size = 20000

with open(".\sarcasm.json") as f:
    datastore = json.load(f)

sentences = []
labels = []
urls = []
for item in datastore:
    sentences.append(item['headline'])
    labels.append(item['is_sarcastic'])

training_sentences = sentences[0:training_size]
testing_sentences = sentences[training_size:]
training_labels = labels[0:training_size]
testing_labels = labels[training_size:]

tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_tok)
tokenizer.fit_on_texts(training_sentences)

word_index = tokenizer.word_index

# train
training_sequences = tokenizer.texts_to_sequences(training_sentences)
training_padded = pad_sequences(
    training_sequences, 
    maxlen=max_length, 
    padding=padding_type,
    truncating=trunc_type)

# test
testing_sequences = tokenizer.texts_to_sequences(testing_sentences)
testing_padded = pad_sequences(
   testing_sequences,
   maxlen=max_length,
   padding=padding_type,
   truncating=trunc_type
)

model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Conv1D(128, 5, activation='relu'),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(24, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()


"""
Model: "sequential_1"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding_2 (Embedding)      (None, 120, 16)           16000     
_________________________________________________________________
conv1d_1 (Conv1D)            (None, 116, 128)          10368     
_________________________________________________________________
global_average_pooling1d_1 ( (None, 128)               0         
_________________________________________________________________
dense_2 (Dense)              (None, 24)                3096      
_________________________________________________________________
dense_3 (Dense)              (None, 1)                 25        
=================================================================
Total params: 29,489
Trainable params: 29,489
Non-trainable params: 0
___________________________________________________________________
"""

num_epochs = 10
training_padded = np.array(training_padded)
training_labels = np.array(training_labels)
testing_padded = np.array(testing_padded)
testing_labels= np.array(testing_labels)
history = model.fit(training_padded, training_labels, epochs=num_epochs, validation_data=(testing_padded, testing_labels), verbose=1)


"""
Epoch 1/10
625/625 [==============================] - 4s 6ms/step - loss: 0.6348 - accuracy: 0.6128 - val_loss: 0.4709 - val_accuracy: 0.7717
Epoch 2/10
625/625 [==============================] - 4s 6ms/step - loss: 0.4185 - accuracy: 0.8043 - val_loss: 0.4147 - val_accuracy: 0.8070
Epoch 3/10
625/625 [==============================] - 4s 6ms/step - loss: 0.3687 - accuracy: 0.8347 - val_loss: 0.3994 - val_accuracy: 0.8173
Epoch 4/10
625/625 [==============================] - 4s 6ms/step - loss: 0.3523 - accuracy: 0.8430 - val_loss: 0.3943 - val_accuracy: 0.8229
Epoch 5/10
625/625 [==============================] - 4s 6ms/step - loss: 0.3373 - accuracy: 0.8510 - val_loss: 0.3900 - val_accuracy: 0.8250
Epoch 6/10
625/625 [==============================] - 4s 6ms/step - loss: 0.3250 - accuracy: 0.8535 - val_loss: 0.3870 - val_accuracy: 0.8268
Epoch 7/10
625/625 [==============================] - 4s 6ms/step - loss: 0.3146 - accuracy: 0.8626 - val_loss: 0.3905 - val_accuracy: 0.8269
Epoch 8/10
625/625 [==============================] - 4s 6ms/step - loss: 0.3062 - accuracy: 0.8628 - val_loss: 0.3918 - val_accuracy: 0.8256
Epoch 9/10
625/625 [==============================] - 4s 6ms/step - loss: 0.2907 - accuracy: 0.8726 - val_loss: 0.3885 - val_accuracy: 0.8253
Epoch 10/10
625/625 [==============================] - 4s 6ms/step - loss: 0.2862 - accuracy: 0.8771 - val_loss: 0.3923 - val_accuracy: 0.8259
"""

import matplotlib.pyplot as plt

def plot_graphs(histroy, string):
    plt.plot(history.history[string])
    plt.plot(history.history['val_' + string])
    plt.xlabel("Epochs")
    plt.ylabel(string)
    plt.legend([string, 'val_' + string])
    plt.show()
    
plot_graphs(history, 'accuracy')
plot_graphs(history, 'loss')

~~~

![Imgur](https://i.imgur.com/maLnnsn.png)


# Week 03  Quiz (錯一題而已啦!)

1. Why does sequence make a large difference when determining semantics of language?

   - Because the order in which words appear dictate their impact on the meaning of the sentence


2. How do Recurrent Neural Networks help you understand the impact of sequence on meaning?

   - They carry meaning from one cell to the next

3. How does an LSTM help understand meaning when words that qualify each other aren’t necessarily beside each other in a sentence?

   - Values from earlier words can be carried to later ones via a cell state

4. What keras layer type allows LSTMs to look forward and backward in a sentence?

   - Bidirectional

5. What’s the output shape of a bidirectional LSTM layer with 64 units?

   - (None, 128)

6. When stacking LSTMs, how do you instruct an LSTM to feed the next one in the sequence?

   - Ensure that return_sequences is set to True only on units that feed to another LSTM

7. If a sentence has 120 tokens in it, and a Conv1D with 128 filters with a Kernal size of 5 is passed over it, what’s the output shape?

   - (None, 116, 128)

8. What’s the best way to avoid overfitting in NLP datasets?

   - None of the above


# Exercise - [Exploring overfitting in NLP](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/NLP%20Course%20-%20Week%203%20Exercise%20Question.ipynb){:taregt="_back"}

- [kaggle - sentiment140](https://www.kaggle.com/kazanova/sentiment140){:target="_back"}

- [GloVe](https://nlp.stanford.edu/projects/glove/){:target="_back"}


~~~python
!curl https://storage.googleapis.com/laurencemoroney-blog.appspot.com/training_cleaned.csv --output .\weektraining_cleaned.csv
~~~

~~~python
import json
import tensorflow as tf
import csv
import random
import numpy as np

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical
from tensorflow.keras import regularizers


embedding_dim = 100
max_length = 16
trunc_type='post'
padding_type='post'
oov_tok = "<OOV>"
training_size= 160000 #Your dataset size here. Experiment using smaller values (i.e. 16000), but don't forget to train on at least 160000 to see the best effects
test_portion=.1

corpus = []
~~~

~~~python
num_sentences = 0
corpus = []
with open('./archive/training.1600000.processed.noemoticon.csv',encoding="LATIN1") as csvfile:
    reader = csv.reader(csvfile, delimiter=",")
    print(reader)
    for row in reader:
        list_item=[]
        list_item.append(row[5])
        list_item.append(0 if str(row[0]) == "0" else 1)
        num_sentences = num_sentences + 1
        corpus.append(list_item)
~~~

~~~python
print(num_sentences)
print(len(corpus))
print(corpus[1])
~~~

~~~python
sentences=[]
labels=[]
random.shuffle(corpus)
for x in range(training_size):
    sentences.append(corpus[x][0])
    labels.append(corpus[x][1])


tokenizer = Tokenizer()
tokenizer.fit_on_texts(sentences)

word_index = tokenizer.word_index
vocab_size=len(word_index)

sequences = tokenizer.texts_to_sequences(sentences)
padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type ,truncating=trunc_type)

split = int(test_portion * training_size)

test_sequences = padded[0:split]
training_sequences = padded[split:training_size]
test_labels = labels[0:split]
training_labels = labels[split:0]
~~~

~~~python
print(vocab_size)
print(word_index['i'])
~~~

~~~python
# Note this is the 100 dimension version of GloVe from Stanford
# I unzipped and hosted it on my site to make this notebook easier
!wget --no-check-certificate \
    https://storage.googleapis.com/laurencemoroney-blog.appspot.com/glove.6B.100d.txt \
    -O /tmp/glove.6B.100d.txt
embeddings_index = {}
with open('/tmp/glove.6B.100d.txt') as f:
    for line in f:
        values = line.split()
        word = values[0]
        coefs = np.asarray(values[1:], dtype='float32')
        embeddings_index[word] = coefs

embeddings_matrix = np.zeros((vocab_size+1, embedding_dim))
for word, i in word_index.items():
    embedding_vector = embeddings_index.get(word)
    if embedding_vector is not None:
        embeddings_matrix[i] = embedding_vector
~~~

~~~python
print(len(embeddings_matrix))
# Expected Output
# 138859
~~~

~~~python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size+1, embedding_dim, input_length=max_length, weights=[embeddings_matrix], trainable=False),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Conv1D(64, 5, activation='relu'),
    tf.keras.layers.MaxPooling1D(pool_size=4),
    tf.keras.layers.LSTM(64),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
model.summary()

num_epochs = 50

training_padded = np.array(training_sequences)
training_labels = np.array(training_labels)
testing_padded = np.array(test_sequences)
testing_labels = np.array(test_labels)

history = model.fit(training_padded, training_labels, epochs=num_epochs, validation_data=(testing_padded, testing_labels), verbose=2)

print("Training Complete")
~~~


~~~python
import matplotlib.image  as mpimg
import matplotlib.pyplot as plt

#-----------------------------------------------------------
# Retrieve a list of list results on training and test data
# sets for each training epoch
#-----------------------------------------------------------
acc=history.history['accuracy']
val_acc=history.history['val_accuracy']
loss=history.history['loss']
val_loss=history.history['val_loss']

epochs=range(len(acc)) # Get number of epochs

#------------------------------------------------
# Plot training and validation accuracy per epoch
#------------------------------------------------
plt.plot(epochs, acc, 'r')
plt.plot(epochs, val_acc, 'b')
plt.title('Training and validation accuracy')
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.legend(["Accuracy", "Validation Accuracy"])

plt.figure()

#------------------------------------------------
# Plot training and validation loss per epoch
#------------------------------------------------
plt.plot(epochs, loss, 'r')
plt.plot(epochs, val_loss, 'b')
plt.title('Training and validation loss')
plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.legend(["Loss", "Validation Loss"])

plt.figure()


# Expected Output
# A chart where the validation loss does not increase sharply!
~~~