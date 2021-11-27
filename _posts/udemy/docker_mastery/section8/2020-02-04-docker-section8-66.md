---
layout: "single"
title: 'Docker Mastery: Section 8 - (Swarm) Routing Mesh'
permalink: 'docker_mastery/docker-sections8-routing-mesh'
tags: udemy-docker swarm swarm-routing-mesh
---

- section8-66

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

<br/>


> 官方文件 [ROUTING MESH](https://docs.docker.com/engine/swarm/ingress/){:target="_back"}


## Routing Mesh

- Routing ingress (incoming) packets for a Service to proper Task.
- Spans all nodes in Swarm
- Uses IPVS from Linux Kernel
- Load balances Swarm Servcies across their Tasks
- Two ways this works:
   - Container-to-container in a `Overlay network` (uses VIP (Virtual IP) )
      - ![Imgur](https://i.imgur.com/rAN6ICF.jpg)
   - External traffic incoming to published ports (all nodes listen)
      - ![Imgur](https://i.imgur.com/ZeYXwfM.jpg)

## 實作

- `docker service create --name search --replicas 3 -p 9200:9200 elasticsearch:2`

~~~
root@node1:~# docker service create --name search --replicas 3 -p 9200:9200 elasticsearch:2
a2cesy4afyiwyiygvu84b1ogd
overall progress: 3 out of 3 tasks
1/3: running
2/3: running
3/3: running
verify: Service converged
root@node1:~#
~~~

- 查看建置情況
   - `docker service ps <service-name>`
   - 很聰明的自動分配到各個 NODE

~~~
root@node1:~# docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
a2cesy4afyiw        search              replicated          3/3                 elasticsearch:2     *:9200->9200/tcp
root@node1:~# docker service ps search
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE                ERROR               PORTS
ka0g6gooqgfk        search.1            elasticsearch:2     node2               Running             Running about a minute ago
vdg221htli9t        search.2            elasticsearch:2     node3               Running             Running about a minute ago
oxnh31i0w4gg        search.3            elasticsearch:2     node1               Running             Running about a minute ago
~~~

- `curl localhost:9200`

   - 多抓幾次 會透過 VIP 抓到不一樣的

~~~
root@node1:~# curl localhost:9200
{
  "name" : "Donald Ritter",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "v0IGCLB1TZGViXb0TA-W1A",
  "version" : {
    "number" : "2.4.6",
    "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",
    "build_timestamp" : "2017-07-18T12:17:44Z",
    "build_snapshot" : false,
    "lucene_version" : "5.5.4"
  },
  "tagline" : "You Know, for Search"
}
root@node1:~# curl localhost:9200
{
  "name" : "Watoomb",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "nJLvCm_mQ7egXmOggv9p8g",
  "version" : {
    "number" : "2.4.6",
    "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",
    "build_timestamp" : "2017-07-18T12:17:44Z",
    "build_snapshot" : false,
    "lucene_version" : "5.5.4"
  },
  "tagline" : "You Know, for Search"
}
root@node1:~# curl localhost:9200
{
  "name" : "Elf With A Gun",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "XruBZZMtQ726jDse2a5law",
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

## Routing Mesh Continue

- This is staeless load balancing
- This LB is at OSI Layer 3 (TCP), not Layer 4 (DNS)
- Both limitation can be overcome with:
   - Nginx or HAProxy LB proxy, or:
   - Docker Enterprise Edition, which comes with built-in L4 web proxy