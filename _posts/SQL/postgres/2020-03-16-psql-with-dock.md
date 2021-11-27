---
layout: "single"
title: 'SQL: postgres + docker-compose '
permalink: 'sql/postgres-with-docker-and-docker-compose'
tags: sql postgres docker-compose
---

> 雷一堆 XDD
>
> 自己上網爬 真的很有趣 XD 
>
> 點就是花時間 哈哈哈

- 大綱

   1. 寫一個 dockerfile: `postgres` 為基底 吃自己寫的 scripts 到 [`/docker-entrypoint-initdb.d/`](https://hub.docker.com/_/postgres){:target="_back"}

   2. [docker-compose](https://yuting3656.github.io/yutingblog/blog/tag.html#docker-compose){:target="_back"}: 直接吃上面寫好的 image(dockerfile) build 起來，__超級方便__ 可以瘋狂測試自己寫的 scripts 對不對XDD (慢慢了解強大的原因了!!!)
      - build 起來: `docker-compose -f <docker-compose-file-name> up`
      - close 起來: `docker-compose -f <docker-compose-file-name> down --rmi all`
         - 'all': Remove all images used by any service
   3. node.js + [pg](https://node-postgres.com/){:target="_back"}: 簡單速度開抓 DB 資料
      - 有時間可以把[這篇](https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66){:taregt="_back"}實作出來


## 1. Dockerfile

~~~dockerfile
# Derived from official mysql image (base image)
FROM postgres

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically 
# executed during container startup
COPY ./postsql-scripts/ /docker-entrypoint-initdb.d/
~~~

### postsql-scripts/init.sql

   - [try and error 好多次](https://dba.stackexchange.com/questions/53914/permission-denied-for-relation-table){:target="_back"}:
       - `先 create user`
       - `再來 create database`
       - `ALTER DEFAULT PRIVILEGES`
       - `\c <database> <user>`
   - [Mysql 和 Postgres type 比較](https://www.convert-in.com/mysql-to-postgres-types-mapping.htm){:target="_back"}

~~~sql
CREATE USER newuser WITH PASSWORD 'newpassword' ; 

CREATE DATABASE todo OWNER newuser ;

ALTER DEFAULT PRIVILEGES IN SCHEMA PUBLIC GRANT ALL ON TABLES TO newuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA PUBLIC GRANT ALL ON SEQUENCES TO newuser;

\c todo newuser;

CREATE TABLE tasks (
   id Integer NOT NULL,
   task varchar(200) NOT NULL,
   status Integer NOT NULL DEFAULT '1',
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE tasks ADD PRIMARY key (id);

INSERT INTO tasks ( id, task, status, created_at) VALUES 
(1, 'Find bugs', 1, '2016-04-10 23:50:40'),
(2, 'Review code', 1, '2016-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2016-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2016-04-10 23:50:40'),
(5, 'Push to prod', 1, '2016-04-10 23:50:50');
~~~





##  2. docker-compose:

- docker-compose.yml

~~~yml
version: '3'

services:
  
  postgres:
    build:
      context: .
      dockerfile: postgres.dockerfile
    environment:
      - POSTGRES_PASSWORD=mypasswd
    ports:
      - 5432:5432
~~~

- ` docker-compose -f .\docker-compose-postgres.yml up`

~~~
PS E:\Node\node-sql\node-express-connect-sql\docker> docker-compose -f .\docker-compose-postgres.yml up
WARNING: The Docker Engine you're using is running in swarm mode.

Compose does not use swarm mode to deploy services to multiple nodes in a swarm. All containers will be scheduled on the current node.

To deploy your application across the swarm, use `docker stack deploy`.

Creating network "docker_default" with the default driver
Building postgres
Step 1/2 : FROM postgres
 ---> cf879a45faaa
Step 2/2 : COPY ./postsql-scripts/ /docker-entrypoint-initdb.d/
 ---> 07fb27e722f9
Successfully built 07fb27e722f9
Successfully tagged docker_postgres:latest
WARNING: Image for service postgres was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating docker_postgres_1 ... done                                                                                     Attaching to docker_postgres_1
postgres_1  | The files belonging to this database system will be owned by user "postgres".
postgres_1  | This user must also own the server process.
postgres_1  |
postgres_1  | The database cluster will be initialized with locale "en_US.utf8".
postgres_1  | The default database encoding has accordingly been set to "UTF8".
postgres_1  | The default text search configuration will be set to "english".
postgres_1  |
postgres_1  | Data page checksums are disabled.
postgres_1  |
postgres_1  | fixing permissions on existing directory /var/lib/postgresql/data ... ok
postgres_1  | creating subdirectories ... ok
postgres_1  | selecting dynamic shared memory implementation ... posix
postgres_1  | selecting default max_connections ... 100
postgres_1  | selecting default shared_buffers ... 128MB
postgres_1  | selecting default time zone ... Etc/UTC
postgres_1  | creating configuration files ... ok
postgres_1  | running bootstrap script ... ok
postgres_1  | performing post-bootstrap initialization ... ok
postgres_1  | syncing data to disk ... initdb: warning: enabling "trust" authentication for local connections
postgres_1  | You can change this by editing pg_hba.conf or using the option -A, or
postgres_1  | --auth-local and --auth-host, the next time you run initdb.
postgres_1  | ok
postgres_1  |
postgres_1  |
postgres_1  | Success. You can now start the database server using:
postgres_1  |
postgres_1  |     pg_ctl -D /var/lib/postgresql/data -l logfile start
postgres_1  |
postgres_1  | waiting for server to start....2020-03-16 05:46:33.425 UTC [44] LOG:  starting PostgreSQL 12.1 (Debian 12.1-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
postgres_1  | 2020-03-16 05:46:33.427 UTC [44] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
postgres_1  | 2020-03-16 05:46:33.445 UTC [45] LOG:  database system was shut down at 2020-03-16 05:46:33 UTC
postgres_1  | 2020-03-16 05:46:33.450 UTC [44] LOG:  database system is ready to accept connections
postgres_1  |  done
postgres_1  | server started
postgres_1  |
postgres_1  | /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/Init.sql
postgres_1  | CREATE ROLE
postgres_1  | CREATE DATABASE
postgres_1  | ALTER DEFAULT PRIVILEGES
postgres_1  | ALTER DEFAULT PRIVILEGES
postgres_1  | You are now connected to database "todo" as user "newuser".
postgres_1  | CREATE TABLE
postgres_1  | ALTER TABLE
postgres_1  | INSERT 0 5
postgres_1  |
postgres_1  |
postgres_1  | 2020-03-16 05:46:33.732 UTC [44] LOG:  received fast shutdown request
postgres_1  | waiting for server to shut down....2020-03-16 05:46:33.735 UTC [44] LOG:  aborting any active transactions
postgres_1  | 2020-03-16 05:46:33.738 UTC [44] LOG:  background worker "logical replication launcher" (PID 51) exited with exit code 1
postgres_1  | 2020-03-16 05:46:33.738 UTC [46] LOG:  shutting down
postgres_1  | 2020-03-16 05:46:33.776 UTC [44] LOG:  database system is shut down
postgres_1  |  done
postgres_1  | server stopped
postgres_1  |
postgres_1  | PostgreSQL init process complete; ready for start up.
postgres_1  |
postgres_1  | 2020-03-16 05:46:33.844 UTC [1] LOG:  starting PostgreSQL 12.1 (Debian 12.1-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
postgres_1  | 2020-03-16 05:46:33.844 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
postgres_1  | 2020-03-16 05:46:33.844 UTC [1] LOG:  listening on IPv6 address "::", port 5432
postgres_1  | 2020-03-16 05:46:33.849 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
postgres_1  | 2020-03-16 05:46:33.863 UTC [63] LOG:  database system was shut down at 2020-03-16 05:46:33 UTC
postgres_1  | 2020-03-16 05:46:33.867 UTC [1] LOG:  database system is ready to accept connections
~~~


## 3. node.js + pg

- 安裝:
   - `npm install nodemon pg`


- package.json

~~~js
{
  "name": "node-connect-postgres",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ./server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "nodemon": "^2.0.2",
    "pg": "^7.18.2"
  }
}

~~~


- server.js

~~~js
// https://stackoverflow.com/questions/9205496/how-to-make-connection-to-postgres-via-node-js
const { Client } = require('pg')
const connectStr = "postgres://newuser:newpassword@localhost:5432/todo"

const client = new Client(connectStr);
client.connect();

client.query("select * from tasks")
  .then((res, err)=> {
    console.log("=======================================")
    console.log("======= ConnectStr ======= ConnectStr =")
    console.log("=======================================")
      res.rows.forEach(data=> console.log(data))
  }).catch( err => console.log('oops: ', err))


/**
*
* 下面練習用 pooling 連線
*  https://node-postgres.com/api/pool
*  
*/

const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'todo',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

pool.connect((err, client, release) => {
  if (err) {
      return console.error("Error acquiring clinet", err.stack);
  }

  client.query("select * from tasks", (err, result) => {
    release();
    if (err) {
        return console.error("Error executing query", err.stack);
    }
    console.log("=======================================")
    console.log("======= POOLING ======= POOLING =======")
    console.log("=======================================")
    result.rows.forEach( data => console.log(data));
  })
})
~~~

~~~sh
PS E:\Node\node-sql\node-connect-postgres> npm start

> node-connect-postgres@1.0.0 start E:\Node\node-sql\node-connect-postgres
> nodemon ./server.js

[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./server.js`
=======================================
======= ConnectStr ======= ConnectStr =
=======================================
{ id: 1,
  task: 'Find bugs',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 2,
  task: 'Review code',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 3,
  task: 'Fix bugs',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 4,
  task: 'Refactor Code',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 5,
  task: 'Push to prod',
  status: 1,
  created_at: 2016-04-10T15:50:50.000Z }
=======================================
======= POOLING ======= POOLING =======
=======================================
{ id: 1,
  task: 'Find bugs',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 2,
  task: 'Review code',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 3,
  task: 'Fix bugs',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 4,
  task: 'Refactor Code',
  status: 1,
  created_at: 2016-04-10T15:50:40.000Z }
{ id: 5,
  task: 'Push to prod',
  status: 1,
  created_at: 2016-04-10T15:50:50.000Z }

~~~

## Postgres 學習筆記: XDD

- `\c` connect

   - 切到指定的 db: `\c <database>`
   - [https://www.calhoun.io/creating-postgresql-databases-and-tables-with-raw-sql/](https://www.calhoun.io/creating-postgresql-databases-and-tables-with-raw-sql/){:target="_back"}


- 進去後一直出現: `Docker postgres “psql: FATAL: role ”root“ does not exist”`

~~~
$ docker run --rm --name some-postgres -d postgres
cb2ddbb0f4f715077ebc1bfc2dc7151e5a6d07cd374c28be1db6d6ad77b9b16a

$ docker run -it --rm --link some-postgres:postgres postgres psql -h postgres -U postgres
psql (10.4 (Debian 10.4-2.pgdg90+1))
Type "help" for help.

postgres=#
~~~


