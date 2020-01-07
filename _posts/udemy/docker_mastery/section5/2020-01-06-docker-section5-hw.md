---
layout: 'post'
title: 'Docker Matery: Section 5 作業阿～！！！ Named Volumes'
permalink: 'docker_matery/docker-sections4-hw-named-volumes'
tags: udemy-docker docker-volumes
---

- section3-48

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Named Volumes 

- Database upgrade with containers
- Create a `postgres` container with named volume psql-data using versin `9.6.1`
- Use Docker Hub to learn `VOLUME` path and versions needed to run it 
- Checks logs, stop container
- Create a new `postgres` container with same named volume using `9.6.2`
- Check logs to validate 
- (this only works with path versions, most SQL DB's require manual commands to upgrade DB's to major/minor versions, i.e. it's a DB limitation not a container one)


## 看 Docker Hub 可以知道 Volume 會放在哪裡~

- Docker Hub 指出 Volume 位置:

   - `/var/lib/postgresql/data`

- 看 running container 的 log

   - `docker container logs -f psql`
   - `-f` follow 持續觀察