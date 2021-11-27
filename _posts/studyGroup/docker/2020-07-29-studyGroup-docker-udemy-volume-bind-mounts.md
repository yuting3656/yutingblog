---
layout: "single"
title: 'Study Group: 內湖成五 品質保證 docker-讀書會-04 volumes, Bind Mounts '
permalink: 'stydeGroup/docker-04'
tags: 讀書會 docker
---

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Section 5 Overview

- Defining the problem of persistent data
- Data Volumes
- Data Mounts


### Container Lifetime & Persistent Data

- Containers are usually immutable and [ephemeral](https://en.wikipedia.org/wiki/Ephemerality){:target="_back"}
- `Immutable infrastructure`: only re-deploy containers, never change
- This is the ideal scenario, but what about databases, or unique data?
- Docker gives us features to ensure these __separation of concerns__
- This is known as __persistent data__
- Two ways: `Volumes` and `Bind Mounts`
- Volumes: make special location outsides of container UFS (union file system)
- Bind Mounts: link container path to host path





## Container Lifetime & Persistent Data

- [https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections5-container-lifetime-persistent-data](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections5-container-lifetime-persistent-data){:target="_back"}


## [Docker 工作現場 實戰寶典](https://www.tenlong.com.tw/products/9789865020637) pg. 142


![Imgur](https://i.imgur.com/kqtRpmc.jpg)


~~~
docker create volume create datavol

docker volume ls
~~~


- ex:

~~~
docker container run -it --rm -v datavol:/data alpine
~~~

~~~
echo "This is a named volume demo" > /data/demo.txt
~~~

- 離開 alpine

~~~
docker container run --rm -v datavol:/data ubuntu cat /data/demo.txt
~~~


- inspect 

~~~
docker volume inspect datavol
~~~

- 用 tree 看 (linux)

~~~
sudo tree -a /var/lib/docker/volumes/datavol
~~~


- 生活好涼拌

   - `docker volume create -help`
   - `docker volume ls -help`
   - `docker volume inspect -help`

## Persisten Data Bind Mounting

- [https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections5-persistent-data-bind-mounting](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections5-persistent-data-bind-mounting){:target="_back"}


- ex:

~~~
mkdir $HOME/data_share
~~~

~~~
echo "data sharing demo" > $HOME/data_share/demo.txt
~~~

~~~
docker container run --rm -v $(HOME)/data_share:/data ubuntu cat /data/demo.txt
~~~


### udemy-docker-mastery/dockerfile-sample-2

- 練習: 把老師的 github clone 下來 binding `dockerfile-sample-2/index.html` 到 用 nginx 開啟的 container ! 

   - [https://github.com/BretFisher/udemy-docker-mastery](:target="_back")

      - [https://github.com/BretFisher/udemy-docker-mastery/tree/master/dockerfile-sample-2](https://github.com/BretFisher/udemy-docker-mastery/tree/master/dockerfile-sample-2){:target="_back"}


## 作業  Named Volumes and Bind Mounts


- [https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections5-hw-named-volumes-and-bind-mounts](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections5-hw-named-volumes-and-bind-mounts){:target="_back"}