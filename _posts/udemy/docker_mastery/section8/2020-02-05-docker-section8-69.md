---
layout: 'post'
title: 'Docker Matery: Section 8 - Swarm Stacks and Production Grade Compose'
permalink: 'docker_matery/docker-sections8-swarm-stacks-and-production-grade-compose'
tags: udemy-docker swarm swarm-stack
---

- section8-69

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Stacks: Production Grade Compose

- In 1.13 Docker adds a new layer of abstraction to Swarm called Stacks 
- Stacks accept Compose files as their declarative definition for services, networks, and volumes
- We use `docker stack deploy` rather then docker service create 
- Stacks manages all those objects for us, including overlay network per stack. Adds stack name to start of their name
- New `deploy:` key in Compose file. Can't do `build:`
- Compose now ignores `deploy:`, Swarm ignores `build:`
- `docker-compose` cli not needed on Swarm server

## Stack

- Service 

   - |![Imgur](https://i.imgur.com/uEY47qk.jpg)|

- Stack

   - |![Imgur](https://i.imgur.com/BNdZLqX.jpg)|

## 範例: 上次作業 voting 的架構


- example-voting-app-stack.yml

~~~yml
version: "3"
services:

  redis:
    image: redis:alpine
    ports:
      - "6379"
    networks:
      - frontend
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure
  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        constraints: [node.role == manager]
  vote:
    image: bretfisher/examplevotingapp_vote
    ports:
      - 5000:80
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure
  result:
    image: bretfisher/examplevotingapp_result
    ports:
      - 5001:80
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: bretfisher/examplevotingapp_worker:java
    networks:
      - frontend
      - backend
    depends_on:
      - db
      - redis
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints: [node.role == manager]

  visualizer:
    image: dockersamples/visualizer
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints: [node.role == manager]

networks:
  frontend:
  backend:

volumes:
  db-data:
~~~


- `docker stack deploy -c example-voting-app-stack.yml voteapp`

~~~

root@node1:/srv/udemy-docker-mastery/swarm-stack-1# docker stack deploy -c example-voting-app-stack.yml voteapp
Creating network voteapp_default
Creating network voteapp_backend
Creating network voteapp_frontend
Creating service voteapp_vote
Creating service voteapp_result
Creating service voteapp_worker
Creating service voteapp_visualizer
Creating service voteapp_redis
Creating service voteapp_db
~~~

- 看 stack 有甚麼功能 `docker stack --help`

~~~
root@node1:/srv/udemy-docker-mastery/swarm-stack-1# docker stack --help

Usage:  docker stack [OPTIONS] COMMAND

Manage Docker stacks

Options:
      --orchestrator string   Orchestrator to use (swarm|kubernetes|all)

Commands:
  deploy      Deploy a new stack or update an existing stack
  ls          List stacks
  ps          List the tasks in the stack
  rm          Remove one or more stacks
  services    List the services in the stack

Run 'docker stack COMMAND --help' for more information on a command.
~~~

- `docker stack ls & docker stack ps`

~~~
root@node1:/srv/udemy-docker-mastery/swarm-stack-1# docker stack ls
NAME                SERVICES            ORCHESTRATOR
voteapp             6                   Swarm
root@node1:/srv/udemy-docker-mastery/swarm-stack-1# docker stack ps voteapp
ID                  NAME                   IMAGE                                       NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
yj2ym50t0gwl        voteapp_db.1           postgres:9.4                                node1               Running             Running 2 minutes ago
g1ksmuo6696m        voteapp_redis.1        redis:alpine                                node3               Running             Running 3 minutes ago
t1lcybwr7278        voteapp_visualizer.1   dockersamples/visualizer:latest             node2               Running             Running 2 minutes ago
gwe0ongs3ney        voteapp_worker.1       bretfisher/examplevotingapp_worker:java     node1               Running             Running 3 minutes ago
a5z14113bsmd        voteapp_result.1       bretfisher/examplevotingapp_result:latest   node3               Running             Running 3 minutes ago
5uq1rzrvozc5        voteapp_vote.1         bretfisher/examplevotingapp_vote:latest     node2               Running             Running 3 minutes ago
8xge300oem16        voteapp_vote.2         bretfisher/examplevotingapp_vote:latest     node1               Running             Running 3 minutes ago
~~~

- `docker stack services voteapp`

~~~
root@node1:/srv/udemy-docker-mastery/swarm-stack-1# docker stack services voteapp
ID                  NAME                 MODE                REPLICAS            IMAGE                                       PORTS
2wrt9tac14vk        voteapp_result       replicated          1/1                 bretfisher/examplevotingapp_result:latest   *:5001->80/tcp
e98p116mmfci        voteapp_vote         replicated          2/2                 bretfisher/examplevotingapp_vote:latest     *:5000->80/tcp
eair14psxi0i        voteapp_worker       replicated          1/1                 bretfisher/examplevotingapp_worker:java
jsbc4j3u3o8u        voteapp_db           replicated          1/1                 postgres:9.4
r1j0duii85yx        voteapp_visualizer   replicated          1/1                 dockersamples/visualizer:latest             *:8080->8080/tcp
x87dy42l8w8h        voteapp_redis        replicated          1/1                 redis:alpine                                *:30000->6379/tcp
~~~

- `docker network ls`
   
   - stack name + networkname

~~~
root@node1:/srv/udemy-docker-mastery/swarm-stack-1# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
k4tt3cmxy3c2        backend             overlay             swarm
ae929b8c464b        bridge              bridge              local
f92e61dfa5dc        docker_gwbridge     bridge              local
munnt6ardwyc        frontend            overlay             swarm
51dca3ad7e02        host                host                local
9r57paqcqdba        ingress             overlay             swarm
bi0v9pic3gr0        mydrupal            overlay             swarm
6f34de753d50        none                null                local
xcneep0s230g        voteapp_backend     overlay             swarm
uz1rwfxdaa00        voteapp_default     overlay             swarm
sx2u9uf4nk7w        voteapp_frontend    overlay             swarm
~~~

## 看結果

- 投票畫面和顯示結果都跟作業一樣

- Visualizer:
   - 劃出目前 deploy 的架構，超酷～～～
   - ![img](https://i.imgur.com/rE64xPI.jpg)
