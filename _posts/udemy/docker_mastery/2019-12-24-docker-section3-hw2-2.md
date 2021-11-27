---
layout: "single"
title: 'Docker Mastery: Section3 作業阿!!!! Round-robin DNS'
permalink: 'docker_mastery/docker-sections3-hw2-2-round-robin-DNS'
tags: udemy-docker
---

- section3-33, 34

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


### Assignment Requirements

- Know how to use `-it` to get shell in container
- Understand basics of what a Linux distribution is like Ubuntu and CentOS
- know how to run a container 
- Understand basics of DNS records

### Assiginment: DNS Round Robin Test

- [Round-robin DNS](https://en.wikipedia.org/wiki/Round-robin_DNS){:target="_back"}

- Ever since Docker Engine 1.11, we can have multiple containers on a created network respond to the same DNS address

- Create a new virtual network (default bridge driver)

- Create two containers from `elasticsearch:2` image

- Research and use `--network-alias search` when createing them to give them an additional DNS name to repond to

- Run `alpine nslookup search` with `--net` to see the two containers list for the same DNS name 

- Run `centos curl -s search:9200` wiht `--net` multiple times until you see both "name" fields show

### 解

> 靠! 自己寫都錯 XDD

- 額外 remove all stop containers

   - `docker rm $(docker ps -a -q)`

#### \-\-net-alias and \-\-network-alias both work

- `docker network create dude`

- `docker container run -d --net dude --net-alias search elasticesearch:2`

- [看自己的筆記](https://yuting3656.github.io/yutingblog/docker_mastery/docker-networks-dns){:target="_back"}

    - 寫到 __Docker defaults the hostname to the container’s name, but you can also set aliases__。喔~~~ 更清楚了~ 所以這作業，把兩個 elasticesearch 的 DNS 都叫做 search `--net-alias search`。

~~~
PS E:\> docker network create dude
a666a0d65d142da0ab965b5f47dbbaa6e0373d40c1b72c20a581d3eae6fc5ef1
PS E:\> docker container run -d --net dude --net-alias search elasticsearch:2
740ee010200edac465cde92f59631ce01e8ba3a23c7788e6105dd98f3970bcc3
PS E:\> docker container run -d --net dude --net-alias search elasticsearch:2
b7fee62524a6d14f819c74b41478203cb61a9cf7d7fef839c2979624c3c7d0bc
~~~

- 看看現在 container 的狀態

~~~
PS E:\> docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
b7fee62524a6        elasticsearch:2     "/docker-entrypoint.…"   24 minutes ago      Up 24 minutes       9200/tcp, 9300/tcp   blissful_boyd
740ee010200e        elasticsearch:2     "/docker-entrypoint.…"   24 minutes ago      Up 24 minutes       9200/tcp, 9300/tcp   beautiful_lovelace
~~~

### 開一個 alpine [nslookup](https://network-tools.com/nslookup/){:target="_back"} \<dns-name\>

~~~
        [在docker env 裡面先接到和兩個 elasticsearch containers同一個network]
                                     |
PS E:\> docker container run --rm --net dude alpine nslookup search
nslookup: can't resolve '(null)': Name does not resolve

Name:      search
Address 1: 172.21.0.3 search.dude
Address 2: 172.21.0.2 search.dude
~~~

### 開 Centos curl 抓抓 -s \<dns-name\>:port 完美實作 RR TEST 

- `docker container run --rm --net dude centos curl -s search:9200`

~~~
PS E:\> docker container run --rm --net dude  centos curl -s search:9200
{
  "name" : "Arranger",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "Q6ahATWOTFOgipKV0Js8-g",
  "version" : {
    "number" : "2.4.6",
    "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",
    "build_timestamp" : "2017-07-18T12:17:44Z",
    "build_snapshot" : false,
    "lucene_version" : "5.5.4"
  },
  "tagline" : "You Know, for Search"
}
PS E:\> docker container run --rm --net dude  centos curl -s search:9200
{
  "name" : "Sun Girl",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "znEKY48aRwKucupK3OiHDw",
  "version" : {
    "number" : "2.4.6",
    "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",
    "build_timestamp" : "2017-07-18T12:17:44Z",
    "build_snapshot" : false,
    "lucene_version" : "5.5.4"
  },
  "tagline" : "You Know, for Search"
}
~~~