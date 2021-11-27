---
layout: "single"
title: 'Docker Mastery: Section 9 - Using Secrets with local docker compose'
permalink: 'docker_mastery/docker-sections9-using-secrets-with-lcoal-docker-compse'
tags: udemy-docker  swarm-secrets 
---

- section9-77

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Secrets Local docker compose

- 先確定離開 `swarm`

   - `docker swarm leave -f`

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\secrets-sample-2> docker swarm leave
   Error response from daemon: You are attempting to leave the swarm on a node that is participating as a manager. Removing the last manager erases all current state of the swarm. Use `--force` to ignore this message.
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\secrets-sample-2> docker swarm leave --help
   
   Usage:  docker swarm leave [OPTIONS]
   
   Leave the swarm
   
   Options:
     -f, --force   Force this node to leave the swarm, ignoring warnings
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\secrets-sample-2> docker swarm leave -f
   Node left the swarm.
   ~~~


   - `docker node ls`

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\secrets-sample-2> docker node ls
   Error response from daemon: This node is not a swarm manager. Use "docker swarm init" or "docker swarm join" to connect this node to swarm and try again.
   ~~~

## 複習一下 docker-compse

- [我的筆記](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections6-docker-compose-and-the-yaml-file){:target="_back"}


## docker-compose up

- docker-compose.yml

   ~~~yml
   version: "3.1"
   
   services:
     psql:
       image: postgres
       secrets:
         - psql_user
         - psql_password
       environment:
         POSTGRES_PASSWORD_FILE: /run/secrets/psql_password
         POSTGRES_USER_FILE: /run/secrets/psql_user
   
   secrets:
     psql_user:
       file: ./psql_user.txt
     psql_password:
       file: ./psql_password.txt
   ~~~

   - psql_user.txt:
      - dbuser
   - psql_password.txt:
      - QpqQcgD7dxVG


- 在本機跑起來的樣子

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\secrets-sample-2> docker-compose up -d
   Creating network "secrets-sample-2_default" with the default driver
   Pulling psql (postgres:)...
   latest: Pulling from library/postgres
   bc51dd8edc1b: Pull complete                                                                             
   d2b355dbb6c6: Pull complete                                                                             
   d237363a1a91: Pull complete                                                                             
   ff4b9d2fde66: Pull complete                                                                             
   646492d166e7: Pull complete                                                                             
   50eeac6fd5fb: Pull complete                                                                             
   502963de6da8: Pull complete                                                                             
   d7263f7627b9: Pull complete                                                                             
   46b135c7e429: Pull complete                                                                             
   259a29a883ed: Pull complete                                                                             
   b3b8f133c3f4: Pull complete                                                                             
   49e91678bd48: Pull complete                                                                             
   15326bd3db00: Pull complete                                                                             
   0aab6409ca4d: Pull complete                                                                             
   Digest: sha256:5181eccc7c903e4f1beffa89a735cb7ed72e0c81d6c34c471552c3fa8bff0858
   Status: Downloaded newer image for postgres:latest
   Creating secrets-sample-2_psql_1 ... done    
   ~~~

- 進去看

   - `dockser-compose exec psql cat /run/secrets/psql_user`

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\secrets-sample-2> docker-compose exec psql cat /run/secrets/psql_user
   dbuser
   ~~~

   - 這招只 `file based` 的方法，盡可能的模擬實際的狀況！
   - docker-compose 在開發階段喔