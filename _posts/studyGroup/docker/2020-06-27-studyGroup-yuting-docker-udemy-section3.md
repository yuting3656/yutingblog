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


## [Section 3 : 20](https://yuting3656.github.io/yutingblog//docker_mastery/docker-containers-2){:target="-back"}


## [Section 3 : 23  作業: Manage Multiple Containers](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections3-hw1-manage-multiple-containers){:target="_back"}

- docs.docker.com and `--help` are your friend 
- Run a `nginx`, a  `mysql`, and a `httpd` (apache) server
- Run all of them `--detach` (or `-d`), name them with `--name`
- nginx should listen on `80:80`, httpd on `8080:80`, mysql on `3306:3306`
- When running `mysql`, use the `--env` option (or `-e`) to pas in `MYSQL_RANDOM_ROOT_PASSWORD=yes`
- Use `docker container logs` on mysql to find the random password it created on startup
- Clean it all up with `docker container sotp` and `docker container rm` 
- Use `docker container ls` to ensure everything is correccrt before and after cleanup

## ( Section 3 : 24解答)

## [section 3: 25, 26](https://yuting3656.github.io/yutingblog//docker_mastery/docker-containers-cli){:target="_back"}

- Whatis Going On In Containers

   - `docker container top` : process list in one container
   
   - `docker container inspect` : details of one container config
   
   - `docker container stats` : performance stats for all containers


- Getting a Shell Inside Containers: section3-26

   - `docker container  run -it` : start new container interactively 
   
      - ` -t, --tty Allocate a pseudo-TTY`
      - `-i, --interactive Keep STDIN open even if not attached`
   
   - `docker container exec -it` : run addtional command in existing container
   

- EX: `docker container run -it`

     - usage: docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]
     - bash shell
        - if run with `-it`, it will give you a terminal inside the running container 
   
   ~~~
   PS E:\> docker container run -it --name proxy nginx bash
   root@b9ba9ed265c2:/#
   root@b9ba9ed265c2:/# ls
   bin   dev  home  lib64       media  opt   root  sbin  sys  usr
   boot  etc  lib   lost+found  mnt    proc  run   srv   tmp  var
   root@b9ba9ed265c2:/# ls -a
   .   bin   dev  home  lib64       media  opt   root  sbin  sys  usr
   ..  boot  etc  lib   lost+found  mnt    proc  run   srv   tmp  var
   root@b9ba9ed265c2:/# ls -al
   total 72
   drwxr-xr-x  1 root root 4096 Dec 17 03:30 .
   drwxr-xr-x  1 root root 4096 Dec 17 03:30 ..
   drwxr-xr-x  2 root root 4096 Nov 18 00:00 bin
   drwxr-xr-x  2 root root 4096 Nov 10 12:17 boot
   drwxr-xr-x  5 root root  360 Dec 17 03:30 dev
   drwxr-xr-x  1 root root   60 Dec 17 03:30 etc
   drwxr-xr-x  2 root root 4096 Nov 10 12:17 home
   drwxr-xr-x  1 root root 4096 Nov 23 01:12 lib
   drwxr-xr-x  2 root root 4096 Nov 18 00:00 lib64
   drwx------  1 root root 4096 Jan  1  1970 lost+found
   drwxr-xr-x  2 root root 4096 Nov 18 00:00 media
   drwxr-xr-x  2 root root 4096 Nov 18 00:00 mnt
   drwxr-xr-x  2 root root 4096 Nov 18 00:00 opt
   dr-xr-xr-x 83 root root    0 Dec 17 03:30 proc
   drwx------  2 root root 4096 Nov 18 00:00 root
   drwxr-xr-x  3 root root 4096 Nov 18 00:00 run
   drwxr-xr-x  2 root root 4096 Nov 18 00:00 sbin
   drwxr-xr-x  2 root root 4096 Nov 18 00:00 srv
   dr-xr-xr-x 13 root root    0 Dec 17 03:30 sys
   drwxrwxrwt  1 root root 4096 Nov 23 01:12 tmp
   drwxr-xr-x  1 root root 4096 Nov 18 00:00 usr
   drwxr-xr-x  1 root root 4096 Nov 18 00:00 var
   root@b9ba9ed265c2:/# exit
   exit
   PS E:\> docker container ls
   CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                 NAMES
   99556f037386        mysql               "docker-entrypoint.s…"   20 minutes ago      Up 20 minutes       3306/tcp, 33060/tcp   yuting_mysql
   3c27ce765712        nginx               "nginx -g 'daemon of…"   21 minutes ago      Up 21 minutes       80/tcp                yuting_nginx
   PS E:\> docker container ls -al
   CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
   b9ba9ed265c2        nginx               "bash"              5 minutes ago       Exited (0) 17 seconds ago                       proxy
   PS E:\> docker container ls -a
   CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                 NAMES
   b9ba9ed265c2        nginx               "bash"                   5 minutes ago       Exited (0) 21 seconds ago                         proxy
   99556f037386        mysql               "docker-entrypoint.s…"   21 minutes ago      Up 21 minutes               3306/tcp, 33060/tcp   yuting_mysql
   3c27ce765712        nginx               "nginx -g 'daemon of…"   22 minutes ago      Up 22 minutes               80/tcp                yuting_nginx
   P
   ~~~


- EX: `docker container run -it --name ubuntu ubuntu`

   - `ubuntu` run defalut 就是 bash
   - `root@91260785437d:/# apt-get update`
   - `root@91260785437d:/# apt-get install -y curl`
   - `curl google.com`
   
   ~~~
   PS E:\> docker container run -it --name ubuntu ubuntu
   Unable to find image 'ubuntu:latest' locally
   latest: Pulling from library/ubuntu
   7ddbc47eeb70: Pull complete 
   c1bbdc448b72: Pull complete 
   8c3b70e39044: Pull complete
   45d437916d57: Pull complete
   Digest: sha256:6e9f67fa63b0323e9a1e587fd71c561ba48a034504fb804fd26fd8800039835d
   Status: Downloaded newer image for ubuntu:latest
   root@91260785437d:/# apt-get update
   ....
   Get:17 http://archive.ubuntu.com/ubuntu bionic-backports/main amd64 Packages [2496 B]
   Get:18 http://archive.ubuntu.com/ubuntu bionic-backports/universe amd64 Packages [4244 B]
   Fetched 17.4 MB in 28s (620 kB/s)
   Reading package lists... Done
   
   root@91260785437d:/# apt-get install -y curl
   Reading package lists... Done
   Building dependency tree
   ...
   
   root@91260785437d:/# curl google.com
   <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
   <TITLE>301 Moved</TITLE></HEAD><BODY>
   <H1>301 Moved</H1>
   The document has moved
   <A HREF="http://www.google.com/">here</A>.
   </BODY></HTML>
   ~~~

- 重新連上之前建好的 container 

   - `docker container start -ai `

   - ~~~
      PS E:\> docker container start --help
   
      Usage:  docker container start [OPTIONS] CONTAINER [CONTAINER...]
      
      Start one or more stopped containers
      
      Options:
        -a, --attach               Attach STDOUT/STDERR and forward signals
            --detach-keys string   Override the key sequence for detaching a
                                   container
        -i, --interactive          Attach container's STDIN
   ~~~

    ~~~
    PS E:\> docker container ls -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                 NAMES
    91260785437d        ubuntu              "/bin/bash"              13 minutes ago      Exited (0) 3 minutes ago                          ubuntu
    b9ba9ed265c2        nginx               "bash"                   22 minutes ago      Exited (0) 17 minutes ago                         proxy
    99556f037386        mysql               "docker-entrypoint.s…"   37 minutes ago      Up 37 minutes               3306/tcp, 33060/tcp   yuting_mysql
    3c27ce765712        nginx               "nginx -g 'daemon of…"   38 minutes ago      Up 38 minutes               80/tcp                yuting_nginx
    PS E:\> docker container start -ai ubuntu
    root@91260785437d:/# curl google.com
    <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
    <TITLE>301 Moved</TITLE></HEAD><BODY>
    <H1>301 Moved</H1>
    The document has moved
    <A HREF="http://www.google.com/">here</A>.
    </BODY></HTML>
    root@91260785437d:/#
    ~~~
   

-  Docker container exec 

   - Run additional process in running container
   
   - `docker container exec -it yuting_mysql bash`
   
   ~~~
   PS E:\> docker container exec -it yuting_mysql bash
   root@99556f037386:/# ps aux
   bash: ps: command not found
   root@99556f037386:/# exit
   exit
   PS E:\> docker container ls
   CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                 NAMES
   99556f037386        mysql               "docker-entrypoint.s…"   44 minutes ago      Up 44 minutes       3306/tcp, 33060/tcp   yuting_mysql
   3c27ce765712        nginx               "nginx -g 'daemon of…"   45 minutes ago      Up 45 minutes       80/tcp                yuting_nginx
   ~~~


- Alpine Linux

   - A small security-focused distrubution
   
   - `docker pull alpine`
   
   - alpie : 沒有 defalut bash
   
      - 用 `sh`
   
      - `PS E:\> docker container run -it alpine sh`
   
   ~~~
   PS E:\> docker pull alpine
   Using default tag: latest
   latest: Pulling from library/alpine
   89d9c30c1d48: Pull complete                                                                             
   Digest: sha256:c19173c5ada610a5989151111163d28a67368362762534d8a8121ce95cf2bd5a
   Status: Downloaded newer image for alpine:latest
   docker.io/library/alpine:latest
   PS E:\> docker image ls
   REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
   httpd               latest              2ae34abc2ed0        2 weeks ago         184MB
   mysql               latest              d435eee2caa5        3 weeks ago         475MB
   nginx               latest              231d40e811cd        3 weeks ago         140MB
   ubuntu              latest              775349758637        6 weeks ago         73.9MB
   alpine              latest              965ea09ff2eb        8 weeks ago         6.3MB
   PS E:\> docker container run -it alpine sh
   / # exit
   PS E:\>
   ~~~

- Package Management Basics: apt, yum, dnf, pkg

   - [https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg){:target="_back"}



## [Section 3 : 27, 28, 29](https://yuting3656.github.io/yutingblog//docker_mastery/docker-networks){:target="-back"} 

- Docker Networks

## [Section 3 : 30](https://yuting3656.github.io/yutingblog/docker_mastery/docker-networks-dns){:target="-back"} 

- Docker Networks (DNS)
> 有畢卡葛~~~~

## [Section 3 : 31, 32  作業: CLI App Testing](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections3-hw2-using-containers-for-cli-testing){:target="_back"}

## [Section 3 : 33, 34  作業: DNS Round Robin Test](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections3-hw2-2-round-robin-DNS){:target="_back"}



## 好康相報

- Windows 轉成 linux container (我很常會這樣) 開 docker 的時候都會出現

   - ![Imgur](https://i.imgur.com/6VtRVMc.jpg)


   - [ANS:](https://stackoverflow.com/questions/43170089/docker-wont-start-on-windows-not-enough-memory-to-start-docker){:target="_back"} 

      - 下載 [RAMMap](https://docs.microsoft.com/en-us/sysinternals/downloads/rammap){:target="_back"}

      - ![Imgur](https://i.imgur.com/kamedeY.jpg)


- 自己快樂練習

~~~dockerfile
FROM alpine:3.6
LABEL writer="yuting"
RUN apk add --no-cache apache2 && \
    mkdir -p /run/apache2 && \
    echo "<html><h1>Yuting Have a Dream! YA~~~~</h1></html>" > \
    /var/www/localhost/htdocs/index.html
EXPOSE 80
ENTRYPOINT ["/usr/sbin/httpd", "-D", "FOREGROUND"]
~~~

- apache2

   - [Confused about DFOREGROUND with Apache](https://serverfault.com/questions/614348/confused-about-dforeground-with-apache){:target="_back"}


- 好書推薦~

   - [Docker 工作現場實戰寶典 (Docker Cookbook, 2/e)](https://www.tenlong.com.tw/products/9789865020637){:target="_back"}
   - [Docker 專業養成 ─ 活用基礎與實踐技能 (暢銷回饋版)](https://www.tenlong.com.tw/products/9789864344437){:target="_back"}