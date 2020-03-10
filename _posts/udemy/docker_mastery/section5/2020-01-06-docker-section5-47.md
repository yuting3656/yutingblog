---
layout: 'post'
title: 'Docker Mastery: Section 5 - Persisten Data Bind Mounting'
permalink: 'docker_mastery/docker-sections5-persistent-data-bind-mounting'
tags: udemy-docker docker-volume docker-mounts
---

- section5-47

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Persisten Data: Bind Mounting

- Maps a host file or directory to a container file or directory
- Basically just tow locations pointing to the same files(s)
- Again, skips UFS, and host files overwrite any in container
- Can't use in Dockerfile, must be at `container run`

- `... run -v /Users/bret/stuff:/path/container` (max/linux)
- `... run -v //c/Users/bret/stuff:/path/container` (windows)


## Binde to local machine ...

> 照著打... 不知道為甚麼 都是 403 Forbidden ....

> 有爬文，好像跟 index.html 的權限設定有關西 LOL

- 有成功的話，這nginx container 會抓我 local 端資料夾下面的 index.html 吐回給 user 呈現

   - 但我怎麼 try 都GG~~~ 

~~~
 docker container run -d --name nginx -p 80:80 -v //e/Udemy/"Docker Mastery"/udemy-docker-mastery/dockerfile-sample-2:/usr/share/nginx/html nginx
~~~


## 上面問題突破!!!

- 雷1: 之所以會 Forbidden 是本G ~ 沒 share drive 到 小鯨魚!

   - ![Imgur](https://i.imgur.com/bJcrfka.jpg)


- 雷2: share 要分享的 drive 必須要登入有一組登入的user!

   - [https://forums.docker.com/t/how-to-share-windows-drives-with-a-user-without-password/22933/4](https://forums.docker.com/t/how-to-share-windows-drives-with-a-user-without-password/22933/4){:target="_back"}


   - 重開機後 一切完美 :)

## 仔細再看一下

- Run Container

~~~
PS E:\> docker container run -d --name nginx -p 80:80 -v e:/Udemy/"Docker Mastery"/udemy-docker-mastery/dockerfile-sample-2:/usr/share/nginx/html nginx
27f465885d3087962d0779d5638761debb3e50532a6f634a007352bbfbfea7e4
~~~

- 看 Container 裡面的　路徑

~~~
PS E:\> docker container exec -it nginx bash
root@27f465885d30:/# cd /usr/share/nginx/html
root@27f465885d30:/usr/share/nginx/html# ls
Dockerfile  index.html
root@27f465885d30:/usr/share/nginx/html# cat index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Your 2nd Dockerfile worked!</title>

</head>

<body>
  <h1>You just successfully ran a container with a custom file copied into the image at build time!</h1>
</body>
</html>
root@27f465885d30:/usr/share/nginx/html# exit
exit
PS E:\> docker container run -d -p 8080:80 --name nginx2 nginx
eea27fbc7a7b6c132cfb4d3aab14b97cb0c2216a39cf7471ad4c8bf9742cf6e5
~~~

> 開心　:heart: 又一次的學習～　