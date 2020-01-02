---
layout: 'post'
title: 'Docker Matery: Section 5 Container Lifetime & Persistent Data'
permalink: 'docker_matery/docker-sections5-container-lifetime-persistent-data'
tags: udemy-docker docker-volume docker-mounts
---

- section5-45, 46

   - Section Overview:
      - Defining the problem of persistent data 
      - Key concepts with containers: immutable, ephemeral
      - Learning and using Data Volumes
      - Learning and using Bind Mounts
      - Assignments

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Container Lifetime & Persistent Data

- Containers are __ususlly__ immutable and ephemeral
- __"immutable infrastructure"__: only re-deploy containers, never change
- This is the ideal scenario, but what abhout databases, or unique data?
- Docker gives us features to ensure these __"separation of concerns"__
- This is known as __"persistent data"__
- Two ways: `Volumes` and `Bind Mounts`
- Volumes: make special location outsides of container UFS (union file system)
- Bind Mounts: link container path to host path


## Persisten Data: Volumes

- VOLUME command in Dockerfile

- cleanup unused volumes
   - `docker volume prune`

- 看 volume 裝在哪

   - 下載 image

      - `docker pull mysql`

      - `docker image inspect mysql`

         - ~~~
              ...
                   "Volumes": {
                   "/var/lib/mysql": {}
               },
               ... 
         ~~~


   - Run Container 

      - ` docker container run -d --name mysql --env MYSQL_ALLOW_EMPTY_PASSWORD=True mysql`

      - `docker container inspect mysql`

         - 
            ~~~
              ...
            
              "Mounts": [
                        {
                            "Type": "volume",
                            "Name": "0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562",
                            "Source": "/var/lib/docker/volumes/0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562/_data",
                            "Destination": "/var/lib/mysql",
                            "Driver": "local",
                            "Mode": "",
                            "RW": true,
                            "Propagation": ""
                        }
                    ],
            
              ...
            
                 "Volumes": {
                        "/var/lib/mysql": {}
                },
              
              ... 
            ~~~

- 看 docker volume

   - `docker volume ls`

      - ~~~
         PS E:\> docker volume ls
         DRIVER              VOLUME NAME
         local               0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562
      ~~~

   - `docker volume inspect <volume-name>`


      - ~~~
         PS E:\> docker volume inspect 0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562
         [
             {
                 "CreatedAt": "2020-01-02T08:16:58Z",
                 "Driver": "local",
                 "Labels": null,
                 "Mountpoint": "/var/lib/docker/volumes/0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562/_data",
                 "Name": "0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562",
                 "Options": null,
                 "Scope": "local"
             }
         ]
      ~~~


   - 如果你真的跑在 linux machine 可以找到實體檔案在:

      - `"Mountpoint": "/var/lib/docker/volumes/0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562/_data"`

- 看有趣的問題

   - 再 run 一個 mysql --name mysql2 
   - 看 volume 
      - 會有兩個
      - 而且誰是哪一個的不清楚!
         - ~~~
            PS E:\> docker volume ls
            DRIVER              VOLUME NAME
            local               0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562
            local               be6c0139888d0c185ae26be507644270406ceeba633855725540e42444e1cca6
         ~~~
   - 停掉 兩個 containers
      - `docker container stop mysql mysql2`
      - volume 還在! 而且誰是哪一個的不清楚!
         - ~~~
            PS E:\> docker volume ls
            DRIVER              VOLUME NAME
            local               0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562
            local               be6c0139888d0c185ae26be507644270406ceeba633855725540e42444e1cca6
         ~~~
   - 刪掉 兩個 containers
      - `docker container rm mysql mysql2`
      - volume 還在! 而且誰是哪一個的不清楚!
         - ~~~
            PS E:\> docker volume ls
            DRIVER              VOLUME NAME
            local               0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562
            local               be6c0139888d0c185ae26be507644270406ceeba633855725540e42444e1cca6
         ~~~

### Named Volume

- `-v` : 兩種寫法

   - 寫法一: 有打沒打一樣，不會命名

      - `-v /var/lib/mysql`

   - 寫法二: 給名字! VolumeName:位置

      - `-v <volume-name>:/var/lib/mysql` 

- 檢查:


   ~~~
   PS E:\> docker container run -d --name mysql2 --env MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql
   86a8b0c3a54db33c7a38f2fcd79314884dce5f13549b72f4c9a897f11115798d
   PS E:\> docker volume ls
   DRIVER              VOLUME NAME
   local               0d2f6a986f12e71d5f5b3e7e0263b839ae08c8b34e69c57d6f1fa2e6321e8562
   local               be6c0139888d0c185ae26be507644270406ceeba633855725540e42444e1cca6
   local               mysql-db
   PS E:\> docker volume inspect mysql-db
   [
       {
           "CreatedAt": "2020-01-02T08:46:19Z",
           "Driver": "local",
           "Labels": null,
           "Mountpoint": "/var/lib/docker/volumes/mysql-db/_data",
           "Name": "mysql-db",
           "Options": null,
           "Scope": "local"
       }
   ]
   ~~~

   - `docker container inspect <container-name>` 

      ~~~
         PS E:\> docker container inspect mysql2
         ...
              "Mounts": [
                  {
                      "Type": "volume",
                      "Name": "mysql-db",
                      "Source": "/var/lib/docker/volumes/mysql-db/_data",
                      "Destination": "/var/lib/mysql",
                      "Driver": "local",
                      "Mode": "z",
                      "RW": true,
                      "Propagation": ""
                  }
              ],
          ...
      ~~~
   
### Docker volume create 

- required to do this __before__ "docker run" to use custom drivers and labels

~~~
PS E:\> docker volume create --help

Usage:  docker volume create [OPTIONS] [VOLUME]

Create a volume

Options:
  -d, --driver string   Specify volume driver name (default "local")
      --label list      Set metadata for a volume
  -o, --opt map         Set driver specific options (default map[])
PS E:\>
~~~