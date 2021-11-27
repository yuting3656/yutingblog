---
layout: "single"
title: 'daily Programming: python Virtual Environments (windows) 驚奇冒險旅程!'
permalink: 'daily-programming/python-venv-window'
tags: daily-programming python python-venv
---

> 故事是這樣的 今年目標 要考 TF 證照
>
> 摳摳 刷下去了 要開始準備環境
>
> 想說 我有我熟悉且愛情的[康達](https://www.anaconda.com/)
>
> 一切好辦事
>
> 哪知道 [官方說明](https://www.tensorflow.org/extras/cert/Setting_Up_TF_Developer_Certificate_Exam.pdf) 說 `Don't use the Anaconda` 
>
> 很粗體唷!!!! LOL ....
>
> 好乖乖來 蹲 當年應該就要熟悉的 [python venv](https://docs.python.org/3/tutorial/venv.html)


# Creating Virtual Environment

~~~python
python3 -m venv tutorial-env
~~~

> This will create the tutorial-env directory if it doesn’t exist, and also create directories inside it containing a copy of the Python interpreter, the standard library, and various supporting files.

> A common directory location for a virtual environment is `.venv. This name keeps the directory typically hidden in your shell and thus out of the way while giving it a name that explains why the directory exists. It also prevents clashing with .env environment variable definition files that some tooling supports.

- 通常都叫 venv 拉!
   - cd 到你 python 開發工作的目錄
   - ex: `python -m venv venv`
       - 會建立 一個venv的資料夾 (如果不存在的話)
       - 內容物 就會是全新感受的 python venv


- [指令講解](https://docs.python.org/3/using/cmdline.html){:="target="_back"}
   - `-m` 代表 `<modul-name>`


## 啟動 venv 的 環境:

   - Windows run:
      - 普通 cmd
         - `tutorial-env\Scripts\activate.bat`
      - [powerShell](https://stackoverflow.com/questions/1365081/virtualenv-in-powershell){:target="_back"}
         - 用管理員身分開啟
         - 執行 `Set-ExecutionPolicy Unrestricted`
         - `tutorial-env\Scripts\activate.ps1`

   - Unix / MacOs run:
      - `source tutorial-env/bin/activate`


# 安裝 tensorflow 最新版

~~~python
"""
(tutotial-env) PS E:\Python\Python_venv_practice\tutotial-env> pip list
Package                Version
---------------------- ---------
absl-py                0.11.0
astunparse             1.6.3
cachetools             4.2.1
certifi                2020.12.5
chardet                4.0.0
flatbuffers            1.12
gast                   0.3.3
google-auth            1.25.0
google-auth-oauthlib   0.4.2
google-pasta           0.2.0
grpcio                 1.32.0
h5py                   2.10.0
idna                   2.10
Keras-Preprocessing    1.1.2
Markdown               3.3.3
numpy                  1.19.5
oauthlib               3.1.0
opt-einsum             3.3.0
pip                    20.2.3
protobuf               3.14.0
pyasn1                 0.4.8
pyasn1-modules         0.2.8
requests               2.25.1
requests-oauthlib      1.3.0
rsa                    4.7
setuptools             49.2.1
six                    1.15.0
tensorboard            2.4.1
tensorboard-plugin-wit 1.8.0
tensorflow             2.4.1
tensorflow-estimator   2.4.0
termcolor              1.1.0
typing-extensions      3.7.4.3
urllib3                1.26.3
Werkzeug               1.0.1
wheel                  0.36.2
wrapt                  1.12.1
"""
~~~

# 基本指令複習

- pip list

   -  will display all of the packages installed in the virtual environment:

- pip freeze

   - will produce a similar list of the installed packages, but the output uses the format that pip install expects. A common convention is to put this list in a requirements.txt file:


# 環境用好了 就用這環來練習 [TF](https://www.tensorflow.org/tutorials)

- [Image classification](https://www.tensorflow.org/tutorials/images/classification)
- [Word embeddings](https://www.tensorflow.org/tutorials/text/word_embeddings)

# 其他

- jupyter lab
    - `pip install jupyterlab`

- 把 venv 的環境 加到 [kernel](https://queirozf.com/entries/jupyter-kernels-how-to-add-change-remove){:target="_back"} 裡面

   - `ipython kernel install --name "local-venv" --user`