---
layout: 'post'
title: 'aiacademy: 深度學習 CNN Object Recognition and Detection'
permalink: 'aiacademy/week6/deep-learning-cnn-object-recognition-and-detection'
tags: aiacademy cnn object-detection
---

###　Fine-grained object recognition

- CNN-­based computer vision applicatons
   - `Find-grained object recognition`
   - Object detection
   - Semantic segmentation
   - Image super resolution
   - Image style transfer
   - Action and gesture recognition
   - Image matching and co-segementation

<iframe src="https://www.youtube.com/embed/9sLp_IhSS88" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Introduction

   - Generic and `fine-grained` visual recognition

      * A large class number 
      * Large intra-class
      * `Subtle inter-class variations`

      ![Imgur](https://i.imgur.com/8sBxVk2m.jpg)


- Part-based Method

![Imgur](https://i.imgur.com/mhdmBJA.jpg)

![Imgur](https://i.imgur.com/tXlL5hf.jpg)

- Idea 

   - Neuron: part detector 
   - Feature map: the spatial occurrence of certain part

   ![Imgur](https://i.imgur.com/JxK7jHx.jpg)

> We introduce the `co-occurrence laye!r` to encode the interaction between object parts.


### Apporach (Co-occurrence layer)

![Imgur](https://i.imgur.com/1eF6IND.jpg)

![Imgur](https://i.imgur.com/A6JnvUf.jpg)

![Imgur](https://i.imgur.com/smZB9LD.jpg)

### Experiments: Dataset

![Imgur](https://i.imgur.com/Rcm9Mi6.jpg)

- experiments: setting

   ![Imgur](https://i.imgur.com/GM0v4uh.jpg)


- Visualization

![Imgur](https://i.imgur.com/s2yFuDj.jpg)

![Imgur](https://i.imgur.com/9AWJll3.jpg)


---

### Object Detection

- CNN-­based computer vision applicatons
   - Find-grained object recognition
   - `Object detection`
   - Semantic segmentation
   - Image super resolution
   - Image style transfer
   - Action and gesture recognition
   - Image matching and co-segementation


<iframe src="https://www.youtube.com/embed/-jR6zglNeg0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Object Detection

   - Goal: Detecting instances of semantic objects of certain classes
   - Critical to high-level vision tasks such as surveillance, self-driving car, and image retrieval

   ![Imgur](https://i.imgur.com/8pVNQqG.jpg)


#### R-CNN: Regions with CNN Features

> `Object Detection` + `CNN` ===> R-CNN
> 第一個用　CNN 來做　Object Detection 的論文！

![Imgur](https://i.imgur.com/0ISUFE7.jpg)

- Proposal extraction: Using `selective search` [Uijlin et al.,IJCV’13]
- Compute CNN features in the layer 'fc7' of Caffe CNN
- Region classification: linear SVMs or a softmax classifer
- Regression-based bounding box refinement

#### Fast R-CNN

![Imgur](https://i.imgur.com/ZWv3x8i.jpg)

- Apply fully concolutional networks to the whole image
- Rol pooling: each proposal is pooled into a fix-size feature map
- Classification with a softmax layer
- Regression-based bounding box refinement

#### Experimental Results

![Imgur](https://i.imgur.com/DuBKcVh.jpg)

#### Faster R-CNN

![Imgur](https://i.imgur.com/LbB8KWq.jpg)

####  R-CNN vs. Fast-R-CNN vs. Faster R-CNN

![Imgur](https://i.imgur.com/3OLcMGf.jpg)

#### YOLO9000 [Redmon &	Farhadi, CVPR’17]

![Imgur](https://i.imgur.com/JP2NEY7.jpg)






