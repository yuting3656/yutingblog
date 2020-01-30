---
layout: 'post'
title: 'Docker Matery: Section 8 - (Swarm) scaling out with overaly networking'
permalink: 'docker_matery/docker-sections8-scaling-out-with-overlay-networking'
tags: udemy-docker swarm
---

> 初六 開工摟~~~

- section8-64

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Overlay Multi-Host Networking

- Just choose `--driver overlay` when creating network
- For container-to-container traffic inside a single Swarm
- Optinoal IPSec (AES) encryption on network creation
- Each service can be conneteced to multiple networks
   - (e.g. front-end, back-end)



### 實作: 用 [Creating-3-Node](https://yuting3656.github.io/yutingblog/docker_matery/docker-sections7-swarm-create-a-3-node-swarm-cluster){:target="_back"}為基底

- `docker network create --driver overlay mydrupal`

~~~
root@node1:~# docker network create --driver overlay mydrupal
bi0v9pic3gr0aziph8ljriuhg
root@node1:~# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
ae929b8c464b        bridge              bridge              local
f92e61dfa5dc        docker_gwbridge     bridge              local
51dca3ad7e02        host                host                local
9r57paqcqdba        ingress             overlay             swarm
bi0v9pic3gr0        mydrupal            overlay             swarm
6f34de753d50        none                null                local
~~~


- `docker service create --name psql --network mydrupal -e POSTGRES_PASSWORD=mypass postgres`

   - 忘了 `docker servcie` ?? 
      - 看[我的筆記](https://yuting3656.github.io/yutingblog//docker_matery/docker-sections7-swarm-create-first-service-and-scale-it-locally){:target="_back"}
   

~~~
root@node1:~# docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
tv0zvqi2amq6        psql                replicated          1/1                 postgres:latest
root@node1:~# docker service ps psql
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
eic1zzxxhoen        psql.1              postgres:latest     node1               Running             Running 43 seconds ago                     
~~~

- 看 postgres container logs
   - 先用 `docker container ls` 找出 id
   - `dokcer container logs <container-id>`

~~~
root@node1:~# docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
e8ec07d49eab        postgres:latest     "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        5432/tcp            psql.1.eic1zzxxhoen8zvppnyol8t45
root@node1:~# docker container logs psql.1.eic1zzxxhoen8zvppnyol8t45
The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale "en_US.utf8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

fixing permissions on existing directory /var/lib/postgresql/data ... ok
creating subdirectories ... ok
selecting dynamic shared memory implementation ... posix
selecting default max_connections ... 100
selecting default shared_buffers ... 128MB
selecting default time zone ... Etc/UTC
creating configuration files ... ok
running bootstrap script ... ok
performing post-bootstrap initialization ... ok
syncing data to disk ... ok

initdb: warning: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the option -A, or
--auth-local and --auth-host, the next time you run initdb.

Success. You can now start the database server using:

    pg_ctl -D /var/lib/postgresql/data -l logfile start

waiting for server to start....2020-01-30 08:17:10.906 UTC [43] LOG:  starting PostgreSQL 12.1 (Debian 12.1-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian                                                                      8.3.0-6) 8.3.0, 64-bit
2020-01-30 08:17:10.909 UTC [43] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2020-01-30 08:17:10.941 UTC [44] LOG:  database system was shut down at 2020-01-30 08:17:10 UTC
2020-01-30 08:17:10.947 UTC [43] LOG:  database system is ready to accept connections
 done
server started

/usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*

2020-01-30 08:17:10.998 UTC [43] LOG:  received fast shutdown request
waiting for server to shut down....2020-01-30 08:17:11.001 UTC [43] LOG:  aborting any active transactions
2020-01-30 08:17:11.010 UTC [43] LOG:  background worker "logical replication launcher" (PID 50) exited with exit code 1
2020-01-30 08:17:11.012 UTC [45] LOG:  shutting down
2020-01-30 08:17:11.043 UTC [43] LOG:  database system is shut down
 done
server stopped

PostgreSQL init process complete; ready for start up.

2020-01-30 08:17:11.126 UTC [1] LOG:  starting PostgreSQL 12.1 (Debian 12.1-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
2020-01-30 08:17:11.127 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2020-01-30 08:17:11.127 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2020-01-30 08:17:11.135 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2020-01-30 08:17:11.168 UTC [52] LOG:  database system was shut down at 2020-01-30 08:17:11 UTC
2020-01-30 08:17:11.177 UTC [1] LOG:  database system is ready to accept connections
~~~


### 繼續 create other services

-  `docker service create --name drupal --network mydrupal -p 80:80 drupal`

~~~
root@node1:~# docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
0hjjj5ihz3eh        drupal              replicated          1/1                 drupal:latest       *:80->80/tcp
tv0zvqi2amq6        psql                replicated          1/1                 postgres:latest
~~~

- 看狀態

~~~
root@node1:~# docker service ps drupal
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
tbi1upw1ql2y        drupal.1            drupal:latest       node2               Running             Running 52 seconds ago
~~~

##　現在狀態

- 安裝狀態
   - node 1: postgres
   - node 2: drupal

- 不論進到 node1, node2, node3 的 public ip 都會吃到 drupal 的前端畫面！！！
   - __這邊我不懂～～～～～～～__　ＨＯＷ？　:smirk_cat::smirk_cat::smirk_cat:
      - 在 node2 跑不是應該只有丟 node2 的 public ip 才吃的到？
      - __先繼續做下去，期待後面開竅！！__

## 卡關！！　

> 靠！！　卡了快 50 分鐘

~~~java
Original
Drupal\Core\Database\DatabaseExceptionWrapper: SQLSTATE[42703]: Undefined column: 7 ERROR: column pg_attrdef.adsrc does not exist LINE 8: OR pg_attrdef.adsrc::text LIKE 'nextval%') ^: SELECT pg_attribute.attname AS column_name, format_type(pg_attribute.atttypid, pg_attribute.atttypmod) AS data_type, pg_get_expr(pg_attrdef.adbin, pg_attribute.attrelid) AS column_default FROM pg_attribute LEFT JOIN pg_attrdef ON pg_attrdef.adrelid = pg_attribute.attrelid AND pg_attrdef.adnum = pg_attribute.attnum WHERE pg_attribute.attnum > 0 AND NOT pg_attribute.attisdropped AND pg_attribute.attrelid = :key::regclass AND (format_type(pg_attribute.atttypid, pg_attribute.atttypmod) = 'bytea' OR pg_attrdef.adsrc LIKE 'nextval%'); Array ( [:key] => public.cache_bootstrap ) in Drupal\Core\Extension\ModuleHandler->getHookInfo() (line 297 of /var/www/html/core/lib/Drupal/Core/Extension/ModuleHandler.php).

Drupal\Core\Extension\ModuleHandler->getHookInfo() (Line: 625)
Drupal\Core\Extension\ModuleHandler->buildImplementationInfo('entity_type_build') (Line: 590)
Drupal\Core\Extension\ModuleHandler->getImplementationInfo('entity_type_build') (Line: 328)
Drupal\Core\Extension\ModuleHandler->getImplementations('entity_type_build') (Line: 127)
Drupal\Core\Entity\EntityTypeManager->findDefinitions() (Line: 175)
Drupal\Core\Plugin\DefaultPluginManager->getDefinitions() (Line: 132)
Drupal\Core\Config\ConfigManager->getEntityTypeIdByName('core.extension') (Line: 345)
Drupal\Core\Config\ConfigInstaller->createConfiguration('', Array) (Line: 137)
Drupal\Core\Config\ConfigInstaller->installDefaultConfig('core', 'core') (Line: 75)
Drupal\Core\ProxyClass\Config\ConfigInstaller->installDefaultConfig('core', 'core') (Line: 655)
drupal_install_system(Array) (Line: 1100)
install_base_system(Array) (Line: 702)
install_run_task(Array, Array) (Line: 577)
install_run_tasks(Array, NULL) (Line: 117)
install_drupal(Object) (Line: 44)
Additional
Drupal\Core\Database\DatabaseExceptionWrapper: SQLSTATE[42703]: Undefined column: 7 ERROR: column pg_attrdef.adsrc does not exist LINE 8: OR pg_attrdef.adsrc::text LIKE 'nextval%') ^: SELECT pg_attribute.attname AS column_name, format_type(pg_attribute.atttypid, pg_attribute.atttypmod) AS data_type, pg_get_expr(pg_attrdef.adbin, pg_attribute.attrelid) AS column_default FROM pg_attribute LEFT JOIN pg_attrdef ON pg_attrdef.adrelid = pg_attribute.attrelid AND pg_attrdef.adnum = pg_attribute.attnum WHERE pg_attribute.attnum > 0 AND NOT pg_attribute.attisdropped AND pg_attribute.attrelid = :key::regclass AND (format_type(pg_attribute.atttypid, pg_attribute.atttypmod) = 'bytea' OR pg_attrdef.adsrc LIKE 'nextval%'); Array ( [:key] => public.cache_config ) in Drupal\Core\Config\CachedStorage->readMultiple() (line 105 of /var/www/html/core/lib/Drupal/Core/Config/CachedStorage.php).

Drupal\Core\Config\CachedStorage->readMultiple(Array) (Line: 165)
Drupal\Core\Config\ConfigFactory->doLoadMultiple(Array, 1) (Line: 104)
Drupal\Core\Config\ConfigFactory->doGet('core.extension') (Line: 89)
Drupal\Core\Config\ConfigFactory->get('core.extension') (Line: 106)
Drupal\Core\Extension\ThemeHandler->listInfo() (Line: 64)
_drupal_maintenance_theme() (Line: 749)
drupal_maintenance_theme() (Line: 1028)
install_display_output(Array, Array, Array) (Line: 267)
_drupal_log_error(Array, 1) (Line: 614)
_drupal_exception_handler(Object)
~~~

>　最後想到， Learning How to Learn~~~ 要自己思考！

> 去把官方的 docker hub 都看過：　驚人結論！！！

__drupal 支援最新 postgres 資料庫只到 postgres:11__

就這樣．．．．　解！



## 只 run 在一個 node 可是　3 個 ip 都吃的到！？

   - section8 - 65 揭曉答案　ＸＤＤ

~~~
root@node3:~# docker service ps drupal
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR                         PORTS
kp7gk1v334bk        drupal.1            drupal:latest       node1               Running             Running 13 minutes ago
p0c1t6qzousv         \_ drupal.1        drupal:latest       node1               Shutdown            Failed 13 minutes ago    "task: non-zero exit (137)"
l6ml84al9e2q         \_ drupal.1        drupal:latest       node2               Shutdown            Failed 23 minutes ago    "task: non-zero exit (137)"
root@node3:~# docker service inspect drupal
[
    {
        "ID": "1pjpb8fshxwy04tu9k3euhdvd",
        "Version": {
            "Index": 130
        },
        "CreatedAt": "2020-01-30T08:53:40.195478682Z",
        "UpdatedAt": "2020-01-30T08:53:40.20237731Z",
        "Spec": {
            "Name": "drupal",
            "Labels": {},
            "TaskTemplate": {
                "ContainerSpec": {
                    "Image": "drupal:latest@sha256:3bffdb1609a3cba79e39522b1c9a94c9ae9fd539aff43da0bda09e2ead143b32",
                    "Init": false,
                    "StopGracePeriod": 10000000000,
                    "DNSConfig": {},
                    "Isolation": "default"
                },
                "Resources": {
                    "Limits": {},
                    "Reservations": {}
                },
                "RestartPolicy": {
                    "Condition": "any",
                    "Delay": 5000000000,
                    "MaxAttempts": 0
                },
                "Placement": {
                    "Platforms": [
                        {
                            "Architecture": "amd64",
                            "OS": "linux"
                        },
                        {
                            "OS": "linux"
                        },
                        {
                            "OS": "linux"
                        },
                        {
                            "Architecture": "arm64",
                            "OS": "linux"
                        },
                        {
                            "Architecture": "386",
                            "OS": "linux"
                        },
                        {
                            "Architecture": "ppc64le",
                            "OS": "linux"
                        }
                    ]
                },
                "Networks": [
                    {
                        "Target": "bi0v9pic3gr0aziph8ljriuhg"
                    }
                ],
                "ForceUpdate": 0,
                "Runtime": "container"
            },
            "Mode": {
                "Replicated": {
                    "Replicas": 1
                }
            },
            "UpdateConfig": {
                "Parallelism": 1,
                "FailureAction": "pause",
                "Monitor": 5000000000,
                "MaxFailureRatio": 0,
                "Order": "stop-first"
            },
            "RollbackConfig": {
                "Parallelism": 1,
                "FailureAction": "pause",
                "Monitor": 5000000000,
                "MaxFailureRatio": 0,
                "Order": "stop-first"
            },
            "EndpointSpec": {
                "Mode": "vip",
                "Ports": [
                    {
                        "Protocol": "tcp",
                        "TargetPort": 80,
                        "PublishedPort": 80,
                        "PublishMode": "ingress"
                    }
                ]
            }
        },
        "Endpoint": {
            "Spec": {
                "Mode": "vip",
                "Ports": [
                    {
                        "Protocol": "tcp",
                        "TargetPort": 80,
                        "PublishedPort": 80,
                        "PublishMode": "ingress"
                    }
                ]
            },
            "Ports": [
                {
                    "Protocol": "tcp",
                    "TargetPort": 80,
                    "PublishedPort": 80,
                    "PublishMode": "ingress"
                }
            ],
            "VirtualIPs": [
                {
                    "NetworkID": "9r57paqcqdbab31l6wx0twzzh",
                    "Addr": "10.0.0.7/24"
                },
                {
                    "NetworkID": "bi0v9pic3gr0aziph8ljriuhg",
                    "Addr": "10.0.1.20/24"
                }
            ]
        }
    }
]
~~~