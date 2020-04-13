---
layout: 'post'
title: 'daily Programming: python docker-python evn jupyter-notebook and pandas XD'
permalink: 'daily-programming/python-docker-python-env-jupyter-notebook-pandas'
tags: daily-programming python pandas
---

> 要用熊貓了是不是！？
>
> 阿Ｂ一句話 讓我想到了 之前的 [daily-pg](https://yuting3656.github.io/yutingblog//daily-programming/custom-tensorlfow-dokcer-image){:target="_back"}
>
> 把 DockerHub 的 tendsorflow  加工灌了熊貓和sklearn XDDD
>


##  [DockerHub: tensorflow/tendorflow](https://hub.docker.com/r/tensorflow/tensorflow){:target="_back"}

> 和一月看到的時候差好多 ＬＯＬ....     大改版！？ 變成超級簡化 ＸＤＤ
>
> 詳細的 Tag 解釋 也就直接丟 [GitHub](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/tools/dockerfiles){:target="_back"}
>
> 感覺近期應該有很多變動～
> 

- Jupyter-Notebook

   - `$ docker run -it --rm -v $(realpath ~/notebooks):/tf/notebooks -p 8888:8888 tensorflow/tensorflow:latest-jupyter`

## [DockerHub: python 官方得唷！](https://hub.docker.com/_/python){:target="_back"}

- python3 dockerfile 範例：


~~~dockerfile
FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./your-daemon-or-script.py" ]
~~~

> 等等有時間改成 jupyter-notebook 可編輯資料處理的版本～嘿嘿黑～～～

> 官方的就是不一樣～～～寫的很詳細捏～～ :heart:


## 其實是想要複習 pandas 語法 ＸＤＤＤＸＤＤＤ

- [http://pandas.pydata.org/Pandas_Cheat_Sheet.pdf](http://pandas.pydata.org/Pandas_Cheat_Sheet.pdf){:target="_back"}
- [reference](https://pandas.pydata.org/){:target="_back"}

|![Imgur](https://i.imgur.com/mkkE3BG.jpg)|
|![Imgur](https://i.imgur.com/KzqjSPa.jpg)|
|![Imgur](https://i.imgur.com/hYQnxWm.jpg)|
|![Imgur](https://i.imgur.com/zuknpB8.jpg)|
|![Imgur](https://i.imgur.com/Z5fPK95.jpg)|
|![Imgur](https://i.imgur.com/e30Zqn5.jpg)|
|![Imgur](https://i.imgur.com/Opht7Gh.jpg)|
|![Imgur](https://i.imgur.com/O63c6IY.jpg)|