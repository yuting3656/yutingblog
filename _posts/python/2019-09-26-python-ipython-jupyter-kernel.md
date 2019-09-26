---
layout: 'post'
title: 'jupyter notebook 使用 conda virtual 環境 '
permalink: 'python/jupyter-notebook/ipykernel'
tags: python jupyter-notebook
---

> 我已經查了前後快 __五__ 次了!!!!!

> 正常來說，第三次應該就要寫筆記了~~~

> 看看我多認真！　都沒時間認真寫筆記　:smile::smile::smile::smile:

## conda vitrual 環境建立

- conda create -n `NAME` python=`version`
   
   - ex:

      ~~~cmd
      conda create -n test python=3.6.8
      ~~~

## 看所有 conda virtual envs

- conda env list

   - ex:

      ~~~
      (base) C:\Users\tim23>conda env list
      # conda environments:
      #
      base                  *  C:\Users\tim23\AppData\Local\Continuum\anaconda3
      ai_academy_1             C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\ai_academy_1
      ai_music                 C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\ai_music
      cv_tuseday               C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\cv_tuseday
      face_recog               C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\face_recog
      mask_rcnn                C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\mask_rcnn
      monday_nlp               C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\monday_nlp
      python-cvcourse          C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\python-cvcourse
      stnadford                C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\stnadford
      yolo_darkflow            C:\Users\tim23\AppData\Local\Continuum\anaconda3\envs\yolo_darkflow
      ~~~

## 使用想要的 virtual envs

- activate `NAME`

   - ex:

      ~~~
      (base) C:\Users\tim23>activate face_recog
      
      (face_recog) C:\Users\tim23>
      ~~~

## 安裝 jupyter-notebook jupyterlab

- pip insatll jupyter jupyterlab

## 安裝 ipykernel

- pip install ipykernel

## 將此 conda virtual env 加入到　ipykernel

- [doc](https://ipython.readthedocs.io/en/stable/install/kernel_install.html){:target="_back"}

- python -m ipykernel install --user --name `conda-virtual-env-name` --display-name `NAME`

   - ex:

      ~~~
      (face_recog) C:\Users\tim23>python -m ipykernel install --user --name face_recog --display-name "face_recog_1"
      Installed kernelspec face_recog in C:\Users\tim23\AppData\Roaming\jupyter\kernels\face_recog
      ~~~

## 跑 jupyter-notebook

- jupyter notebook


## 可看到匯入的 ipykernel

- tree

|![Imgur](https://i.imgur.com/dUKuWPr.gif)|

- lab

|![Imgur](https://i.imgur.com/TtDaDmq.gif)|


## jupyter notebook 架構

- [doc](https://jupyter.readthedocs.io/en/latest/architecture/how_jupyter_ipython_work.html){:target="_back"}

- 這張圖多少可以解釋為什麼，kernels 可更換 :heart:

   ![jupyter-architecture](https://jupyter.readthedocs.io/en/latest/_images/notebook_components.png)