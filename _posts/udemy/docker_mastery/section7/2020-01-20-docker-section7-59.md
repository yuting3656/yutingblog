---
layout: 'post'
title: 'Docker Matery: Section 7 - Swarm intro & creating a 3-Node Swarm Cluster'
permalink: 'docker_matery/docker-sections7-swarm-intro'
tags: udemy-docker swarm
---

- section7-59

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Containers Everywhere = New Problems

- How do we automate container lifecycle ?
- How can we easily scale out/in/up/down ?
- How can we ensure our containers are re-created if they fail ?
- How can we replace containers without downtime (blue/green deploy) ?
- Hoe can we control/track where containers get started ?
- How can we create cross-node virtual networks ?
- How can we ensure only trusted servers run our containers ?
- Hoe can we store secrets, keys, passwords and get them to the right container (and only that container) ?

## Swarm Mode: Built-In Orchestration

- Swarm Mode is a clustering solution built inside Docker
- Not related to Swarm "classid" for pre-1.12 versions
- Added in 1.12 (Summer 2016) via Swarmkit toolkit
- Enhanced in 1.13 (January 2017) via Stacks and Secrets
- Not enabled by default, new commands once enabled
   - `docker swarm`
   - `docker node`
   - `docker service`
   - `docker stack`
   - `docker secret`

- |![Imgur](https://i.imgur.com/oL2VX5e.jpg)|
- |![Imgur](https://i.imgur.com/QlGhxez.jpg)|

> 靠杯! 老師講的很清楚，我聽的很模糊...

- |![Imgur](https://i.imgur.com/uEY47qk.jpg)|

- RAFT

   - ![Imgur](https://i.imgur.com/EaflwNE.jpg)


## Swarm Mode Deep Dive

- part 1 

   - <iframe  src="https://www.youtube.com/embed/dooPhkXT9yI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- part 2

   - <iframe  src="https://www.youtube.com/embed/_F6PSP-qhdA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- good reference:
 
    - [https://speakerdeck.com/aluzzardi/heart-of-the-swarmkit-topology-management?slide=3](https://speakerdeck.com/aluzzardi/heart-of-the-swarmkit-topology-management?slide=3){:target="_back"}
    - [http://thesecretlivesofdata.com/raft/](http://thesecretlivesofdata.com/raft/){:target="_back"}


