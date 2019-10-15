---
layout: 'post'
title: 'aiacademy: 自然語言處理 NLP 4.1 Contextualized Word Embeddings'
permalink: 'aiacademy/week12/nlp-contextualized-word-embeddings'
tags: aiacademy nlp
---

- [youtube list](https://www.youtube.com/playlist?list=PL1f_B9coMEeAvsLxePN8VocV30kuspe0p){:target="_back"}

# Contextualized Word Embeddings Background

<iframe src="https://www.youtube.com/embed/VE2JZNymAwE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> Word embedding 沒辦法表達一字多意的問題~

### Word Embedding Ploysemy Issue

- Words are polysemy
   - An apple a day, keeps the doctor away.
   - Samrtphone companies including apple, ...
- However, their embeddings are NOT ploysemy
- Issue
   - Multi-senses (ploysemy)
   - Multi-aspects (semantics, syntax)

![Imgur](https://i.imgur.com/h4Ja15T.gif)


### RNN LM (Language Model)

|![Imgur](https://i.imgur.com/G4jwrZR.gif)|

### TagLM - "Pre-ELMo"

|![Imgur](https://i.imgur.com/s4Zmq0t.gif)|

### TagLM Model Detail

|![Imgur](https://i.imgur.com/faIAWLq.gif)|

### TagLM on Name Entity Recognition

|![Imgur](https://i.imgur.com/WWmjV37.gif)|

### CoVe (Contextualized Word Vectors)

- 借用 MT (machine translation) 資訊

  

|![Imgur](https://i.imgur.com/rGqQvWu.gif)|


# AI CUP 2019新聞立場檢索競賽課程(蔡宗翰、李宏毅)

<iframe src="https://www.youtube.com/embed/kW3BQm4HWjI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
