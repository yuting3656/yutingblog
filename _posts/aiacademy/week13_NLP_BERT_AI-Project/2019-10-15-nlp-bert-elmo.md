---
layout: 'post'
title: 'aiacademy: 自然語言處理 NLP 4.2  BERT / ELMo'
permalink: 'aiacademy/week13/nlp-bert-elmo'
tags: aiacademy nlp BERT ELMo
---

- [Deep Contextualized Word Representations](https://arxiv.org/pdf/1802.05365.pdf){:target="_back"}

# Contextualized Word Embeddings ELMo

<iframe src="https://www.youtube.com/embed/ywJWtMucj1Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### ELMo: Embeddings from Language Models

- Ideas: contextjalized word representations
   - Learn wrod vectors using long contexts instead of a context window
   - Learn a deep Bi-NLM and use all its layers in prediction

### ElMo - Bidirectionsl LM 

|![Imgur](https://i.imgur.com/M4CJZpE.gif)|
|![Imgur](https://i.imgur.com/sIxjmPL.gif)|
|![Imgur](https://i.imgur.com/ALPkXjK.gif)|
|![Imgur](https://i.imgur.com/91HreMi.gif)|

#### ELmo Illustration

|![Imgur](https://i.imgur.com/cYCsNx2.gif)|
|![Imgur](https://i.imgur.com/ZLtTpJe.gif)|

#### ELMo on Name Entitity Recognition

|![Imgur](https://i.imgur.com/P5Pi9zG.gif)|

#### ELMo Resluts 

- Machine Comprehension
   - 給你一篇文章，有 Qustions 要你回答問題
- Textual Entailment
   - 給你兩個句子，問你兩個句子的關係是: 因果關係、平行意思
- Semantic Role Labeling
   - 去學在句子裡面，字和字的關係，EX: 主詞、動詞、介係詞
   - 不是做 POS
- Coreference Resolution
   - 看我 Coreference 指示代名詞，是看原本哪個字
- Name Entity Recognition
- Sentiment Analysis 
   - 判斷一個句子，是 positive or negative


|![Imgur](https://i.imgur.com/trRDUgj.gif)|



#### ELMo Analysis

|![Imgur](https://i.imgur.com/2CKHDuJ.gif)|
|![Imgur](https://i.imgur.com/G3vo46g.gif)|


#### Concluding Remarks

- Pre-trained ELMo: [https://allennlp.org/elmo](https://allennlp.org/elmo){:target="_back"}

|![Imgur](https://i.imgur.com/fSELYEv.gif)|



# Contextualized Word Embeddings BERT

- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/pdf/1810.04805.pdf){:target="_back"}

- [http://jalammar.github.io/illustrated-bert/](http://jalammar.github.io/illustrated-bert/){:target="_back"}

- [https://github.com/google-research/bert](https://github.com/google-research/bert){:target="_back"}

<iframe src="https://www.youtube.com/embed/cC-GliK_G6A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### BERT: Bidirectional Encoder Representations from Transformers

- Idea: contextualized word representations
   - Learn word vectors using long contexts using Transformer instead of LSTM

|![Imgur](https://i.imgur.com/oKBxRfW.gif)|

#### BERT#1 - Masked Language Model

|![Imgur](https://i.imgur.com/hxFQOEc.gif)|
|![Imgur](https://i.imgur.com/2t05k9T.gif)|

#### BERT#2 - Next Sentence Prediction

- Idea: modeling **relationship** between sentences
   - QA, NLI etc. are based on understanding inter-sentence relationship


|![Imgur](https://i.imgur.com/wC5Srxm.gif)|
|![Imgur](https://i.imgur.com/vvZ1Oov.gif)|

#### BERT - Input Representation

- Input embeddings contain
   - Word-level token ebeddings
   - Sentence-level segment embeddings
   - Postion embeddings

|![Imgur](https://i.imgur.com/rDLCWy0.gif)|

#### BERT Training

- Training data: Wikipedia + BookCorpus
- 2 BERT models
   - BERT-Base: 12-layer, 768-hidden, 12-head
   - BERT-Large: 24-layer, 1024-hidden, 16-head

|![Imgur](https://i.imgur.com/C1qgEw2.gif)|![Imgur](https://i.imgur.com/tuDQiE4.gif)|

#### BERT Fine-Tuning for Understanding Tasks

- Idea: simply learn a classifier/tagger buit on the top layer for each target task

|![Imgur](https://i.imgur.com/1IwHzdf.gif)|

#### BERT Overview

|![Imgur](https://i.imgur.com/HylufHm.gif)|

#### BERT Fine-Tuning Results

|![Imgur](https://i.imgur.com/xAUgN2o.gif)|

#### BERT results on NER

|![Imgur](https://i.imgur.com/S4TVPJI.gif)|

#### BERT Results with Differernt Model Sizes

- Improving performance by increasing model size

|![Imgur](https://i.imgur.com/QzKoPqa.gif)|

#### BERT Contextual Embeddings Results on NER

|![Imgur](https://i.imgur.com/KjhRFe3.gif)|

#### ERNIE: Enhanced Representation through kNowledge IntEgration

|![Imgur](https://i.imgur.com/9YgwUpo.gif)|

#### Condluding Remarks

- [https://github.com/google-research/bert](https://github.com/google-research/bert){:target="_back"}

|![Imgur](https://i.imgur.com/XEgxAcx.gif)|