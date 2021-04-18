---
layout: 'post'
title: 'Docker Mastery: Section 13- Kubernetes install and your first pod'
permalink: 'docker_mastery/docker-sections13-kubernetes-install-and-your-first-pod'
tags: udemy-docker k8s
---

- section13-95, 96, 99

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

> 拖好久阿~~~~~~~~~~~~~~~~~~~~~~~ !!!

## Section 13 Intro


- K8s local install
- K8s Container Abstractions
- Kubectl Run, Create, Apply
- Our First Pod
- Scaling ReplicaSets
- Inpsecting Objects 

## Basic Terms: System Parts
- Kubernetes: The whole orchestration system
   - K8s "k-eights" or Kube for short
- Kubectl: CLI to configure Kubernetes and manage apps
   - Using "cube control" official pronunciation
- Node: Single server in the Kubernetes cluster
- Kubelet: Kubernetes agent running on nodes
- Control Plane: Set of containers that manage the cluster
   - Includes API server, scheduler, controller manager, etcd, and more
   - Sometimes called the "master"

![Imgur](https://i.imgur.com/ZoVrX8R.png)

|master|pod|
|:---:|:---:|
|![Imgur](https://i.imgur.com/rdJyc3k.png)|![Imgur](https://i.imgur.com/vZgrU3W.png)|


## k8s in Browser

- [https://labs.play-with-k8s.com/](https://labs.play-with-k8s.com/){:target="_back"}
- [https://katacoda.com/](https://katacoda.com/){:target="_back"}


## Kubernetes Container Abstractions

- **Pod**: one ore more containers running together on one Node
   - Basic unit of deployment. Containers are always in pods.
- **Controller**: For creating/updating pods and other objects
   - Many types of Controllers inc. Deployment, ReplcaSet, StatefulSet, DeamonSet, Job, CronJob, etc.
- **Service**: network endpoint to connect to a pod
- **Namespace**: Filtered group of objects in cluster
- **Secrets, ConfigMapx, and more**

## Kubernetes Run, Create, and Apply

- Kubernetes is evolving, and so is the CLI
> There are multiple ways to do this!

- We get three ways to create pods from the kubectl CLI 
   > **kubectl run** (changing to be only for pod creation) `close to docker run`
   > **kubectl create** (create some resources via CLI or YAML) `similar to docker create swarm`
   > **kubectl apply** (create/update anything via YAML) `similar to stack create in swarm`

- For now we'll just use **run** or **create** CLI
- Later we'll learn YAML and pods/cons of each

## Our First Pod With Kubectl run 

- Are we working?
   - `kubectl version`
- Two ways to deploy Pods(containers): **Via commands** , or via **YAML**

- Let's run a pod of the nginx web server!
   - `kubectl run my-nginx --image nginx` ( create a deployment in 1.18: `kubectl creaete deployment my-nginx --image nginx`)
   - ignore warnning for now
- Let's list the pod 
   - `kubectl get pods`
   ~~~
      PS E:\> kubectl get pods
      NAME                        READY   STATUS    RESTARTS   AGE
      my-nignx-6d56574fff-mfdhf   1/1     Running   0          2m3s
   ~~~
   - `kubectl run` does the name before version 1.18

- Let's see all objects
   - `kubectl get all`
   ~~~
      PS E:\> kubectl get all
      NAME                            READY   STATUS    RESTARTS   AGE
      pod/my-nignx-6d56574fff-mfdhf   1/1     Running   0          4m35s
      
      NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
      service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8m13s
      
      NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
      deployment.apps/my-nignx   1/1     1            1           4m35s
      
      NAME                                  DESIRED   CURRENT   READY   AGE
      replicaset.apps/my-nignx-6d56574fff   1         1         1       4m35s
   ~~~

> Pods -> ReplicaSet -> Deployment

![Imgur](https://i.imgur.com/J6XTFEW.png)

## Cleanup

- Let's remove the Deployment
   - `kubectl delete deployment my-nginx

## 1.18 Changes to Kubectl Run

- **Starting in version 1.18 (released March 2020), the kubectl run command only does one thing: create single pods.**
   -  There were many reasons for this, but the big ones were to reduce the complexity of how the `run` command worked and to move other resource creation to the kubectl create command. The idea is that `kubectl run` is now similar to `docker run`. It creates a single pod, where docker run creates a single container.

- A majority of us won't be able to use 1.18 for months if not a year or longer, many clouds and production Kubernetes products don't even support 1.17 (or 1.16) yet. I feel it's still important to know the old way that run has always worked, for at least the rest of 2020.

- I've decided not to replace all the videos just yet, and to keep the "old" way of doing things intact, while giving you info on the differences in these text lectures.

- Depending on which version of Kubernetes you have installed, you'll need to decide how you'll create objects. Here's a cheat sheet for how old commands should be used with the 1.18 changes.

- `kubectl run nginx --image nginx`
   - created a Deployment named nginx **before** 1.18 (which creates a ReplicaSet, which creates a Pod)

- `kubectl run nginx --image nginx` creates a Pod named nginx **in** 1.18+

- Creating a Deployment in 1.18: `kubectl create deployment nginx --image nginx`