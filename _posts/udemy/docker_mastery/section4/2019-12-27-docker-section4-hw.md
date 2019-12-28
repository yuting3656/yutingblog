---
layout: 'post'
title: 'Docker Matery: Section 4 作業阿～！！！ Build Own Dockerfile and Run Containers From It'
permalink: 'docker_matery/docker-sections4-hw-build-own-dockerfile-and-run-containers-from-it'
tags: udemy-docker docker-image
---

- section3-42, 43, 44

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Build Your Own Image

- Dockerfiles are part process workflow and part art
- Take existing Node.js app and Dockerize it
- Maker __Dockerfile.__ Build it. Test it. Push it. (rm it). Run it.
- Expect this to be iterative. Rarely do it, get it right the first time
- Details in `dockerfile-assignment-1/Dockerfile`
- Use the Alpine version of the official `node` 6.x image
- Expected result is web site at http://localhost
- Tag and push to yor Docker Hub account (free)
- Remove your imag from local cache, run again from Hub

### 寫作業筆記

- Dockerfile 

   - 自己寫的跟老師的解答幾乎一模一樣唷～～　ＧＯＯＤ～

~~~dockerfile
# use this empty Dockerfile to build your assignment

# This dir contains a Node.js app, you need to get it running in a container
# No modifications to the app should be necessary, only edit this Dockerfile

# Overview of this assignment
# use the instructions from developer below to create a working Dockerfile
# feel free to add command inline below or use a new file, up to you (but must be named Dockerfile)
# once Dockerfile builds correctly, start container locally to make sure it works on http://localhost
# then ensure image is named properly for your Docker Hub account with a new repo name
# push to Docker Hub, then go to https://hub.docker.com and verify
# then remove local image from cache
# then start a new container from your Hub image, and watch how it auto downloads and runs
# test again that it works at http://localhost


# Instructions from the app developer

# - you should use the 'node' official image, with the alpine 6.x branch
FROM node:6-alpine

# - this app listens on port 3000, but the container should launch on port 80
  #  so it will respond to http://localhost:80 on your computer
EXPOSE 3000

# - then it should use alpine package manager to install tini: 'apk add --update tini'
RUN apk add --update tini

# - then it should create directory /usr/src/app for app files with 'mkdir -p /usr/src/app'
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# - Node uses a "package manager", so it needs to copy in package.json file
COPY package.json package.json

# - then it needs to run 'npm install' to install dependencies from that file
# - to keep it clean and small, run 'npm cache clean --force' after above
RUN npm install && npm cach clean --force

# - then it needs to copy in all files from current directory
COPY . .

# - then it needs to start container with command '/sbin/tini -- node ./bin/www'
CMD ["tini",  "--", "node" ,"./bin/www"]

# - in the end you should be using FROM, RUN, WORKDIR, COPY, EXPOSE, and CMD commands

# Bonus Extra Credit
# this will not have you setting up a complete image useful for local development, test, and prod
# it's just meant to get you started with basic Dockerfile concepts and not focus too much on
# proper Node.js use in a container. **If you happen to be a Node.js Developer**, then 
# after you get through more of this course, you should come back and use my 
# Node Docker Good Defaults sample project on GitHub to change this Dockerfile for 
# better local development with more advanced topics
# https://github.com/BretFisher/node-docker-good-defaults
~~~

- build 

   - `docker image build -t yuting-node .`

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker image build -t yuting-node .
Sending build context to Docker daemon  443.9kB
Step 1/9 : FROM node:6-alpine
 ---> dfc29bfa7d41
Step 2/9 : EXPOSE 3000
 ---> Running in e9fb328a1cf4
Removing intermediate container e9fb328a1cf4
 ---> a051f3df70f9
Step 3/9 : RUN apk add --update tini
 ---> Running in 40bf84c21ea8
fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/community/x86_64/APKINDEX.tar.gz
(1/1) Installing tini (0.18.0-r0)
Executing busybox-1.29.3-r10.trigger
OK: 7 MiB in 17 packages
Removing intermediate container 40bf84c21ea8
 ---> 875e6b218873
Step 4/9 : RUN mkdir -p /usr/src/app
 ---> Running in bb65f45326da
Removing intermediate container bb65f45326da
 ---> 54aef24d8a2f
Step 5/9 : WORKDIR /usr/src/app
 ---> Running in cc51141f6104
Removing intermediate container cc51141f6104
 ---> a459162baf9f
Step 6/9 : COPY package.json package.json
 ---> ee7601d18f3c
Step 7/9 : RUN npm install && npm cach clean --force
 ---> Running in 35d9459b3d21
dockerfile-assignment-1@0.0.0 /usr/src/app
+-- body-parser@1.19.0
| +-- bytes@3.1.0
| +-- content-type@1.0.4
| +-- depd@1.1.2
| +-- http-errors@1.7.2
| | +-- inherits@2.0.3
| | `-- toidentifier@1.0.0
| +-- iconv-lite@0.4.24
| | `-- safer-buffer@2.1.2
| +-- on-finished@2.3.0
| | `-- ee-first@1.1.1
| +-- qs@6.7.0
| +-- raw-body@2.4.0
| | `-- unpipe@1.0.0
| `-- type-is@1.6.18
|   +-- media-typer@0.3.0
|   `-- mime-types@2.1.25
|     `-- mime-db@1.42.0
+-- cookie-parser@1.4.4
| +-- cookie@0.3.1
| `-- cookie-signature@1.0.6
+-- debug@2.6.9
| `-- ms@2.0.0
+-- express@4.17.1
| +-- accepts@1.3.7
| | `-- negotiator@0.6.2
| +-- array-flatten@1.1.1
| +-- content-disposition@0.5.3
| +-- cookie@0.4.0
| +-- encodeurl@1.0.2
| +-- escape-html@1.0.3
| +-- etag@1.8.1
| +-- finalhandler@1.1.2
| +-- fresh@0.5.2
| +-- merge-descriptors@1.0.1
| +-- methods@1.1.2
| +-- parseurl@1.3.3
| +-- path-to-regexp@0.1.7
| +-- proxy-addr@2.0.5
| | +-- forwarded@0.1.2
| | `-- ipaddr.js@1.9.0
| +-- range-parser@1.2.1
| +-- safe-buffer@5.1.2
| +-- send@0.17.1
| | +-- destroy@1.0.4
| | +-- mime@1.6.0
| | `-- ms@2.1.1
| +-- serve-static@1.14.1
| +-- setprototypeof@1.1.1
| +-- statuses@1.5.0
| +-- utils-merge@1.0.1
| `-- vary@1.1.2
+-- hbs@4.0.6
| +-- handlebars@4.3.5
| | +-- neo-async@2.6.1
| | +-- optimist@0.6.1
| | | +-- minimist@0.0.10
| | | `-- wordwrap@0.0.3
| | +-- source-map@0.6.1
| | `-- uglify-js@3.7.3
| |   `-- commander@2.20.3
| `-- walk@2.3.14
|   `-- foreachasync@3.0.0
+-- morgan@1.9.1
| +-- basic-auth@2.0.1
| `-- on-headers@1.0.2
`-- serve-favicon@2.5.0
  +-- ms@2.1.1
  `-- safe-buffer@5.1.1

npm WARN using --force I sure hope you know what you are doing.
Removing intermediate container 35d9459b3d21
 ---> 2da97cdba8c6
Step 8/9 : COPY . .
 ---> f62eab9e0556
Step 9/9 : CMD ["tini",  "--", "node" ,"./bin/www"]
 ---> Running in a249bb8c1014
Removing intermediate container a249bb8c1014
 ---> c6dbbd2d07f5
Successfully built c6dbbd2d07f5
Successfully tagged yuting-node:latest
SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
~~~



- 新建一個，可以上傳到　Hub  的image
   - 忘記指令了嗎？　
      - [看我的筆記](https://yuting3656.github.io/yutingblog/docker_matery/docker-sections4-the-mighty-hub){:target="_back"}

   - 忘了的話可以
      - `docker image tag --help`

   - `docker image tag yuting-node:latest tim23656/yuting-node:latest:latest`
   - `docker image push tim23656/yuting-node`
   - ![Imgur](https://i.imgur.com/oNLyUh1.jpg)

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker image tag yuting-node:latest tim23656/yuting-node:latest
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker image ls
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
yuting-node                latest              c6dbbd2d07f5        17 minutes ago      64.5MB
tim23656/yuting-node       latest              c6dbbd2d07f5        17 minutes ago      64.5MB
<none>                     <none>              f3e410fb9440        18 minutes ago      70.7MB
<none>                     <none>              72a67a11658b        36 minutes ago      123MB
nginx-with-html            latest              5af5a710d6ac        2 hours ago         126MB
tim23656/nginx-wiht-html   latest              5af5a710d6ac        2 hours ago         126MB
customnginx                latest              b7b835141e3a        2 hours ago         108MB
<none>                     <none>              a690e991b96c        2 hours ago         108MB
node                       alpine              e1495e4ac50d        2 days ago          111MB
alpine                     latest              c85b8f829d1f        7 days ago          5.59MB
ubuntu                     14.04               6e4f1fe62ff1        8 days ago          197MB
nginx                      1.17.6              231d40e811cd        4 weeks ago         126MB
nginx                      latest              231d40e811cd        4 weeks ago         126MB
nginx                      mainline            231d40e811cd        4 weeks ago         126MB
tim23656/nginx             latest              231d40e811cd        4 weeks ago         126MB
tim23656/nginx             testing             231d40e811cd        4 weeks ago         126MB
yuting/nginx               latest              231d40e811cd        4 weeks ago         126MB
debian                     stretch-slim        2b343cb3b772        4 weeks ago         55.3MB
nginx                      alpine              a624d888d69f        5 weeks ago         21.5MB
centos                     7                   5e35e350aded        6 weeks ago         203MB
centos                     latest              0f3e07c0138f        2 months ago        220MB
tim23656/cheers2019        latest              21660382562c        3 months ago        4.01MB
<none>                     <none>              cbaa020e0b1c        3 months ago        356MB
golang                     1.11-alpine         e116d2efa2ab        4 months ago        312MB
node                       6-alpine            dfc29bfa7d41        8 months ago        56.1MB
vulnerables/web-dvwa       latest              ab0d83586b6e        14 months ago       712MB
elasticsearch              2                   5e9d896dc62c        15 months ago       479MB
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker image push tim23656/yuting-node
The push refers to repository [docker.io/tim23656/yuting-node]
a51cb1d26ebe: Pushed    
e4b8466b9091: Pushed
c7841a4bdd61: Pushed         
0e8f33b9d2d1: Pushed  
39e379e118d3: Pushed
f168d52a989d: Mounted from library/node                                                                                                                                             
17b7c23fba03: Mounted from library/node
a464c54f93a9: Mounted from library/node
latest: digest: sha256:c54be2a7c3c346ffe593479b2f573fa8660836fed6702e888b9bfde708113cb0 size: 1997
~~~


- 把 local 端的 image 殺掉，pull 剛剛丟上 Hub 的 image

   - `docker image rm yuting-node`
   - `docekr rmi $(docker images f"dagling=true" -q)`
      - 刪掉所有 untaggd
   - `docker container run -p 80:3000 --rm tim23656/yuting-node` 

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker image rm yuting-node
Untagged: yuting-node:latest
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker image ls
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
tim23656/yuting-node       latest              c6dbbd2d07f5        28 minutes ago      64.5MB
<none>                     <none>              f3e410fb9440        29 minutes ago      70.7MB
<none>                     <none>              72a67a11658b        47 minutes ago      123MB
nginx-with-html            latest              5af5a710d6ac        2 hours ago         126MB
tim23656/nginx-wiht-html   latest              5af5a710d6ac        2 hours ago         126MB
customnginx                latest              b7b835141e3a        2 hours ago         108MB
<none>                     <none>              a690e991b96c        2 hours ago         108MB
node                       alpine              e1495e4ac50d        2 days ago          111MB
alpine                     latest              c85b8f829d1f        7 days ago          5.59MB
ubuntu                     14.04               6e4f1fe62ff1        8 days ago          197MB
nginx                      1.17.6              231d40e811cd        4 weeks ago         126MB
nginx                      latest              231d40e811cd        4 weeks ago         126MB
nginx                      mainline            231d40e811cd        4 weeks ago         126MB
tim23656/nginx             latest              231d40e811cd        4 weeks ago         126MB
tim23656/nginx             testing             231d40e811cd        4 weeks ago         126MB
yuting/nginx               latest              231d40e811cd        4 weeks ago         126MB
debian                     stretch-slim        2b343cb3b772        4 weeks ago         55.3MB
nginx                      alpine              a624d888d69f        5 weeks ago         21.5MB
centos                     7                   5e35e350aded        6 weeks ago         203MB
centos                     latest              0f3e07c0138f        2 months ago        220MB
tim23656/cheers2019        latest              21660382562c        3 months ago        4.01MB
<none>                     <none>              cbaa020e0b1c        3 months ago        356MB
golang                     1.11-alpine         e116d2efa2ab        4 months ago        312MB
node                       6-alpine            dfc29bfa7d41        8 months ago        56.1MB
vulnerables/web-dvwa       latest              ab0d83586b6e        14 months ago       712MB
elasticsearch              2                   5e9d896dc62c        15 months ago       479MB
~~~

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker rmi $(docker images -f"dangling=true" -q)
Deleted: sha256:f3e410fb9440cf5f566fc0977d93bbecfaf07b0c033de726b337a1f3e94db31b
Deleted: sha256:05a87f3a3e5bcbc9dda952142834c62bb0cf42ee4d860a1b773faa37227c3118
Deleted: sha256:1e97a87768fe68fa444da2c39fe851f7b3e2840508c404d124dfa22d9d6aa1e4
Deleted: sha256:bdd1d6ebb5a95450e5b119696330e785f6c4679d76262d566e6f1a36d36616d2
Deleted: sha256:6b7085895e4b2b22c63f8a277306168e11802d3307902c0ccd3888bc82f1504d
Deleted: sha256:c1c20ff81ad77284cfd81ae949c36b5213d7031b5f2abf7a9c5102ad71f90600
Deleted: sha256:623e7c2e98eb2361d6685f290acaa8aa4d36b9af51e5b34b0dceb371f705af83
Deleted: sha256:d4ca38c2dbce627f596c8cf8ec8f3855c5e4a87bbc25a48f663a1f11a078dc45
Deleted: sha256:bd8e1f091b8a0c30d52d3550d743e4128ede77168ac14799646ce4743df95635
Deleted: sha256:ff9acad4c3d87227be376a2e73917ecf3fecf36a7c5fc7e5eb8c14d9e9f24b99
Deleted: sha256:d156be4117af9a9b4db1b3014f43a7f0064887f6c13720405a6f63998b131199
Deleted: sha256:523cd206634ec0f523d6ad9bbb209d69270e3b097e4b6cf55efd4238c246378a
Deleted: sha256:620a50f0b2b8aba19f03bd3eb122592a9d9c986df93cfb7582e8f4d45df41783
Deleted: sha256:49998adfe278d09b39a24ee7086c80333883241fd61dea750de96406d8e85758
Deleted: sha256:50c681f0c2a146e7d89b36c50ba0ce03f3c6baf63320c95147848391695b14d0
Deleted: sha256:72a67a11658be719f51de5d2fa32f9c674a11e57006147e1ac9523edf9cfde7f
Deleted: sha256:ea220d325ef12deb66d1900fb41112263dbbef1cd495cd09a4c9d1516f1ec020
Deleted: sha256:51b401abb668c4a62fd71b628ece284421c86761e67266c26b31b555f29324fa
Deleted: sha256:3f8c3cb377f37f7db7e5876c7301d116cb31a8cf1e6ee20981538de7a4460f5b
Deleted: sha256:4830fcee250e6c0167bf07b26c3eb4d697e723d697ddb04fd4221aaf95e2da4b
Deleted: sha256:e8911805e1efa98743859e043fc306deecebc6f8fce9408a70c599761599e761
Deleted: sha256:638c051e6dd7b26f6adf3f50162bce640a7d45b5d36fe74d2c3e82e1d928aaa1
Deleted: sha256:91d6bf886356391408dda14bee9c267dbff400489b86bffbcd80acf4600ae2c3
Deleted: sha256:89a1e2cadb893c175d691217d9ef3bb85ad6a9681bb2db4d489d330b0c2379de
Deleted: sha256:65537f561300abb27ea48703e88e799ab7cf2b26881668ec020d13854a4deaa9
Deleted: sha256:319df6bf20efe2fd589aa5bd813802d7c648869221c12f356a44eb5a9f4afbb5
Deleted: sha256:a03f6c05bfe2bc32c18f5a52dfcb9a523866c70dfa37fe0acaa2c94730a1477f
Deleted: sha256:ba5a82682c71d8fb42f553ee458d925fdcc30921f031b42e4ab6ff0e71a53530
Deleted: sha256:33b2d2e8d5665654748e5eec62c96c7667e33f0775402003ae189aff2a1b8cd3
Deleted: sha256:1aa516877192b45db43477ae59e7626bd6d4a8e2afc002f5e15b829b7e63d329
Deleted: sha256:a690e991b96c7f7fad112899f655f167ff100ff4c55453526f204bb4b68dd40c
Deleted: sha256:a87e6419b3294965f594f5e36c707565c12b68601f7af4547c992d4ac60a3166
Deleted: sha256:cbaa020e0b1c49471dc227a53353bbdf34ce055ba195668411db324ebdaa626b
Deleted: sha256:f72e3faa6c6f6d45f2d16c071331956966f4830e4081db27a8e7aa79d0ee5b9a
Deleted: sha256:51183055c6db6e386f93ac800b78fe4528cfd548f73cda269a56b0104a092dda
Deleted: sha256:2e064e594e70fdcafddca2cdaa51e2d4570fe16a9f275020fcd387612d328ecf
Deleted: sha256:2aff131a7a8b80da4a8015f6afc8d517d1c712624d87d13d175499d640ede68a
Deleted: sha256:6ba0300dd0d95a3595ff08816ee988123bf7f4aef9834a54cce3b6d82c2d888d
Deleted: sha256:42aa97ef7571047a1fd100708901be15dacb2cef0e0f507e0052a9dd91cb17e7
Deleted: sha256:bca5c99aa4320a6a7b30628e1c1ac51e03c556a36e85f2173182732c6de9dd38
Deleted: sha256:e7a562d95cf812c682147a1ef314563740a7b595cfe484d45291cbebe375b3f6
Deleted: sha256:502d4f0a15cbd696b7450363c43783b69ac22316f1d18c6db231793dabb339a6
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker image ls
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
tim23656/yuting-node       latest              c6dbbd2d07f5        36 minutes ago      64.5MB
nginx-with-html            latest              5af5a710d6ac        2 hours ago         126MB
tim23656/nginx-wiht-html   latest              5af5a710d6ac        2 hours ago         126MB
customnginx                latest              b7b835141e3a        2 hours ago         108MB
node                       alpine              e1495e4ac50d        2 days ago          111MB
alpine                     latest              c85b8f829d1f        7 days ago          5.59MB
ubuntu                     14.04               6e4f1fe62ff1        8 days ago          197MB
yuting/nginx               latest              231d40e811cd        4 weeks ago         126MB
nginx                      1.17.6              231d40e811cd        4 weeks ago         126MB
nginx                      latest              231d40e811cd        4 weeks ago         126MB
nginx                      mainline            231d40e811cd        4 weeks ago         126MB
tim23656/nginx             latest              231d40e811cd        4 weeks ago         126MB
tim23656/nginx             testing             231d40e811cd        4 weeks ago         126MB
debian                     stretch-slim        2b343cb3b772        4 weeks ago         55.3MB
nginx                      alpine              a624d888d69f        5 weeks ago         21.5MB
centos                     7                   5e35e350aded        6 weeks ago         203MB
centos                     latest              0f3e07c0138f        2 months ago        220MB
tim23656/cheers2019        latest              21660382562c        3 months ago        4.01MB
golang                     1.11-alpine         e116d2efa2ab        4 months ago        312MB
node                       6-alpine            dfc29bfa7d41        8 months ago        56.1MB
vulnerables/web-dvwa       latest              ab0d83586b6e        14 months ago       712MB
elasticsearch              2                   5e9d896dc62c        15 months ago       479MB
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1>
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1>
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1>
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\dockerfile-assignment-1> docker container run -p 80:3000 --rm tim23656/yuting-node
GET / 200 67.264 ms - 304
GET /stylesheets/style.css 200 7.293 ms - 119
GET /images/picard.gif 200 1.811 ms - 417700
~~~

- 筆記： `COPY`

   - COPY [當前路徑資料位置] [image-目標位置]

- 筆記： `docker container run -p 80:3000`

   - `docker container run -p 80:3000 --rm yuting-node`

   - __\-\-publish , \-p__  `Publish a container’s port(s) to the host`

   - 在 browser 上開啟　__localhost:80__ 成功！

      - XDDDD 金靠杯　ＸＤＤＤ
      - ![Imgur](https://i.imgur.com/lEPZSrt.jpg)

- 筆記: 刪除 <none> untagged 的 images

   - ` docker rmi $(docker images -f"dangling=true" -q)`



## Docker tip: docker system prune and df

- `docker image prune`
   - to clean up just __dangling__ images
- `docker system prune`
   - will clean up everything

<iframe src="https://www.youtube.com/embed/_4QzP7uwtvI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>