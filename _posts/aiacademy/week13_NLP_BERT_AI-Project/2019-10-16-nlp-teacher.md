---
layout: "single"
title: 'aiacademy: 自然語言處理 NLP 老師來拉～！！！'
permalink: 'aiacademy/week13/nlp-teacher-is-here'
tags: aiacademy nlp
---

- [slide](https://www.csie.ntu.edu.tw/~yvchen/doc/KAIST19_Tutorial.pdf){:target="_back"}


## Conversational Al

- Language Empowering INtelligent Assistants

 - from 2011 (Apple)
 - Google Now (2012)
    - 被動把方式給你
    - Google Assistant (2016)
 - Microsoft Cortana (2014)
 - Amazon Alex/Echo (2014)
    - 倒數計時應用
    - 購物功能
    - echo 對話
       - 下單
 - Google Hmoe (2016)
 - Appple HomePod (2017)
 - Facebook Portal (2019)
    - 吃 amazon 的 data 當 backend

## Why Natural Language?

- Total Population
   - 7.59B
- Internet Users
   - 4.02B
- Active Social Media Users
   - 3.2B 

- Mobile Users
   - 5.14B
   - 用手機的人口，竟然比上網人口還多ㄚㄚㄚㄚ！！！　看看家裡的長輩～　ＸＤ
- Active Mobile Social Users 
   - 2.96B

> 最自然的操作方式，就是用講的！

## Why and When We Need?

- Social Chit-Chat 
   - talk like a human

- Task-Oriented Dialogues
   - information consumption
   - Task completion
   - Decsiion support

## Intelligent Assistants

- 主要幾乎都是，task-oriented dialogues

## APP --> Bot

- A Bot is responsible for a "single" domain, similar to an app.

> User 可以自己主動開始對話，而不會依照開發者的 logic 進行！

## Two Branches of Conversational AI

- Chit-Chat
   - Seq2sqe models
   - Seq2seq with conversation contexts
   - Knowledge-grounded seq2seq models

   - 小冰
      - [https://www.ithome.com.tw/news/122268](https://www.ithome.com.tw/news/122268){:target="_back"}

- Task-Oriented
   - Single-domain, system-initiative
   - Multi-domain, contextural, mixed-initiative
   - End-to-end learning, massively multi-domsin

## Task-Oriented 

### Task-Oriented Dialogue System (Young, 2000)

|![Imgur](https://i.imgur.com/jSWgaoD.gif)|

1. Domain Identification
2. Intent Detection
3. Slot Filling 
   - slot tagging
      - Variations:
         - RNNs with LSTM cells
         - Input, sliding window of n-grams
         - Bi-directional LSTMs
      - encoder-decoder
      - attention-based encode-decoder
   - Multi-Task Slot Tagging
   - Semi-Supervised Slot Tagging

### Joint Semantic Frame Parsing

|![Imgur](https://i.imgur.com/u3CaaeL.gif)|

### Contextual Language Understanding

|![Imgur](https://i.imgur.com/MSnhbAJ.gif)|

### End-to-End Memory NetWorks

|![Imgur](https://i.imgur.com/JqMFAKL.gif)|


### Dialogue State Tracking (DST)

### Multi-Domain Dialogue State Tracking

### Dialog State Tracking Challenge (DSTC)

- [DSTC8](https://sites.google.com/dstc.community/dstc8){:target="_back"}

### E2E Task-Completion Bot (TC-Bot)

- [https://arxiv.org/abs/1703.01008](https://arxiv.org/abs/1703.01008){:target="_back"}

### Issues in NLG

- Issue
   - NLG tends to generate shorter sentences
   - NlG may generate grammatically-incorrect sentences

- Soluttion
   - Generate word patterns

## Conversational AI

- Issue 1: Blandness Problem
- Issue 2: Response Inconsistency
- Issue 3: Dialouge-Level Optimization via RL
- Issue 4: No Grounding

## MMI for Response Diversity

## High level Intention learning

## Conversational Question Answering

- QuAC
- [http://quac.ai/](http://quac.ai/){:target="_back"}


## Understanding RCT

- [https://en.wikipedia.org/wiki/Randomized_controlled_trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial){:target="_back"}

## GPT (Generative Pre-Training)

- [https://towardsdatascience.com/openai-gpt-2-understanding-language-generation-through-visualization-8252f683b2f8](https://towardsdatascience.com/openai-gpt-2-understanding-language-generation-through-visualization-8252f683b2f8){:target="_back"}

- [https://towardsdatascience.com/too-powerful-nlp-model-generative-pre-training-2-4cc6afb6655](https://towardsdatascience.com/too-powerful-nlp-model-generative-pre-training-2-4cc6afb6655){:target="_back"}

- [https://towardsdatascience.com/combining-supervised-learning-and-unsupervised-learning-to-improve-word-vectors-d4dea84ec36b](https://towardsdatascience.com/combining-supervised-learning-and-unsupervised-learning-to-improve-word-vectors-d4dea84ec36b){:target="_back"}


## Challenge Summary

- The human-machine interfcae is a hot topic butseveral ocmponents must be integrated

- Most state-of-the-aret techologies area based on Dnn
  - REquires huge amounts of labed data 
  - Serveral frameworrks/models are avilable 
- Fast domain adaptiona with scares datra  _re-use of reles/knoledfe 
- Handing resoning and presonalization 
- Data collection adn danaysis from un-sructured dat 
- Complec-casecde 

