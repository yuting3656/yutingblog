---
layout: "single"
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

# {'love': 1, 'my': 2, 'i': 3, 'dog': 4, 'cat': 5, 'you': 6}
~~~

# Text to sequence

~~~python
from tensorflow.keras.preprocessing.text import Tokenizer

sentences = [
   "I love my dog",
   "I love my cat",
   "You love my dog!",
   "Do you think my dog is amazing?"
]

tokenizer = Tokenizer(num_words = 100)
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index

sequences = tokenizer.texts_to_sequences(sentences)

print(word_index)
print(sequences)

# [ [1, 4, 1, 3], [1, 3, 1], ... ]

~~~

~~~python
test_data = [
   "i really love my dog",
   "my dog loves my manatee"
]

test_seq = tokenizer.texts_to_sequences(test_data)
print(test_seq)

# [ [1, 4, 1, 3], [1, 3, 1]]
~~~


# Looking more at the Tokenizer `oov_token`

~~~python
from tensorflow.keras.preprocessing.text import Tokenizer

sentences = [
   "I love my dog",
   "I love my cat",
   "You love my dog", 
   "Do you think my dog is amazing?"
]

tokenizer = Tokenizer(num_words = 100, oov_token="<OOV>") # out-of-vocabulary
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index

sequences = tokenizer.texts_to_sequences(sentences)

test_data = [
   "i really love my dog",
   "my dog loves my manatee"
]

test_seq = tokenizer.text_to_sequences(test_data)
print(test_seq)

# [[5, 1, 3, 2, 4], []] 
~~~


# [Padding](https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/sequence/pad_sequences)

- 就跟影像處裡一樣 size 要一致 model 才能 train

~~~python
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

sentences = [
   "I love my dog",
   "I lvoe my cat",
   "You love my dog",
   "Do you think my dog is amazing?"
]

tokenizer = Tokenizer(num_words=100, oov_token="<OOV>")
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index

sequences = tokenizer.text_to_sequences(sentences)

padded = pad_sequences(sequences)

print(word_index)
print(sequences)
print(padded)

~~~

![Imgur](https://i.imgur.com/dOhhl31.png)


- padding

   ~~~python
   padded = pad_sequences(sequences, padding='post')
   ~~~


- maxlen

   ~~~python
   # maxlen
   padded = pad_sequences(sequences, padding='post', maxlen=5)
   ~~~

- truncating
   - 	String, 'pre' or 'post' (optional, defaults to 'pre'): remove values from sequences larger than maxlen, either at the beginning or at the end of the sequences.

   ~~~python
      padded = pad_sequences(sequences, padding='post',
                                             truncating='post', maxlen=5)
   ~~~


# [Notbook](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%201%20-%20Lesson%202.ipynb#scrollTo=ArOPfBwyZtln)


~~~python
import tensorflow as tf
from tensorflow import keras

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

setences = [
    'I love my dog',
    'I love my cat',
    'You love my dog!',
    'Do you think my dog is amazing?'
]

tokenizer = Tokenizer(num_words=100, oov_token="<OOV>")
tokenizer.fix_on_texts(sentences)
word_index = tokenizer.word_index

sequences = tokenizer.texts_to_sequences(sentences)

padded = pad_sequences(sequences, maxlen=5)
print("\nWord Index = " , word_index)
print("\nSequences = " , sequences)
print("\nPadded Sequences:")
print(padded)

"""
Word Index =  {'<OOV>': 1, 'my': 2, 'love': 3, 'dog': 4, 'i': 5, 'you': 6, 'cat': 7, 'do': 8, 'think': 9, 'is': 10, 'amazing': 11}

Sequences =  [[5, 3, 2, 4], [5, 3, 2, 7], [6, 3, 2, 4], [8, 6, 9, 2, 4, 10, 11]]

Padded Sequences:
[[ 0  5  3  2  4]
 [ 0  5  3  2  7]
 [ 0  6  3  2  4]
 [ 9  2  4 10 11]]
"""


# Try with wors that the tokinzer wasn't fit to 
test_data = [
    'i really love my dog',
    'my dog loves my manatee'
]

test_seq = tokenizer.texts_to_sequences(test_data)
print("\nTest Sequence = ", test_seq)
padded = pad_sequences(test_seq, maxlen=10)
print("\nPadded Test Sequence: ")
print(padded)

"""
Test Sequence =  [[5, 1, 3, 2, 4], [2, 4, 1, 2, 1]]

Padded Test Sequence: 
[[0 0 0 0 0 5 1 3 2 4]
 [0 0 0 0 0 2 4 1 2 1]]
"""

~~~

![Imgur](https://i.imgur.com/d6MxcFR.png)

# Sarcasm, really 

- [https://rishabhmisra.github.io/publications/](https://rishabhmisra.github.io/publications)
   
   - Datasets
      - [IMDB Spoiler Dataset](https://www.kaggle.com/rmisra/imdb-spoiler-dataset)
      - [Clothing Fit Dataset for Size Recommendation](https://www.kaggle.com/rmisra/clothing-fit-dataset-for-size-recommendation/home)
      - [News Category Dataset ](https://www.kaggle.com/rmisra/news-category-dataset/home)
      - [News Headlines Dataset For Sarcasm Detection ](https://www.kaggle.com/rmisra/news-headlines-dataset-for-sarcasm-detection/home)

- [News Headlines Dataset For Sarcasm Detection ](https://www.kaggle.com/rmisra/news-headlines-dataset-for-sarcasm-detection/home)

~~~python

!wget --no-check-certificate \
    https://storage.googleapis.com/laurencemoroney-blog.appspot.com/sarcasm.json \
    -O /tmp/sarcasm.json
  

import json

with open("/tmp/sarcasm.json", "r") as f:
    datastore = json.load(f)

sentences = []
labels = []
urls = []
for item in datastore:
    sentences.append(item['headline'])
    labels.append(item['is_sarcastic'])
    url.append(item['article_link'])
~~~

~~~python
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

tokenizer = Tokenizer(oov_token="<OOV>")
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index

sequences = tokenizer.texts_to_sequences(sentences)
padded = pad_sequences(sequences, padding = "post")
print(padded[0])
print(sentences[0])
print(padded.shape)
"""
{'<OOV>': 1, 'to': 2, 'of': 3, 'the': 4, 'in': 5, 'for': 6, 'a': 7, 'on': 8, 'and': 9, 'with': 10, 'is': 11, 'new': 12, 'trump': 13, 'man': 14, 'from': 15, 'at': 16, 'about': 17, 'you': 18, 'this': 19, 'by': 20, 'after': 21, 'up': 22, 'out': 23, 'be': 24, 'how': 25, 'as': 26, 'it': 27, 'that': 28, 'not': 29, 'are': 30, 'your': 31, 'his': 32, 'what': 33, 'he': 34, 'all': 35, 'just': 36, 'who': 37, 'has': 38, 'will': 39, 'more': 40, 'one': 41, 'into': 42, 'report': 43, 'year': 44, 'why': 45, 'have': 46, 'area': 47, 'over': 48, 'donald': 49, 'u': 50, 'day': 51, 'says': 52, 's': 53, 'can': 54, 'first': 55, 'woman': 56, 'time': 57, 'like': 58, 'her': 59, "trump's": 60, 
... 
...
... 
"readin'": 29645, "researchin'": 29646, "writin'": 29647, "'easy": 29648, 'drywall': 29649, 'blowhole': 29650, "zimbabwe's": 29651, 'gonzalez': 29652, 'breached': 29653, "'basic'": 29654, 'hikes': 29655, 'gourmet': 29656, 'foodie': 29657}
former versace store clerk sues over secret 'black code' for minority shoppers
[  308 15115   679  3337  2298    48   382  2576 15116     6  2577  8434
     0     0     0     0     0     0     0     0     0     0     0     0
     0     0     0     0     0     0     0     0     0     0     0     0
     0     0     0     0]
(26709, 40)

"""
~~~

# Quiz 1 (錯一題~)

1. What is the name of the object used to tokenize sentences?

   - Tokenizer

2. What is the name of the method used to tokenize a list of sentences?

   - fit_on_texts(sentences)

3. Once you have the corpus tokenized, what’s the method used to encode a list of sentences to use those tokens?

   - texts_to_sequences(sentences)

4. When initializing the tokenizer, how to you specify a token to use for unknown words?

   - oov_token=`<Token>`

5. If you don’t use a token for out of vocabulary words, what happens at encoding?

   - The word isn’t encoded, and is skipped in the sequence

6. If you have a number of sequences of different lengths, how do you ensure that they are understood when fed into a neural network?

   - Process them on the input layer of the Neural Netword using the pad_sequences property

7. If you have a number of sequences of different length, and call pad_sequences on them, what’s the default result?

   - They’ll get padded to the length of the longest sequence by adding zeros to the beginning of shorter ones

8. When padding sequences, if you want the padding to be at the end of the sequence, how do you do it?

   - Pass padding=’post’ to pad_sequences when initializing it



# [Exercise 1 - Explore the BBC news archive](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%201%20-%20Exercise-question.ipynb)

- [BBC Datasets](http://mlg.ucd.ie/datasets/bbc.html)

- [stopwords.js](https://github.com/Yoast/YoastSEO.js/blob/develop/src/config/stopwords.js)


~~~python
!wget --no-check-certificate \
    https://storage.googleapis.com/laurencemoroney-blog.appspot.com/bbc-text.csv \
    -O /tmp/bbc-text.csv

  
import csv
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


#Stopwords list from https://github.com/Yoast/YoastSEO.js/blob/develop/src/config/stopwords.js
# Convert it to a Python list and paste it here
stopwords =  [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ]
~~~


~~~python
sentences = []
labels = []

with open("/tmp/bbc-text.csv", "r") as csv_file:
    csv_data = csv.reader(csv_file, delimiter=",")
    for idx, row in enumerate(csv_data):
        if idx != 0:
            labels.append(row[0])
            sentence = row[1]
            for word in stopwords:
                token = " " + word + " "
                sentence = sentence.replace(token, " ")
                sentence = sentence.replace("  ", " ")                 
            sentences.append(sentence)
~~~

~~~python
tokenizer = Tokenizer(oov_token="<OOV>")
tokenizer.fit_on_texts(sentences)
word_index = tokenizer.word_index
print(len(word_index))
# Expected output
# 29714
~~~


~~~python
sequences = tokenizer.texts_to_sequences(sentences)
padded = pad_sequences(sequences, padding="post")
print(padded[0])
print(padded.shape)

# Expected output
# [  96  176 1158 ...    0    0    0]
# (2225, 2442)
~~~

~~~python
label_tokenizer = Tokenizer()
label_tokenizer.fit_on_texts(labels)
label_word_index = label_tokenizer.word_index
label_seq = label_tokenizer.texts_to_sequences(labels)
print(label_seq)
print(label_word_index)

# Expected Output
# [[4], [2], [1], [1], [5], [3], [3], [1], [1], [5], [5], [2], [2], [3], [1], [2], [3], [1], [2], [4], [4], [4], [1], [1], [4], [1], [5], [4], [3], [5], [3], ...... [1], [1], [4], [4], [3], [2], [1], [5], [5], [1], [5], [4], [4], [2], [2], [2], [1], [1], [4], [1], [2], [4], [2], [2], [1], [2], [3], [2], [2], [4], [2], [4], [3], [4], [5], [3], [4], [5], [1], [3], [5], [2], [4], [2], [4], [5], [4], [1], [2], [2], [3], [5], [3], [1]]
# {'sport': 1, 'business': 2, 'politics': 3, 'tech': 4, 'entertainment': 5}
~~~