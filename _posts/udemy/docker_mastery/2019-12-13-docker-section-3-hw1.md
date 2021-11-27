---
layout: "single"
title: 'Docker Mastery: 作業阿!!!! Manage Multiple Containers'
permalink: 'docker_mastery/docker-sections3-hw1-manage-multiple-containers'
tags: udemy-docker
---



## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Assignment

- docs.docker.com and `--help` are your friend 
- Run a `nginx`, a  `mysql`, and a `httpd` (apache) server
- Run all of them `--detach` (or `-d`), name them with `--name`
- nginx should listen on `80:80`, httpd on `8080:80`, mysql on `3306:3306`
- When running `mysql`, use the `--env` option (or `-e`) to pas in `MYSQL_RANDOM_ROOT_PASSWORD=yes`
- Use `docker container logs` on mysql to find the random password it created on startup
- Clean it all up with `docker container sotp` and `docker container rm` 
- Use `docker container ls` to ensure everything is correccrt before and after cleanup

#### 我的作業

- nginx

   - `docker container run --publish 80:80 --name yuting-nginx --detach nginx`

~~~
PS E:\> docker container run --publish 80:80 --name yuting-nginx --detach nginx
e10c35c12df48fca0540344e96475de70b8e17ff4032817124f47618e656ec6d
PS E:\> docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
e10c35c12df4        nginx               "nginx -g 'daemon of…"   9 seconds ago       Up 8 seconds        0.0.0.0:80->80/tcp   yuting-nginx
~~~

- httpd

   - `docker container run --publish 8080:80 --name yuting_httpd -d httpd`

~~~
PS E:\> docker container run --publish 8080:80 --name yuting_httpd -d httpd
Unable to find image 'httpd:latest' locally
latest: Pulling from library/httpd
000eee12ec04: Already exists
32b8712d1f38: Pull complete 
f1ca037d6393: Pull complete
c4bd3401259f: Pull complete 
51c60bde4d46: Pull complete  
Digest: sha256:ac6594daaa934c4c6ba66c562e96f2fb12f871415a9b7117724c52687080d35d
Status: Downloaded newer image for httpd:latest
5350ab1bf8092043964f3f1c92626aff2e034bb13c7299baad875ee24f1cfec3
PS E:\> docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
5350ab1bf809        httpd               "httpd-foreground"       58 seconds ago      Up 56 seconds       0.0.0.0:8080->80/tcp   yuting_httpd
e10c35c12df4        nginx               "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:80->80/tcp     yuting-nginx
~~~

- mysql 

   - `docker container run --publish 3306:3306 --name yuting_mysql -d mysql --env MYSQL_RANDOM_ROOT_PASSWORD=yes`

~~~
PS E:\> docker container run --publish 3306:3306 --name yuting_mysql -d mysql --env MYSQL_RANDOM_ROOT_PASSWORD=yes
Unable to find image 'mysql:latest' locally
latest: Pulling from library/mysql
d599a449871e: Pull complete                                                                                                                                       
f287049d3170: Pull complete                                                                                                                                       
08947732a1b0: Pull complete                                                                                                                                       
96f3056887f2: Pull complete                                                                                                                                       
871f7f65f017: Pull complete                                                                                                                                       
1dd50c4b99cb: Pull complete                                                                                                                                       
5bcbdf508448: Pull complete                                                                                                                                       
a59dcbc3daa2: Pull complete                                                                                                                                       
13e6809ab808: Pull complete                                                                                                                                       
2148d51b084d: Pull complete                                                                                                                                       
93982f7293d7: Pull complete                                                                                                                                       
e736330a6d9c: Pull complete                                                                                                                                       
Digest: sha256:c93ba1bafd65888947f5cd8bd45deb7b996885ec2a16c574c530c389335e9169
Status: Downloaded newer image for mysql:latest
1a9c5a0ab29aaf54673c8d7f8b343d432905d2cb3ecde47f8ab1a3ee1481b84d
~~~

   - Use `docker container logs` on mysql to find the random password it created on startup

      - `docker container logs yuting_mysql`

      - ~~~
         PS E:\> docker container logs yuting_mysql
         2019-12-13 04:44:58+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.18-1debian9 started.
         2019-12-13 04:44:58+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
         2019-12-13 04:44:58+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.18-1debian9 started.
         2019-12-13 04:44:59+00:00 [ERROR] [Entrypoint]: Database is uninitialized and password option is not specified
         You need to specify one of MYSQL_ROOT_PASSWORD, MYSQL_ALLOW_EMPTY_PASSWORD and MYSQL_RANDOM_ROOT_PASSWORD
      ~~~

   - 然後我發現 mysql 沒跑起來 哈哈 所以來看解答吧 XDD
      
      - ~~~
       PS E:\> docker container ls -a
       CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                  NAMES
       aae71d7d2b94        mysql               "docker-entrypoint.s…"   16 seconds ago      Exited (1) 13 seconds ago                          yuting_mysql
       5350ab1bf809        httpd               "httpd-foreground"       27 minutes ago      Up 27 minutes               0.0.0.0:8080->80/tcp   yuting_httpd
       e10c35c12df4        nginx               "nginx -g 'daemon of…"   30 minutes ago      Up 30 minutes               0.0.0.0:80->80/tcp     yuting-nginx
      ~~~

   - __靠邀__ --env (-e) 參數 要加在 mysql(image) 前面 XDDDD

      - `docker container run -d -p 3306:3306 --name yuting_mysql -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql`

      - ~~~
         PS E:\> docker container run -d -p 3306:3306 --name yuting_mysql -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
         26258113c92638f0fe3dc4a3b87e1fd4adeacec74d36256ec46d9c7ed01f51c2
         PS E:\> docker container ls
         CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
         26258113c926        mysql               "docker-entrypoint.s…"   11 seconds ago      Up 9 seconds        0.0.0.0:3306->3306/tcp, 33060/tcp   yuting_mysql
         5350ab1bf809        httpd               "httpd-foreground"       34 minutes ago      Up 34 minutes       0.0.0.0:8080->80/tcp                yuting_httpd
         e10c35c12df4        nginx               "nginx -g 'daemon of…"   37 minutes ago      Up 37 minutes       0.0.0.0:80->80/tcp                  yuting-nginx
      ~~~
    
- 看 mysql logs 

~~~
PS E:\> docker container logs yuting_mysql
2019-12-13 04:52:21+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.18-1debian9 started.
2019-12-13 04:52:21+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2019-12-13 04:52:21+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.18-1debian9 started.
2019-12-13 04:52:22+00:00 [Note] [Entrypoint]: Initializing database files
2019-12-13T04:52:22.064005Z 0 [Warning] [MY-010139] [Server] Changed limits: max_open_files: 1024 (requested 8161)
2019-12-13T04:52:22.064008Z 0 [Warning] [MY-010142] [Server] Changed limits: table_open_cache: 431 (requested 4000)
2019-12-13T04:52:22.064178Z 0 [Warning] [MY-011070] [Server] 'Disabling symbolic links using --skip-symbolic-links (or equivalent) is the default. Consider not using this option as it' is deprecated and will be removed in a future release.
2019-12-13T04:52:22.064560Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.0.18) initializing of server in progress as process 55
2019-12-13T04:52:22.073425Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /var/lib/mysql/ is case insensitive
2019-12-13T04:52:30.525213Z 5 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
2019-12-13 04:52:34+00:00 [Note] [Entrypoint]: Database files initialized
2019-12-13 04:52:34+00:00 [Note] [Entrypoint]: Starting temporary server
2019-12-13T04:52:35.000628Z 0 [Warning] [MY-010139] [Server] Changed limits: max_open_files: 1024 (requested 8161)
2019-12-13T04:52:35.000631Z 0 [Warning] [MY-010142] [Server] Changed limits: table_open_cache: 431 (requested 4000)
2019-12-13T04:52:35.208490Z 0 [Warning] [MY-011070] [Server] 'Disabling symbolic links using --skip-symbolic-links (or equivalent) is the default. Consider not using this option as it' is deprecated and will be removed in a future release.
2019-12-13T04:52:35.209065Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.18) starting as process 104
2019-12-13T04:52:35.217448Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /var/lib/mysql/ is case insensitive
2019-12-13T04:52:36.823856Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2019-12-13T04:52:36.857386Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2019-12-13T04:52:36.895193Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.18'  socket: '/var/run/mysqld/mysqld.sock'  port: 0  MySQL Community Server - GPL.
2019-12-13 04:52:36+00:00 [Note] [Entrypoint]: Temporary server started.
2019-12-13T04:52:37.048558Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Socket: '/var/run/mysqld/mysqlx.sock'
Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.
2019-12-13 04:52:40+00:00 [Note] [Entrypoint]: GENERATED ROOT PASSWORD: oh9OotooCetheiJeeniex9ohveeGhae3

2019-12-13 04:52:40+00:00 [Note] [Entrypoint]: Stopping temporary server
2019-12-13T04:52:40.550096Z 10 [System] [MY-013172] [Server] Received SHUTDOWN from user root. Shutting down mysqld (Version: 8.0.18).
2019-12-13T04:52:42.700754Z 0 [System] [MY-010910] [Server] /usr/sbin/mysqld: Shutdown complete (mysqld 8.0.18)  MySQL Community Server - GPL.
2019-12-13 04:52:43+00:00 [Note] [Entrypoint]: Temporary server stopped

2019-12-13 04:52:43+00:00 [Note] [Entrypoint]: MySQL init process done. Ready for start up.

2019-12-13T04:52:43.561476Z 0 [Warning] [MY-010139] [Server] Changed limits: max_open_files: 1024 (requested 8161)
2019-12-13T04:52:43.561479Z 0 [Warning] [MY-010142] [Server] Changed limits: table_open_cache: 431 (requested 4000)
2019-12-13T04:52:43.795130Z 0 [Warning] [MY-011070] [Server] 'Disabling symbolic links using --skip-symbolic-links (or equivalent) is the default. Consider not using this option as it' is deprecated and will be removed in a future release.
2019-12-13T04:52:43.795704Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.18) starting as process 1
2019-12-13T04:52:43.808541Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /var/lib/mysql/ is case insensitive
2019-12-13T04:52:45.408978Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2019-12-13T04:52:45.419809Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2019-12-13T04:52:45.466338Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.18'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
2019-12-13T04:52:45.647664Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Socket: '/var/run/mysqld/mysqlx.sock' bind-address: '::' port: 33060
~~~
