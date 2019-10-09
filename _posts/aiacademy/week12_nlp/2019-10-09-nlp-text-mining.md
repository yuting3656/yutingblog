---
layout: 'post'
title: 'aiacademy: 自然語言處理 NLP Clustering Visualization / Document Vector'
permalink: 'aiacademy/week12/nlp-clustering-visualization-document-vector'
tags: aiacademy nlp word2vec doc2vec
---

[YouTube List](https://www.youtube.com/playlist?list=PL1f_B9coMEeA2MVfUSBxuDHISFjQxV2GM){:target="_back"}

# application of word2vec

<iframe src="https://www.youtube.com/embed/_RlrJqHJdHQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/OLUb2NU.gif)

![Imgur](https://i.imgur.com/jtQTblJ.gif)

__Clustering__

- 在字詞向量化後相似字詞之間距離較相近
   - 將相似的詞做分群(Clustering)

![Imgur](https://i.imgur.com/39j9xuR.gif)


# application of wrod2vec / clustering code

<iframe src="https://www.youtube.com/embed/cfwibiDhsqo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- load data

~~~python
from gensim.models import word2vec
from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
import os

## turn back to main directory
os.chdir("../")
os.getcwd()
~~~


~~~python
## load word2vec model (由 part1 03_word2vec_build.ipynb 產生)
model = word2vec.Word2Vec.load('word2vec_model/CBOW')
~~~


- similarity: 找類相關向量的詞

~~~python
## get most similarity with given words
## 可以替換關鍵字
model.wv.most_similar('KMT')

'''
[('kmt', 0.6530617475509644),
 ('DPP', 0.63388592004776),
 ('國民黨', 0.6249421834945679),
 ('dpp', 0.6076689958572388),
 ('民進黨', 0.5751814246177673),
 ('政黨', 0.5520358085632324),
 ('在野黨', 0.5172843933105469),
 ('兩黨', 0.5155266523361206),
 ('白色恐怖', 0.5136880874633789),
 ('執政', 0.5134204626083374)]
'''
~~~

- 找文字間，類相關文字

   - ex: KMT 和 綠吱，的關係相關文字，就像 DPP ? 


~~~python
## get most similarity with given words's relationship
## 可以替換關鍵字
model.wv.most_similar(positive=['KMT', '綠吱'], negative=['DPP'])


'''
[('周處', 0.43969738483428955),
 ('八旗', 0.40904492139816284),
 ('包壺', 0.40349867939949036),
 ('紂王', 0.4023209512233734),
 ('鼠輩', 0.3923807740211487),
 ('賣國賊', 0.3919026255607605),
 ('明末', 0.3907436430454254),
 ('三姓', 0.38343679904937744),
 ('先祖', 0.37808701395988464),
 ('異端', 0.3770984411239624)]
'''
~~~


###  clustering

- 建立 dictionary

   - 做關鍵字的篩選

~~~python
## create a dictionary: words as key ; count as values
words = {word: vocab.count for word, vocab in model.wv.vocab.items()}
~~~

   - 找前 10000 的關鍵字

~~~python
## sort and select the top 10000 count of words
words = sorted(words.items(), key=lambda x: x[1], reverse=True)
words = words[:10000]
words = np.array(words)[:, 0]
words

'''
array(['人', '八卦', '有沒有', ..., '唯有', '考到', '派遣'], dtype='<U20')
'''
~~~

~~~python
## extract the word vectors 
vecs = model.wv[words]
~~~

~~~python
## run clustering algorithm
kmeans = KMeans(n_clusters=50)
cluster = kmeans.fit_predict(vecs)
~~~

~~~python
## print the result
df = pd.DataFrame([words.tolist(), cluster.tolist()], index=['words', 'no. cluster']).T
df.head(n=5)
~~~

![Imgur](https://i.imgur.com/W2p6utK.gif)

~~~python
## print every cluster of words
data = pd.concat([d['words'].reset_index(drop=True).rename(columns={0: k}) for k, d in df.groupby('no. cluster')], axis=1)
data
~~~

![Imgur](https://i.imgur.com/R5nYesV.gif)



# document vector 

- 詞向量轉成文本向量

<iframe src="https://www.youtube.com/embed/Aff7CMyEI1I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Imgur](https://i.imgur.com/L90Y1Bz.gif)

![Imgur](https://i.imgur.com/8RktwE3.gif)

![Imgur](https://i.imgur.com/aps8uds.gif)



# document vector code

<iframe src="https://www.youtube.com/embed/HOFQb5QDA5k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- load data

~~~python
import pickle
from gensim.models import Doc2Vec, doc2vec
from gensim.models import word2vec
import random
import numpy as np
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


- average word vec

~~~python
## load word2vec model
model = word2vec.Word2Vec.load('word2vec_model/CBOW')
~~~


~~~python
## fiter words that not in word2vec's vocab
data_filtered = [ [w for w in l if w in model.wv] for l in data ]
~~~

~~~python
## compute average word vector
avg_vector = []

## 計算每一個文件的平均 word2vec 並存在 list 裏
for l in data_filtered:
    if len(l) == 0:
        avg_vector.append(np.array([0] * 256))
    else:
        avg_vector.append(np.mean([model.wv[w] for w in l], axis =0))
~~~

- doc2vec 

~~~python
sentence_list = []

for i, l in enumerate(data):
    sentence_list.append(doc2vec.LabeledSentence(words=1, tags=[str(i)]))
~~~

~~~python
## print result
sentence_list[0]

'''
LabeledSentence(words=['韓瑜', '協志', '前妻', '正', '女演員', '周子', '瑜', 'TWICE', '團裡裡面', '台灣', '人', '正', '兩個', '要當', '鄉民', '老婆', '選', '五樓', '真', '勇氣'], tags=['0'])
'''
~~~

~~~python
## define 轉換器
## 出現太少次數 拿掉!

model = Doc2Vec(size=256, min_count=5, window=4)
~~~


~~~python
## build vocabulary
model.build_vocab(sentence_list)
~~~

~~~python
# train word2vec model ; shuffle data every epoch
for i in range(20):
    random.shuffle(sentence_list)
    model.train(sentence_list, total_examples=len(data), epochs=1)
~~~


~~~python
## print result
model.docvecs['0']
~~~


~~~python
## save result
model.save('word2vec_model/doc2vec')
~~~


