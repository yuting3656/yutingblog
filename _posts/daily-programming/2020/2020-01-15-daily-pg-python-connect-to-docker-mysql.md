---
layout: "single"
title: 'daily Programming: python connect 到 docker mysql container'
permalink: 'daily-programming/python-connect-docker-mysql-container'
tags: daily-programming docker python mysql
---

> 整個架構大約這樣 XDD

![Imgur](https://i.imgur.com/U8x1y7h.jpg)

跑完每年的約定 :smile:
一場痛快的馬拉松 :sweat_drops::sweat_drops::sweat_drops:
然後
重感冒 :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:

嚴格說起來 應該是 

已經有不錯的感冒 啊我硬漢:facepunch: 硬跑 :clap::clap:

# 爽！

|![Imgur](https://i.imgur.com/3uq9EWI.jpg)|![Imgur](https://i.imgur.com/Eug0RTM.jpg)|


一直到今天頭才沒有那模昏 可以快樂思考 :sunny::sunny:

就想到 docker 繼續學下去一定會應用到 db 和後端程式 互動

腦袋瓜就想自build 一個 `mysql image` 然後 然後用 `python` 去抓抓

就這樣 簡單樸實又無華可愛的 __賽__ Project :)

---
---
---

## 主要兩部分 docker and python


- #1 Docker
    - Dockerfile
       - 自己寫一 `Dockerfile`
       - build image 從上面 自己寫的 `Dockerfile` 
    - Container
       - run container 從上面 build 好的　`image`
       - mysql 
          - exec 進 container 
          - __best practice__: create a new user interact with `database`
             - __NEVER USE ROOT USER__

- #2 python
   - install 
      - `pip install mysql-connector-python`
   - .py
      - 寫可愛簡單程式 crud 可愛的 mysql


- Reference:

    - [https://medium.com/better-programming/customize-your-mysql-database-in-docker-723ffd59d8fb](https://medium.com/better-programming/customize-your-mysql-database-in-docker-723ffd59d8fb)
    - [https://medium.com/@billydharmawan/how-to-connect-to-mysql-docker-from-python-application-on-macos-mojave-32c7834e5afa](https://medium.com/@billydharmawan/how-to-connect-to-mysql-docker-from-python-application-on-macos-mojave-32c7834e5afa)



### Docker

- 建 sql table & 塞假資料

   - ./sql-scripts/CreateTable.sql

      ~~~sql
       CREATE TABLE employees (
       first_name varchar(25),
       last_name varchar(25),
       department varchar(25),
       email varchar(50)  
      );
      ~~~

   - ./sql-scripts/InsertData.sql

      ~~~sql
         INSERT INTO employees ( first_name, last_name, department, email)
         VALUES ('YuTing', 'Wu', 'IT', 'yuting@gmail.com') 
      ~~~

- 檔案位置大約長這樣

   - ![Imgur](https://i.imgur.com/8zHN6LS.jpg)


- Dockerfile

   - docker-entrypoint-initdb.d: 
      - All scripts in docker-entrypoint-initdb.d/ are automatically executed during container startup

 ~~~dockerfile
 # Derived from official mysql image (base image)
 FROM mysql
 
 # Add a database 
 ENV MYSQL_DATABASE company
 
 # Add the content of the sql-scripts/ directory to your image
 # All scripts in docker-entrypoint-initdb.d/ are automatically 
 # executed during container startup
 COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
 ~~~

- Buid Image

   - cd 到跟 Dockerfile 同一位置
   - `docker build -t yuting-mysql .`

   ~~~
   Sending build context to Docker daemon  4.608kB
   Step 1/3 : FROM mysql
    ---> ed1ffcb5eff3
   Step 2/3 : ENV MYSQL_DATABASE company
    ---> Running in 9c07316a6b38
   Removing intermediate container 9c07316a6b38
    ---> 48b48e108f09
   Step 3/3 : COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
    ---> f3a7642e8259
   Successfully built f3a7642e8259
   Successfully tagged yuting-mysql:latest
   SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x'    permissions. It is recommended to double check and reset permissions for sensitive files and directories.
   ~~~

   - 看 image: `docker image ls`

   ~~~
   　REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
   　yuting-mysql               latest              f3a7642e8259        2 hours ago         456MB
   　mysql                      latest              ed1ffcb5eff3        2 weeks ago         456MB
   　yuting-angular             latest              e6aee769ca7b        2 weeks ago         40.4MB
   　...
   ~~~


- Run Container 

   - `docker container run -d -p 3306:3306 --name yuting-mysql -e MYSQL_ROOT_PASSWORD=supersecret yuting-mysql` 
   - 看有沒有跑起來　`docker container ls`

      ~~~
      PS E:\docker_project\docker_mysql_python> docker container run -d -p 3306:3306 --name yuting-mysql -e MYSQL_ROOT_PASSWORD=supersecret yuting-mysql
      441cef2b9674dfb28d5dceb5819e77508356531cf2b2ec3e9a92c93de5f4a22b
      PS E:\docker_project\docker_mysql_python> docker container ls
      CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS              PORTS                               NAMES
      441cef2b9674        yuting-mysql              "docker-entrypoint.s…"   4 seconds ago       Up 3 seconds        0.0.0.0:3306->3306/tcp, 33060/tcp   yuting-mysql
      5fe796977801        bretfisher/jekyll-serve   "docker-entrypoint.s…"   23 hours ago        Up 23 hours         0.0.0.0:80->4000/tcp                sweet_heisenberg
      ~~~

   - 看剛剛寫的 sql 有沒有寫進 db
       - `docker container exec -it yting-mysql bash`
       - 登入到 container 裡面的 mysql
          - `mysql -uroot -p`
          - 輸入密碼: __剛剛上面run的時候建立的密碼__　`-e MYSQL_ROOT_PASSWORD=supersecret`


      ~~~
      PS E:\docker_project\docker_mysql_python> docker container exec -it yuting-mysql bash
      root@441cef2b9674:/# mysql -uroot -p
      Enter password:
      Welcome to the MySQL monitor.  Commands end with ; or \g.
      Your MySQL connection id is 8
      Server version: 8.0.18 MySQL Community Server - GPL
      Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.
      
      Oracle is a registered trademark of Oracle Corporation and/or its
      affiliates. Other names may be trademarks of their respective
      owners.
      
      
      mysql> show databases;
      +--------------------+
      | Database           |
      +--------------------+
      | company            |
      | information_schema |
      | mysql              |
      | performance_schema |
      | sys                |
      +--------------------+
      5 rows in set (0.01 sec)
      
      mysql> use company
      Reading table information for completion of table and column names
      You can turn off this feature to get a quicker startup with -A
      
      Database changed
      mysql> show tables
          -> ;
      +-------------------+
      | Tables_in_company |
      +-------------------+
      | employees         |
      +-------------------+
      1 row in set (0.00 sec)
      
      mysql> show columns from employees;
      +------------+-------------+------+-----+---------+-------+
      +------------+-------------+------+-----+---------+-------+
      | first_name | varchar(25) | YES  |     | NULL    |       |
      | last_name  | varchar(25) | YES  |     | NULL    |       |
      | department | varchar(25) | YES  |     | NULL    |       |
      | email      | varchar(50) | YES  |     | NULL    |       |
      +------------+-------------+------+-----+---------+-------+
      4 rows in set (0.00 sec)
      
      mysql> select * from employees;
      +------------+-----------+------------+------------------+
      | first_name | last_name | department | email            |
      +------------+-----------+------------+------------------+
      | YuTing     | Wu        | IT         | yuting@gmail.com |
      +------------+-----------+------------+------------------+
      1 row in set (0.00 sec)
      ~~~

   - 新建 user & 給與使用 __特定database__ 的權利 讓 python 程式可以來接 

      - `create user '使用者名稱'@'%' indentified by '密碼' `
         - __%__: Instead of specifying an __ip address__, notice the '%'. This is to allow remote connection from anywhere via user newuser. 
      - `grant all privileges on 特定database.* to  '使用者名稱'@'%'`

   ~~~sql
   mysql> create user 'newuser'@'%' identified by 'newpassword';
   Query OK, 0 rows affected (0.02 sec)
   
   mysql> grant all privileges on company.* to 'newuser'@'%';
   Query OK, 0 rows affected (0.01 sec)
   ~~~

## Python

- install 

   - `pip install mysql-connector-python`
   - __不要 install__  `pip install mysql-connector` ， 好像是主要支援 python2, python3 用的話會出包

- .py

~~~py
import mysql.connector

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'newuser',
    'password': 'newpassword',
    'database': 'company',
}

db_user = config.get('user')
db_pwd = config.get('password')
db_host = config.get('host')
db_port = config.get('port')
db_name = config.get('database')

mydb = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_pwd,
    database=db_name,
    auth_plugin='mysql_native_password'
)

my_cursor = mydb.cursor()

# my_cursor.execute("show tables")
#
# for table in my_cursor:
#     print(table)
#

my_cursor.execute("select * from employees")

my_result = my_cursor.fetchall()
for item in my_result:
    print(item)
~~~