---
layout: "single"
title: 'aiacademy: 生成對抗網路 GAN - Generative Adversarial Network (GAN) Introduction'
permalink: 'aiacademy/week11/gan-introduction'
tags: aiacademy GAN
---

## GAN

<iframe src="https://www.youtube.com/embed/oE6Xe5Cyy7Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- [GAN Zoo](https://github.com/hindupuravinash/the-gan-zoo){:target="_back"}


#### Outline

- Generation by GAN
   - Image Generation as Example
   - Theory behind GAN
   - Issues and Possible Solutions

- Conditional Generation
- Unsupervised Conditional Generation
- Relation to Reinforcement Learning


### Basic Idea of GAN

![Imgur](https://i.imgur.com/PB8V30A.gif)

![Imgur](https://i.imgur.com/pHAXehD.gif)

### step 1. Fix generator G, and update discrimniator D

![Imgur](https://i.imgur.com/uo7RtV6.gif)

### step 2. Fix discriminator D, and update generator G

![Imgur](https://i.imgur.com/KkbLNxX.gif)


#### Algorithm

![Imgur](https://i.imgur.com/pnjSSSN.gif)

#### (Variational) Auto-encoder

![Imgur](https://i.imgur.com/QirtvZf.gif)

#### Auto-encoder v.s. GAN

![Imgur](https://i.imgur.com/x7dnlkl.gif)


## GAN in Depth

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZBY1shLnhUk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Generator 

- A generator G is a network. The network defines a probaility distribution PG.

![Imgur](https://i.imgur.com/Pa0fLNG.gif)


### Discriminator

![Imgur](https://i.imgur.com/bFiSjBI.gif)

![Imgur](https://i.imgur.com/oPma6PX.gif)

![Imgur](https://i.imgur.com/IVi7P9t.gif)

![Imgur](https://i.imgur.com/H1nZmJJ.gif)

### Can we use other divergence?

![Imgur](https://i.imgur.com/LPwxfWg.gif)

[Sebastian Nowozin, NIPS, 2016](http://www.nowozin.net/sebastian/blog/nips-2016-generative-adversarial-training-workshop-talk.html){:target="_back"}


### Issues and Possible Solutions

[How to Tain a GAN?](https://github.com/soumith/ganhacks){:target="_back"}


### JS divergence is not suitable

![Imgur](https://i.imgur.com/RDvdFUe.gif)

### What is the problem of JS divergence?

![Imgur](https://i.imgur.com/lCqUjUl.gif)

### Wassertein distance

![Imgur](https://i.imgur.com/CkYy0yE.gif)

![Imgur](https://i.imgur.com/tlLH6d8.gif)

![Imgur](https://i.imgur.com/9Tz0jlF.gif)

### WGAN

![Imgur](https://i.imgur.com/UUxRicG.gif)

![Imgur](https://i.imgur.com/eWinUzW.gif)

### Tip: Improve Quality during Testing

![Imgur](https://i.imgur.com/JIi0WV8.gif)


#### Mode Collapse & Mode Dropping

- Mode collapse
   - generator 開始產生一樣的東西

   ![Imgur](https://i.imgur.com/AS4K8ZZ.gif)

- Mode Dropping 
   - generator 同一類

   ![Imgur](https://i.imgur.com/3cos385.gif)


### Tip: Ensemble

![Imgur](https://i.imgur.com/7qFwcTP.gif)


### Objective Evalution


![Imgur](https://i.imgur.com/SkY3ohi.gif)

![Imgur](https://i.imgur.com/ujQ8j1A.gif)
