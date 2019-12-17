---
layout: 'post'
title: 'Docker Matery: docker Container cli'
permalink: 'docker_matery/docker-containers-cli'
tags: udemy-docker 
---

## Whatis Going On In Containers


- `docker container top` : process list in one container

- `docker container inspect` : details of one container config

- `docker container stats` : performance stats for all containers


## Getting a Shell Inside Containers: section3-26

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


## Docker container exec 

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


## Alpine Linux

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

## Package Management Basics: apt, yum, dnf, pkg

- [https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg){:target="_back"}