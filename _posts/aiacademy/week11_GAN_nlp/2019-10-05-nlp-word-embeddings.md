---
layout: "single"
title: 'aiacademy: 自然語言處理 NLP 2. Word Embeddings'
permalink: 'aiacademy/week11/nlp-word-embeddings-wrod2vec'
tags: aiacademy nlp word-embeddings Word2Vec
---

- [我的筆記](https://yuting3656.github.io/yutingblog//dl-coursera-sequence-models/week2/nlp-and-word-embeddings-word2vec-glove){:target="_back"}

## Word Embeddings - Word2Vec

<iframe src="https://www.youtube.com/embed/qBA7PXH_04E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Word2Vec - Skip-Gram Model

![Imgur](https://i.imgur.com/rvVjbl2.gif)


### Word2Vec Skip-Gram Illustration

![Imgur](https://i.imgur.com/Mk59Fas.gif)

### Hidden Layer Matrix --> Word Embedding Matrix

![Imgur](https://i.imgur.com/RphVUm4.gif)

### Weight Matrix Relation

![Imgur](https://i.imgur.com/fTOzHII.gif)

![Imgur](https://i.imgur.com/FnVG2ph.gif)

### Word2Vec Skip-Gram Illustration

![Imgur](https://i.imgur.com/W0ALayB.gif)


## Word Embeddings - Word2Vec Training

<iframe src="https://www.youtube.com/embed/TuQ7VvTpbkM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Word2Vec Skip-Gram Illustration

![Imgur](https://i.imgur.com/W0ALayB.gif)

### Loss Function

![Imgur](https://i.imgur.com/EXaqlJt.gif)


### SGD Update for W'

![Imgur](https://i.imgur.com/nrGRHZU.gif)

![Imgur](https://i.imgur.com/f834c6d.gif)

### SGD Update 

![Imgur](https://i.imgur.com/0akEtVe.gif)


## Negative Sampling

<iframe  src="https://www.youtube.com/embed/FH04OJixMwk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Hierarchical Softmax

![Imgur](https://i.imgur.com/qB1zA2l.gif)

#### Negative Sampling

![Imgur](https://i.imgur.com/eti4Njr.gif)

![Imgur](https://i.imgur.com/ZFdXJJl.gif)


## Word2Vec Variants

<iframe src="https://www.youtube.com/embed/htRbrs637R0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Word2Vec Skip-Gram Visualization

- [https://ronxin.github.io/wevi/](https://ronxin.github.io/wevi/){:target="_back"}


#### Word2Vec Variants

![Imgur](https://i.imgur.com/cNCu5TE.gif)


#### Word2Vec CBOW

![Imgur](https://i.imgur.com/tZgatiP.gif)


#### Word2Vec LM

![Imgur](https://i.imgur.com/5iRaeVF.gif)


## Word Embeddings - GloVe

<iframe src="https://www.youtube.com/embed/8jviXhrQ1rc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Comparision

![Imgur](https://i.imgur.com/mJl4OfO.gif)


#### GloVe

![Imgur](https://i.imgur.com/epV5mRl.gif)

![Imgur](https://i.imgur.com/30j0EMU.gif)

![Imgur](https://i.imgur.com/ceDOiRH.gif)


#### Glove - Weighted Least Squares Regression Model

![Imgur](https://i.imgur.com/kS7Ws8m.gif)



## text mining 09 word2Vec


<iframe src="https://www.youtube.com/embed/ea9BPdEmxos" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/Q14GSw2.gif)

![Imgur](https://i.imgur.com/TqV9nsd.gif)

![Imgur](https://i.imgur.com/MamSBZi.gif)

![Imgur](https://i.imgur.com/CkhDxQN.gif)

![Imgur](https://i.imgur.com/uy5O7vh.gif)

![Imgur](https://i.imgur.com/laeUhxg.gif)

__gensim__

- 關鍵字像量化的網站: [gensim](https://radimrehurek.com/gensim/){:target="_back"}

![Imgur](https://i.imgur.com/xEG4UGA.gif)

![Imgur](https://i.imgur.com/DDRwoL3.gif)


## gensim code

<iframe src="https://www.youtube.com/embed/ZCgUOwSBtuY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


~~~python
import pickle
from gensim.models import word2vec
import random
import logging
import os

## turn back to main directory
os.chdir("../")
os.getcwd()
~~~

~~~python
logging.basicConfig(format='%(asctime)s: %(levelname)s: %(message)s')
logging.root.setLevel(level=logging.INFO)
~~~

~~~python
## load 'article_cutted'
with open('article_cutted', 'rb') as file:
    data = pickle.load(file)
~~~

~~~python
# build word2vec
# sg=0 CBOW ; sg=1 skip-gram
model = word2vec.Word2Vec(size=256, min_count=5, window=5, sg=0)
~~~

~~~python
# build vocabulary
model.build_vocab(data)
~~~

~~~python
# train word2vec model ; shuffle data every epoch
for i in range(20):
    random.shuffle(data)
    model.train(data, total_examples=len(data), epochs=1)
~~~


~~~python
## print an example
model.wv['人工智慧']
~~~

~~~python
## save model
model.save('word2vec_model/CBOW')
~~~












