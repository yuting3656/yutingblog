---
layout: "single"
title: 'daily Programming: Node.js (Express) connect to MySQL'
permalink: 'daily-programming/node-go-connect-to-mysql'
tags: daily-programming Node.js docker mysql
---


## Node.js (Express)

- reference

   - [https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2](https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2){:target="_back"}

- install

   - `npm install express mysql body-parser -save`
   - `npm install nodemon --save-dev`

- package.json

~~~json
{
  "name": "express-connect-sql",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ./server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mysql": "^2.18.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}
~~~

## 看一下資料夾長甚麼樣子

![Imgur](https://i.imgur.com/RxD3Dun.jpg)

> 跟在 資策會 Java 班學的 MVC KKK 很像 XD

- app
   - (1) controller
      - appController.js
   - (2) models
      - 2.1 appModel.js
      - 2.2 db.js
         - 連DB用
   - (3) routes
      - approutes.js
- server.js
   - 主跑 跑起來~~~

> 畢卡葛
>
> ![Imgur](https://i.imgur.com/rd1rnSZ.jpg)
> 
> 跟 java 比起來 真的舒服多了 XDDDDDDDDDDDDDDDD
>
> 我照著 Clinet 端丟 request 順序來 

- server.js

~~~js
var express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const routes = require('./app/routes/approutes');

// local mysql db connection
// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'newuser',
   password: 'newpassword',
   database: 'todo'
})
// connect to database
connection.connect(function(err){
   if (err) {
       console.error('error connecting:', err.stack);
       return
   };
   console.log('connected mydql as id: ' + connection.threadId);
});

const app = express();


app.get('/',  (req, res) => {
   res.send('Hello World');
})

app.listen(8080, ()=> console.log("express is linsten port: 8080"))

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// register the route
routes(app);
~~~

- approutes.js

~~~js
'use strict';

module.exports = function(app) {
    const todoList = require('../controller/appController.js');

    
    app.route('/tasks')
       .get(todoList.list_all_tasks)
       .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
       .get(todoList.read_a_task)
       .put(todoList.update_a_task)
       .delete(todoList.delete_a_task);
};
~~~

- appController.js

~~~js
'use strict'

const Task = require('../models/appModel.js');

exports.list_all_tasks = function(req, res) {
   Task.getAllTask(function(err, task) {
       console.log('controller');
       if (err) {
           res.send(err);
        }
        console.log('res', task);
        res.send(task);
   }
)};

exports.create_a_task = function(req, res) {
  const new_task = new Task(req.body);

  //handles null error 
   if(!new_task.task || !new_task.status){
            res.status(400).send({ error:true, message: 'Please provide task/status' });
        }
else{
  
  Task.createTask(new_task, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
}
};


exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  console.log(req.params.taskId)
  console.log(req.body)
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  Task.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
~~~

- appModel.js

~~~js
'use strict';
const sql = require('./db.js');

// Task object constructor
class Task {
    constructor(task) {
        this.task = task.task;
        this.status = task.status;
        this.created_at = new Date();
    }
    static createTask(newTask, result) {
        sql.query("insert into tasks set ?", newTask, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }
    static getTaskById(taskId, result) {
        sql.query("select task from tasks where id = ?", taskId, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, ull);
            }
            else {
                result(null, res);
            }
        });
    }
    static getAllTask(result) {
        sql.query("select * from tasks", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('task: ', res);
                result(null, res);
            }
        });
    }
    static updateById(id, task, result) {
        sql.query("update tasks set task = ? where id = ?", [task.task, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
    static remove(id, result) {
        sql.query("delete from tasks where id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
}



module.exports = Task;


/**
 * 
 * 
 * class Task {
    constructor(task) {
        this.task = task.task;
        this.status = task.status;
        this.created_at = new Date();
    }
    static createTask(newTask, result) {
        sql.query("insert into tasks set ?", newTask, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }
    static getTaskById(taskId, result) {
        sql.query("select task from tasks where id = ?", taskId, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, ull);
            }
            else {
                result(null, res);
            }
        });
    }
    static getAllTask(result) {
        sql.query("select * from tasks", function (errm, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('task: ', res);
                result(null, res);
            }
        });
    }
    static updateById(id, task, result) {
        sql.query("update from tasks where id = ?", [task.task, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
    static remove(id, result) {
        sql.query("delete from tasks where id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
}


module.exports = Task;
*/
~~~

- db.js

~~~js
'use strict';

const mysql = require('mysql');

// local mysql db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'newpassword',
    database: 'todo',
})

connection.connect(function(err){
    if (err) {
        console.error('error connecting:', err.stack);
        return
    };
    console.log('connected mydql as id: ' + connection.threadId);
})

module.exports = connection;
~~~

>　恩重頭小戲　ＤＢ　ＸＤＤＤ

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


### 直接在 build Dockerfile 的時候 直接寫入 新的 user 和給予 使用指定 DB

- Setup.sql

~~~sql
-- https://github.com/docker-library/mysql/issues/213
create user 'newuser'@'%' identified by 'newpassword';
grant all privileges on todo.* to 'newuser'@'%';
~~~

- 目錄大概長這樣

   - ![Imgur](https://i.imgur.com/UDBzvbY.jpg)

- 接下來和上面一樣
   
   - `docker build -t yuting-node-go-mysql .`
   - `docker container run -d -p 3306:3306 --name tim-mysql -e MYSQL_ROOT_PASSWORD=supersecret yuting-node-go-mysql`
   - `docker container exec -it tim-mysql bash`
   - `mysql -uroot -p` 

- 用 root user 進去看 

   - `show grants for 'newuser'@'%';`
   
   ~~~
   root@6cfcbf88bc71:/# mysql  -uroot -p
   Enter password:
   Welcome to the MySQL monitor.  Commands end with ; or \g.
   Your MySQL connection id is 17
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
   5 rows in set (0.00 sec)
   mysql> show grants for 'newuser'@'%';
   +---------------------------------------------------+
   | Grants for newuser@%                              |
   +---------------------------------------------------+
   | GRANT USAGE ON *.* TO `newuser`@`%`               |
   | GRANT ALL PRIVILEGES ON `todo`.* TO `newuser`@`%` |
   +---------------------------------------------------+
   2 rows in set (0.00 sec)
   ~~~

- 用 在 `Dockerfile` 所設定 的 __newuser__ 進去看

   - 和 `root` user 進去看的差別就是: 只看的到 `todo` DB
   
   > cool~~ 有FU!有FU! 

   ~~~
   root@6cfcbf88bc71:/# mysql -u newuser -p
   Enter password:
   Welcome to the MySQL monitor.  Commands end with ; or \g.
   Your MySQL connection id is 12
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
   | todo               |
   +--------------------+
   2 rows in set (0.00 sec)
   
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
   1 row in set (0.01 sec)
   
   mysql>
   ~~~


## Postman 小幫手～看一下成果

![Imgur](https://i.imgur.com/WXEG8OC.jpg)

> 成功～～


# 雷！！！

> 其實不少　不過在練習的時候速查　解掉後就忘了　ＸＤＤＤ

- Client does not support authentication protocol requested by server; consider upgrading MySQL client

   - [https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server){:target="_back"}