---
layout: 'post'
title: 'aiacademy: 深度學習 神經網路調教 model tuning'
permalink: 'aiacademy/week4/deep-learning-neural-network-model-tuning'
tags: aiacademy deep-learning neural-networks model-tuning
---


### 神經網路調教

<iframe src="https://www.youtube.com/embed/jYuVeRzaM0o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Input Preprocessing

   ![Imgur](https://i.imgur.com/XKo8gZ0.gif)

- Activation function

   ![Imgur](https://i.imgur.com/4bmG3cx.gif)

- Loss Function

   - regression

      ![Imgur](https://i.imgur.com/WS6c6KK.gif)

   - classification

      ![Imgur](https://i.imgur.com/kLVGNDz.gif)

- Optimizer

   - SGD: Stochastic Gradient Descent 
   - Adagrad: Adaptive Learning Rate
   - RMSprop: Another Adaptive Learning Rate optimizer
   - __Adam:__ RMSprop + Momentum
      - 在某些谷底後，加一點momentum，防止 Vanishing Gradient
      - `效果最棒`
      - [https://arxiv.org/pdf/1412.6980v8.pdf](https://arxiv.org/pdf/1412.6980v8.pdf){:target="_back"}
   - Nadam: Adam + Nesterove Momentum

   ![opt](https://user-images.githubusercontent.com/11681225/50016682-39742a80-000d-11e9-81da-ab0406610b9c.gif)