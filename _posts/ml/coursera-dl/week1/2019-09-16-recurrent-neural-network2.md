---
layout: 'post'
title: 'Recurrent Neural Networks 2'
permalink: 'dl-coursera-sequence-models/week1/rnn-sequence-models2'
tags: coursera-deep-learning rnn GRU LSTM
---



### [RNN: Backpropagation through time](https://www.coursera.org/learn/nlp-sequence-models/lecture/bc7ED/backpropagation-through-time){:target="_back"}

![Imgur](https://i.imgur.com/RpbJNsr.jpg)

### [RNN: Different types of RNNs](https://www.coursera.org/learn/nlp-sequence-models/lecture/BO8PS/different-types-of-rnns){:target="_back"}


![Imgur](https://i.imgur.com/20OXa58.jpg)

![Imgur](https://i.imgur.com/jBFQ37s.jpg)

__Summary RNN architectures__

![Imgur](https://i.imgur.com/rjV6imE.jpg)


### [RNN: Language model and sequence generation](https://www.coursera.org/learn/nlp-sequence-models/lecture/gw1Xw/language-model-and-sequence-generation){:target="_back"}


#### What is language modelling?

   - Speech recongnition 

      - The apple and pair salad.
      - The apple and pear salad.

      ~~~.txt
         P(The apple and pair salad) = 3.2 x 10 ^ -13
         P(The apple and pear salad) = 5.7 x 10 ^ -10
         P(Sentences) = ?
      ~~~


#### Language modelling with an RNN

   - Training set: large corpus __(large body or vary large set of english text of eenglish sentences)__ of english text.


   ![Imgur](https://i.imgur.com/1hILHcc.jpg)


### [RNN: Sampling novel sequences](https://www.coursera.org/learn/nlp-sequence-models/lecture/MACos/sampling-novel-sequences){:target="_back"}

__Sampling a sequence from a trained RNN__

![Imgur](https://i.imgur.com/aspmtha.jpg)

__Character-level language model__

![Imgur](https://i.imgur.com/2gqnhkz.jpg)

__Sequence Generation__

![Imgur](https://i.imgur.com/q5mkdNp.jpg)

### [RNN: Vanishing gradients with RNNs](https://www.coursera.org/learn/nlp-sequence-models/lecture/PKMRR/vanishing-gradients-with-rnns){:target="_back"}

![Imgur](https://i.imgur.com/iaMBnOU.jpg)

> 從英文來說，單數 (cat ---> was)，複數 (cats ---> were)，中間的子句有時候很長時，會容易造成，Vanishing gradients 

### [RNN: gated recurrent unit (GRU)](https://www.coursera.org/learn/nlp-sequence-models/lecture/agZiL/gated-recurrent-unit-gru){:target="_back"}


![Imgur](https://i.imgur.com/rcVUEvo.jpg)

__GRU(simplified)__

![Imgur](https://i.imgur.com/dD87eOA.jpg)

__Full GRU__

![Imgur](https://i.imgur.com/em0ftdN.jpg)

### [RNN: long short term memory (LSTM)](https://www.coursera.org/learn/nlp-sequence-models/lecture/agZiL/gated-recurrent-unit-gru){:target="_back"}

__GRU and LSTM__

![Imgur](https://i.imgur.com/gqLwXsK.jpg)

![Imgur](https://i.imgur.com/0kx3DpE.jpg)

__LSTM__

![Imgur](https://i.imgur.com/d7Gf3No.jpg)


### [RNN: bidirectionisal RNN](https://www.coursera.org/learn/nlp-sequence-models/lecture/fyXnn/bidirectional-rnn){:target="_back"}

- disadvantage:
   - need the entire sequence of data before you can make predictions anywhere
   - ex: real time speech recognition system

![Imgur](https://i.imgur.com/SVWX63b.jpg)


### [RNN: deep RNNs](https://www.coursera.org/learn/nlp-sequence-models/lecture/ehs0S/deep-rnns){:target="_back"}


![Imgur](https://i.imgur.com/5vIq7GQ.jpg)

![Imgur](https://i.imgur.com/vQXP7Hd.jpg)