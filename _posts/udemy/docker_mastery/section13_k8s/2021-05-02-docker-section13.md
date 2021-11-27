---
layout: "single"
title: "Docker Mastery: Section 13- Kubernetes install and your first pod"
permalink: "docker_mastery/docker-sections13-kubernetes-install-and-your-first-pod"
tags: udemy-docker k8s
---

- section13-95, 96, 99, 100, 101, 102, 103, 104

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="\_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="\_back"}

- [講師的 YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="\_back"}

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

|                  master                   |                    pod                    |
| :---------------------------------------: | :---------------------------------------: |
| ![Imgur](https://i.imgur.com/rdJyc3k.png) | ![Imgur](https://i.imgur.com/vZgrU3W.png) |

## k8s in Browser

- [https://labs.play-with-k8s.com/](https://labs.play-with-k8s.com/){:target="\_back"}
- [https://katacoda.com/](https://katacoda.com/){:target="\_back"}

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

  > **kubectl run** (changing to be only for pod creation) `close to docker run` > **kubectl create** (create some resources via CLI or YAML) `similar to docker create swarm` > **kubectl apply** (create/update anything via YAML) `similar to stack create in swarm`

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

  ```
     PS E:\> kubectl get pods
     NAME                        READY   STATUS    RESTARTS   AGE
     my-nignx-6d56574fff-mfdhf   1/1     Running   0          2m3s
  ```

  - `kubectl run` does the name before version 1.18

- Let's see all objects
  - `kubectl get all`
  ```
     PS E:\> kubectl get all
     NAME                            READY   STATUS    RESTARTS   AGE
     pod/my-nignx-6d56574fff-mfdhf   1/1     Running   0          4m35s

     NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
     service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   8m13s

     NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
     deployment.apps/my-nignx   1/1     1            1           4m35s

     NAME                                  DESIRED   CURRENT   READY   AGE
     replicaset.apps/my-nignx-6d56574fff   1         1         1       4m35s
  ```

> Pods -> ReplicaSet -> Deployment

![Imgur](https://i.imgur.com/J6XTFEW.png)

## Cleanup

- Let's remove the Deployment
  - `kubectl delete deployment my-nginx`

## 1.18 Changes to Kubectl Run

- **Starting in version 1.18 (released March 2020), the kubectl run command only does one thing: create single pods.**

  - There were many reasons for this, but the big ones were to reduce the complexity of how the `run` command worked and to move other resource creation to the kubectl create command. The idea is that `kubectl run` is now similar to `docker run`. It creates a single pod, where docker run creates a single container.

- A majority of us won't be able to use 1.18 for months if not a year or longer, many clouds and production Kubernetes products don't even support 1.17 (or 1.16) yet. I feel it's still important to know the old way that run has always worked, for at least the rest of 2020.

- I've decided not to replace all the videos just yet, and to keep the "old" way of doing things intact, while giving you info on the differences in these text lectures.

- Depending on which version of Kubernetes you have installed, you'll need to decide how you'll create objects. Here's a cheat sheet for how old commands should be used with the 1.18 changes.

- `kubectl run nginx --image nginx`

  - created a Deployment named nginx **before** 1.18 (which creates a ReplicaSet, which creates a Pod)

- `kubectl run nginx --image nginx` creates a Pod named nginx **in** 1.18+

- Creating a Deployment in 1.18: `kubectl create deployment nginx --image nginx`

## Scaling ReplicaSets

- Start a new deployment fro one replica/pod
  - `kubectl run my-apache --image httpd`
- Let's scale it up with another pod
  - `kubectl scale deploy/my-apache --replicas 2`
  - `kubectl scale deployment my-apache --replicas 2`
  - those are the same command
  - deploy = deployment = deployments

```zh
$ kubectl create deployment my-apache --image httpd
>> deployment.apps/my-apache created
```

```zh
$ kubectl get all

NAME                             READY   STATUS              RESTARTS   AGE
pod/my-apache-7b68fdd849-nw82c   0/1     ContainerCreating   0          10s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   2m

NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/my-apache   0/1     1            0           10s

NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/my-apache-7b68fdd849   1         1         0       10s
```

```zh
$ kubectl scale deploy/my-apache --replicas 2
>> deployment.apps/my-apache scaled
```

```zh
$ kubectl get all

NAME                             READY   STATUS    RESTARTS   AGE
pod/my-apache-7b68fdd849-hh2sp   1/1     Running   0          2m6s
pod/my-apache-7b68fdd849-nw82c   1/1     Running   0          2m35s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   4m25s

NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/my-apache   2/2     2            2           2m35s

NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/my-apache-7b68fdd849   2         2         2       2m35s
```

|![Imgur](https://i.imgur.com/Y73DDlk.png)|
|![Imgur](https://i.imgur.com/RMJet6l.png)|![Imgur](https://i.imgur.com/lLOh4bh.png)|
|![Imgur](https://i.imgur.com/8SAvaMO.png)|

## Inspecting Deployment Objects

- `kubectl get pods`

```
$ kubectl get pods
NAME                         READY   STATUS    RESTARTS   AGE
my-apache-7b68fdd849-hh2sp   1/1     Running   0          9m27s
my-apache-7b68fdd849-nw82c   1/1     Running   0          9m56s
```

- Get container logs
  - `kubectl logs <deploy/name>`
  - `kubectl logs deployment/my-apache --follow --tail 1`
  - get objects by its label! **kubectl do that for us :)**
  - `kubectl logs -l run=my-apache`
    - `-l`: label
    - `run=my-apache`: using **run** command

```
$ kubectl logs deploy/my-apache
Found 2 pods, using pod/my-apache-7b68fdd849-nw82c
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 10.1.0.8. Set the 'ServerName' directive globally to suppress this message
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 10.1.0.8. Set the 'ServerName' directive globally to suppress this message
[Sat May 01 18:17:04.143475 2021] [mpm_event:notice] [pid 1:tid 139832916620416] AH00489: Apache/2.4.46 (Unix) configured -- resuming normal operations
[Sat May 01 18:17:04.143670 2021] [core:notice] [pid 1:tid 139832916620416] AH00094: Command line: 'httpd -D FOREGROUND'
```

- Get a bunch of details about an object, including events!

  - `kubectl describe pod/my-apache-xxxx-yyyy`

  ```
     $ kubectl get pods

     NAME                         READY   STATUS    RESTARTS   AGE
     my-apache-7b68fdd849-hh2sp   1/1     Running   0          20m
     my-apache-7b68fdd849-nw82c   1/1     Running   0          21m

     $ kubectl describe pod/my-apache-7b68fdd849-hh2sp

     Name:         my-apache-7b68fdd849-hh2sp
     Namespace:    default
     Priority:     0
     Node:         docker-desktop/192.168.65.4
     Start Time:   Sun, 02 May 2021 02:16:58 +0800
     Labels:       app=my-apache
                   pod-template-hash=7b68fdd849
     Annotations:  <none>
     Status:       Running
     IP:           10.1.0.9
     IPs:
       IP:           10.1.0.9
     Controlled By:  ReplicaSet/my-apache-7b68fdd849
     Containers:
       httpd:
         Container ID:   docker://c1591684612622108a1eb9c4d4ad3e722fb840af2a7469f7cb6af6ac6ac98b9e
         Image:          httpd
         Image ID:       docker-pullable://httpd@sha256:a6e472ad921c93d9fc2cbe2ff07560b9a526c145c4e10faff3aeb28c48cce585
         Port:           <none>
         Host Port:      <none>
         State:          Running
           Started:      Sun, 02 May 2021 02:17:07 +0800
         Ready:          True
         Restart Count:  0
         Environment:    <none>
         Mounts:
           /var/run/secrets/kubernetes.io/serviceaccount from default-token-jqdzx (ro)
     Conditions:
       Type              Status
       Initialized       True
       Ready             True
       ContainersReady   True
       PodScheduled      True
     Volumes:
       default-token-jqdzx:
         Type:        Secret (a volume populated by a Secret)
         SecretName:  default-token-jqdzx
         Optional:    false
     QoS Class:       BestEffort
     Node-Selectors:  <none>
     Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                      node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
     Events:
       Type    Reason     Age   From               Message
       ----    ------     ----  ----               -------
       Normal  Scheduled  21m   default-scheduler  Successfully assigned default/my-apache-7b68fdd849-hh2sp to docker-desktop
       Normal  Pulling    21m   kubelet            Pulling image "httpd"
       Normal  Pulled     21m   kubelet            Successfully pulled image "httpd" in 6.149594261s
       Normal  Created    21m   kubelet            Created container httpd
       Normal  Started    21m   kubelet            Started container httpd
  ```

- Watch a command (without needing `watch`)
  - `kubctl get pods -w`
- In a separate tab/window
  - `kubectl delete pod/my-apache-xxxx-yyyy`
- Watch the pod get re-created
  |![Imgur](https://i.imgur.com/YDiUQi0.png)|

## CleanUp

```
$ kubectl delete deploy/my-apache
deployment.apps "my-apache" deleted
```
