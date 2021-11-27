---
layout: "single"
title: 'Docker Mastery: Section 8 作業阿～！！！ Create a Multi-Service Multi-Node Web App'
permalink: 'docker_mastery/docker-sections8-hw1-create-a-multi-service-multi-node-web-app'
tags: udemy-docker swarm 
---

- section8-67

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Assignment: Create Multi-Service App

- Using Docker's Distrubuted Voting App
- use `swarm-app-1` directory in our course repo for requirements
- 1 volume, 2 networks, and 5 servcies needed
- Create the commands needed, spin up services, and test app
- Everything is using Docker Hub images, so no data needed on Swarm
- Like many computer things, this is 1/2 art form and 1/2 science


<br/>

---
---
---


# Swarm-app-a-1

## Goal: create networks, volumes, and services for a web-based "cats vs. dogs" voting app.
Here is a basic diagram of how the 5 services will work:

![Imgur](https://i.imgur.com/GK9WC5q.png)
- All images are on Docker Hub, so you should use editor to craft your commands locally, then paste them into swarm shell (at least that's how I'd do it)
- a `backend` and `frontend` overlay network are needed. Nothing different about them other then that backend will help protect database from the voting web app. (similar to how a VLAN setup might be in traditional architecture)
- The database server should use a named volume for preserving data. Use the new `--mount` format to do this: `--mount type=volume,source=db-data,target=/var/lib/postgresql/data`

### Services (names below should be service names)
- vote
    - bretfisher/examplevotingapp_vote
    - web front end for users to vote dog/cat
    - ideally published on TCP 80. Container listens on 80
    - on frontend network
    - 2+ replicas of this container

- redis
    - redis:3.2
    - key/value storage for incoming votes
    - no public ports
    - on frontend network
    - 1 replica NOTE VIDEO SAYS TWO BUT ONLY ONE NEEDED

- worker
    - bretfisher/examplevotingapp_worker:java
    - backend processor of redis and storing results in postgres
    - no public ports
    - on frontend and backend networks
    - 1 replica

- db
    - postgres:9.4
    - one named volume needed, pointing to /var/lib/postgresql/data
    - on backend network
    - 1 replica

- result
    - bretfisher/examplevotingapp_result
    - web app that shows results
    - runs on high port since just for admins (lets imagine)
    - so run on a high port of your choosing (I choose 5001), container listens on 80
    - on backend network
    - 1 replica


<br/>

---
---
---

## 作業

- network

~~~
root@node1:~# docker network create -d overlay frontend
munnt6ardwyclcym3xr5ud1mq
root@node1:~# docker network create -d overlay backend
k4tt3cmxy3c2mlykvfnlsyh4l
~~~

- vote

   - `docker service create --name vote -p 80:80 --network frontend --replicas 2 bretfisher/examplevotingapp_vote`

   - ~~~
   root@node1:~# docker service create --name vote -p 80:80 --network frontend --replicas 2 bretfisher/examplevotingapp_vote
   2rfb86fjjeypll7o4v67t7iry
   overall progress: 2 out of 2 tasks
   1/2: running
   2/2: running
   verify: Service converged
   ~~~


- redis

   - `docker service create --name redis --network frontend redis:3.2`

   - ~~~
      root@node1:~# docker service create --name redis --network frontendredis:3.2
      uytakkvfxkhjrx4emtjlzhrce
      overall progress: 1 out of 1 tasks
      1/1: running   [==================================================>]
      verify: Service converged
   ~~~

- worker

   - `docker service create --name worker --network backend --network frontend bretfisher/examplevotingapp_worker:java`

   - ~~~
      root@node1:~# docker service create --name worker --network backend --network frontend bretfisher/examplevotingapp_worker:java
      kp3dbsf8u2qu8e0w7gyszf0di
      overall progress: 1 out of 1 tasks
      1/1: running   [==================================================>]
      verify: Service converged
   ~~~

- db 

   - `docker service create --name db --network backend --mount type=volume,source=db-data,target=/var/lib/postgresql/data postgres:9.4`

   - ~~~
      root@node1:~# docker service create --name db --network backend --mount type=volume,source=db-data,target=/var/lib/postgresql/data postgres:9.4
      3kdzx5bf79yjz3o4pba9n7w17
      overall progress: 1 out of 1 tasks
      1/1: running   [==================================================>]
      verify: Service converged
   ~~~

- result 
   
   - `docker service create --name result --network backend -p 5001:80 bretfisher/examplevotingapp_result`

   - ~~~
      root@node1:~# docker service create --name result --network backend -p 5001:80 bretfisher/examplevotingapp_result
      k7ysp6z5k0seag0u034xlbtq1
      overall progress: 1 out of 1 tasks
      1/1: running   [==================================================>]
      verify: Service converged
   ~~~


#### 看整體樣子

![Imgur](https://i.imgur.com/bQpjwQW.jpg)

- 隨便近一個 IP
   - ![Imgur](https://i.imgur.com/rdw6XAF.jpg)

- 看投票結果 隨便一個IP:5001
   - ![Imgur](https://i.imgur.com/jA98P1w.jpg)


- 這作業大概長這樣子

![Imgur](https://i.imgur.com/oVajGGD.jpg)

- 架構比對

   - |![Imgur](https://i.imgur.com/GK9WC5q.png)|
   
   - |![Imgur](https://i.imgur.com/9AXoite.jpg)|

> 真的很棒的練習! 感覺功力又大增了!!