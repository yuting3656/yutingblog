---
layout: 'post'
title: 'aiacademy: 自然語言處理 NLP Sequence Encoding & Attention'
permalink: 'aiacademy/week12/nlp-sequence-encoding-attention'
tags: aiacademy nlp sequence-encoding attention
---

# Sequence Encoding Basic Attention

<iframe src="https://www.youtube.com/embed/nYpn4Lwdunc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

__Representations of Variable Length Data__

- Input: word sequence, image pixels, audio signal, click logs
- Propery: continuity, temporal, importance distribution
- Example
   - Basic combination: average, sum
   - Neural combination: network architecurees should consider input domain prperties
      - CNN (convolutional neural network)
      - RNN (recurrent neurlal network): temporal information

> Network architectures should consider the input domain properties

__Recurrent Neural Networks (RNN)__

- Learning variable-length representations

   - Fit for sentences and sequences ofvalues

- Sequential computation makes parallelization difficult

- No explicit modeling of long and short range dependenceies

- |![Imgur](https://i.imgur.com/h4ArOI7.gif)|


__Convolutional neural Networks__


- Easy to parallelize

- Exploit local dependencies
   - **Long-distance** dependencies require many layers

- |![Imgur](https://i.imgur.com/ygoCUXL.gif)|

__Attention__

- Encoder-decoder model is important in NMT
- RNNs need attention mechanism to handle long dependencies
- Attention allows us to access any state

- |![Imgur](https://i.imgur.com/eViRaRy.gif)|

__Machine Translation with Attention__

- query: 拿進來去算 match 程度的資訊 z
- key: 拿過來被算的 vectors 叫 key
   - 拿 query 在 key 上面做 match 程度
   - key 用來算 α
- value: 可以和key是不一樣的，value 是用來做 weighted sum 的

![Imgur](https://i.imgur.com/4x7DjeD.gif)

__Dot-Product Attention__

- Input: a query q and a set of key-value (k-v) pairs to an output
- Output: weighted sum of values

![Imgur](https://i.imgur.com/qFSdIsr.gif)

__Dot-Product Attention in Matirx__

- Input: multiple queries q and a set of key-value (k-v) pairs to an output
- Output: a set of weighted sum of values

![Imgur](https://i.imgur.com/IcR6rKW.gif)


# Sequence Encoding Self-Attention

<iframe src="https://www.youtube.com/embed/5aWnO7F7wlE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

__Attention__

- Encoder-decoder modle is important in NMT
- RNNs need __attention mechanism__ to handle long dependencies
- Attention allows us to access any state

> Using attention to replace recurrence architectures


__Self-Attention__

- Constant "path length" between two positions

- Easy to parallelize

![Imgur](https://i.imgur.com/O8zKifH.gif)

__Transformoer Idea__

- [Attention Is All You Need](https://arxiv.org/pdf/1706.03762.pdf){:target="_back"}

![Imgur](https://i.imgur.com/tdJeQ6H.gif)

__Encoder Self-Attention__

![Imgur](https://i.imgur.com/sXUmddC.gif)


__Decoder Self-Attention__


![Imgur](https://i.imgur.com/OaSRBw3.gif)


# Sequence Encoding Multi Head Attention

<iframe src="https://www.youtube.com/embed/8pfImBNueqc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


__Convolution__

![Imgur](https://i.imgur.com/rfdra5C.gif)

__Self-Attention__

![Imgur](https://i.imgur.com/upjZYsP.gif)

__Attention Head: who__

![Imgur](https://i.imgur.com/OhUhlUS.gif)

__Comparision__

![Imgur](https://i.imgur.com/XnIq4al.gif)


# Sequence Encoding Transformer

<iframe src="https://www.youtube.com/embed/0XdUHtYi7zY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

__Transformer Overview__

- Non-recurrent encoder-decoder for MT
- PyTorch explanation by Sasha Rush
   - 一定要自己看一次，超棒棒～ 
   - [http://nlp.seas.harvard.edu/2018/04/03/attention.html](http://nlp.seas.harvard.edu/2018/04/03/attention.html){:target="_back"}

![img](http://nlp.seas.harvard.edu/images/the-annotated-transformer_14_0.png)

![Imgur](https://i.imgur.com/l90qvGO.gif)

__Multi-Head Attention__

![Imgur](https://i.imgur.com/dsL7ZFq.gif)

__Scaled Dot-Product Attention__

![Imgur](https://i.imgur.com/boiUtoI.gif)

__Transformer Encoder Block__

![Imgur](https://i.imgur.com/o6aqtvj.gif)

![Imgur](https://i.imgur.com/t86nosK.gif)

__Encoder Input__

![Imgur](https://i.imgur.com/djLnIUm.gif)

![Imgur](https://i.imgur.com/pMdltol.gif)

__Multi-Head Attention Details__

- [好棒棒連結](https://medium.com/@bgg/seq2seq-pay-attention-to-self-attention-part-2-%E4%B8%AD%E6%96%87%E7%89%88-ef2ddf8597a4){:target="_back"}

![good-chart](https://miro.medium.com/max/2228/1*6gWbzqnAQjpg1n35rrExZQ.png)

__Training Tips__

- Byte-pair encodings (BPE)
- Checkpoint averaging
- ADAM optimizer with learning rate changes
- Dropout during trainiing at every layer just before adding residual
- Label smoothing
- Auto-regressive decoding with beam search and length penalties


__ML Experiments__

![Imgur](https://i.imgur.com/mlrTIKJ.gif)

__Parsing Experiments__

![Imgur](https://i.imgur.com/2TbEWvu.gif)

__Condluding Remarks__

<table>
   <tr>
     <td><b>Non-recurrence</b> model is easy to paralleize</td>
     <td rowspan="4"><img src="https://i.imgur.com/zP4VzJL.gif"></td>
   </tr>

   <tr>
     <td><b>Multi-head attention</b> captures different aspects by interacting between words</td>

   </tr>
   
   <tr>
     <td><b>Positional encoding</b> captures location information</td>
   </tr>

   <tr>
     <td>Each transformer block can be applied to diverse tasks</td>
   </tr> 

</table>



