---
layout: 'post'
title: 'Docker Matery: Section 9 - Service Updates: Changing things in flight'
permalink: 'docker_matery/docker-sections9-service-updates-changing-things-in-flight'
tags: udemy-docker  docker-service-update
---

- section9-79

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Service Updates

- Provides rolling replacement of tasks/containers in a service 
- Limits downtime (be careful with __prevents__ downtime)
   - __TEST EARLY + TEST OFTEN__
- Will replace containers for most changes
- Has many, many cli options to control the update
- Create options will usually change, adding `-add` or `-rm` to them
- Includes roolback and healthcheck options
- Also has scale & rollback subcommand for quicker access
   - `docker service scale web=4` and `docker service rollback web`
- A stack deploy, when pre-existing, will issue service updates


## Swarm Update Examples

- Just update the image used to a newer version
   - `docker service update --image myapp:1.2.1 <servicename>`
- Adding an environment variable and remove a port 
   - `dokcer service update --env-add NODE_ENV=production --publish-rm 8080`
- Change unmber of replicas of two services
   - `docker service scale web=8 api=6`

## Swarm Updates in Stack Files

- Same command. Just edit the YAML file, then 
   - `docker stack deploy -c file.yml <stackname>`

## 開始 Example

- `docker service create -p 8080:80 --name web nginx:1.13.7`

   ~~~
      PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> docker service create -p 8080:80 --name web nginx:1.13.7
      1rz9tan5xjtjyyuwwleympbt3
      overall progress: 1 out of 1 tasks                                                  
      1/1: running                                                                             
      verify: Service converged     
   ~~~

- Servcie scale
   - `docker service scale web=5`

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> docker service scale web=5
   web scaled to 5
   overall progress: 5 out of 5 tasks                                                                      
   1/5: running                                                                                            
   2/5: running                                                                                            
   3/5: running                                                                                            
   4/5: running                                                                                            
   5/5: running                                                                                            
   verify: Service converged   
   ~~~

- Service update
   - `docker servcie update --image nginx:1.13.6 web`
   - 把舊的刪掉 --> 建新的 --> 都ok --> 繼續

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> docker service update --image nginx:1.13.6 web
   web
   overall progress: 5 out of 5 tasks                                                                      
   1/5: running                                                                                            
   2/5: running                                                                                            
   3/5: running                                                                                            
   4/5: running                                                                                            
   5/5: running                                                                                            
   verify: Service converged  
   ~~~

- Chnage publish port 
   - `add` and `rm` at the same time
   - `docker service update --publish-rm 8080 --publish-add 9090:80 web`

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> docker service update --publish-rm 8080 --publish-add 9090:80 web
   web
   overall progress: 5 out of 5 tasks                                                                      
   1/5: running                                                                                            
   2/5: running                                                                                            
   3/5: running                                                                                            
   4/5: running                                                                                            
   5/5: running                                                                                            
   verify: Service converged  
   ~~~

- Docker tips
   - 優化 swarm 分配 node 
   - `docker service update --force web`

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> docker service update --force web
   web
   overall progress: 5 out of 5 tasks                                                                      
   1/5: running                                                                                            
   2/5: running                                                                                            
   3/5: running                                                                                            
   4/5: running                                                                                            
   5/5: running                                                                                            
   verify: Service converged  
   ~~~

- Examples Cleanup
   - `docker service rm web`

   ~~~
      PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> docker service rm web
      web
   ~~~