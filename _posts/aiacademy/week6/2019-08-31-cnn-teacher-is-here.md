---
layout: 'post'
title: 'aiacademy: 深度學習 CNN 老師來啦!!!!'
permalink: 'aiacademy/week6/deep-learning-cnn-teacher-is-here'
tags: aiacademy cnn
---

> 嚴格來說，我們對人腦視覺領域，還是不知道怎麼運作的... Lol

> 老師講古!~~~~

- 代表性架構
   - AlexNet
      - 8 layers: 5 cnn, 3 dnn
      - ReLu (Rectified Linear Units)
      - AlexNet: Data augmentation and dropout
      - 沒有公開 source code 
   - VGG-Net
      - 有公開 source code
      - 16 layers or 19 layers
      - multiple scale training imporves the performance
   - googleNet
      - 22 layers
      - significantly more accurate than AlexNet
      - 12 times lesser parameters than AlexNet
      - inception module
      - Auxiliary classifier

      - GoogleNer: Inception module

         - Choose filter sizes of `1 * 1`, `3 * 3`, and `5 * 5`
         - Concatenate all features maps

   - ResNet(2016)
      - 太多層: gradient exploding/vanishing
      - Residulal learning: Convergence

![Imgur](https://i.imgur.com/2eGwG5t.jpg)

![Imgur](https://i.imgur.com/55rReQP.jpg)

![Imgur](https://i.imgur.com/7tuq1JQ.jpg)

- Object detection: YOLO

- Semantic Segmentation
   - FCN (Fully Convolutional Netwotks for Semantic Segmentation)
![Imgur](https://i.imgur.com/sUEVFtz.jpg)

__Approach__

![Imgur](https://i.imgur.com/xl2SnG6.jpg)


- Super resolution

![Imgur](https://i.imgur.com/q0vismC.jpg)


- Style Transfer 

![Imgur](https://i.imgur.com/edkgPT6.jpg)

- Action and gestrue recognition

   - [UCF Sports 101 Dataset](https://www.crcv.ucf.edu/data/UCF101.php){:target="_back"}
