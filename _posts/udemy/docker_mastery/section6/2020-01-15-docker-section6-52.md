---
layout: 'post'
title: 'Docker Matery: Section 6 - docker compose'
permalink: 'docker_matery/docker-sections6-docker-compose-and-the-yaml-file'
tags: udemy-docker docker-compose
---

- section6-52

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Docker Compose 

- Why: configure relationships between containers
- Why: save our docker container run settings in easy-to-read file
- Why: create one-liner developer environment startups 
- Comprised of 2 separate but related things
- #1. YAML-formatted file that describes our solution options for:
   - containers
   - networks
   - volumes
- #2. A CLI tool `docker-compose` used for local dev/test automation with those YAML files

## docker-compose.yml

- Compose YAML format has it's oen versions: 1, 2, 2.1, 3, 3.1
- YAML file can be used with `docker-compose` command for local docker automation or..
- With `docker` directly in production wiht Swarm(as of v1.13)
- `docker-compose --help`
- `docker-compose.yml` is default filesname, but any can be used with `docker-compose -f`

- template.yml
   - yml 檔案，空格必須兩個或四個

      ~~~yml
      version: '3.1'  # if no version is specificed then v1 is assumed. Recommend v2 minimum
      
      services:  # containers. same as docker run
        servicename: # a friendly name. this is also DNS name inside network
          image: # Optional if you use build:
          command: # Optional, replace the default CMD specified by the image
          environment: # Optional, same as -e in docker run
          volumes: # Optional, same as -v in docker run
        servicename2:
      
      volumes: # Optional, same as docker volume create
      
      networks: # Optional, same as docker network create
      ~~~

## docker-compose Documentation

- [https://docs.docker.com/compose/compose-file/](https://docs.docker.com/compose/compose-file/){:target="_back"}


## dokcer-compose CLI

- CLI tool comes with Docker for Windows/Mac, but separate download for Linux
- Not a production-grade tool but ideal for local development and test 
- Two most common commands are 
   - `docker-compose up` # setup volumes/networks and start all comtainers
   - `docker-compose down` # stop all containers and remove cont/vol/net

- If all your porjects had a `Dockerfile` and `docker-compose.yml` then __new developer onboarding__ would be:
   - `git clone github.com/some/sofware`
   - `docker-compse up`


### docker-compose cli 

- 主要兩個檔案

    - nginx.conf
    
       ~~~conf
       server {
       
       	listen 80;
       
       	location / {
       
       		proxy_pass         http://web;
       		proxy_redirect     off;
       		proxy_set_header   Host $host;
       		proxy_set_header   X-Real-IP $remote_addr;
       		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       		proxy_set_header   X-Forwarded-Host $server_name;
       
       	}
       }
       ~~~
    
    - docker-compose.yml
    
       ~~~yml
       version: '3'
       
       services:
         proxy:
           image: nginx:1.13 # this will use the latest version of 1.13.x
           ports:
             - '80:80' # expose 80 on host and sent to 80 in container
           volumes:
             - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro # ro: read only
         web:
           image: httpd  # this will use httpd:latest
       ~~~

- docker-compose up

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-2> docker-compose up
Creating network "compose-sample-2_default" with the default driver
Creating compose-sample-2_proxy_1 ... done                                                                                                             Creating compose-sample-2_web_1   ... done                                                                                                             Attaching to compose-sample-2_web_1, compose-sample-2_proxy_1
web_1    | AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.21.0.2. Set the 'ServerName' directive globally to suppress this message
web_1    | AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.21.0.2. Set the 'ServerName' directive globally to suppress this message
web_1    | [Wed Jan 15 09:59:44.121799 2020] [mpm_event:notice] [pid 1:tid 140154876986496] AH00489: Apache/2.4.41 (Unix) configured -- resuming normal operations
web_1    | [Wed Jan 15 09:59:44.121878 2020] [core:notice] [pid 1:tid 140154876986496] AH00094: Command line: 'httpd -D FOREGROUND'
~~~


- `docker-compose up -d` ：　背景執行

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-2> docker-compose up -d
Starting compose-sample-2_proxy_1 ... done                                                                                                           Starting compose-sample-2_web_1   ... done       
~~~

- `dokcer-compose ps` : 看用　`docker-compsoe` 指令跑的有那些

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-2> docker-compose ps
系統找不到指定的路徑。
          Name                   Command          State         Ports
----------------------------------------------------------------------------
compose-sample-2_proxy_1   nginx -g daemon off;   Up      0.0.0.0:80->80/tcp
compose-sample-2_web_1     httpd-foreground       Up      80/tcp
~~~

- `docker-compse top`

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-2> docker-compose top
compose-sample-2_proxy_1
系統找不到指定的路徑。
 PID    USER   TIME                    COMMAND
----------------------------------------------------------------
11356   root   0:00   nginx: master process nginx -g daemon off;
11607   101    0:00   nginx: worker process

compose-sample-2_web_1
系統找不到指定的路徑。
 PID    USER   TIME        COMMAND
----------------------------------------
11357   root   0:00   httpd -DFOREGROUND
11613   bin    0:00   httpd -DFOREGROUND
11614   bin    0:00   httpd -DFOREGROUND
11615   bin    0:00   httpd -DFOREGROUND
~~~

- `docker-compose down`

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-2> docker-compose down
Stopping compose-sample-2_proxy_1 ... done                                                                                                           Stopping compose-sample-2_web_1   ... done                                                                                                         Removing compose-sample-2_proxy_1 ... done                                                                                                       Removing compose-sample-2_web_1   ... done                                                                                                     Removing network compose-sample-2_default
~~~