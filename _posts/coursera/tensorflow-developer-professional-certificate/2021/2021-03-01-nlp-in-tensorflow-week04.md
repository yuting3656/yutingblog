---
layout: 'post'
title: 'Coursera Tensorflow Developer Professional Certificate - nlp in tensorflow week04 (Sequence models and literature)'
permalink: 'coursera-tensorflow-developer-professional-certificate/nlp-in-tensorflow/week04'
tags: coursera-tensorflow-developer-professional-certificate tensorflow nlp sequence-encoding rnn LSTM conv1d
---

# First Example

- 拿一首歌的歌詞來玩

~~~python
tokenizer = Tokenizer()

data="In the town of Athy one Jeremy Lanigan \n Battered away til he hadnt a pound. \nHis father died and made him a man again \n Left him a farm and ten acres of ground. \nHe gave a grand party for friends and relations \nWho didnt forget him when come to the wall, \nAnd if youll but listen Ill make your eyes glisten \nOf the rows and the ructions of Lanigans Ball. \nMyself to be sure got free invitation, \nFor all the nice girls and boys I might ask, \nAnd just in a minute both friends and relations \nWere dancing round merry as bees round a cask. \nJudy ODaly, that nice little milliner, \nShe tipped me a wink for to give her a call, \nAnd I soon arrived with Peggy McGilligan \nJust in time for Lanigans Ball. \nThere were lashings of punch and wine for the ladies, \nPotatoes and cakes; there was bacon and tea, \nThere were the Nolans, Dolans, OGradys \nCourting the girls and dancing away. \nSongs they went round as plenty as water, \nThe harp that once sounded in Taras old hall,\nSweet Nelly Gray and The Rat Catchers Daughter,\nAll singing together at Lanigans Ball. \nThey were doing all kinds of nonsensical polkas \nAll round the room in a whirligig. \nJulia and I, we banished their nonsense \nAnd tipped them the twist of a reel and a jig. \nAch mavrone, how the girls got all mad at me \nDanced til youd think the ceiling would fall. \nFor I spent three weeks at Brooks Academy \nLearning new steps for Lanigans Ball. \nThree long weeks I spent up in Dublin, \nThree long weeks to learn nothing at all,\n Three long weeks I spent up in Dublin, \nLearning new steps for Lanigans Ball. \nShe stepped out and I stepped in again, \nI stepped out and she stepped in again, \nShe stepped out and I stepped in again, \nLearning new steps for Lanigans Ball. \nBoys were all merry and the girls they were hearty \nAnd danced all around in couples and groups, \nTil an accident happened, young Terrance McCarthy \nPut his right leg through miss Finnertys hoops. \nPoor creature fainted and cried Meelia murther, \nCalled for her brothers and gathered them all. \nCarmody swore that hed go no further \nTil he had satisfaction at Lanigans Ball. \nIn the midst of the row miss Kerrigan fainted, \nHer cheeks at the same time as red as a rose. \nSome of the lads declared she was painted, \nShe took a small drop too much, I suppose. \nHer sweetheart, Ned Morgan, so powerful and able, \nWhen he saw his fair colleen stretched out by the wall, \nTore the left leg from under the table \nAnd smashed all the Chaneys at Lanigans Ball. \nBoys, oh boys, twas then there were runctions. \nMyself got a lick from big Phelim McHugh. \nI soon replied to his introduction \nAnd kicked up a terrible hullabaloo. \nOld Casey, the piper, was near being strangled. \nThey squeezed up his pipes, bellows, chanters and all. \nThe girls, in their ribbons, they got all entangled \nAnd that put an end to Lanigans Ball."

corpus = data.lower().split("\n")

tokenizer.fit_on_texts(corpus)
total_words = len(tokenizer.word_index) + 1

print(tokenizer.word_index)
print(total_words)
~~~

~~~python
input_sequences = []

for line in corpus:
    token_list = tokenizer.text_to_sequences([line])[0]
    for i in range(1, len(token_list)):
        n_gram_sequence = token_list[:i+1]
        inpu_sequences.append(n_gram_sequence)
~~~

|![Imgur](https://i.imgur.com/MUsbuHg.png)|![Imgur](https://i.imgur.com/263hJkM.png)|
|![Imgur](https://i.imgur.com/zX7R6yC.png)|![Imgur](https://i.imgur.com/dyb4aZX.png)|

~~~python
max_sequence_len = max([len(x) for x in inpu_sequences])
input_sequences = np.array(pad_sequences(input_sequences, maxlen=max_sequence_len, padding='pre'))
~~~

|![Imgur](https://i.imgur.com/Kenn50I.png)|

- 處理資料的 x & y

|![Imgur](https://i.imgur.com/qvoEFIr.png)|![Imgur](https://i.imgur.com/w7hgDWl.png)|

~~~python
                   # x, y
xs = input_sequences[:, :-1]
labels = input_sequences[:, -1]
~~~

~~~python
ys = tf.keras.utils.to_categorical(labels, num_classes=total_words)
~~~

![Imgur](https://i.imgur.com/jZ0ImSz.png)

# [Checkout out the code](https://colab.research.google.com/github/lmoroney/dlaicourse/blob/master/TensorFlow%20In%20Practice/Course%203%20-%20NLP/Course%203%20-%20Week%204%20-%20Lesson%201%20-%20Notebook.ipynb#scrollTo=H4myRpB1c4Gg){:target="_back"}

~~~python
import tensorflow as tf

from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, LSTM, Dense, Bidirectional
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import Adam
import numpy as np 
~~~

~~~python
tokenizer = Tokenizer()

data="In the town of Athy one Jeremy Lanigan \n Battered away til he hadnt a pound. \nHis father died and made him a man again \n Left him a farm and ten acres of ground. \nHe gave a grand party for friends and relations \nWho didnt forget him when come to the wall, \nAnd if youll but listen Ill make your eyes glisten \nOf the rows and the ructions of Lanigans Ball. \nMyself to be sure got free invitation, \nFor all the nice girls and boys I might ask, \nAnd just in a minute both friends and relations \nWere dancing round merry as bees round a cask. \nJudy ODaly, that nice little milliner, \nShe tipped me a wink for to give her a call, \nAnd I soon arrived with Peggy McGilligan \nJust in time for Lanigans Ball. \nThere were lashings of punch and wine for the ladies, \nPotatoes and cakes; there was bacon and tea, \nThere were the Nolans, Dolans, OGradys \nCourting the girls and dancing away. \nSongs they went round as plenty as water, \nThe harp that once sounded in Taras old hall,\nSweet Nelly Gray and The Rat Catchers Daughter,\nAll singing together at Lanigans Ball. \nThey were doing all kinds of nonsensical polkas \nAll round the room in a whirligig. \nJulia and I, we banished their nonsense \nAnd tipped them the twist of a reel and a jig. \nAch mavrone, how the girls got all mad at me \nDanced til youd think the ceiling would fall. \nFor I spent three weeks at Brooks Academy \nLearning new steps for Lanigans Ball. \nThree long weeks I spent up in Dublin, \nThree long weeks to learn nothing at all,\n Three long weeks I spent up in Dublin, \nLearning new steps for Lanigans Ball. \nShe stepped out and I stepped in again, \nI stepped out and she stepped in again, \nShe stepped out and I stepped in again, \nLearning new steps for Lanigans Ball. \nBoys were all merry and the girls they were hearty \nAnd danced all around in couples and groups, \nTil an accident happened, young Terrance McCarthy \nPut his right leg through miss Finnertys hoops. \nPoor creature fainted and cried Meelia murther, \nCalled for her brothers and gathered them all. \nCarmody swore that hed go no further \nTil he had satisfaction at Lanigans Ball. \nIn the midst of the row miss Kerrigan fainted, \nHer cheeks at the same time as red as a rose. \nSome of the lads declared she was painted, \nShe took a small drop too much, I suppose. \nHer sweetheart, Ned Morgan, so powerful and able, \nWhen he saw his fair colleen stretched out by the wall, \nTore the left leg from under the table \nAnd smashed all the Chaneys at Lanigans Ball. \nBoys, oh boys, twas then there were runctions. \nMyself got a lick from big Phelim McHugh. \nI soon replied to his introduction \nAnd kicked up a terrible hullabaloo. \nOld Casey, the piper, was near being strangled. \nThey squeezed up his pipes, bellows, chanters and all. \nThe girls, in their ribbons, they got all entangled \nAnd that put an end to Lanigans Ball."

corpus = data.lower().split("\n")

tokenizer.fit_on_texts(corpus)
total_words = len(tokenizer.word_index) + 1

print(tokenizer.word_index)
print(total_words)

"""
{'and': 1, 'the': 2, 'a': 3, 'in': 4, 'all': 5, 'i': 6, 'for': 7, 'of': 8, 'lanigans': 9, 'ball': 10, 'were': 11, 'at': 12, 'to': 13, 'she': 14, 'stepped': 15, 'his': 16, 'girls': 17, 'as': 18, 'they': 19, 'til': 20, 'he': 21, 'again': 22, 'got': 23, 'boys': 24, 'round': 25, 'that': 26, 'her': 27, 'there': 28, 'three': 29, 'weeks': 30, 'up': 31, 'out': 32, 'him': 33, 'was': 34, 'spent': 35, 'learning': 36, 'new': 37, 'steps': 38, 'long': 39, 'away': 40, 'left': 41, 'friends': 42, 'relations': 43, 'when': 44, 'wall': 45, 'myself': 46, 'nice': 47, 'just': 48, 'dancing': 49, 'merry': 50, 'tipped': 51, 'me': 52, 'soon': 53, 'time': 54, 'old': 55, 'their': 56, 'them': 57, 'danced': 58, 'dublin': 59, 'an': 60, 'put': 61, 'leg': 62, 'miss': 63, 'fainted': 64, 'from': 65, 'town': 66, 'athy': 67, 'one': 68, 'jeremy': 69, 'lanigan': 70, 'battered': 71, 'hadnt': 72, 'pound': 73, 'father': 74, 'died': 75, 'made': 76, 'man': 77, 'farm': 78, 'ten': 79, 'acres': 80, 'ground': 81, 'gave': 82, 'grand': 83, 'party': 84, 'who': 85, 'didnt': 86, 'forget': 87, 'come': 88, 'if': 89, 'youll': 90, 'but': 91, 'listen': 92, 'ill': 93, 'make': 94, 'your': 95, 'eyes': 96, 'glisten': 97, 'rows': 98, 'ructions': 99, 'be': 100, 'sure': 101, 'free': 102, 'invitation': 103, 'might': 104, 'ask': 105, 'minute': 106, 'both': 107, 'bees': 108, 'cask': 109, 'judy': 110, 'odaly': 111, 'little': 112, 'milliner': 113, 'wink': 114, 'give': 115, 'call': 116, 'arrived': 117, 'with': 118, 'peggy': 119, 'mcgilligan': 120, 'lashings': 121, 'punch': 122, 'wine': 123, 'ladies': 124, 'potatoes': 125, 'cakes': 126, 'bacon': 127, 'tea': 128, 'nolans': 129, 'dolans': 130, 'ogradys': 131, 'courting': 132, 'songs': 133, 'went': 134, 'plenty': 135, 'water': 136, 'harp': 137, 'once': 138, 'sounded': 139, 'taras': 140, 'hall': 141, 'sweet': 142, 'nelly': 143, 'gray': 144, 'rat': 145, 'catchers': 146, 'daughter': 147, 'singing': 148, 'together': 149, 'doing': 150, 'kinds': 151, 'nonsensical': 152, 'polkas': 153, 'room': 154, 'whirligig': 155, 'julia': 156, 'we': 157, 'banished': 158, 'nonsense': 159, 'twist': 160, 'reel': 161, 'jig': 162, 'ach': 163, 'mavrone': 164, 'how': 165, 'mad': 166, 'youd': 167, 'think': 168, 'ceiling': 169, 'would': 170, 'fall': 171, 'brooks': 172, 'academy': 173, 'learn': 174, 'nothing': 175, 'hearty': 176, 'around': 177, 'couples': 178, 'groups': 179, 'accident': 180, 'happened': 181, 'young': 182, 'terrance': 183, 'mccarthy': 184, 'right': 185, 'through': 186, 'finnertys': 187, 'hoops': 188, 'poor': 189, 'creature': 190, 'cried': 191, 'meelia': 192, 'murther': 193, 'called': 194, 'brothers': 195, 'gathered': 196, 'carmody': 197, 'swore': 198, 'hed': 199, 'go': 200, 'no': 201, 'further': 202, 'had': 203, 'satisfaction': 204, 'midst': 205, 'row': 206, 'kerrigan': 207, 'cheeks': 208, 'same': 209, 'red': 210, 'rose': 211, 'some': 212, 'lads': 213, 'declared': 214, 'painted': 215, 'took': 216, 'small': 217, 'drop': 218, 'too': 219, 'much': 220, 'suppose': 221, 'sweetheart': 222, 'ned': 223, 'morgan': 224, 'so': 225, 'powerful': 226, 'able': 227, 'saw': 228, 'fair': 229, 'colleen': 230, 'stretched': 231, 'by': 232, 'tore': 233, 'under': 234, 'table': 235, 'smashed': 236, 'chaneys': 237, 'oh': 238, 'twas': 239, 'then': 240, 'runctions': 241, 'lick': 242, 'big': 243, 'phelim': 244, 'mchugh': 245, 'replied': 246, 'introduction': 247, 'kicked': 248, 'terrible': 249, 'hullabaloo': 250, 'casey': 251, 'piper': 252, 'near': 253, 'being': 254, 'strangled': 255, 'squeezed': 256, 'pipes': 257, 'bellows': 258, 'chanters': 259, 'ribbons': 260, 'entangled': 261, 'end': 262}
263
"""
~~~


~~~python
input_sequences = []
for line in corpus:
	token_list = tokenizer.texts_to_sequences([line])[0]
	for i in range(1, len(token_list)):
		n_gram_sequence = token_list[:i+1]
		input_sequences.append(n_gram_sequence)

# pad sequences 
max_sequence_len = max([len(x) for x in input_sequences])
input_sequences = np.array(pad_sequences(input_sequences, maxlen=max_sequence_len, padding='pre'))

# create predictors and label
xs, labels = input_sequences[:,:-1],input_sequences[:,-1]

ys = tf.keras.utils.to_categorical(labels, num_classes=total_words)
~~~


~~~python
print(tokenizer.word_index['in'])
print(tokenizer.word_index['the'])
print(tokenizer.word_index['town'])
print(tokenizer.word_index['of'])
print(tokenizer.word_index['athy'])
print(tokenizer.word_index['one'])
print(tokenizer.word_index['jeremy'])
print(tokenizer.word_index['lanigan'])

"""
4
2
66
8
67
68
69
70
"""
~~~

~~~python
print(xs[6])
# [ 0  0  0  4  2 66  8 67 68 69]

print(ys[6])
"""
[0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 1. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
"""

print(xs[5])
print(ys[5])

"""
[ 0  0  0  0  4  2 66  8 67 68]
[0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 1. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
"""
~~~

~~~python
print(tokenizer.word_index)
"""
{'and': 1, 'the': 2, 'a': 3, 'in': 4, 'all': 5, 'i': 6, 'for': 7, 'of': 8, 'lanigans': 9, 'ball': 10, 'were': 11, 'at': 12, 'to': 13, 'she': 14, 'stepped': 15, 'his': 16, 'girls': 17, 'as': 18, 'they': 19, 'til': 20, 'he': 21, 'again': 22, 'got': 23, 'boys': 24, 'round': 25, 'that': 26, 'her': 27, 'there': 28, 'three': 29, 'weeks': 30, 'up': 31, 'out': 32, 'him': 33, 'was': 34, 'spent': 35, 'learning': 36, 'new': 37, 'steps': 38, 'long': 39, 'away': 40, 'left': 41, 'friends': 42, 'relations': 43, 'when': 44, 'wall': 45, 'myself': 46, 'nice': 47, 'just': 48, 'dancing': 49, 'merry': 50, 'tipped': 51, 'me': 52, 'soon': 53, 'time': 54, 'old': 55, 'their': 56, 'them': 57, 'danced': 58, 'dublin': 59, 'an': 60, 'put': 61, 'leg': 62, 'miss': 63, 'fainted': 64, 'from': 65, 'town': 66, 'athy': 67, 'one': 68, 'jeremy': 69, 'lanigan': 70, 'battered': 71, 'hadnt': 72, 'pound': 73, 'father': 74, 'died': 75, 'made': 76, 'man': 77, 'farm': 78, 'ten': 79, 'acres': 80, 'ground': 81, 'gave': 82, 'grand': 83, 'party': 84, 'who': 85, 'didnt': 86, 'forget': 87, 'come': 88, 'if': 89, 'youll': 90, 'but': 91, 'listen': 92, 'ill': 93, 'make': 94, 'your': 95, 'eyes': 96, 'glisten': 97, 'rows': 98, 'ructions': 99, 'be': 100, 'sure': 101, 'free': 102, 'invitation': 103, 'might': 104, 'ask': 105, 'minute': 106, 'both': 107, 'bees': 108, 'cask': 109, 'judy': 110, 'odaly': 111, 'little': 112, 'milliner': 113, 'wink': 114, 'give': 115, 'call': 116, 'arrived': 117, 'with': 118, 'peggy': 119, 'mcgilligan': 120, 'lashings': 121, 'punch': 122, 'wine': 123, 'ladies': 124, 'potatoes': 125, 'cakes': 126, 'bacon': 127, 'tea': 128, 'nolans': 129, 'dolans': 130, 'ogradys': 131, 'courting': 132, 'songs': 133, 'went': 134, 'plenty': 135, 'water': 136, 'harp': 137, 'once': 138, 'sounded': 139, 'taras': 140, 'hall': 141, 'sweet': 142, 'nelly': 143, 'gray': 144, 'rat': 145, 'catchers': 146, 'daughter': 147, 'singing': 148, 'together': 149, 'doing': 150, 'kinds': 151, 'nonsensical': 152, 'polkas': 153, 'room': 154, 'whirligig': 155, 'julia': 156, 'we': 157, 'banished': 158, 'nonsense': 159, 'twist': 160, 'reel': 161, 'jig': 162, 'ach': 163, 'mavrone': 164, 'how': 165, 'mad': 166, 'youd': 167, 'think': 168, 'ceiling': 169, 'would': 170, 'fall': 171, 'brooks': 172, 'academy': 173, 'learn': 174, 'nothing': 175, 'hearty': 176, 'around': 177, 'couples': 178, 'groups': 179, 'accident': 180, 'happened': 181, 'young': 182, 'terrance': 183, 'mccarthy': 184, 'right': 185, 'through': 186, 'finnertys': 187, 'hoops': 188, 'poor': 189, 'creature': 190, 'cried': 191, 'meelia': 192, 'murther': 193, 'called': 194, 'brothers': 195, 'gathered': 196, 'carmody': 197, 'swore': 198, 'hed': 199, 'go': 200, 'no': 201, 'further': 202, 'had': 203, 'satisfaction': 204, 'midst': 205, 'row': 206, 'kerrigan': 207, 'cheeks': 208, 'same': 209, 'red': 210, 'rose': 211, 'some': 212, 'lads': 213, 'declared': 214, 'painted': 215, 'took': 216, 'small': 217, 'drop': 218, 'too': 219, 'much': 220, 'suppose': 221, 'sweetheart': 222, 'ned': 223, 'morgan': 224, 'so': 225, 'powerful': 226, 'able': 227, 'saw': 228, 'fair': 229, 'colleen': 230, 'stretched': 231, 'by': 232, 'tore': 233, 'under': 234, 'table': 235, 'smashed': 236, 'chaneys': 237, 'oh': 238, 'twas': 239, 'then': 240, 'runctions': 241, 'lick': 242, 'big': 243, 'phelim': 244, 'mchugh': 245, 'replied': 246, 'introduction': 247, 'kicked': 248, 'terrible': 249, 'hullabaloo': 250, 'casey': 251, 'piper': 252, 'near': 253, 'being': 254, 'strangled': 255, 'squeezed': 256, 'pipes': 257, 'bellows': 258, 'chanters': 259, 'ribbons': 260, 'entangled': 261, 'end': 262}

"""
~~~

~~~python
model = Sequential()
model.add(Embedding(total_words, 64, input_length=max_sequence_len-1))
model.add(Bidirectional(LSTM(20)))
model.add(Dense(total_words, activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
history = model.fit(xs, ys, epochs=500, verbose=1)


"""
Epoch 138/500
15/15 [==============================] - 0s 6ms/step - loss: 1.3825 - accuracy: 0.7439
Epoch 139/500
15/15 [==============================] - 0s 6ms/step - loss: 1.3698 - accuracy: 0.7628
Epoch 140/500
15/15 [==============================] - 0s 5ms/step - loss: 1.3040 - accuracy: 0.7654
...
...
...
Epoch 498/500
15/15 [==============================] - 0s 6ms/step - loss: 0.1378 - accuracy: 0.9632
Epoch 499/500
15/15 [==============================] - 0s 6ms/step - loss: 0.1247 - accuracy: 0.9553
Epoch 500/500
15/15 [==============================] - 0s 7ms/step - loss: 0.1231 - accuracy: 0.9569

"""
~~~

~~~python
import matplotlib.pyplot as plt


def plot_graphs(history, string):
  plt.plot(history.history[string])
  plt.xlabel("Epochs")
  plt.ylabel(string)
  plt.show()

plot_graphs(history, 'accuracy')
~~~

|![Imgur](https://i.imgur.com/1NVjWmS.png)|


~~~python
seed_text = "Laurence went to dublin"
next_words = 100
  
for _ in range(next_words):
	token_list = tokenizer.texts_to_sequences([seed_text])[0]
	token_list = pad_sequences([token_list], maxlen=max_sequence_len-1, padding='pre')
	predicted = model.predict_classes(token_list, verbose=0)
	output_word = ""
	for word, index in tokenizer.word_index.items():
		if index == predicted:
			output_word = word
			break
	seed_text += " " + output_word
print(seed_text)
# Laurence went to dublin all the ceiling would fall glisten then rose glisten twas your eyes glisten harp didnt how round round didnt mavrone girls be strangled strangled strangled died be strangled strangled strangled replied round round a acres room be how round round a cask strangled strangled died round a acres cask strangled girls them were them round a cask strangled strangled ground ground ground girls round round a room were them were them were them a ground ground youd how round round didnt how round a cask cask strangled died be strangled strangled strangled died round round a cask room be relations

~~~

## Bidirection

~~~python
model = Sequential()
model.add(Embedding(total_words, 64, input_length=max_sequence_len-1))
model.add(Bidirectional(LSTM(20)))
model.add(Dense(total_words, activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
history = model.fit(xs, ys, epochs=500, verbose=1)
~~~

## Songs sentences resources

- [https://storage.googleapis.com/laurencemoroney-blog.appspot.com/irish-lyrics-eof.txt](https://storage.googleapis.com/laurencemoroney-blog.appspot.com/irish-lyrics-eof.txt){:tar4get="_back"}

~~~batch
!wegt --no-check-certificat \
https://storage.googleapis.com/laurencemoroney-blog.appspot.com/irish-lyrics-eof.txt \
-O /tmp/irish-lyrics-eof.txt
~~~


- Songs Coding

~~~python
data = open('/tmp/irish-lyrices-eof.txt').tead()
~~~

~~~python
model= Sequential()
model.add(Embedding(total_words, 100, input_length=max_sequence_len -1))
model.add(Bidirectional(LSTM(150)))
model.add(Desse(total_words, activation='softmax'))
adam = Adam(lr=0.01)
model.compile(loss='categorial_crossentropy', optimizer=adam, metrics=['accuracy'])
history = model.fit(xs, ys, epochs=100, verbose=1)
~~~

## Songs Code 

~~~python
import tensorflow as tf

from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, LSTM, Dense, Bidirectional
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import Adam
import numpy as np 
~~~

~~~python
!wget --no-check-certificate \
    https://storage.googleapis.com/laurencemoroney-blog.appspot.com/irish-lyrics-eof.txt \
    -O /tmp/irish-lyrics-eof.txt
~~~


~~~python
tokenizer = Tokenizer()

data = open('/tmp/irish-lyrics-eof.txt').read()

corpus = data.lower().split("\n")

tokenizer.fit_on_texts(corpus
total_words = len(tokenizer.word_index) + 1

print(tokenizer.word_index)
print(total_words)
~~~

~~~python
input_sequences = []
for line in corpus:
    print("line: ", line)
	# line: come all ye maidens young and fair
	print("tokenizer.texts_to_sequences([line]):", tokenizer.texts_to_sequences([line]))
	# tokenizer.texts_to_sequences([line]): [[51, 12, 96, 1217, 48, 2, 69]]
    token_list = tokenizer.texts_to_sequences([line])[0]
    for i in range(1, len(token_list)):
        n_gram_sequence = token_list[:i+1]
        input_sequences.append(n_gram_sequence)
		"""
		n_gram_sequence:  [51, 12]
        n_gram_sequence:  [51, 12, 96]
        n_gram_sequence:  [51, 12, 96, 1217]
        n_gram_sequence:  [51, 12, 96, 1217, 48]
        n_gram_sequence:  [51, 12, 96, 1217, 48, 2]
        n_gram_sequence:  [51, 12, 96, 1217, 48, 2, 69]
		"""

# pad sequences 
max_sequence_len = max([len(x) for x in input_sequences])
input_sequences = np.array(pad_sequences(input_sequences, maxlen=max_sequence_len, padding='pre'))

# create predictors and label
xs, labels = input_sequences[:,:-1],input_sequences[:,-1]

ys = tf.keras.utils.to_categorical(labels, num_classes=total_words)
~~~


~~~python
print(tokenizer.word_index['in'])
print(tokenizer.word_index['the'])
print(tokenizer.word_index['town'])
print(tokenizer.word_index['of'])
print(tokenizer.word_index['athy'])
print(tokenizer.word_index['one'])
print(tokenizer.word_index['jeremy'])
print(tokenizer.word_index['lanigan'])
"""
8
1
71
6
713
39
1790
1791
"""
~~~

~~~python
print(xs[6])
# [0 0 0 0 0 0 0 0 0 0 0 0 0 0 2]

print(ys[6])
# [0. 0. 0. ... 0. 0. 0.]
~~~


~~~python
print(tokenizer.word_index)

"""
{'the': 1, 'and': 2, 'i': 3, 'to': 4, 'a': 5, 'of': 6, 'my': 7, 'in': 8, 'me': 9, 'for': 10, 'you': 11, 'all': 12, 'was': 13, 'she': 14, 'that': 15, 'on': 16, 'with': 17, 'her': 18, 'but': 19, 'as': 20, 'when': 21, 'love': 22, 'is': 23, 'your': 24, 'it': 25, 'will': 26, 'from': 27, 'by': 28, 'they': 29, 'be': 30, 'are': 31, 'so': 32, 'he': 33, 'old': 34, 'no': 35, 'oh': 36, 'ill': 37, ...
"""
~~~


~~~python
model = Sequential()
model.add(Embedding(total_words, 100, input_length=max_sequence_len-1))
model.add(Bidirectional(LSTM(150)))
model.add(Dense(total_words, activation='softmax'))
adam = Adam(lr=0.01)
model.compile(loss='categorical_crossentropy', optimizer=adam, metrics=['accuracy'])
#earlystop = EarlyStopping(monitor='val_loss', min_delta=0, patience=5, verbose=0, mode='auto')
history = model.fit(xs, ys, epochs=100, verbose=1)
#print model.summary()
print(model)
~~~


~~~python
import matplotlib.pyplot as plt


def plot_graphs(history, string):
  plt.plot(history.history[string])
  plt.xlabel("Epochs")
  plt.ylabel(string)
  plt.show()
~~~

~~~python
plot_graphs(history, 'accuracy')
~~~


~~~python
seed_text = "I've got a bad feeling about this"
next_words = 100
  
for _ in range(next_words):
	token_list = tokenizer.texts_to_sequences([seed_text])[0]
	token_list = pad_sequences([token_list], maxlen=max_sequence_len-1, padding='pre')
	predicted = model.predict_classes(token_list, verbose=0)
	output_word = ""
	for word, index in tokenizer.word_index.items():
		if index == predicted:
			output_word = word
			break
	seed_text += " " + output_word
print(seed_text)
~~~

# [Text generation with an RNN](https://www.tensorflow.org/tutorials/text/text_generation)


# Week 4 Quiz

1. What is the name of the method used to tokenize a list of sentences?

   - fit_on_texts(sentences)


2. If a sentence has 120 tokens in it, and a Conv1D with 128 filters with a Kernal size of 5 is passed over it, what’s the output shape?

   - (None, 116, 128)

3. What is the purpose of the embedding dimension?

   - It is the number of dimensions for the vector representing the word encoding

4. IMDB Reviews are either positive or negative. What type of loss function should be used in this scenario?

   - Binary crossentropy

5. If you have a number of sequences of different lengths, how do you ensure that they are understood when fed into a neural network?

   - Use the pad_sequences object from the tensorflow.keras.preprocessing.sequence namespace

6. When predicting words to generate poetry, the more words predicted the more likely it will end up gibberish. Why?

   - Because the probability that each word matches an existing phrase goes down the more words you create

7. What is a major drawback of word-based training for text generation instead of character-based generation?

   - Because there are far more words in a typical corpus than characters, it is much more memory intensive

8. How does an LSTM help understand meaning when words that qualify each other aren’t necessarily beside each other in a sentence?

   - Values from earlier words can be carried to later ones via a cell state

