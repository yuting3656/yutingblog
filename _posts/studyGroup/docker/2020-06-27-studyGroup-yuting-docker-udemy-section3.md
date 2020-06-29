---
layout: 'post'
title: 'Study Group: 內湖成五 品質保證 docker-讀書會-01'
permalink: 'stydeGroup/docker-01'
tags: 讀書會 docker
---


## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Section 3: 18

- command
   
   - `docker version`
      - verified cli can tlak to engine

   - `docker info` 
      - show most configuration values for the engine
   
   - `docker`
   
      - Management Commands:
         - 太多 commands 了 lol... 所以用更多 commands 來管控其他 commands XDDDD
      - Commands

   - __docker command line structure__

      - old (still works): `docker <command> (options)`
      - new: `docker <command> <sub-command> (opitons)`
      - ex:
         ~~~
            docker run
            docker contianer run
         ~~~



## Section 3: 19

- 用 nginx 當範例

   - `docker container run --publish 80:80 nginx`

      - `1. Downloaded image 'nginx' from Docker Hub`
      - `2. Started a new container from that image`
      - `3. Opened port 80 on the host IP`
      - `4. Routes that traffic to the container IP, port 80`

   - detach:  
      - run container in background
      - ex: `docker container run -d -publish 80:80 nginx`
   - docker container ls:
      - list running containers
      - ex: `docker container ls`
         - old way: `docker ps`
      - list all containers
      - ex: `docker contianer ls -a`
   - docker container stop
      - stops the container process but doesn't remove it
      - ex: `docker continaer sotp <container-id/container-name>`
   
   - run vs. start 

      - ___`docker container run` always starts a *new* container__
      - use `docker container start` to start an existing stopped one

   - docker contaienr name:
      - ex: `docker container run --publish 80:80 --detach --name webhost nginx`
      
   - docker container logs:
      - show logs for a specific container 
      - ex: `docker container logs <container-id/container-name>`
         - old way: `docker logs`

   - docker container rm:
      - remove(delete) one or more containers
         - ex: `docker container rm <container-id/contianer-name>`
            - old way: `docker rm`

      - 一次刪光光
         - `docker container rm -f $(docker container ls -a -q)`

- 自己教自己!!!

   - help!!!!!

   - ex: `docker contianer`

      -  
      ~~~
         PS C:\Users\tim23> docker container
         Usage:  docker container COMMAND
         Manage containers
         Commands:
           attach      Attach local standard input, output, and error streams to a running container
           commit      Create a new image from a container's changes
           cp          Copy files/folders between a container and the local filesystem
           create      Create a new container
           diff        Inspect changes to files or directories on a container's filesystem
           exec        Run a command in a running container
           export      Export a container's filesystem as a tar archive
           inspect     Display detailed information on one or more containers
           kill        Kill one or more running containers
           logs        Fetch the logs of a container
           ls          List containers
           pause       Pause all processes within one or more containers
           port        List port mappings or a specific mapping for the container
           prune       Remove all stopped containers
           rename      Rename a container
           restart     Restart one or more containers
           rm          Remove one or more containers
           run         Run a command in a new container
           start       Start one or more stopped containers
           stats       Display a live stream of container(s) resource usage statistics
           stop        Stop one or more running containers
           top         Display the running processes of a container
           unpause     Unpause all processes within one or more containers
           update      Update configuration of one or more containers
           wait        Block until one or more containers stop, then print their exit codes
      ~~~

      - ex: `docker container top --help`

         ~~~
         PS C:\Users\tim23> docker container top help
         Error response from daemon: No such container: help
         PS C:\Users\tim23> docker container top --help
         
         Usage:  docker container top CONTAINER [ps OPTIONS]
         
         Display the running processes of a container
         PS C:\Users\tim23> docker container top webhost
         PID                 USER                TIME                COMMAND
         4452                root                0:00                nginx: master process nginx -g daemon off;
         4484                101                 0:00                nginx: worker process
         ~~~


## Section 3 : 20

   - [https://yuting3656.github.io/yutingblog//docker_mastery/docker-containers-2](https://yuting3656.github.io/yutingblog//docker_mastery/docker-containers-2){:target="-back"}


## Section 3 : 23  作業!!

   - [https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections3-hw1-manage-multiple-containers](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections3-hw1-manage-multiple-containers){:target="_back"}

## 好康相報

- Windows 轉成 linux container (我很常會這樣) 開 docker 的時候都會出現

   - ![Imgur](https://i.imgur.com/6VtRVMc.jpg)


   - [ANS:](https://stackoverflow.com/questions/43170089/docker-wont-start-on-windows-not-enough-memory-to-start-docker){:target="_back"} 

      - 下載 [RAMMap](https://docs.microsoft.com/en-us/sysinternals/downloads/rammap){:target="_back"}

      - ![Imgur](https://i.imgur.com/kamedeY.jpg)
