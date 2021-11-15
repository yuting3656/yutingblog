---
layout: 'post'
title: 'Docker Mastery: Section 14- Kubernetes exporting ports'
permalink: 'docker_mastery/docker-sections14-kubernetes-exporting-ports'
tags: udemy-docker k8s
---

- section14-105, 106, 107

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Intro

- Learning Service Types
- Creating Service Types
- Service DNS

## Exposing Containers

- `kubectl expose` create a service for existing pods
- A **Service** is a stable address for pod(s)
- If We want to connect to pod(s), we need a **service**
- CoreDNS allows us to resolve services by name
   - ClusterIP
   - NodePort
   - LoadBalancer
   - ExternalName


## Basic Service Types

- **ClusterIP** (default) `only good in the cluter`
   - Single, internal virtul IP allocated 
   - Only reachable from within cluser (nodes and pods)
   - Pods can reach service on apps port number

- **NodePort** `outside the cluster to talk to servers`
   - High port allocated on each node
   - Port is open on every node's IP
   - Anyone can connect (if they can reach node)
   - Other pods need to be updated to this port

- **LoadBalance**
   - Controls a LB endpoint external to the cluster
   - Only availalbe when infra provider gives you a LB (AWS ELB, etc)
   - Create NodePort + ClusterIP services, tells LB to send to NodePort

- **ExternalName**
   - Adds CNAME DNS record to CoreDNS only
   - Not used for Pods, but for giving pods a DNS name to use for something outside Kubernetes

- Kubernetes **Ingress**: We'll learn later


## Creating a clusterIP Service

- Open two 