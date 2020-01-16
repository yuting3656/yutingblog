---
layout: 'post'
title: 'Docker Matery: Section 6 - Adding image building to compose files'
permalink: 'docker_matery/docker-sections6-adding-image-building-to-compose-files'
tags: udemy-docker docker-compose
---

- section6-56

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Using Compose to Build

- Compose can also build your custom images
- Will build them with `docker-compose up` if not found in cache
- Also rebuild with `docker-compose build`
- Great for complex builds that have lots of vars or build args


- example

  - 從 `build` 的子項目，就是自己想要客製的 `image`
      - `dockerfile` 直接吃 寫好的 `nginx.Dockerfile`

~~~yml
version: '2'

# based off compose-sample-2, only we build nginx.conf into image
# uses sample site from https://startbootstrap.com/template-overviews/agency/

services:
  proxy:
    build:
      context: .
      dockerfile: nginx.Dockerfile
    image: nginx-custom
    ports:
      - '80:80'
  web:
    image: httpd
    volumes:
      - ./html:/usr/local/apache2/htdocs/
~~~


- Build

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-3> docker-compose up
Creating network "compose-sample-3_default" with the default driver
Building proxy
Step 1/2 : FROM nginx:1.13
 ---> ae513a47849c
Step 2/2 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> 836384373600
Successfully built 836384373600
Successfully tagged nginx-custom:latest
WARNING: Image for service proxy was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating compose-sample-3_proxy_1 ... done                                                                                                                                                                         Creating compose-sample-3_web_1   ... done                                                                                                                                                                         Attaching to compose-sample-3_proxy_1, compose-sample-3_web_1
web_1    | AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.25.0.3. Set the 'ServerName' directive globally to suppress this message
web_1    | AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.25.0.3. Set the 'ServerName' directive globally to suppress this message
web_1    | [Thu Jan 16 05:47:22.739493 2020] [mpm_event:notice] [pid 1:tid 140393846105216] AH00489: Apache/2.4.41 (Unix) configured -- resuming normal operations
web_1    | [Thu Jan 16 05:47:22.742767 2020] [core:notice] [pid 1:tid 140393846105216] AH00094: Command line: 'httpd -D FOREGROUND'
~~~



## docker-compose down --help

- help

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-3> docker-compose down --help
Stops containers and removes containers, networks, volumes, and images
created by `up`.

By default, the only things removed are:

- Containers for services defined in the Compose file
- Networks defined in the `networks` section of the Compose file
- The default network, if one is used

Networks and volumes defined as `external` are never removed.

Usage: down [options]

Options:
    --rmi type              Remove images. Type must be one of:
                              'all': Remove all images used by any service.
                              'local': Remove only images that don't have a
                              custom tag set by the `image` field.
    -v, --volumes           Remove named volumes declared in the `volumes`
                            section of the Compose file and anonymous volumes
                            attached to containers.
    --remove-orphans        Remove containers for services not defined in the
                            Compose file
    -t, --timeout TIMEOUT   Specify a shutdown timeout in seconds.
                            (default: 10)
~~~

- __local__: Remove only images that don't have a custom tag set by the `image` field.

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\compose-sample-3> docker-compose down --rmi local
Stopping compose-sample-3_web_1   ... done                                                              
Stopping compose-sample-3_proxy_1 ... done                                                              
Removing compose-sample-3_web_1   ... done                                                              
Removing compose-sample-3_proxy_1 ... done                                                             
Removing network compose-sample-3_default
Removing image compose-sample-3_proxy
~~~