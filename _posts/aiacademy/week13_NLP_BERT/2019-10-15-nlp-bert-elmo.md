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

# Contextualized Word Embeddings BERT

<iframe src="https://www.youtube.com/embed/cC-GliK_G6A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>