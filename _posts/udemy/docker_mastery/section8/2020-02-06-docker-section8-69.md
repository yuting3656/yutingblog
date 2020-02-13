---
layout: 'post'
title: 'Docker Matery: Section 8 - (Swarm) Secrets Storage for swarm'
permalink: 'docker_matery/docker-sections8-swarm-secrets-for-swarm'
tags: udemy-docker swarm swarm-secrets
---

- section8-69, 70, 71, 72

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Secrets Storage

- Easiest "secure" solution for storing secrets in Swarm
- What is a Secret ?
   - Usernames and Passwords
   - TLS certificates and keys
   - SSH keys
   - Any data you would prefer not be "on front page of news"
- Supports generic strings or binary content up to 500Kb in size
- Doesn't require apps to rewritten

- As of Docker 1.13.0 Swarm Raft DB is encrypted on disk
- Only stored on disk on Manager nodes
- Default is Managers and Workers "control plane" is TLS + Mutual Auth
- Secrets are first stored in Swarm, then assigned to Service(s)
- Only containers in assigned Service(s) can see them
- They look like files in container but are actually in-memory fs
   - `/run/secrets/<secret_name>` or `/run/secrets/<secret_alias>`
- Local docker-compose can use file-based secrets, but not secure

## Using Secrets in Swarm Services

- [Manage sensitive data with Docker secrets](https://docs.docker.com/engine/swarm/secrets/){:target="_back"}


- `docker secret create`
  - 有兩種方法可建 secrets:
     - 檔案: `docker secret create <secret-name> <secret-file>`
        - ~~~
        root@node1:/srv/udemy-docker-mastery/secrets-sample-1# cat psql_user.txt
        mypsqluser
        root@node1:/srv/udemy-docker-mastery/secrets-sample-1# docker secret create psql_user psql_user.txt
        b3lqus7dt3thuualsttrte9v3
        ~~~
     - 直接輸入: `echo "<secret>"| docker secret create <secret-name> -`
        - ~~~
           root@node1:/srv/udemy-docker-mastery/secrets-sample-1# echo "myDBpassWORD" | docker secret create psql_pass -
           0l22ntv1gpg18go91t5fbe4n2
        ~~~
  
  - 兩種方法都有缺陷:
     - 檔案:
        - 直接將 __secret__ 存到 host 上的 server hard drive 裡面
     - 直接輸入:
        - 會將 __secret__ 存到 Bash file root user的歷史紀錄

- `docker secret ls` & `docker secret inspect <secret-name>`

~~~
root@node1:~# docker secret ls
ID                          NAME                DRIVER              CREATED             UPDATED
0l22ntv1gpg18go91t5fbe4n2   psql_pass                               16 minutes ago      16 minutes ago
b3lqus7dt3thuualsttrte9v3   psql_user                               17 minutes ago      17 minutes ago
root@node1:~# ^C
root@node1:~# docker secret inspect psql_pass
[
    {
        "ID": "0l22ntv1gpg18go91t5fbe4n2",
        "Version": {
            "Index": 386
        },
        "CreatedAt": "2020-02-06T08:00:18.206009682Z",
        "UpdatedAt": "2020-02-06T08:00:18.206009682Z",
        "Spec": {
            "Name": "psql_pass",
            "Labels": {}
        }
    }
]
~~~

## 手建 Service with secrets

- `docker service create --name psql --secret psql_user --secret psql_pass -e POSTGRES_PASSWORD_FILE=/run/secrets/psql_pass -e POSTGRES_USER_FILE=/run/secrets/psql_user postgres`

- 進 container 看 有沒有把 secrets 寫進去

   - `docker exec -it <containe-naem> bash`

~~~
root@node2:~# docker container exec -it psql.1.o0hhjbu0o3bw96b41la7qhcc7 bash
root@007b55c0f553:/run/secrets# ls
psql_pass  psql_user
root@007b55c0f553:/run/secrets# cat psql_pass
myDBpassWORD
root@007b55c0f553:/run/secrets# cat psql_user
mypsqluser
~~~

   - 看 logs:  `docker container logs <container-names>`


~~~
root@node2:~# docker container logs psql.1.o0hhjbu0o3bw96b41la7qhcc7
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

waiting for server to start....2020-02-06 08:35:38.052 UTC [45] LOG:  starting PostgreSQL 12.1 (Debian 12.1-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
2020-02-06 08:35:38.060 UTC [45] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2020-02-06 08:35:38.102 UTC [46] LOG:  database system was shut down at 2020-02-06 08:35:37 UTC
2020-02-06 08:35:38.112 UTC [45] LOG:  database system is ready to accept connections
 done
server started
CREATE DATABASE


/usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*

2020-02-06 08:35:38.330 UTC [45] LOG:  received fast shutdown request
waiting for server to shut down....2020-02-06 08:35:38.334 UTC [45] LOG:  aborting any active transactions
2020-02-06 08:35:38.339 UTC [45] LOG:  background worker "logical replication launcher" (PID 52) exited with exit code 1
2020-02-06 08:35:38.340 UTC [47] LOG:  shutting down
2020-02-06 08:35:38.372 UTC [45] LOG:  database system is shut down
 done
server stopped

PostgreSQL init process complete; ready for start up.

2020-02-06 08:35:38.456 UTC [1] LOG:  starting PostgreSQL 12.1 (Debian 12.1-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
2020-02-06 08:35:38.456 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2020-02-06 08:35:38.456 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2020-02-06 08:35:38.462 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2020-02-06 08:35:38.488 UTC [63] LOG:  database system was shut down at 2020-02-06 08:35:38 UTC
2020-02-06 08:35:38.497 UTC [1] LOG:  database system is ready to accept connections
~~~

## 移除 secrets

- `docker secret update --secret-rm`

   - 這招會 recreated all contaienrs !!! 要特別注意~!

## secrects with stacks 

- `docker service create --name search --replicas 3 -p 9200:9200 elasticsearch:2`

- docker-compose.yml

   - 使用 stack: `version: 3` 以上
   - 使用 stack & secrets: `version:3.1` 以上

   ~~~yml
   version: "3.1"

   services:
     psql:
       image: postgres
       secrets:
         - psql_user
         - psql_password
       environment:
         POSTGRES_PASSWORD_FILE: /run/secrets/psql_password
         POSTGRES_USER_FILE: /run/secrets/psql_user
   secrets:
     psql_user:
       file: ./psql_user.txt
     psql_password:
       file: ./psql_password.txt
   ~~~

- docker stack deploy


   - `docker stack deploy -c docker-compose.yml mydb`

   ~~~
   root@node1:/srv/udemy-docker-mastery/secrets-sample-2# docker stack deploy -c docker-compose.yml mydb
   Creating network mydb_default
   Creating secret mydb_psql_user
   Creating secret mydb_psql_password
   Creating service mydb_psql
   ~~~

- 看 `secrets` 有無建進去

   ~~~
   root@node1:/srv/udemy-docker-mastery/secrets-sample-2# docker secret ls
   ID                          NAME                 DRIVER              CREATED             UPDATED
   muc8ibftevw5modwg7g2c591d   mydb_psql_password                       2 minutes ago       2 minutes ago
   r0j6uu0c86no26dx3xhole1mx   mydb_psql_user                           2 minutes ago       2 minutes ago
   ~~~

- 移除 `stack` 也會順道把 用 `stack` 建的 `secrets` 移除掉 

   ~~~
   root@node1:/srv/udemy-docker-mastery/secrets-sample-2# docker stack rm mydb
   Removing service mydb_psql
   Removing secret mydb_psql_password
   Removing secret mydb_psql_user
   Removing network mydb_default
   root@node1:/srv/udemy-docker-mastery/secrets-sample-2# docker secret ls
   ID                          NAME                DRIVER              CREATED             UPDATED
   ~~~