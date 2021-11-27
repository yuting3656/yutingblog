---
layout: "single"
title: 'aiacademy: 深度學習 CNN GitHub: Mask-Rcnn 安裝'
permalink: 'aiacademy/week7/deep-learning-cnn-mask-rcnn'
tags: aiacademy cnn Mask_RCNN
---

## GitHub [Mask_RCNN](https://github.com/matterport/Mask_RCNN){:target="_back"} 安裝步驟 + 地雷小解 (環境不一樣，遇到狀況也不一樣)

- 我的作業系統
   - OS: Windows 10


1. 在 conda create new virtural envs

   - conda craete -n `name` python=3.6.8

   ~~~
   >> conda create -n mask_rcnn python=3.6.8
   >> activate mask_rcnn 
   ~~~
   
2. clone or download [Mask R-CNN](https://github.com/matterport/Mask_RCNN){:target="_back"}

   - cd 到　`Mask R-CNN` 的資料夾裡面

      ![Imgur](https://i.imgur.com/7Y4gcvx.jpg)

   
   - pip install requirements.txt

      - 在安裝　imgaug `出包了` [這篇](http://tn00343140a.pixnet.net/blog/post/278257384-win-10%E5%AE%89%E8%A3%9Dimgaug%E7%99%BC%E7%94%9F%E9%8C%AF%E8%AA%A4){:target="_back"}救了我
         - 要直接裝 [`Shapely`](https://www.lfd.uci.edu/~gohlke/pythonlibs/#shapely){:target="_back"}(安裝imgaug 出包的原因) 的 whl

   - python setup.py install 

      ![Imgur](https://i.imgur.com/zVBpUMK.jpg)

3. 跑 demo.ipynb 檔案

   - Run Mask_RCNN-master\samples\demo.ipynb

      ~~~python
       import os
       import sys
       import random
       import math
       import numpy as np
       import skimage.io
       import matplotlib
       import matplotlib.pyplot as plt
       
       # Root directory of the project
       ROOT_DIR = os.path.abspath("../")
       
       # Import Mask RCNN
       sys.path.append(ROOT_DIR)  # To find local version of the library
       from mrcnn import utils
       import mrcnn.model as modellib
       from mrcnn import visualize
       # Import COCO config
       sys.path.append(os.path.join(ROOT_DIR, "samples/coco/"))  # To find local version
       import coco
       
       %matplotlib inline 
       
       # Directory to save logs and trained model
       MODEL_DIR = os.path.join(ROOT_DIR, "logs")
       
       # Local path to trained weights file
       COCO_MODEL_PATH = os.path.join(ROOT_DIR, "mask_rcnn_coco.h5")
       # Download COCO trained weights from Releases if needed
       if not os.path.exists(COCO_MODEL_PATH):
           utils.download_trained_weights(COCO_MODEL_PATH)
       
       # Directory of images to run detection on
       IMAGE_DIR = os.path.join(ROOT_DIR, "images")
      ~~~


      - 遇到 `ModuleNotFoundError: No module named 'pycocotools' mask rcnn`
      　　　
      ~~~python
      ModuleNotFoundError: No module named 'pycocotools' mask rcnn
      ~~~

        - 要去 [cocodataset/cocoapi](https://github.com/cocodataset/cocoapi){:target="_back"}，下載安裝　PythonAPI

           - 在安裝　cocoapi 的時候遇到 `invalid numeric argument '/Wno-cpp`
              - [這篇](https://github.com/cocodataset/cocoapi/issues/51){:target="_back"}救了我

              ![Imgur](https://i.imgur.com/HGPwthA.jpg)

    
   - 看成果！！！

      ![Imgur](https://i.imgur.com/ENlRUf9.jpg)