---
layout: "single"
title: 'Study Group: 一姐出品 品質保證 docker-讀書會-06 docker swarm '
permalink: 'stydeGroup/docker-06'
tags: 讀書會 docker swarm
---


## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Swarm 

- 要解決

   - 到處都是container
   - ⾃動化container的⽣命週期
   - 輕鬆的擴充或是刪減container
   - container啟動失敗,確保能重新啟動
   - Track container啟動狀況
   - 確保container是run在信任的Server上

## 容器管理的出現

- Kubernetes
    - Google 開發
    - 開源
- Swarm

- Docker 開發
- Docker machine + Compose + Swarm 整合進 Docker Toolbox
- 簡單易用

## Docker Swarm

- Container數量眾多時,需要有個能管理&調度container的平台操控
- Docker swarm是Docker公司推出的管理平台
- Docker 1.12版之後,Docker Engine內建Docker Swarm Mode
- 透過CLI/API就可建⽴&管理Docker swarm的cluster
- 可以依container loading,隨時調整container運作數量


## Docer swarm 2 種類型 Node

- Manager Node:
    - 負責資源調度
    - mantain cluster
    - management tasks

- Worker Node:
    - 負責運作容器
    - 不參與資源調度
    - receive and execute tasks from manager node

## 在 Docker PlayGround 開 swarm

- docker swarm init -help

~~~
Options:
      --advertise-addr string                  Advertised address (format: <ip|interface>[:port])
      --autolock                               Enable manager autolocking (requiring an unlock key to start a stopped manager)
      --availability string                    Availability of the node ("active"|"pause"|"drain") (default "active")
      --cert-expiry duration                   Validity period for node certificates (ns|us|ms|s|m|h) (default 2160h0m0s)
      --data-path-addr string                  Address or interface to use for data path traffic (format: <ip|interface>)
      --data-path-port uint32                  Port number to use for data path traffic (1024 - 49151). If no value is set or
                                               is set to 0, the default port (4789) is used.
      --default-addr-pool ipNetSlice           default address pool in CIDR format (default [])
      --default-addr-pool-mask-length uint32   default address pool subnet mask length (default 24)
      --dispatcher-heartbeat duration          Dispatcher heartbeat period (ns|us|ms|s|m|h) (default 5s)
      --external-ca external-ca                Specifications of one or more certificate signing endpoints
      --force-new-cluster                      Force create a new cluster from current state
      --listen-addr node-addr                  Listen address (format: <ip|interface>[:port]) (default 0.0.0.0:2377)
      --max-snapshots uint                     Number of additional Raft snapshots to retain
      --snapshot-interval uint                 Number of log entries between Raft snapshots (default 10000)
      --task-history-limit int                 Task history retention limit (default 5)
~~~

- swarm init and check status

~~~
$ docker swarm init --advertise-addr 192.168.0.33
Swarm initialized: current node (y0d0zndp8gd06qzemdvji30wm) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-4przxgn4x06z40181gnjqpgx0cgxpgswwsi7zjziqkfxui2sov-4avdyy3zoq76wnpk810jg9pxi 192.168.0.33:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

[node1] (local) root@192.168.0.33 ~
$ docker info | grep swarm
WARNING: API is accessible on http://0.0.0.0:2375 without encryption.
         Access to the remote API is equivalent to root access on the host. Refer
         to the 'Docker daemon attack surface' section in the documentation for
         more information: https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface
WARNING: No swap limit support
WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled
~~~

## 練習

- docker info: check swarm status
- docker swarm init: 啟動swarm
- docker node ls: 確認node⽬前狀態
- docker node --help
- docker swarm --help
- docker service --help `(replace docker container run)`


## Swarm 文件 看好看滿

- [https://docs.docker.com/engine/swarm/](https://docs.docker.com/engine/swarm/){:target="_back"}


## 實作

~~~
$ docker service create alpine ping 8.8.8.8
$ docker service ls
$ docker service ps <service name> 查看task
=========scale up
$ docker service update <service id> --replicas 3
$ docker container ls
$ docker container rm -f <name>.1.<id>

========= rm
$ docker service rm <name> 
~~~

- __docker service ls :__ show 出所有 swarm 裡面的 service
- __docker service ps :__ show 出某個 service 的 detail

~~~
PS C:\Users\tim23> docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
r19b0okmqy4x        demo                replicated          1/1                 alpine:latest
PS C:\Users\tim23> docker service ps demo
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
a2dpwnsgcrb9        demo.1              alpine:latest       docker-desktop      Running             Running 2 minutes ago
~~~

## 練習

- 下載nginx,在swarm cluster中建⽴名為demo的service
- 查看service清單
- 查看task清單
- 指定任務數量為4
- 試著刪除第1個task任務
- 查看service資訊

~~~
PS C:\Users\tim23> docker service create --name demo nginx
fa6l2aeh7c8af16kvteigsj9e
overall progress: 1 out of 1 tasks                                                                                                                                                             1/1: running   [==================================================>]                                                                                                                           verify: Service converged                                                                                                                                                                      PS C:\Users\tim23> docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
fa6l2aeh7c8a        demo                replicated          1/1                 nginx:latest
PS C:\Users\tim23> docker service ps demo
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
iqh6ldenx6jo        demo.1              nginx:latest        docker-desktop      Running             Running 29 seconds ago
PS C:\Users\tim23> docker service update demo --replicas 4
demo
overall progress: 4 out of 4 tasks                                                                                                                                                             1/4: running   [==================================================>]                                                                                                                           2/4: running   [==================================================>]                                                                                                                           3/4: running   [==================================================>]                                                                                                                           4/4: running   [==================================================>]                                                                                                                           verify: Service converged                                                                                                                                                                      PS C:\Users\tim23> docker service ps demo
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE                ERROR               PORTS
iqh6ldenx6jo        demo.1              nginx:latest        docker-desktop      Running             Running about a minute ago
6gbcm1vn2j5y        demo.2              nginx:latest        docker-desktop      Running             Running 13 seconds ago
ndsvxj0aazas        demo.3              nginx:latest        docker-desktop      Running             Running 13 seconds ago
gggvwowwnsdi        demo.4              nginx:latest        docker-desktop      Running             Running 13 seconds ago
PS C:\Users\tim23> docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS               NAMES
daf6f1e163ab        nginx:latest        "/docker-entrypoint.…"   22 seconds ago       Up 20 seconds       80/tcp              demo.4.gggvwowwnsdivup1u8q83ubl3
4d0a38d1f76d        nginx:latest        "/docker-entrypoint.…"   22 seconds ago       Up 20 seconds       80/tcp              demo.2.6gbcm1vn2j5y5eatbsqkmwp4x
b993d3b4fabc        nginx:latest        "/docker-entrypoint.…"   22 seconds ago       Up 20 seconds       80/tcp              demo.3.ndsvxj0aazasyc1kflnz1iftx
854156bb853b        nginx:latest        "/docker-entrypoint.…"   About a minute ago   Up About a minute   80/tcp              demo.1.iqh6ldenx6jo4dorfi9hckt0k
PS C:\Users\tim23> docker container rm -f demo.1.gggvwowwnsdivup1u8q83ubl3
Error: No such container: demo.1.gggvwowwnsdivup1u8q83ubl3
PS C:\Users\tim23> docker container rm -f demo.4.gggvwowwnsdivup1u8q83ubl3
demo.4.gggvwowwnsdivup1u8q83ubl3
PS C:\Users\tim23> docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
fa6l2aeh7c8a        demo                replicated          4/4                 nginx:latest
~~~

## Manager 看憑證

~~~
[node1] (local) root@192.168.0.33 ~
$ docker swarm ca 
-----BEGIN CERTIFICATE-----
MIIBajCCARCgAwIBAgIUCcjRyRy7YVIc3AJlBdR3ZOsDZEcwCgYIKoZIzj0EAwIw
EzERMA8GA1UEAxMIc3dhcm0tY2EwHhcNMjAwODIwMTI0MDAwWhcNNDAwODE1MTI0
MDAwWjATMREwDwYDVQQDEwhzd2FybS1jYTBZMBMGByqGSM49AgEGCCqGSM49AwEH
A0IABKpTlgLHt5bcQIvD+VqHgpJs1uSRLfuuo21X+9y6+BQOoomoHvFzCPEyr88d
H22NWu7ZDQLtVkNTVjA5xzZJQhCjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMB
Af8EBTADAQH/MB0GA1UdDgQWBBQ3B8cWXKHlazJ/orvMT3r6XLsyxjAKBggqhkjO
PQQDAgNIADBFAiEAoWU0tNTdr3zGkfK0YAdF2IOyMb3T629p0S6jvMUZlhkCICkY
YSwQA1Iux0Kj1W93RCYNe4IifzjFFWOYJVB/XoPD
-----END CERTIFICATE-----
~~~