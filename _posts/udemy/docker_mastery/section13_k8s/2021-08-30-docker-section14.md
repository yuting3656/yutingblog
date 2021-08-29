---
layout: "post"
title: "Docker Mastery: Section 14 Exposing K8s Ports"
permalink: "docker_mastery/docker-sections14-exposing-k8s-ports"
tags: udemy-docker k8s kj8s-ports
---

- section14-105, 106

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="\_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="\_back"}

- [講師的 YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="\_back"}

---

---

---

> HA HA!
>
> 廢話不多說 充實自己比較實在!
>
> GOGO !

# Section Intro

- Learning Service Types
- Creating Service Types
- Service DNS

# Exposing Containers

- `kubectl expose` create a **service** for existing pods
- A **service** is a stable address for pod(s)
- If we want to connect to pod(s), we need a **service**
- CoreDNS allows use to resolve **services** by name
- There are different types of **services**
  - ClusterIP
  - NodePort
  - LoadBalancer
  - ExternalName

# Basic Service Types

- **ClusterIP (default)**

  - Single, internal virtual IP allocated
  - Only reachable from within cluster (nodes and pods)
  - Pods and reach service on apps port number

- **NodePort** (outside cluster)
  - High port allocated on each node
  - Port is open on every node's IP
  - Anyone can connect (if they reach node)
  - Other pods need to be updated to this port

> These services (**ClusterIP** **NodePort**) are always available in k8s

- **LoadBalancer** (mostly used in the cloud)

  - Controls a **LB** endpoint external to the cluster
  - Only available when infra provider give you a **LB** (AWS ELB, etc)
  - Create NodePort+ClusterIP services, tells **LB** to send to NodePort

- **ExternalName**

  - Adds **CNAME DNS** reccord to **CoreDNS** only
  - Not used for Pods, but for giving pods a DNS name to use for somthing outside Kubernetes

- Kubernets **Ingress** : `We'll learn later`

> 先這樣!
>
> 記得阿!! 今年第四季目標 在家 架一台 KKKKK
>
> gogo~~ :heart:
