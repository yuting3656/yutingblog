---
layout: 'post'
title: 'Docker Matery: docker networks'
permalink: 'docker_matery/docker-networks'
tags: udemy-docker 
---

- section3-27, 28, 29, 30

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Concepts for Private and Public Comms in Containers

- review of `docker container run -p`
- For local dev/testing, networks usually 'just work'
- `docker container port <container>` --> prot check


## Docker Networks Defaults 

- Each container connected to a private virtual network "bridge"
- Each virtual network routes throught NAT firewall on host IP
- All containers on a virtual network can talk to each other withou `-p`
- Best practice is to create a new virtual network for each app:
   - network "my_web_app" for mysql and php/apache containers
   - network "my_api" for mongo and nodejs contaienrs

- "Batteries included, But Removable"
   - Defaults work well in many cases, but easy to swap out parts to customize it
- Make new virtual networks
- Attach containers to more then one virtual network (or none)
- Skip virtual networks and use host IP (--net=host)
- Use different Docker network drivers to gain new abilities


#### docker container port <container-name>

~~~
PS E:\> docker container run -p 80:80 --name wehost -d nginx
af15feb619aae2d2ce67135383dfa5282decd8afabd69bc033b51b81a964419b
PS E:\> docker container port wehost
80/tcp -> 0.0.0.0:80
~~~

 
#### docker container inspect --format

- `format`

   - A common option for formatting the output of commands using "Go templates"

   - 影片有出現 ip, 我本機用沒有 不知道為啥 TAT!
~~~
PS E:\> docker container inspect --format "{{println .NetworkSettings.IPAddress }}" wehost

~~~
