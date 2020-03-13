---
layout: 'post'
title: 'daily Programming: Node.js (Express) and Go connect to MySQL'
permalink: 'daily-programming/node-go-connect-to-mysql'
tags: daily-programming 
---

## Node.js (Express)

- reference

   - [https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2](https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2){:=target="_back"}

- install

   - `npm install express mysql body-parser -save`
   - `npm install nodemon --save-dev`


## Docker Mysql 

- 這練習 用 docker 自建一個 image 來做練習~ __用container ~舊式率~__
   - 跟這天 [daily-pg](https://yuting3656.github.io/yutingblog//daily-programming/python-connect-docker-mysql-container){:target="_back"} 自己練習一樣

- ./sql-scripts/CreateTables.sql

   ~~~sql
   CREATE TABLE tasks (
      id int(11) NOT NULL,
      task varchar(200) NOT NULL,
      status tinyint(1) NOT NULL DEFAULT '1',
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
   );
   
   ALTER TABLE tasks ADD PRIMARY key (id);
   ALTER TABLE tasks MODIFY id int(11) NOT NULL AUTO_INCREMENT;
   ~~~

- ./sql-scripts/InsertData.sql

   ~~~sql
   INSERT INTO tasks ( id, task, status, created_at) VALUES 
   (1, 'Find bugs', 1, '2016-04-10 23:50:40'),
   (2, 'Review code', 1, '2016-04-10 23:50:40'),
   (3, 'Fix bugs', 1, '2016-04-10 23:50:40'),
   (4, 'Refactor Code', 1, '2016-04-10 23:50:40'),
   (5, 'Push to prod', 1, '2016-04-10 23:50:50');
   ~~~

- 目錄大概長這樣

   - ![Imgur](https://i.imgur.com/GPKkPhn.jpg)

- Dockerfile

~~~dockerfile
# Derived from official mysql image (base image)
FROM mysql

# Add a database 
ENV MYSQL_DATABASE todo

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically 
# executed during container startup
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
~~~

- __Build 起來~~~__

   - `docker build -t yuting-node-go-mysql .`

   ~~~
   PS E:\Node\node-express-connect-sql\docker> docker build -t yuting-node-go-mysql .
   Sending build context to Docker daemon  4.608kB
   Step 1/3 : FROM mysql
    ---> ed1ffcb5eff3
   Step 2/3 : ENV MYSQL_DATABASE todo
    ---> Using cache
    ---> 9b99f80e6a83
   Step 3/3 : COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
    ---> 5cc75c415c12
   Successfully built 5cc75c415c12
   Successfully tagged yuting-node-go-mysql:latest
   SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
   ~~~

- __RUN 起來~~~__

   - `docker container run -d -p 3306:3306 --name tim-mysql -e MYSQL_ROOT_PASSWORD=supersecret yuting-node-go-mysql`
   - `docker container exec -it tim-mysql bash`
   - `mysql -uroot -p`

~~~
PS E:\Node\node-express-connect-sql\docker> docker container run -d -p 3306:3306 --name tim-mysql -e MYSQL_ROOT_PASSWORD=supersecret yuting-node-go-mysql
f25da662da3790949f0c65deac3f4b3ff38a9d64822d0432a9fe5bd53c4c9dab
PS E:\Node\node-express-connect-sql\docker> docker container exec -it tim-mysql bash
root@f25da662da37:/# mysql -uroot -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.18 MySQL Community Server - GPL

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| todo               |
+--------------------+
5 rows in set (0.01 sec)

mysql> use todo
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+----------------+
| Tables_in_todo |
+----------------+
| tasks          |
+----------------+
1 row in set (0.00 sec)

mysql> show columns in tasks
    -> ;
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int(11)      | NO   | PRI | NULL              | auto_increment    |
| task       | varchar(200) | NO   |     | NULL              |                   |
| status     | tinyint(1)   | NO   |     | 1                 |                   |
| created_at | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+
4 rows in set (0.00 sec)

mysql> select * from tasks;
+----+---------------+--------+---------------------+
| id | task          | status | created_at          |
+----+---------------+--------+---------------------+
|  1 | Find bugs     |      1 | 2016-04-10 23:50:40 |
|  2 | Review code   |      1 | 2016-04-10 23:50:40 |
|  3 | Fix bugs      |      1 | 2016-04-10 23:50:40 |
|  4 | Refactor Code |      1 | 2016-04-10 23:50:40 |
|  5 | Push to prod  |      1 | 2016-04-10 23:50:50 |
+----+---------------+--------+---------------------+
5 rows in set (0.00 sec)

mysql>
~~~