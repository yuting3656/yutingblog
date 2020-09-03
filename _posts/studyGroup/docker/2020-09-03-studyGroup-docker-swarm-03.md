---
layout: 'post'
title: 'Study Group: 一姐出品 品質保證 docker-讀書會-08 docker swarm 3'
permalink: 'stydeGroup/docker-08'
tags: 讀書會 docker swarm
---


## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## 建立 overlay network

- docker network create --driver overlay <networkname>
- docker service create --network <networkname>

## Ingress Network

- running single container
- ingress network 自動建立完成
   - 內建 load balancer 將流量導致可用的 container 

## Ingress Nerwork

- receive a requests from any node in the cluster

## 透過 service 部屬 Wordpress

- 建⽴3個node
- swarm初始化 (1 manager+ 2 worker)
- 於[node1]建⽴ overlay network <docker network create --driver overlay demo>
- 查看network list <docker network ls>
- 建⽴mysql service <docker service create --name mysql --env MYSQL_ROOT_PASSWORD=root
   --env MYSQL_DATABASE=wordpress --network demo mysql>

- 查看service list, service task <docker service ls> <docker service ps mysql>

- 建⽴wordpress service binding DB <docker service create --name wordpress -p 80:80 --env
WORDPRESS_DB_PASSWORD=root --env WORDPRESS_DB_HOST=mysql --network demo
wordpress>

- 所有swarm的node都能進⼊wordpress⾴⾯!

## Overlay Multi-Host Networking

- 從single host到multi host
- 在swarm下使⽤overlay network架構
- 允許containers可以跨host溝通
- 傳輸資料經過AES演算法加密,安全妥當
- Routing Mesh機制:
內部container利⽤overlay network透過service name解析彼此
service綁定對外port, 可透過swarm上任何⼀個node連接


> [Use overlay networks](https://docs.docker.com/network/overlay/){:target="_back"}