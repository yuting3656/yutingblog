---
layout: "post"
title: "Docker Mastery: Section 14 Exposing K8s Ports"
permalink: "docker_mastery/docker-sections14-exposing-k8s-ports"
tags: udemy-docker k8s k8s-ports
---

- section14-105, 106, 106

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

- **ClusterIP (default)** `only good in the cluter`

  - Single, internal virtual IP allocated
  - Only reachable from within cluster (nodes and pods)
  - Pods and reach service on apps port number

- **NodePort** (outside cluster) `outside the cluster to talk to servers`
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

# Creating a ClusterIP Service

- Open two shell windows so we can watch this
  - `kubectl get pods -w` **`-w` keep watching!**
- In second window, lets start a simple http server using sample code

  - `kubectl create deployment httpenv --image=bretfisher/httpenv`

  <!-- |![Imgur](https://i.imgur.com/bwUwNqh.png)| -->

- Scale it to 5 replicas

  - `kubectl scale deployment/httpenv --replicas=5`

  <!-- |![Imgur](https://i.imgur.com/bueDuZp.png)| -->

- Let's create a ClusterIP service **(default)**

  - `kubectl expose deployment/httpenv --port 8888`
  - this will create in front of deployment

## Inspecting ClusterIP Service

- Look up what IP was allocated

  - `kubectl get service`

  - ```bash
       PS E:\> kubectl get service
       NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
       httpenv ClusterIP 10.105.110.129 <none> 888/TCP 35m
       kubernetes ClusterIP 10.96.0.1 <none> 443/TCP 130d
    ```

- Remember this IP is cluster **internal** only, how do we curl it ?

- If you're on Docker Desktop (Host OS is not container OS) -

  - `kubectl run --generator run-pod/v1 tmp-shell --rm -it --image brefisher/netshoot -- bash`

    - `--generator` type of template **[k8s v1.17 deprecated lol..](https://v1-17.docs.kubernetes.io/docs/reference/kubectconventions/#generators){:target="\_back"}**
    - `tmp-shell` 自己對 `template`命的名字拉
    - ` -- bash` `--` 告訴 run command stop looking options, `bash` 就給哥跑 bash 就對了!
    - **靠! 上面都廢話了 直接**

      - `kubectl run tmp-shell --rm -it --image bretfisher/netshoot bash` 進去

        > 我們創建的 service name 會 default 為 DNS name
        >
        > `kubectl expose deployment/httpenv --port 8888`
        >
        > `curl httpevn:8888`

        ```
           PS E:\> kubectl run tmp-shell --rm -it --image bretfisher/netshoot -- bash
           If you don't see a command prompt, try pressing enter.
           bash-5.0# curl httpenv:8888
           {"HOME":"/root","HOSTNAME":"httpenv-6fdc8554fb-gk69s","KUBERNETES_PORT":"tcp://10.96.0.1:443","KUBERNETES_PORT_443_TCP":"tcp://10.96.0.1:443","KUBERNETES_PORT_443_TCP_ADDR":"10.96.0.1","KUBERNETES_PORT_443_TCP_PORT":"443","KUBERNETES_PORT_443_TCP_PROTO":"tcp","KUBERNETES_SERVICE_HOST":"10.96.0.1","KUBERNETES_SERVICE_PORT":"443","KUBERNETES_SERVICE_PORT_HTTPS":"443","PATH":"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"}
        ```

        - pod name is hostname
        - and other k8s default info

- If you're on linux host

  - `curl [ip of service]:8888`

> 好颱風天 這樣就棒棒了
>
> 掰掰!
