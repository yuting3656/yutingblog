---
layout: 'post'
title: 'Docker Mastery: Section 9 - Healthchecks in Dockerfiles'
permalink: 'docker_mastery/docker-sections9-healthchecks-in-dockerfiles'
tags: udemy-docker docker-healthchecks
---

- section9-80, 81

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Docker Healthchecks

- HEALTHCHECK was added in 1.12
- Supported in Dockerfile, Compose YAML, docker run, and Swarm Services
   - 老師強烈鼓勵在開發的時候，使用 Healthcheck cmd :)
- Docker engine will `exec`'s the command in the container 
   - e.g `curl localhost`
- It expects `exit 0` __(ok)__ or `exit 1` __(Error)__
- Three container states: starting, healthy, unhealthy
- Much better then __"is binary still running?"__
- Not a external monitoring replacement
- Healthcheck status shows up in `docker contaienr ls`
- Check last 5 healthchecks with `docker container inspect`
- Docker run does nothing with healthchecks
- Services will replace tasks if they fail healthcheck
- Service updates wait for them before continuing

## Healthcheck Docker Run Example

- Adding Healthchecks in run time

~~~sh
docker run \
   --health-cmd="curl -f localhost:9200/_cluster/health || false" \
   --health-interval=5s \
   --health-retries=3 \
   --health-timeout=2s \
   --health-start-period=15s \
   elasticsearch:2
~~~

## Healthcheck Dockerfile Examples

- Options for healthcheck command
   - `--interval=DURATION (default: 30s)`
   - `--timeout=DURATION (default: 30s)`
   - `--start-period=DURATION (default: 0s) (17.09+)`
   - `--retries=N (default: 3)`

- Basic command using default options
   - `HEALTHCHECK curl -f http://localhost/ || false`

- Custom options with the command
   ~~~
    HEALTHCHECK --timeout=2s --interval=3s --retries=3 \
       CMD curl -f http://localhost/ || exit 1
   ~~~

## Healthchekc in Nginx Dockerfile 

- Static website running in Nginx, just test default URL

~~~Dockerfile
FROM nginx:1.13
HEALTHCHECK --interval=30s --timeout=3s \
   CMD  curl -f http://localhost/ || exit 1 
~~~

## Healthcheck in PHP Nginx Dockerfile

- PHP-FPM running behind Nginx, test the Nginx and FPM status URLs

~~~Dockerfile
FROM your-nginx-php-fpm-combo-image

# don't do this if php-fpm is another container 
# must enable php-fpm ping/status in pool.ini
# must forward /ping and /status urls from nginx to php-fpm

HEALTHCHECK --interval-5s --timeout=3s \
   CMD curl -f http://localhost/ping || exit 1
~~~

## Healthcheck in postgres Dockerfile

- Use a PostgreSQL utility to test for ready state

~~~dockerfile
FROM postgres

# specify real user with -U to prevent errors in log

HEALTHCHECK --interval=5s --timeout=3s \
   CMD pg_isready -U postgres || exit 1
~~~

## Healthcheck in Compose/Stack Files

~~~yml
version: "2.1" #(minimum for healthchekcs)
servcies:
  web:
    image: nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 1m30s
      timeout: 10s
      retries: 3
      start_period: 1m # version 3.4 minimum
~~~

## Healthcheck Example:

- `docker container run --name p1 -d postgres`

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\healthcheck-1> docker container run --name p1 -d postgres                     
   2101d72fb70fbe48c9f688794ef53ddbb00833c251d8d0a12f17b0cbbe1c61d4
   ~~~

-  `docker container run --name p2 -d --health-cmd="pg_isready -U postgres || exit 1" postgres`
   - `docker contaienr ls` 看 contaienr 狀況
   - 超酷的拉～　可以看到健不健康　ＸＤ 

   ~~~
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\healthcheck-1> docker container run --name p2 -d --health-cmd="pg_isready -U postgres || exit 1" postgres
   aea0766a80f1f18074915a09efd089c0db14e3e64644539567b94efa395f8bea
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\healthcheck-1> docker container ls
   CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                            PORTS               NAMES
   aea0766a80f1        postgres            "docker-entrypoint.s…"   9 seconds ago       Up 8 seconds (health: starting)   5432/tcp            p2
   2101d72fb70f        postgres            "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes                      5432/tcp            p1
   ~~~

- `docker container inspect <contaeinr-name>`
   - `docker container inspect p2`
   - 可以看到多了 `"Health": {}`
   ~~~
      ... 
       "Health": {
           "Status": "healthy",
           "FailingStreak": 0,
           "Log": [
               {
                   "Start": "2020-03-10T07:03:11.576399Z",
                   "End": "2020-03-10T07:03:11.7052263Z",
                   "ExitCode": 0,
                   "Output": "/var/run/postgresql:5432 - accepting connections\n"
               },
               {
                   "Start": "2020-03-10T07:03:41.7178124Z",
                   "End": "2020-03-10T07:03:41.8325722Z",
                   "ExitCode": 0,
                   "Output": "/var/run/postgresql:5432 - accepting connections\n"
               },
               {
                   "Start": "2020-03-10T07:04:11.8411281Z",
                   "End": "2020-03-10T07:04:11.9714451Z",
                   "ExitCode": 0,
                   "Output": "/var/run/postgresql:5432 - accepting connections\n"
               },
               {
                   "Start": "2020-03-10T07:04:41.9874807Z",
                   "End": "2020-03-10T07:04:42.1301299Z",
                   "ExitCode": 0,
                   "Output": "/var/run/postgresql:5432 - accepting connections\n"
               },
               {
                   "Start": "2020-03-10T07:05:12.140623Z",
                   "End": "2020-03-10T07:05:12.2619583Z",
                   "ExitCode": 0,
                   "Output": "/var/run/postgresql:5432 - accepting connections\n"
               }
           ]
       }
   },

   ...
   ~~~

## Healthcheck: docker servcie 

   - `docker servcie create --name p2 --health-cmd="pg_isready -U postgres || exit 1" postgres`

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\healthcheck-1> docker service create --name p2  --health-cmd="pg_isready -U postgres || exit 1" postgres                                                        
fnqwhaeeosl3f5ltipkveukxz
overall progress: 0 out of 1 tasks                                                                      
1/1: ready               
~~~