---
layout: 'post'
title: 'Docker Matery: Section 4 - Building Image'
permalink: 'docker_matery/docker-sections4-building-image'
tags: udemy-docker docker-image
---

- section3-39, 40, 41

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Dockerfile

- `docker build -f some-dockerfile`

- [Docker Doc](https://docs.docker.com/engine/reference/builder/){:target="_back"}

- Dockerfile

   - `FROM`
      - all images must have a __FROM__
      - usually from a  minimum Linux distribution like debian 

      - package manager
         - PM's like apt and yum are one of the reasons to build containers FROM Debian, Ubuntu, Fedora or CentOS

   - `ENV`
      - One reason they were chosen as preferred way to inject kye/value is they work everywhere, on every OS and config

   - `RUN`
      - && 代表為了讓所有的 cmd 成為一個 layer
      - optional commands to run at shell inside container at build time

   - `EXPOSE`
      - expose these ports on the docker virtual network
      - you still need to use -p or -P to open/forward these ports on host

   - `CMD`
      - required: run this command when container is launched
      - only one CMD allowed, so if there are multiple, last one wins


~~~dockerfile
# NOTE: this example is taken from the default Dockerfile for the official nginx Docker Hub Repo
# https://hub.docker.com/_/nginx/
# NOTE: This file is slightly different than the video, because nginx versions have been updated 
#       to match the latest standards from docker hub... but it's doing the same thing as the video
#       describes
FROM debian:stretch-slim
# all images must have a FROM
# usually from a minimal Linux distribution like debian or (even better) alpine
# if you truly want to start with an empty container, use FROM scratch

ENV NGINX_VERSION 1.13.6-1~stretch
ENV NJS_VERSION   1.13.6.0.1.14-1~stretch
# optional environment variable that's used in later lines and set as envvar when container is running

RUN apt-get update \
	&& apt-get install --no-install-recommends --no-install-suggests -y gnupg1 \
	&& \
	NGINX_GPGKEY=573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62; \
	found=''; \
	for server in \
		ha.pool.sks-keyservers.net \
		hkp://keyserver.ubuntu.com:80 \
		hkp://p80.pool.sks-keyservers.net:80 \
		pgp.mit.edu \
	; do \
		echo "Fetching GPG key $NGINX_GPGKEY from $server"; \
		apt-key adv --keyserver "$server" --keyserver-options timeout=10 --recv-keys "$NGINX_GPGKEY" && found=yes && break; \
	done; \
	test -z "$found" && echo >&2 "error: failed to fetch GPG key $NGINX_GPGKEY" && exit 1; \
	apt-get remove --purge -y gnupg1 && apt-get -y --purge autoremove && rm -rf /var/lib/apt/lists/* \
	&& echo "deb http://nginx.org/packages/mainline/debian/ stretch nginx" >> /etc/apt/sources.list \
	&& apt-get update \
	&& apt-get install --no-install-recommends --no-install-suggests -y \
						nginx=${NGINX_VERSION} \
						nginx-module-xslt=${NGINX_VERSION} \
						nginx-module-geoip=${NGINX_VERSION} \
						nginx-module-image-filter=${NGINX_VERSION} \
						nginx-module-njs=${NJS_VERSION} \
						gettext-base \
	&& rm -rf /var/lib/apt/lists/*
# optional commands to run at shell inside container at build time
# this one adds package repo for nginx from nginx.org and installs it

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log
# forward request and error logs to docker log collector

EXPOSE 80 443
# expose these ports on the docker virtual network
# you still need to use -p or -P to open/forward these ports on host

CMD ["nginx", "-g", "daemon off;"]
# required: run this command when container is launched
# only one CMD allowed, so if there are multiple, last one wins

~~~


## Running Docker Builds

- cd 到 dockerfile 資料夾

- `docker image build -t customnginx .`

  - 瘋狂建造!!!


- 看自建(build) image

   - docker image ls

   - ~~~
      PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-sample-1> docker image ls
      REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
      customnginx            latest              a690e991b96c        6 minutes ago       108MB
      alpine                 latest              c85b8f829d1f        7 days ago          5.59MB
      ubuntu                 14.04               6e4f1fe62ff1        8 days ago          197MB
      nginx                  1.17.6              231d40e811cd        4 weeks ago         126MB
      nginx                  latest              231d40e811cd        4 weeks ago         126MB
      nginx                  mainline            231d40e811cd        4 weeks ago         126MB
      tim23656/nginx         latest              231d40e811cd        4 weeks ago         126MB
      tim23656/nginx         testing             231d40e811cd        4 weeks ago         126MB
      yuting/nginx           latest              231d40e811cd        4 weeks ago         126MB
      debian                 stretch-slim        2b343cb3b772        4 weeks ago         55.3MB
      nginx                  alpine              a624d888d69f        5 weeks ago         21.5MB
      centos                 7                   5e35e350aded        6 weeks ago         203MB
      centos                 latest              0f3e07c0138f        2 months ago        220MB
      tim23656/cheers2019    latest              21660382562c        3 months ago        4.01MB
      <none>                 <none>              cbaa020e0b1c        3 months ago        356MB
      golang                 1.11-alpine         e116d2efa2ab        4 months ago        312MB
      vulnerables/web-dvwa   latest              ab0d83586b6e        14 months ago       712MB
      elasticsearch          2                   5e9d896dc62c        15 months ago       479MB
   ~~~


- 修改 dockerfile 的 `EXPOSE` 加上 8080

   - 觀看建構時間有多快
   - 超快!!!! 因為幾乎都用到 cache
   - 重點就是 再建構自己的 image 時候，__會經常變動的不要放在dockrfile最開始__，會很花時間 build~
   
   - 

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-sample-1> docker image build -t customnginx .
   Sending build context to Docker daemon  4.096kB
   Step 1/7 : FROM debian:stretch-slim
    ---> 2b343cb3b772
   Step 2/7 : ENV NGINX_VERSION 1.13.6-1~stretch
    ---> Using cache
    ---> 3960cbaad30c
   Step 3/7 : ENV NJS_VERSION   1.13.6.0.1.14-1~stretch
    ---> Using cache
    ---> e12d24efcfde
   Step 4/7 : RUN apt-get update   && apt-get install --no-install-recommends --no-install-suggests -y gnupg1      &&      NGINX_GPGKEY=573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62;     found='';       for server in
   ha.pool.sks-keyservers.net              hkp://keyserver.ubuntu.com:80           hkp://p80.pool.sks-keyservers.net:80            pgp.mit.edu     ; do            echo "Fetching GPG    key $NGINX_GPGKEY from $server";             apt-key adv --keyserver "$server" --keyserver-options timeout=10 --recv-keys "$NGINX_GPGKEY" && found=yes && break;     done;   test -z    "$found" && echo >&2 "error: failed to fetch GPG key $NGINX_GPGKEY" && exit 1;  apt-get remove --purge -y gnupg1 && apt-get -y --purge autoremove && rm -rf /var/lib/apt/lists/*           && echo "deb http://nginx.org/packages/mainline/debian/ stretch nginx" >> /etc/apt/sources.list         && apt-get update       && apt-get install --no-install-recommends    --no-install-suggests -y                                             nginx=${NGINX_VERSION}
           nginx-module-xslt=${NGINX_VERSION}                                              nginx-module-geoip=${NGINX_VERSION}                                                nginx-module-image-filter=${NGINX_VERSION}                                              nginx-module-njs=${NJS_VERSION}
                   gettext-base    && rm -rf /var/lib/apt/lists/*
    ---> Using cache
    ---> 03e093200a27
   Step 5/7 : RUN ln -sf /dev/stdout /var/log/nginx/access.log     && ln -sf /dev/stderr /var/log/nginx/error.log
    ---> Using cache
    ---> dcff7c9d9946
   Step 6/7 : EXPOSE 80 443 8080
    ---> Running in 167ad0029c6d
   Removing intermediate container 167ad0029c6d
    ---> 19b20f779507
   Step 7/7 : CMD ["nginx", "-g", "daemon off;"]
    ---> Running in c955c39442cc
   Removing intermediate container c955c39442cc
    ---> b7b835141e3a
   Successfully built b7b835141e3a
   Successfully tagged customnginx:latest
   SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x'    permissions. It is recommended to double check and reset permissions for sensitive files and directories.
   ~~~

## Extending Official Image


- 另一個 Dockerfile
   - 把客製化的 html 在building 的時候 copy 進到 nginx 裡面

~~~dockerfile
# this same shows how we can extend/change an existing official image from Docker Hub

FROM nginx:latest
# highly recommend you always pin versions for anything beyond dev/learn

WORKDIR /usr/share/nginx/html
# change working directory to root of nginx webhost
# using WORKDIR is preferred to using 'RUN cd /some/path'

COPY index.html index.html

# I don't have to specify EXPOSE or CMD because they're in my FROM
~~~


- build 

   - `docker image build -t "<repo-name-you-want>"`

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-sample-2> docker image build -t nginx-with-html .
Sending build context to Docker daemon  3.072kB
Step 1/3 : FROM nginx:latest
 ---> 231d40e811cd
Step 2/3 : WORKDIR /usr/share/nginx/html
 ---> Running in f0e406bc8073
Removing intermediate container f0e406bc8073
 ---> 13d63709b674
Step 3/3 : COPY index.html index.html
 ---> 5af5a710d6ac
Successfully built 5af5a710d6ac
Successfully tagged nginx-with-html:latest
SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
P
~~~

- 把在 local 端用 dockefile 建好的 image， `docker image tag <repo-name> <userName>/<repo-name>` ， 新建一個符合規範可 push 上 Hub 的 image


~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-sample-2> docker image tag nginx-with-html:latest tim23656/nginx-wiht-html:latest
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-sample-2> docker image ls
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
nginx-with-html            latest              5af5a710d6ac        3 minutes ago       126MB
tim23656/nginx-wiht-html   latest              5af5a710d6ac        3 minutes ago       126MB
customnginx                latest              b7b835141e3a        26 minutes ago      108MB
<none>                     <none>              a690e991b96c        37 minutes ago      108MB
alpine                     latest              c85b8f829d1f        7 days ago          5.59MB
ubuntu                     14.04               6e4f1fe62ff1        8 days ago          197MB
yuting/nginx               latest              231d40e811cd        4 weeks ago         126MB
nginx                      1.17.6              231d40e811cd        4 weeks ago         126MB
nginx                      latest              231d40e811cd        4 weeks ago         126MB
nginx                      mainline            231d40e811cd        4 weeks ago         126MB
tim23656/nginx             latest              231d40e811cd        4 weeks ago         126MB
tim23656/nginx             testing             231d40e811cd        4 weeks ago         126MB
debian                     stretch-slim        2b343cb3b772        4 weeks ago         55.3MB
nginx                      alpine              a624d888d69f        5 weeks ago         21.5MB
centos                     7                   5e35e350aded        6 weeks ago         203MB
centos                     latest              0f3e07c0138f        2 months ago        220MB
tim23656/cheers2019        latest              21660382562c        3 months ago        4.01MB
<none>                     <none>              cbaa020e0b1c        3 months ago        356MB
golang                     1.11-alpine         e116d2efa2ab        4 months ago        312MB
vulnerables/web-dvwa       latest              ab0d83586b6e        14 months ago       712MB
elasticsearch              2                   5e9d896dc62c        15 months ago       479MB
~~~