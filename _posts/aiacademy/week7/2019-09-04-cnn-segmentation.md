---
layout: "single"
title: 'aiacademy: 深度學習 CNN Segmentation'
permalink: 'aiacademy/week7/deep-learning-cnn-segmentation'
tags: aiacademy cnn
---

### Segmentation

<iframe src="https://www.youtube.com/embed/aVliEgsoBpE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


![Imgur](https://i.imgur.com/DUnEOCn.jpg)

> 要實現 Segmentation 靠: `Fylly Convolutional Networks` for Semantic Segmentation   __(FCN)__

![Imgur](https://i.imgur.com/Ny2JlsF.jpg)


- Only Convolution layer and transposed convolution layer in the network architecture. 

#### Approach 

![Imgur](https://i.imgur.com/rYfoZq6.jpg)

- To make the predicted resulte better, adding the skips to combine the final prediction layer with lower layer with finer stride.


![Imgur](https://i.imgur.com/lzRmvGa.jpg)

![Imgur](https://i.imgur.com/i8QFDd9.jpg)


#### Object Instance Segmentation

![Imgur](https://i.imgur.com/xCsgKyp.jpg)

Object Instance Segmentation: Mask RCNN

![Imgur](https://i.imgur.com/hgIZa8Y.jpg)

![Imgur](https://i.imgur.com/Zi09q5r.jpg)

![Imgur](https://i.imgur.com/9LzQZYA.jpg)



### Mask R-CNN 

<iframe src="https://www.youtube.com/embed/X0AjK6AQ20w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


__Mask RCNN__
   
   - Instance segmentation
   - output: Masks 
   - Two Stage 的演算法
   - Mask-RCNN 是 Faster-RCNN 的改良版
   - [Msdk_RCNN GitHub](https://github.com/matterport/Mask_RCNN){:target="_back"}



### Matching and co-segmentation (Optinal)

<iframe src="https://www.youtube.com/embed/uLD3jnq_vi8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
