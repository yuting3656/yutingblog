---
layout: 'post'
title: 'daily Programming: 從 tendorflow 官網 小改一個 tensorflow image 變成自己的兒~ XDD'
permalink: 'daily-programming/custom-tensorlfow-dokcer-image'
tags: daily-programming docker python tensorflow
---

> 一個風和日麗即將過年的星期一早晨　:sunny::sunny::sunny:

> 想到上禮拜的快樂 AI 分享，如果要快速建置一個 `ml`‵ 環境，用 docker 是很完美的解決方案。

# 耶～

[tensorflow 官網](https://www.tensorflow.org/install/docker){:target="_back"}，有很多詳細介紹使用。

我用 jupyter notebbok 的版本。

`docker run -it -p 8888:8888 tensorflow/tensorflow:nightly-py3-jupyter`


## 大致上是這樣

- 抓官方的 [`image`](https://hub.docker.com/r/tensorflow/tensorflow){:target="_back"}
   - run `image`
      - `docker container run --name yuting-tf -p 8888:8888 tensorflow/tensorflow:nightly-py3-jupyter`
   - exec 進 `container`
      - `docker container exec -it yuting-tf bash`
   - 安裝 pandas, seaborn, sklearn (官方沒有)
      - `pip install pandas seaborn skleran`
   - 讓此狀態 __(官方tensorflow image + pip install pandas, seaborn, skleran)__ 下的 container 變成一image
      - docker commit
         - `docker commit <container-id/name>`
- build 新的 tag
   - 查看剛剛　`docker commit` 
      - `docker image ls` 會看到一個剛新建只有 `IMAGE ID` 的
           - 
           ~~~
            PS E:\> docker image ls
            REPOSITORY                 TAG                   IMAGE ID            CREATED             SIZE
            <none>                     <none>                9d651abad0b1        6 seconds ago       2.97GB
            ... 
           ~~~
   - `docker image tag <source-id/name> <target-image-name>`
      - 把剛剛 commit image id 當成 source 來源 新build 一個 image 
         - `docker iamge tag 9d651abad0b1 yuting-tensorflow`

   - 看現在 image list 情況
      - 
      ~~~
         PS E:\> docker image ls
         REPOSITORY                 TAG                   IMAGE ID            CREATED             SIZE
         yuting-tensorflow          latest                9d651abad0b1        2 minutes ago       2.97GB
      ~~~

- 上傳至 `Docker Hub`

   - 把剛剛已經 build 好的 image 照 __Docker Hub__ 規則 `<usr>/<repo>:<tag>` 新 build 一個 image
      - `docker image tag yuting-tensorflow tim23656/tensorflow:yuting-v1`
      
      - 可以清楚看到 IMAGE ID 是一模一樣的唷～
         - 
         ~~~
      PS E:\> docker image tag yuting-tensorflow tim23656/tensorflow:yuting-v1
      PS E:\> docker image ls
      REPOSITORY                 TAG                   IMAGE ID            CREATED             SIZE
      yuting-tensorflow          latest                9d651abad0b1        4 minutes ago       2.97GB
      tim23656/tensorflow        yuting-v1             9d651abad0b1        4 minutes ago       2.97GB
         ~~~
   - push 上 Docker Hub 

      - 

      ~~~
       PS E:\> docker image push tim23656/tensorflow:yuting-v1
       The push refers to repository [docker.io/tim23656/tensorflow]
       39cf1631e553: Pushed                                                                                                    
       96ae1e489cb8: Mounted from tensorflow/tensorflow                                                                        
       dd29d83dc0e3: Mounted from tensorflow/tensorflow                                                                        
       33fa6610ad9f: Mounted from tensorflow/tensorflow                                                                        
       aee8200659e9: Mounted from tensorflow/tensorflow                                                                        
       30e6f3b975fd: Mounted from tensorflow/tensorflow                                                                        
       fdd7eaf8fa52: Mounted from tensorflow/tensorflow                                                                        
       a3390fe65a10: Mounted from tensorflow/tensorflow                                                                        
       cbb1460d1298: Mounted from tensorflow/tensorflow                                                                        
       9fd8ecc50338: Mounted from tensorflow/tensorflow                                                                        
       f6f58c106474: Mounted from tensorflow/tensorflow                                                                        
       8c797d8ac223: Mounted from tensorflow/tensorflow                                                                        
       334ca2803159: Mounted from tensorflow/tensorflow                                                                        
       e443f5e673a6: Mounted from tensorflow/tensorflow                                                                        
       b97be3bb8a66: Mounted from tensorflow/tensorflow                                                                        
       f7753afc08bb: Mounted from tensorflow/tensorflow                                                                        
       2141677d99ae: Mounted from tensorflow/tensorflow                                                                        
       204d46de2d69: Mounted from tensorflow/tensorflow                                                                        
       5e10c362b98c: Mounted from tensorflow/tensorflow                                                                        
       1f21658a9230: Mounted from tensorflow/tensorflow                                                                        
       d89d90ba791e: Mounted from tensorflow/tensorflow                                                                        
       caf9b8f602b4: Mounted from tensorflow/tensorflow                                                                        
       f851662e7833: Mounted from tensorflow/tensorflow                                                                        
       918efb8f161b: Mounted from tensorflow/tensorflow                                                                        
       27dd43ea46a8: Mounted from tensorflow/tensorflow                                                                        
       9f3bfcc4a1a8: Mounted from tensorflow/tensorflow                                                                        
       2dc9f76fb25b: Mounted from tensorflow/tensorflow                                                                        
       yuting-v1: digest: sha256:87c2d98f22efc603ef5db2b65c7eb29bde27b9d1a55dfe40d721fea565134e49 size: 5964
      ~~~

- 我的 Docker Hub

   - [https://hub.docker.com/r/tim23656/tensorflow](https://hub.docker.com/r/tim23656/tensorflow){:target="_back"}




## 其他

- 如果想要讓 container ml 的環境 __(PYTHON: jupyter notebbok)__ 吃到本機的資料夾？

   - `docker container run -v $PWD:/tf -w /tf -p 8888:8888 tim23656/tensorflow:yuting-v1`
     - `-v:` volume bind mounting
     - `-w:`   -w, --workdir string Working directory inside the container


