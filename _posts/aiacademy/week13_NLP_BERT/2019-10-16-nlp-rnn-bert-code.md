---
layout: 'post'
title: 'aiacademy: 自然語言處理 NLP 4.3 實作自然語言 model'
permalink: 'aiacademy/week13/nlp-rnn-and-bert-model-code'
tags: aiacademy nlp BERT
---


# model prediction code

<iframe src="https://www.youtube.com/embed/gLjDm8SF3P4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


#### Build model prediction and compare each features set

- import package

~~~python
import pandas as pd
import xgboost as xgb
import pickle
import numpy as np
import os

from gensim.models import Doc2Vec, doc2vec

## turn back to main directory
os.chdir("../")
os.getcwd()
~~~

~~~python
## read preprocess article df
df = pd.read_csv('data/article_preprocessed.csv')
~~~

~~~python
## drop data
diff_threshold = 20
df = df[abs(df['push']-df['boo']) > diff_threshold].copy()
~~~

~~~python
## define y
df['type'] = np.clip(df['push']-df['boo'], 0, 1)
df = df.reset_index(drop=True)
~~~

~~~python
df['type'].value_counts()
~~~

~~~python
## create a numpy format data
basic_data = np.zeros((df.shape[0], 258))
~~~

~~~python
basic_data[:, 0] = df['idx']
basic_data[:, 1] = df['type']
~~~


- bag of words

~~~python
## load bag of words result
with open('article_count', 'rb') as file:
    _, count = pickle.load(file)
~~~

~~~python
## select top 256 words (counts of document) 
most_count_id = np.array((count > 0).sum(axis=0))[0].argsort()[::-1][:256]
~~~

~~~python
## subset data
count = count[:, most_count_id]
~~~

~~~python
count_data = basic_data.copy()
~~~

~~~python
## subset bag of words matrix
count_data[:, 2:] = count[count_data[:, 0]].toarray()
~~~

- TF-IDF

~~~python
## load tf-idf result
with open('article_tfidf', 'rb') as file:
    _, tfidf = pickle.load(file)
~~~

~~~python
## select top 256 words (counts of document) 
most_tfidf_id = np.array((tfidf > 0).sum(axis=0))[0].argsort()[::-1][:256]
~~~

~~~python
## subset data
tfidf = tfidf[:, most_tfidf_id]
~~~

~~~python
tfidf_data = basic_data.copy()
~~~

~~~python
## subset tf-idf matrix
tfidf_data[:, 2:] = tfidf[tfidf_data[:, 0]].toarray()
~~~

- average word2vec 

~~~python
## load average word2vec result
with open('avg_article_vector', 'rb') as file:
    avg_vector = pickle.load(file)
~~~

~~~python
avg_data = basic_data.copy()
~~~

~~~python
## select rows of average word2vec
for i, row in df.iterrows():
    avg_data[i, 2:] = avg_vector[row['idx']]
~~~

- doc2vec

~~~python
## load doc2vec model (由 05_document_vector.ipynb 產生)
model = Doc2Vec.load('word2vec_model/doc2vec')
~~~

~~~python
doc2vec_data = basic_data.copy()
~~~

~~~python
## select idx of doc2vec
for i, row in df.iterrows():
    doc2vec_data[i, 2:] = model.docvecs[str(row['idx'])]
~~~

#### prediction model

~~~python
from sklearn.model_selection import train_test_split

## split data to training and testing data
train, test = train_test_split(df, test_size=0.2, stratify=df['type'])
train_idx = np.array(train.index)
test_idx = np.array(test.index)

## define a dictionary to collect model result
result = {}
~~~

- train model use xgboost

   - bag of words

   ~~~python
   ## bag of words
   model = xgb.XGBClassifier()
   model.fit(count_data[train_idx, 2:], count_data[train_idx, 1], 
             eval_set=[(count_data[test_idx, 2:], count_data[test_idx, 1])], eval_metric='auc'
            )
   
   ## testing auc
   result['bag_of_words'] = model.evals_result()['validation_0']['auc'][-1]
   ~~~



   - tf-idf

   ~~~python
   ## tf-idf
   model = xgb.XGBClassifier()
   model.fit(tfidf_data[train_idx, 2:], tfidf_data[train_idx, 1], 
             eval_set=[(tfidf_data[test_idx, 2:], tfidf_data[test_idx, 1])], eval_metric='auc'
            )
   
   ## testing auc
   result['tf-idf'] = model.evals_result()['validation_0']['auc'][-1]
   ~~~


   - average word2vec

   ~~~python
   ## average word2vec
   model = xgb.XGBClassifier()
   model.fit(avg_data[train_idx, 2:], avg_data[train_idx, 1], 
             eval_set=[(avg_data[test_idx, 2:], avg_data[test_idx, 1])], eval_metric='auc'
            )
   
   ## testing auc
   result['avg_word2vec'] = model.evals_result()['validation_0']['auc'][-1]
   ~~~


   - doc2vec

   ~~~python
   ## doc2vec
   model = xgb.XGBClassifier()
   model.fit(doc2vec_data[train_idx, 2:], doc2vec_data[train_idx, 1],
             eval_set=[(doc2vec_data[test_idx, 2:], doc2vec_data[test_idx, 1])], eval_metric='auc'
            )
   
   ## testing auc
   result['doc2vec'] = model.evals_result()['validation_0']['auc'][-1]
   ~~~


- plot result

~~~python
import matplotlib.pyplot as plt
plt.bar(np.arange(4), result.values())
plt.xticks(np.arange(4), result.keys())
plt.show()
~~~

|![Imgur](https://i.imgur.com/Fpc8ebH.gif)|

> avg_word2vec 棒棒～～

# NLP with RNN

<iframe src="https://www.youtube.com/embed/RXXvaOZ8sLI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Text classification use LSTM

|![Imgur](https://i.imgur.com/JyS82oK.gif)|

#### How to feed text data in to LSTM network ?

|![Imgur](https://i.imgur.com/mw2Qe1B.gif)|

#### Embedding lookup table

|![Imgur](https://i.imgur.com/yo8PKue.gif)|


# NLP with RNN code

<iframe src="https://www.youtube.com/embed/Yp1ybakCP1Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- import 

~~~python
import pandas as pd
import numpy as np
import tensorflow as tf
import pickle
import matplotlib.pyplot as plt

import pickle
from gensim.models import word2vec
import random

from sklearn.preprocessing import StandardScaler
%matplotlib inline
~~~

#### Step 0. Loading dataset

- Step0.1 load article cutted and article df and define y

~~~python
with open("../article_cutted", "rb") as file:
    docs = pickle.load(file)
~~~

~~~python
df = pd.read_csv('../data/article_preprocessed.csv')
diff_threshold = 20
df = df[abs(df['push']-df['boo']) > diff_threshold].copy()
df['type'] = np.clip(df['push']-df['boo'], 0, 1)
~~~

~~~python
df.describe
~~~


|id| title|content|
|32      M.1502379457.A.440  |  [問卦] 核電燃料棒 跟其他國家買空間放不就好了  | 反核覺青現在最強招式就是 不然燃料棒放你家 肥宅我覺得 把燃料棒放到其他國家不就好了 一定會... |
|39      M.1502378858.A.109  |       [問卦] 為什麼很多人喜歡酸品牌電腦？  | 品牌電腦主打的就是方便 機子有問題，保固內免費幫你處理到好 不用還要在那邊自己除錯浪費一堆時...   |
|67      M.1502378200.A.269  |         [問卦] 火力發電廠蓋你家好不好?  | 反核人士最愛靠妖 核電廠蓋你家好不好，我當然說好 核廢料放我家好不好，我也ok 放在地下室就...   |
|79      M.1502377612.A.CC8  |       [問卦] 一休大師最後是跟誰在一起??  | 各位魯哥魯姐好 魯弟有個疑問 一休和尚卡通版大家多少都看過 可是長大後的版本沒有演到(是長大...   |
|92      M.1502377278.A.803  |            [問卦] 台中諾貝爾倒了一家  | 如標題， 今天去逛才看到的，如下圖所示:  位置在西屯區漢口路二段118號。 少了一個可以看...   |
|...                    ...  |                       ...  |                                               ...   |
|252150  M.1505407607.A.D08  | [問卦] 女生的"男生要有才華"到底是啥意思???  | 才華 很會讀書的台清交肥宅 不夠有才華嗎?? 很會寫程式的竹科宅 不夠有才華嗎???? 靠妖...   |
|252161  M.1505407146.A.67A  |                [爆卦] 幹幹幹幹幹  | 交往多年的女友抽到國外工作簽 才剛去不到一個月 就被室友猛烈追求 然後就跑了 幹幹幹幹幹幹幹...   |
|252173  M.1505406664.A.4D0  |    [問卦] 為何達賴可以是活佛，妙禪不能是活佛  | 如標題 我一直不懂活佛的定義是什麼？？ 達賴也是人生父母養，為何西藏人隨變講個鄉下小孩，說他...   |
|252195  M.1505406079.A.1AF  |[問卦] 這次反妙禪seafood的熱潮能持續幾天？  | 大家都知道台灣人有多健忘， 之前鬧得滿城風雨的林奕含事件， 好像也只持續了一兩週， 然後陳星...   |
|252199  M.1505405862.A.C95  |         [問卦] 西門要吃什麼才有指標性?  | 跟新認識的洋妞約周六吃飯 在西門町 要吃什麼才能代表台灣 又讓人印象深刻呢 我是覺得什麼阿雜...  | 


|                            |date | push | boo |    idx | type|  
|32      Thu Aug 10 23:37:34 |2017 |   37 |   5 |     32 |    1|  
|39      Thu Aug 10 23:27:35 |2017 |   26 |   3 |     39 |    1|  
|67      Thu Aug 10 23:16:37 |2017 |   66 |  13 |     67 |    1|  
|79      Thu Aug 10 23:06:49 |2017 |   36 |   4 |     79 |    1|  
|92      Thu Aug 10 23:01:15 |2017 |   51 |   3 |     92 |    1|  
|...                         | ... |  ... | ... |    ... |  ...|  
|252150  Fri Sep 15 00:46:45 |2017 |   44 |   3 | 252150 |    1|  
|252161  Fri Sep 15 00:39:04 |2017 |  920 |  84 | 252161 |    1|  
|252173  Fri Sep 15 00:31:02 |2017 |   75 | 108 | 252173 |    0|  
|252195  Fri Sep 15 00:21:17 |2017 |  152 |   9 | 252195 |    1|  
|252199  Fri Sep 15 00:17:40 |2017 |   28 |   3 | 252199 |    1| 


- Step 0.2 create word id mappping and word vector

~~~python
w2v = word2vec.Word2Vec.load('../word2vec_model/CBOW')
~~~

~~~python
word2id = {k:i for i, k in enumerate(w2v.wv.vocab.keys())}
id2word = {i:k for k, i in word2id.items()}
~~~

~~~python
id2word[1]
# '協志'

word2id['小英']
# 27001

id2word[27001]
# '小英'
~~~

~~~python
words_len = len(word2id)

embedding = np.zeros((words_len+1, 256))
for k, v in word2id.items():
    embedding[v] = w2v.wv[k]
~~~

- Step 0.3 sentence to seq transform 

~~~python
input_length = 80
docs_id = []
for doc in docs:
    text = doc[:input_length]
    ids = [words_len+1]*input_length
    ids[:len(text)] = [word2id[w] if w in word2id else words_len+1 for w in text]

    docs_id.append(ids)
~~~

~~~python
print(docs[0])
print(docs_id[0])
~~~

['韓瑜', '協志', '前妻', '正', '女演員', '周子', '瑜', 'TWICE', '團裡裡面', '台灣', '人', '正', '兩個', '要當', '鄉民', '老婆', '選', '五樓', '真', '勇氣']
[0, 1, 2, 3, 4, 5, 6, 7, 100035, 8, 9, 3, 10, 11, 12, 13, 14, 15, 16, 17, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035, 100035]

#### Step 1. Data preprocessing

- Step 1.1 Creating Training and Testing sets and creating generator

~~~python
from sklearn.model_selection import train_test_split
~~~

~~~python
train, test = train_test_split(df, test_size=0.2, shuffle=True, stratify=df['type'])
~~~

~~~python
def train_data_generator(df, bz, docs_id):
    # bz: batch size 
    
    dfs = [sub_df for key,sub_df in df.groupby('type')]
    df_n = len(dfs)
    
    docs_id = np.array(docs_id)
    while True:
        selected = pd.concat([sub_df.sample(int(bz/2)) for sub_df in dfs], axis=0)
        selected = selected.sample(frac=1)
        x = docs_id[selected['idx']]
        y = selected.as_matrix(columns=['type'])
                    
        yield x, y
        
def test_data_generator(df, docs_id):
    docs_id = np.array(docs_id)
    x = docs_id[df['idx']]
    y = df.as_matrix(columns=['type'])

    return x, y
~~~

~~~python
X_test, Y_test = test_data_generator(test, docs_id) 
~~~

#### Create the RNN

~~~python
epochs = 100
batch_size = 32
update_per_epochs = 100

learning_rate=0.001
hidden_layer_size=64
number_of_layers=1
dropout=True
dropout_rate=0.8
number_of_classes=1
gradient_clip_margin=4
wv=embedding
~~~

~~~python
def LSTM_cell(hidden_layer_size, batch_size, number_of_layers, dropout=True, dropout_rate=0.8):
    def get_LSTM(hidden_layer_size, dropout, dropout_rate):
        layer = tf.contrib.rnn.BasicLSTMCell(hidden_layer_size)

        if dropout:
            layer = tf.contrib.rnn.DropoutWrapper(layer, output_keep_prob=dropout_rate)
            
        return layer
    
    cell = tf.contrib.rnn.MultiRNNCell([get_LSTM(hidden_layer_size, dropout, dropout_rate) for _ in range(number_of_layers)])

    init_state = cell.zero_state(batch_size, tf.float32)

    return cell, init_state
~~~

~~~python
def output_layer(lstm_output, out_size):
    x = lstm_output[:, -1, :]
    output = tf.layers.dense(inputs= x, units= out_size)
    return output
~~~

~~~python
def opt_loss(logits, targets, learning_rate, grad_clip_margin):
    

    loss = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(labels=targets, logits=logits))
    
    #Cliping the gradient loss
    optimizer = tf.train.AdamOptimizer(learning_rate)
    gradients = optimizer.compute_gradients(loss)

    capped_gradients = [(tf.clip_by_value(grad, (-1)*grad_clip_margin, grad_clip_margin), var) for grad, var in gradients if grad is not None]
    
    train_optimizer = optimizer.apply_gradients(capped_gradients)

    
    return loss, train_optimizer
~~~

~~~python
main_graph = tf.Graph()
sess = tf.Session(graph=main_graph)

with main_graph.as_default():
    
    ##defining placeholders##
    with tf.name_scope('input'):
        inputs = tf.placeholder(tf.int32, [None, input_length], name='input_data')
        targets = tf.placeholder(tf.float32, [None, 1], name='targets')
        bz = tf.placeholder(tf.int32, [], name='batch_size')
        
    ## embedding lookup table
    with tf.variable_scope('embedding'):    
        em_W = tf.Variable(wv.astype(np.float32), trainable=True)  #wv.shape = (100035, 256)
        x = tf.nn.embedding_lookup(em_W, inputs)    #x.shape = (?, 80, 256)
        
    ##LSTM layer##
    with tf.variable_scope("LSTM_layer"):
        cell, init_state = LSTM_cell(hidden_layer_size, tf.shape(inputs)[0], number_of_layers, dropout, dropout_rate) 
        outputs, states = tf.nn.dynamic_rnn(cell, x, initial_state=init_state)
    
    ##Output layer##   
    with tf.variable_scope('output_layer'):
        logits = output_layer(outputs, number_of_classes)
    
    ##loss and optimization##
    with tf.name_scope('loss_and_opt'):
        loss, opt = opt_loss(logits, targets, learning_rate, gradient_clip_margin)
    
    init = tf.global_variables_initializer()
~~~

### Train the network

~~~python
sess.run(init)
~~~

~~~python
from sklearn.metrics import roc_auc_score
train_generate = train_data_generator(train, batch_size, docs_id)

train_loss = []
train_auc = []
test_loss = []
test_auc = []
for i in range(epochs):
    traind_scores = []
    epoch_loss = []
    for j in range(update_per_epochs):
        X_batch, y_batch = next(train_generate) 
        
        o, c, _ = sess.run([logits, loss, opt], feed_dict={
            inputs:X_batch, 
            targets:y_batch,
            bz:np.array(batch_size)
        })
        
        epoch_loss.append(c)
        traind_scores.append(roc_auc_score(y_batch, o))
    
    to, tc = sess.run([logits, loss], feed_dict={
        inputs:X_test, 
        targets:Y_test,
        bz:np.array(len(X_test))
    })
    
    train_loss.append(np.mean(epoch_loss))
    train_auc.append(np.mean(traind_scores))
    test_loss.append(tc)
    test_auc.append(roc_auc_score(Y_test, to))
    
    if (i % 5) == 0:
        print('Epoch {}/{}'.format(i, epochs), ' Train loss: {}'.format(np.mean(epoch_loss)), 
              ' Train auc: {}'.format(np.mean(traind_scores)), 
             ' Test loss: {}'.format(tc), ' Test auc: {}'.format(roc_auc_score(Y_test, to)))
~~~

~~~python
sess.close()
~~~



# BERT

<iframe src="https://www.youtube.com/embed/CwGEwhj1t04" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- [https://github.com/google-research/bert/blob/master/README.md](https://github.com/google-research/bert/blob/master/README.md){:target="_back"}


- Bert fine-tume 實作

   1. 準備資料
   2. 修改　run_classifier.py 中的 processor
   3. 執行　run_classifier.py 與設定參數

<br/>

#1. 準備資料

~~~python
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import pickle
~~~

~~~python
df = pd.read_csv('article_preprocessed.csv')
~~~

~~~python
## drop data
diff_threshold = 20
df = df[abs(df['push']-df['boo']) > diff_threshold].copy()

## define y
df['type'] = np.clip(df['push']-df['boo'], 0, 1)
df = df.reset_index(drop=True)
df = df.drop(columns = 'idx')

df['type'].value_counts()
~~~

~~~python
df.head()
~~~


|id |title              |content	                               |date	|push	|boo	|type|
|0	|M.1502379457.A.440	|[問卦] 核電燃料棒 跟其他國家買空間放不就好了|	反核覺青現在最強招式就是 不然燃料棒放你家 肥宅我覺得 把燃料棒放到其他國家不就好了 一定會...|	Thu Aug 10 23:37:34 2017|	37|	5|	1|
|1	|M.1502378858.A.109	|[問卦] 為什麼很多人喜歡酸品牌電腦？|     	品牌電腦主打的就是方便 機子有問題，保固內免費幫你處理到好 不用還要在那邊自己除錯浪費一堆時...	|Thu Aug 10 23:27:35 2017|	26|	3|	1|
|2	|M.1502378200.A.269	|[問卦] 火力發電廠蓋你家好不好?  |       	反核人士最愛靠妖 核電廠蓋你家好不好，我當然說好 核廢料放我家好不好，我也ok 放在地下室就...|	Thu Aug 10 23:16:37 2017|	66|	13|	1|
|3	|M.1502377612.A.CC8	|[問卦] 一休大師最後是跟誰在一起??|	各位魯哥魯姐好 魯弟有個疑問 一休和尚卡通版大家多少都看過 可是長大後的版本沒有演到(是長大...	|Thu Aug 10 23:06:49 2017|	36|	4|	1|
|4	|M.1502377278.A.803	|[問卦] 台中諾貝爾倒了一家 |	如標題， 今天去逛才看到的，如下圖所示: 位置在西屯區漢口路二段118號。 少了一個可以看...|	Thu Aug 10 23:01:15 2017|	51|	3|	1|


- 現在我們將資料轉換成 BERT 需要的資料形式。根據官方fine tune教學，需要給的資料有四個column，分別是:

 - (1) guid: Unique id for the example.
 - (2) text_a: text_a: string. The untokenized text of the first sequence. For single sequence tasks, only this sequence must be specified.
 - (3) text_b(Optional): string. The untokenized text of the second sequence. Only must be specified for sequence pair tasks.
 - (4) label(Optional): string. The label of the example. This should be specified for train and dev examples, but not for test examples.

~~~python
data_for_bert = []
strat_list = []
for i in range(len(df)):
    data_for_bert.append((i, #guid
                          df.iloc[i,:].content, #text_a
                          None, #text_b
                          df.iloc[i,:].type #label
                         ))
    strat_list.append(df.iloc[i,:].type)
    
train, dev = train_test_split(data_for_bert, test_size=0.2, stratify=strat_list)
~~~

~~~python
print('length for fine-tune training data: ',len(train))
# length for fine-tune training data:  14761

print('length for fine-tune development data: ',len(dev))
# length for fine-tune development data:  3691

print('first instance:', data_for_bert[0])
# first instance: (0, '反核覺青現在最強招式就是 不然燃料棒放你家 肥宅我覺得 把燃料棒放到其他國家不就好了 一定會有缺錢的國家 台灣塞錢給他們 買他們國家的空間放 一來燃料棒問題解決 核電重啟 台灣缺點問題解決 大家有冷氣吹 台積電不出走 繼續救台灣 二來有買賣就有貪污空間 政客也有賺頭 不會像現在沒糖吃該該叫 送錢出去 邦交國搞不好也會多幾個 簡直是雙贏 核電燃料棒 跟其他國家買空間放不就好了 有沒有相關八卦 ', None, 1)
~~~

~~~python
with open('bert_train.p',mode = 'wb') as pickle_file:
    pickle.dump(train, pickle_file)

with open('bert_dev.p',mode = 'wb') as pickle_file:
    pickle.dump(dev, pickle_file)
~~~

#2. 修改　run_classifier.py 中的　processor

   - DataProcessor Class

      - 可看 XnliProcessor、ColaProcess、MrpcProcessor　當範例來學習/參考

   - PttProcessor(DataProcessor)

   ~~~python
   class PttProcessor(DataProcessor):
     """Processor for the Ptt data set."""
   
     def get_train_examples(self, data_dir):
       """See base class."""
       train_data = []
       with open(os.path.join(data_dir, "bert_train.p"), "rb") as pickle_file:
         bert_train = pickle.load(pickle_file)
       for group in bert_train:
         train_data.append(InputExample(guid=group[0], text_a=group[1], text_b=group[2], label=group[3]))
   
       return train_data
   
     def get_dev_examples(self, data_dir):
       """See base class."""
       validate_data = []
       with open(os.path.join(data_dir, "bert_dev.p"), "rb") as pickle_file:
         bert_dev = pickle.load(pickle_file)
       for group in bert_dev:
         validate_data.append(InputExample(guid=group[0], text_a=group[1], text_b=group[2], label=group[3]))
   
       return validate_data
   
     def get_test_examples(self, data_dir):
       """See base class."""
       return None
   
     def get_labels(self):
       """See base class."""
       # 只有兩類
       return [0,1]
   ~~~

   

   - Main()：

      - 加入　PttProcessor 到 processors {}


      ~~~python
      def main(_):
        tf.logging.set_verbosity(tf.logging.INFO)
      
        processors = {
            "cola": ColaProcessor,
            "mnli": MnliProcessor,
            "mrpc": MrpcProcessor,
            "xnli": XnliProcessor,
            "ptt":PttProcessor
        }
      
      ...
      ~~~

#3. 執行　run_classifier.py 設定參數

- 參數設定
   - 字典的名稱 
      - `--task_name=Ptt`
   - 要做training
      - `--do_train=true`
   - 要做evaluation
      - `--do_eval=true`
   - data 的目錄
      - `--data_dir=. `
   - 預先訓練模型 (下載 [*** New November 3rd, 2018: Multilingual and Chinese models available ***](https://github.com/google-research/bert/blob/master/README.md){:target="_back"} ) 的字典　
      - `--vocab_file=chinese_L-12_H-768_A-12/vocab.txt`
      - `--bert_config_file=chinese_L-12_H-768_A-12/bert_config.json`
      - `--init_checkpoint= chinese_L-12_H-768_A-12/bert_model.ckpt`
   - fine-tun input length
      - `--max_seq_length=128`
   - 模型存在哪裡
      - `--output_dir=tmp/ptt_output/`
   - 其他參數
      - `--train_batch_size=32`
      - `--learning_rate=2e-5`
      - `--num_train_epochs=3.0`

~~~
!python run_classifier.py \
  --task_name=Ptt \ (字典的名稱)
  --do_train=true \　(要做training)
  --do_eval=true \ (要做evaluation)
  --data_dir=. \ (data 路徑)
  --vocab_file=chinese_L-12_H-768_A-12/vocab.txt \ (預先訓練模型)
  --bert_config_file=chinese_L-12_H-768_A-12/bert_config.json \ (預先訓練模型)
  --init_checkpoint= chinese_L-12_H-768_A-12/bert_model.ckpt \ (預先訓練模型)
  --max_seq_length=128 \ (fine-tun input length)
  --output_dir=tmp/ptt_output/ \ (模型存在哪裡)
  --train_batch_size=32 \ (其他參數)
  --learning_rate=2e-5 \ (其他參數)
  --num_train_epochs=3.0 \ (其他參數)
~~~