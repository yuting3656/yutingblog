---
layout: 'post'
title: 'Docker Mastery: Section 10 - Docker Hub (Digging Deeper)'
permalink: 'docker_mastery/docker-sections10-docker-hub-digging-deeper'
tags: udemy-docker docker-hub docker-registry
---

- section10-82, 83, 84

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Section10: Container Registries

- An image registry needs to be part of your container plan
- More Docker Hub details including auto-build
- How Docker Store (store.docker.com) is different then Hub
- Hoe Docker Cloud (cloud.docker.com) is different the Hub
- Use new Swarms feature in cloud to connect Max/Wind to Swarm
- Install and use Docker Registry as private image store
- 3th Party registry options

## Docker Hub: Digging Deeper 

- The most popular public image registry
- It's really Docker Registry plus lightweight images building
- Let's explore more of the features of Docker Hub
- Link GitHub/BitBucket to Hub and auto-buld images on commit 
- Chain image building together

## Docker Hub Autobuild:

- 應該是改版 跟老師說的位置不一樣 但就是這兒~

![Imgur](https://i.imgur.com/28OjGKq.jpg)

- 如果都連好後，只要 push 到 GitHub 就會自動幫你 build 新的 image 在 Docker Hub 上 __(automated build)__

- Repository Links
  - 當你專案有其他 dependencies 時候，可以在這邊做設定


## Understanding Docker Registry

- A private image registry for your network 
- part of the docker/distribution GitHup repo
   - [GitHub: docker/distribution ](https://github.com/docker/distribution){:target="_back"}
- The de facto in private container registries
- Not as full featured as Hub or others, no web UI, basic auth only
- At its core: a web API and storage system, written in Go
- Storage supports local, S3/Azure/Alibaba/Google Cloud, and OpenStack Swift

## Running Docker Registry 

- resources:
   - [Registry Configuration Docs](https://docs.docker.com/registry/configuration/){:target="_back"}
   - [Registry Garbage Collection](https://docs.docker.com/registry/garbage-collection/){:target="_back"}
   - [Use Registry As a "Mirror" of Docker Hub](https://docs.docker.com/registry/recipes/mirror/){:target="_back"}
- Secure your Registry wiht [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security){:target="_back"}
- Storage cleanup via Garbage Collection
- Enable Hub caching via `--registry-mirror`

## Run a Private Docker Registry

- Run the registry image on defalut port 5000
- Re-tag an existing image and push it to your new registry
- Remove that image from local cache and pull it from new registry 
- Re-create registry using abind mount and see how it stores data

## Registry and Proper TLS

- __"Secure by Defalut:"__ Docker won't talkt to registry without HTTPS
- Excpt, localhost(127.0.0.0/8)
- For remote self-signed TLS, enable __"insecure-registry"__ in engine


## 開始實做~

- `docker container run -d -p 5000:5000 --name registry registry`

   - 跑起來瞜~

   ~~~
   PS E:\> docker container ls
   CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
   b00f5cb27706        registry            "/entrypoint.sh /etc…"   25 seconds ago      Up 24 seconds       0.0.0.0:5000->5000/tcp   registry
   ~~~

- 抓 hello-world

   - `docker pull hello-world`
   - `docker run hello-world`

~~~
PS E:\> docker pull hello-world
Using default tag: latest
latest: Pulling from library/hello-world
1b930d010525: Pull complete 
Digest: sha256:f9dfddf63636d84ef479d645ab5885156ae030f611a56f3a7ac7f2fdd86d7e4e
Status: Downloaded newer image for hello-world:latest
docker.io/library/hello-world:latest
PS E:\> docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

PS E:\>
~~~

- push hello-world to local registry

   - `docker tag hello-world 127.0.0.1:5000/hello-world`
   - `docker image ls` 可以看到我們只是把 pull 下來的 hello-world 多新增一個 tag `127.0.0.1:5000/hello-world`

      ~~~
      PS E:\> docker tag hello-world 127.0.0.1:5000/hello-world
      PS E:\> docker image ls
      REPOSITORY                         TAG                   IMAGE ID            CREATED             SIZE
      ...
      127.0.0.1:5000/hello-world         latest                fce289e99eb9        14 months ago       1.84kB
      hello-world                        latest                fce289e99eb9        14 months ago       1.84kB
      ...
      ~~~

    - push: `docker push 127.0.0.1:5000/hello-world`
       - 並不會真的丟到 Docker Hub 而是本機的 registry

      ~~~
      PS E:\> docker push 127.0.0.1:5000/hello-world
      The push refers to repository [127.0.0.1:5000/hello-world]
      af0b15c8625b: Pushed   
      latest: digest: sha256:92c7f9c92844bbbb5d0a101b22f7c2a7949e40f8ea90c8b3bc396879d95e899a size: 524
      ~~~

    - 把 `hello-world` 和 `127.0.0.1:5000/hello-world` images 都殺掉

      ~~~
      PS E:\> docker image remove hello-world
      Untagged: hello-world:latest
      Untagged: hello-world@sha256:f9dfddf63636d84ef479d645ab5885156ae030f611a56f3a7ac7f2fdd86d7e4e
      PS E:\> docker image remove 127.0.0.1:5000/hello-world
      Untagged: 127.0.0.1:5000/hello-world:latest
      Untagged: 127.0.0.1:5000/hello-world@sha256:92c7f9c92844bbbb5d0a101b22f7c2a7949e40f8ea90c8b3bc396879d95e899a
      Deleted: sha256:fce289e99eb9bca977dae136fbe2a82b6b7d4c372474c9235adc1741675f587e
      Deleted: sha256:af0b15c8625bb1938f1d7b17081031f649fd14e6b233688eea3c5483994a66a3
      ~~~

- 再從 local registry pull 下來
   - `docker pull 127.0.0.1:5000/hello-world`

~~~
PS E:\> docker pull 127.0.0.1:5000/hello-world
Using default tag: latest
latest: Pulling from hello-world
1b930d010525: Pull complete     
Digest: sha256:92c7f9c92844bbbb5d0a101b22f7c2a7949e40f8ea90c8b3bc396879d95e899a
Status: Downloaded newer image for 127.0.0.1:5000/hello-world:latest
127.0.0.1:5000/hello-world:latest
~~~

- mount data

   - 先把 local registry 砍掉
      - `docker container kill registry`
      - `docker container rm registry`

   ~~~
   PS E:\> docker container kill registry
   registry
   PS E:\> docker container ls
   CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
   PS E:\> docker container ls -a
   CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                       PORTS               NAMES
   b00f5cb27706        registry            "/entrypoint.sh /etc…"   40 minutes ago      Exited (137) 6 seconds ago                       registry
   PS E:\> docker container rm registry
   registry
   PS E:\Udemy\Docker Mastery\udemy-docker-mastery\registry-sample-1> docker container ls -a
   CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
   ~~~

   - run 一個新的　local registry 且 __data bind mount__ 到資料夾裡面

      - `docker container run -d -p 5000:5000 --name registry -v e:/Udemy/"Docker Mastery"/udemy-docker-mastery/registry-sample-1:/var/lib/registry registry`

   ~~~
    PS E:\Udemy\Docker Mastery\udemy-docker-mastery\registry-sample-1> docker container run -d -p 5000:5000 --name registry -v e:/Udemy/"Docker Mastery"/udemy-docker-mastery/registry-sample-1:/var/lib/registry registry
    bbebb51b88c114a9d9858c8b031036afe4f8d3c9035dbf9b4c8f8a2eecad27b6
   ~~~

- push 127.0.0.1:5000/hello-world 到剛剛新開且 __data bind mount__

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\registry-sample-1> docker push 127.0.0.1:5000/hello-world
The push refers to repository [127.0.0.1:5000/hello-world]
af0b15c8625b: Pushed                                                                                                                                                                                               
latest: digest: sha256:92c7f9c92844bbbb5d0a101b22f7c2a7949e40f8ea90c8b3bc396879d95e899a size: 524
~~~

- `tree` 看一下 Mount　進去的結構

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\registry-sample-1> tree .\registry-data
列出磁碟區 DATA 的資料夾 PATH
磁碟區序號為 F859-A48F
E:\UDEMY\DOCKER MASTERY\UDEMY-DOCKER-MASTERY\REGISTRY-SAMPLE-1\REGISTRY-DATA
└─docker
    └─registry
        └─v2
            ├─blobs
            │  └─sha256
            │      ├─20
            │      │  └─2075ac87b043415d35bb6351b4a59df19b8ad154e578f7048335feeb02d0f759
            │      ├─48
            │      │  └─48b5124b2768d2b917edcb640435044a97967015485e812545546cbed5cf0233
            │      └─98
            │          └─983bfa07a342e316f08afd066894505088de985d46a9af743920aa9cafd17e7a
            └─repositories
                └─hello-world
                    ├─_layers
                    │  └─sha256
                    │      ├─48b5124b2768d2b917edcb640435044a97967015485e812545546cbed5cf0233
                    │      └─983bfa07a342e316f08afd066894505088de985d46a9af743920aa9cafd17e7a
                    └─_manifests
                        ├─revisions
                        │  └─sha256
                        │      └─2075ac87b043415d35bb6351b4a59df19b8ad154e578f7048335feeb02d0f759
                        └─tags
                            └─latest
                                ├─current
                                └─index
                                    └─sha256
                                        └─2075ac87b043415d35bb6351b4a59df19b8ad154e578f7048335feeb02d0f759
~~~

## Run a Private Docker Registry Recap


- Run the registry image 
   - `docker container run -d -p 5000:5000 --name registry registry`

- Re-tag an existing image and push it to your new registry
   - `docker tag hello-world 127.0.0.1:5000/hello-world`
   - `docker push 127.0.0.1:5000/hello-world`

- Remove that image from local cache and pull it from new registry
   - `docker image remove hwllo-world`
   - `docker image remove 127.0.0.1:5000/hello-world`
   - `docker pull 127.0.0.1:5000/hello-world`

- Re-create registry using a bind mount and see how it stores data 
   - `docker container run -d -p 5000:5000 --name registry -v $(pwd)/registry-data:/var/lib/registry registry`