---
layout: 'post'
title: 'Docker Matery: docker containers 2'
permalink: 'docker_matery/docker-containers-2'
tags: udemy-docker
---


## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Images vs. Container

- Images
   - the application we want to run

- Containers
   - an instance of that image running as a process 

## docker container run

- start a new container from an image 

- ex
   - `docker container run --publish 80:80 nginx`

- __Issue__

   - 我照著教學打出現　error 

   ~~~
   E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container run --publish 80:80 nginx
   Unable to find image 'nginx:latest' locally
   latest: Pulling from library/nginx
   docker: no matching manifest for windows/amd64 10.0.18362 in the manifest list entries.
   See 'docker run --help'.
   ~~~

   - 上網查 [https://stackoverflow.com/questions/48066994/docker-no-matching-manifest-for-windows-amd64-in-the-manifest-list-entries](https://stackoverflow.com/questions/48066994/docker-no-matching-manifest-for-windows-amd64-in-the-manifest-list-entries){:target="_back"}

      - 解！

- docker container run --publish 80:80 nginx

   - 下載　nginx image from [Docker Hub](https://hub.docker.com/){:target="_back"}
   - 開啟一個新的 container 去跑剛剛下載的 image  

- docker container run --publish 80:80  --detach nginx
   - 在　background 執行

## docker container ls

- show running containers

   - `docker ps` (old way)

- ex
   
   - ~~~
      E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container ls
      CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
      e4289982b0b5        nginx               "nginx -g 'daemon of…"   10 minutes ago      Up 10 minutes       0.0.0.0:80->80/tcp   gracious_shockley
   ~~~

## docker stop <container id / name>

- ex

   - ~~~
     E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container ls
     CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
     e4289982b0b5        nginx               "nginx -g 'daemon of…"   10 minutes ago      Up 10 minutes       0.0.0.0:80->80/tcp   gracious_shockley
     
     E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker stop e4289982b0b5
   ~~~

- docker rm -f gracious_shockley

  - [https://stackoverflow.com/questions/34228864/stop-and-delete-docker-container-if-its-running](https://stackoverflow.com/questions/34228864/stop-and-delete-docker-container-if-its-running){:target="_back"}


## docker container ls -a 

- listing all containers

~~~
E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container ls -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                PORTS               NAMES
90ed52e63e12        nginx               "nginx -g 'daemon of…"   11 minutes ago      Created                                   adoring_wing
e4289982b0b5        nginx               "nginx -g 'daemon of…"   18 minutes ago      Removal In Progress                       gracious_shockley
~~~

- 自行命名　conainer name

   - docker container run --publish 80:80 --detach --name create-your-name nginx

   ~~~
   E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container run --publish 80:80 --detach --name create-your-name nginx
   4acbef2aa861817308fde86b2e90b413aa1f3223734d9d1ec8a7e6904342d2f5
   
   E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container ls -a
   CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                PORTS                NAMES
   4acbef2aa861        nginx               "nginx -g 'daemon of…"   10 seconds ago      Up 8 seconds          0.0.0.0:80->80/tcp   create-your-name
   90ed52e63e12        nginx               "nginx -g 'daemon of…"   15 minutes ago      Created                                    adoring_wing
   e4289982b0b5        nginx               "nginx -g 'daemon of…"   23 minutes ago      Removal In Progress                        gracious_shockley
   ~~~

## 看　container log

- `docker container logs <conatiner-name>`

~~~
E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container logs create-your-name
192.168.11.8 - - [11/Dec/2019:09:52:55 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" "-"
192.168.11.8 - - [11/Dec/2019:09:52:56 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" "-"
192.168.11.8 - - [11/Dec/2019:09:52:56 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" "-"
192.168.11.8 - - [11/Dec/2019:09:52:56 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" "-"
192.168.11.8 - - [11/Dec/2019:09:52:57 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" "-"
192.168.11.8 - - [11/Dec/2019:09:52:57 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" "-"
~~~


## remove containers

- `docker container rm <container-id> <container-id> <container-id> ...`


- EX:
 
~~~
E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container ls -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                PORTS                NAMES
4acbef2aa861        nginx               "nginx -g 'daemon of…"   5 minutes ago       Up 5 minutes          0.0.0.0:80->80/tcp   create-your-name
90ed52e63e12        nginx               "nginx -g 'daemon of…"   21 minutes ago      Created                                    adoring_wing
e4289982b0b5        nginx               "nginx -g 'daemon of…"   29 minutes ago      Removal In Progress                        gracious_shockley

E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container rm 4ac 90e e42
90e
e42
Error response from daemon: You cannot remove a running container 4acbef2aa861817308fde86b2e90b413aa1f3223734d9d1ec8a7e6904342d2f5. Stop the container before attempting removal or force remove
~~~

- ___這邊看到有一個(running container)沒移除有點像是防呆機制　怕你一次刪光光___

- force remove 
   - `docker container rm -f <container-id>`

   ~~~
   E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container rm -f 4ac
   4ac
   
   E:\Udemy\Docker Mastery\Docker-Mastery-Commands>docker container ls
   CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
   ~~~


## What happens in docker container run

1. 先找 image locally 
2. 找不到 再去 `Docker Hub` 抓 remote image repository
3. 抓最新 version
4. create new container based on that image and prepares to start
5. 給一個 docker engine 虛擬ip
6. opens up port 80 on host and forwars to port 80 in container
7. Starts container by using CMD in the image Dockerfile

- ex:
~~~
                                                      (change version of image)
                                                                |
docker container run --publish 8080:80 --name webhost -d nginx:1.1 nginx -T
                                |                                     |
                       (change host listening port)                 (change CMD run on start)
~~~
