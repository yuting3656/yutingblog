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

# Week2 Exercise - BBC news archive

- [Curl](http://www.compciv.org/recipes/cli/downloading-with-curl/){:target="_back"}

   - windows 
      - `!curl https://storage.googleapis.com/laurencemoroney-blog.appspot.com/bbc-text.csv --output .\bbc-text.csv `


~~~python
import csv
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

!wget --no-check-certificate \
    https://storage.googleapis.com/laurencemoroney-blog.appspot.com/bbc-text.csv \
    -O /tmp/bbc-text.csv
~~~

~~~python
vocab_size = 1000 # YOUR CODE HERE
embedding_dim = 16 # YOUR CODE HERE
max_length = 120 # YOUR CODE HERE
trunc_type = 'post' # YOUR CODE HERE
padding_type = 'post' # YOUR CODE HERE
oov_tok = "<OOV>" # YOUR CODE HERE
training_portion = .8
~~~

~~~python
sentences = []
labels = []
stopwords = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ]
print(len(stopwords))
# Expected Output
# 153
~~~

~~~python
with open("/tmp/bbc-text.csv", 'r') as csvfile:
    # YOUR CODE HERE
    csv_data = csv.reader(csvfile, delimiter=",")
    for idx, row in enumerate(csv_data):
      if idx!= 0:
        labels.append(row[0])
        sentence = row[1]
        for word in stopwords:
          token = " " + word + " "
          sentence = sentence.replace(token, " ")
          sentence = sentence.replace("  ", " ")
        sentences.append(sentence)
        

    
print(len(labels))
print(len(sentences))
print(sentences[0])
# Expected Output
# 2225
# 2225
# tv future hands viewers home theatre systems  plasma high-definition tvs  digital video recorders moving living room  way people watch tv will radically different five years  time.  according expert panel gathered annual consumer electronics show las vegas discuss new technologies will impact one favourite pastimes. us leading trend  programmes content will delivered viewers via home networks  cable  satellite  telecoms companies  broadband service providers front rooms portable devices.  one talked-about technologies ces digital personal video recorders (dvr pvr). set-top boxes  like us s tivo uk s sky+ system  allow people record  store  play  pause forward wind tv programmes want.  essentially  technology allows much personalised tv. also built-in high-definition tv sets  big business japan us  slower take off europe lack high-definition programming. not can people forward wind adverts  can also forget abiding network channel schedules  putting together a-la-carte entertainment. us networks cable satellite companies worried means terms advertising revenues well  brand identity  viewer loyalty channels. although us leads technology moment  also concern raised europe  particularly growing uptake services like sky+.  happens today  will see nine months years  time uk   adam hume  bbc broadcast s futurologist told bbc news website. likes bbc  no issues lost advertising revenue yet. pressing issue moment commercial uk broadcasters  brand loyalty important everyone.  will talking content brands rather network brands   said tim hanlon  brand communications firm starcom mediavest.  reality broadband connections  anybody can producer content.  added:  challenge now hard promote programme much choice.   means  said stacey jolna  senior vice president tv guide tv group  way people find content want watch simplified tv viewers. means networks  us terms  channels take leaf google s book search engine future  instead scheduler help people find want watch. kind channel model might work younger ipod generation used taking control gadgets play them. might not suit everyone  panel recognised. older generations comfortable familiar schedules channel brands know getting. perhaps not want much choice put hands  mr hanlon suggested.  end  kids just diapers pushing buttons already - everything possible available   said mr hanlon.  ultimately  consumer will tell market want.   50 000 new gadgets technologies showcased ces  many enhancing tv-watching experience. high-definition tv sets everywhere many new models lcd (liquid crystal display) tvs launched dvr capability built  instead external boxes. one example launched show humax s 26-inch lcd tv 80-hour tivo dvr dvd recorder. one us s biggest satellite tv companies  directtv  even launched branded dvr show 100-hours recording capability  instant replay  search function. set can pause rewind tv 90 hours. microsoft chief bill gates announced pre-show keynote speech partnership tivo  called tivotogo  means people can play recorded programmes windows pcs mobile devices. reflect increasing trend freeing multimedia people can watch want  want.
~~~


~~~python
train_size = int(len(sentences) * training_portion) # 1780 # YOUR CODE HERE

train_sentences = sentences[0: train_size] # YOUR CODE HERE
train_labels = labels[0: train_size] # YOUR CODE HERE

validation_sentences = sentences[train_size:] # YOUR CODE HERE
validation_labels = labels[train_size:] # YOUR CODE HERE

print(train_size)
print(len(train_sentences))
print(len(train_labels))
print(len(validation_sentences))
print(len(validation_labels))

# Expected output (if training_portion=.8)
# 1780
# 1780
# 1780
# 445
# 445
~~~

~~~python
tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_tok)# YOUR CODE HERE
tokenizer.fit_on_texts(train_sentences)# YOUR CODE HERE
word_index = tokenizer.word_index # YOUR CODE HERE

train_sequences = tokenizer.texts_to_sequences(train_sentences)# YOUR CODE HERE
train_padded = pad_sequences(train_sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type) # YOUR CODE HERE

print(len(train_sequences[0]))
print(len(train_padded[0]))

print(len(train_sequences[1]))
print(len(train_padded[1]))

print(len(train_sequences[10]))
print(len(train_padded[10]))

# Expected Ouput
# 449
# 120
# 200
# 120
# 192
# 120
~~~

~~~python
validation_sequences = tokenizer.texts_to_sequences(validation_sentences) # YOUR CODE HERE
validation_padded = pad_sequences(validation_sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type) # YOUR CODE HERE

print(len(validation_sequences))
print(validation_padded.shape)

# Expected output
# 445
# (445, 120)
~~~

~~~python
label_tokenizer = Tokenizer() # YOUR CODE HERE
label_tokenizer.fit_on_texts(labels)

training_label_seq = np.array(label_tokenizer.texts_to_sequences(train_labels))  # YOUR CODE HERE
validation_label_seq = np.array(label_tokenizer.texts_to_sequences(validation_labels)) # YOUR CODE HERE

print(training_label_seq[0])
print(training_label_seq[1])
print(training_label_seq[2])
print(training_label_seq.shape)

print(validation_label_seq[0])
print(validation_label_seq[1])
print(validation_label_seq[2])
print(validation_label_seq.shape)

# Expected output
# [4]
# [2]
# [1]
# (1780, 1)
# [5]
# [4]
# [3]
# (445, 1)
~~~

~~~python
model = tf.keras.Sequential([
# YOUR CODE HERE
   tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
   tf.keras.layers.GlobalAveragePooling1D(),
   tf.keras.layers.Dense(24, activation='relu'),
   tf.keras.layers.Dense(6, activation='softmax')
])
model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
model.summary()

# Expected Output
# Layer (type)                 Output Shape              Param #   
# =================================================================
# embedding (Embedding)        (None, 120, 16)           16000     
# _________________________________________________________________
# global_average_pooling1d (Gl (None, 16)                0         
# _________________________________________________________________
# dense (Dense)                (None, 24)                408       
# _________________________________________________________________
# dense_1 (Dense)              (None, 6)                 150       
# =================================================================
# Total params: 16,558
# Trainable params: 16,558
# Non-trainable params: 0
~~~


~~~python
num_epochs = 30
history = model.fit(
    train_padded, 
    training_label_seq, 
    epochs=num_epochs, 
    validation_data=(validation_padded, validation_label_seq),
    verbose=2)
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
  
plot_graphs(history, "accuracy")
plot_graphs(history, "loss")
~~~

![Imgur](https://i.imgur.com/HqAzZQq.png)

~~~python
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])

def decode_sentence(text):
    return ' '.join([reverse_word_index.get(i, '?') for i in text])
~~~

~~~python
e = model.layers[0]
weights = e.get_weights()[0]
print(weights.shape) # shape: (vocab_size, embedding_dim)

# Expected output
# (1000, 16)
~~~

~~~python
import io

out_v = io.open('vecs.tsv', 'w', encoding='utf-8')
out_m = io.open('meta.tsv', 'w', encoding='utf-8')
for word_num in range(1, vocab_size):
  word = reverse_word_index[word_num]
  embeddings = weights[word_num]
  out_m.write(word + "\n")
  out_v.write('\t'.join([str(x) for x in embeddings]) + "\n")
out_v.close()
out_m.close()
~~~

~~~python
try:
  from google.colab import files
except ImportError:
  pass
else:
  files.download('vecs.tsv')
  files.download('meta.tsv')
~~~

![Imgur](https://i.imgur.com/Fbqopfo.png)

> 超帥~~~~~~~~~