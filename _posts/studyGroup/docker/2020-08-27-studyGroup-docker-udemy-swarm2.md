---
layout: "single"
title: 'Study Group: 一姐出品 品質保證 docker-讀書會-07 docker swarm 2'
permalink: 'stydeGroup/docker-07'
tags: 讀書會 docker swarm
---


## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## [好棒棒文件](https://boxboat.com/2016/08/17/whats-docker-swarm-advertise-addr/){:target="_black"}

## 實作

- 建立四台 host


- `--advertise-addr`
    - To put it simply, the --advertise-addr is the address other nodes in the Docker swarm use to connect into your node. You need to provide an IP address of your host, or a network interface which Docker will use to lookup your IP address, and a port number which defaults to 2377

- `--listen-addr`
    - The --listen-addr is the address that the swarm service listens on for incoming connections. In early releases, this same flag did double duty as the only way to set the advertised address, so you’ll find old videos and instructions where this was used. With the new --advertise-addr option, it’s safe to ignore these instructions and only pass the --advertise-addr. The default for --listen-addr is to listen on all interfaces on TCP port 2377 (0.0.0.0:2377)




## Docker for Beginners: Full Course

<iframe width="560" height="315" src="https://www.youtube.com/embed/zJ6WbK9zFpI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>