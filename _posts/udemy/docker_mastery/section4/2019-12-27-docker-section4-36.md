---
layout: "single"
title: 'Docker Mastery: Section 4 - The Mighty Hub'
permalink: 'docker_mastery/docker-sections4-the-mighty-hub'
tags: udemy-docker docker-image
---

- section3-36, 37, 38

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Lecture

- Find Official and other good public images
- Download images and basics of image tags
- [https://hub.docker.com](https://hub.docker.com/){:target="_back"}


## Docke Hub

- Official Image

   - ![Imgur](https://i.imgur.com/sS2YFzcl.jpg)

- EX: nginx 

   - Tags

      - ![Imgur](https://i.imgur.com/vsnkb1al.jpg)
   
      - 一行一行的 `Tags` 其實都抓一樣的:

         - `docker pull ngxin:latest` == `docker pull nginx:1.17.6`

         - 都是抓一樣的 image

         - 
         ~~~
           PS E:\> docker pull nginx:latest
           latest: Pulling from library/nginx
           Digest: sha256:50cf965a6e08ec5784009d0fccb380fc479826b6e0e65684d9879170a9df8566
           Status: Image is up to date for nginx:latest
           docker.io/library/nginx:latest
           PS E:\> docker pull nginx:1.17.6
           1.17.6: Pulling from library/nginx
           Digest: sha256:50cf965a6e08ec5784009d0fccb380fc479826b6e0e65684d9879170a9df8566
           Status: Downloaded newer image for nginx:1.17.6
           docker.io/library/nginx:1.17.6
         ~~~


      - show 本機的 images
      
      ~~~
         PS E:\> docker image ls
         REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
         alpine                 latest              c85b8f829d1f        7 days ago          5.59MB
         ubuntu                 14.04               6e4f1fe62ff1        7 days ago          197MB
         nginx                  latest              231d40e811cd        4 weeks ago         126MB
         nginx                  alpine              a624d888d69f        5 weeks ago         21.5MB
         centos                 7                   5e35e350aded        6 weeks ago         203MB
         centos                 latest              0f3e07c0138f        2 months ago        220MB
         tim23656/cheers2019    latest              21660382562c        3 months ago        4.01MB
         <none>                 <none>              cbaa020e0b1c        3 months ago        356MB
         golang                 1.11-alpine         e116d2efa2ab        4 months ago        312MB
         vulnerables/web-dvwa   latest              ab0d83586b6e        14 months ago       712MB
         elasticsearch          2                   5e9d896dc62c        15 months ago       479MB
      ~~~


  - download latest

     - `docker pull nginx`

- Docker Hub Explore 

![Imgur](https://i.imgur.com/JrtqFBf.jpg)

- GitHub: Official Images 

   - [https://github.com/docker-library/official-images/tree/master/library](https://github.com/docker-library/official-images/tree/master/library){:target="_back"}


## Images and Their Layers

- ![Imgur](https://i.imgur.com/hXaGKnK.jpg)

- `docker history <image-name:tags>`

   - show layers of changes made in image
   - ~~~
      PS E:\> docker history nginx:latest
      IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
      231d40e811cd        4 weeks ago         /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B
      <missing>           4 weeks ago         /bin/sh -c #(nop)  STOPSIGNAL SIGTERM           0B
      <missing>           4 weeks ago         /bin/sh -c #(nop)  EXPOSE 80                    0B
      <missing>           4 weeks ago         /bin/sh -c ln -sf /dev/stdout /var/log/nginx…   22B
      <missing>           4 weeks ago         /bin/sh -c set -x     && addgroup --system -…   57.1MB
      <missing>           4 weeks ago         /bin/sh -c #(nop)  ENV PKG_RELEASE=1~buster     0B
      <missing>           4 weeks ago         /bin/sh -c #(nop)  ENV NJS_VERSION=0.3.7        0B
      <missing>           4 weeks ago         /bin/sh -c #(nop)  ENV NGINX_VERSION=1.17.6     0B
      <missing>           4 weeks ago         /bin/sh -c #(nop)  LABEL maintainer=NGINX Do…   0B
      <missing>           4 weeks ago         /bin/sh -c #(nop)  CMD ["bash"]                 0B
      <missing>           4 weeks ago         /bin/sh -c #(nop) ADD file:bc8179c87c8dbb3d9…   69.2MB
   ~~~

- `docker image inspect <image-name:tags>`

   - retruns JSON metadata about the image
   - ~~~
      PS E:\> docker image inspect nginx
      [
          {
              "Id": "sha256:231d40e811cd970168fb0c4770f2161aa30b9ba6fe8e68527504df69643aa145",
              "RepoTags": [
                  "nginx:1.17.6",
                  "nginx:latest"
              ],
              "RepoDigests": [
                  "nginx@sha256:50cf965a6e08ec5784009d0fccb380fc479826b6e0e65684d9879170a9df8566"
              ],
              "Parent": "",
              "Comment": "",
              "Created": "2019-11-23T01:12:31.219881158Z",
              "Container": "806a0a78bcfee5212b2530e6f2a7e3f8eec5b51cc55d7a28935f5f8c8bd45826",
              "ContainerConfig": {
                  "Hostname": "806a0a78bcfe",
                  "Domainname": "",
                  "User": "",
                  "AttachStdin": false,
                  "AttachStdout": false,
                  "AttachStderr": false,
                  "ExposedPorts": {
                      "80/tcp": {}
                  },
                  "Tty": false,
                  "OpenStdin": false,
                  "StdinOnce": false,
                  "Env": [
                      "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                      "NGINX_VERSION=1.17.6",
                      "NJS_VERSION=0.3.7",
                      "PKG_RELEASE=1~buster"
                  ],
                  "Cmd": [
                      "/bin/sh",
                      "-c",
                      "#(nop) ",
                      "CMD [\"nginx\" \"-g\" \"daemon off;\"]"
                  ],
                  "ArgsEscaped": true,
                  "Image": "sha256:f96d70a1d708239afa79b86f1e005c033864d22dabe94b466acba087d5bbc722",
                  "Volumes": null,
                  "WorkingDir": "",
                  "Entrypoint": null,
                  "OnBuild": null,
                  "Labels": {
                      "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
                  },
                  "StopSignal": "SIGTERM"
              },
              "DockerVersion": "18.06.1-ce",
              "Author": "",
              "Config": {
                  "Hostname": "",
                  "Domainname": "",
                  "User": "",
                  "AttachStdin": false,
                  "AttachStdout": false,
                  "AttachStderr": false,
                  "ExposedPorts": {
                      "80/tcp": {}
                  },
                  "Tty": false,
                  "OpenStdin": false,
                  "StdinOnce": false,
                  "Env": [
                      "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                      "NGINX_VERSION=1.17.6",
                      "NJS_VERSION=0.3.7",
                      "PKG_RELEASE=1~buster"
                  ],
                  "Cmd": [
                      "nginx",
                      "-g",
                      "daemon off;"
                  ],
                  "ArgsEscaped": true,
                  "Image": "sha256:f96d70a1d708239afa79b86f1e005c033864d22dabe94b466acba087d5bbc722",
                  "Volumes": null,
                  "WorkingDir": "",
                  "Entrypoint": null,
                  "OnBuild": null,
                  "Labels": {
                      "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
                  },
                  "StopSignal": "SIGTERM"
              },
              "Architecture": "amd64",
              "Os": "linux",
              "Size": 126323486,
              "VirtualSize": 126323486,
              "GraphDriver": {
                  "Data": {
                      "LowerDir": "/var/lib/docker/overlay2/da1b070a8bcd06dd725a8e53bfa712146c1af8127f4e80e6d3523c8acfa2a254/diff:/var/lib/docker/overlay2/03096a618330d9f22cefaab64d5bddd0417aa5021ee03e86a7da858776cfb226/diff",
                      "MergedDir": "/var/lib/docker/overlay2/fcd37a00bf6824fbfbc984dac76d2decd20830068c9e6a001b59878dd0059050/merged",
                      "UpperDir": "/var/lib/docker/overlay2/fcd37a00bf6824fbfbc984dac76d2decd20830068c9e6a001b59878dd0059050/diff",
                      "WorkDir": "/var/lib/docker/overlay2/fcd37a00bf6824fbfbc984dac76d2decd20830068c9e6a001b59878dd0059050/work"
                  },
                  "Name": "overlay2"
              },
              "RootFS": {
                  "Type": "layers",
                  "Layers": [
                      "sha256:831c5620387fb9efec59fc82a42b948546c6be601e3ab34a87108ecf852aa15f",
                      "sha256:5fb987d2e54d85820d95d6c31f3fe4cd95bf71fe6d9d9e4684082cb551b728b0",
                      "sha256:4fc1aa8003a3d0d2481f10d17773869cbff12c1008df30e0bab8259086a0311c"
                  ]
              },
              "Metadata": {
                  "LastTagTime": "0001-01-01T00:00:00Z"
              }
          }
      ]
   ~~~

## Image Tagging and Pushing to Docker Hub

- Tagging

   - `docker image tag`
      - assign one or more tags to image

   - ~~~
      PS E:\> docker image tag --help
      
      Usage:  docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
      
      Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
      ~~~

   - `<user>/<repo>:<tag>`

      - default tag is latest if not specified

      - `docker image ls`

         ~~~
            PS E:\> docker image ls
            REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
            alpine                 latest              c85b8f829d1f        7 days ago          5.59MB
            ubuntu                 14.04               6e4f1fe62ff1        8 days ago          197MB
            nginx                  1.17.6              231d40e811cd        4 weeks ago         126MB
            nginx                  latest              231d40e811cd        4 weeks ago         126MB
            nginx                  alpine              a624d888d69f        5 weeks ago         21.5MB
            centos                 7                   5e35e350aded        6 weeks ago         203MB
            centos                 latest              0f3e07c0138f        2 months ago        220MB
            tim23656/cheers2019    latest              21660382562c        3 months ago        4.01MB
            <none>                 <none>              cbaa020e0b1c        3 months ago        356MB
            golang                 1.11-alpine         e116d2efa2ab        4 months ago        312MB
            vulnerables/web-dvwa   latest              ab0d83586b6e        14 months ago       712MB
            elasticsearch          2                   5e9d896dc62c        15 months ago       479MB
         ~~~

- EX: 拿 nginx 的 image 變成自己的 repo

   - `docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]`
   - __TARGET_IMAGE__: 命名規則 `<user>/<repo>`
   - ~~~
      PS E:\> docker image tag nginx yuting/nginx
      PS E:\> docker image ls
      REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
      alpine                 latest              c85b8f829d1f        7 days ago          5.59MB
      ubuntu                 14.04               6e4f1fe62ff1        8 days ago          197MB
      nginx                  1.17.6              231d40e811cd        4 weeks ago         126MB
      nginx                  latest              231d40e811cd        4 weeks ago         126MB
      nginx                  mainline            231d40e811cd        4 weeks ago         126MB
      yuting/nginx           latest              231d40e811cd        4 weeks ago         126MB
      nginx                  alpine              a624d888d69f        5 weeks ago         21.5MB
      centos                 7                   5e35e350aded        6 weeks ago         203MB
      centos                 latest              0f3e07c0138f        2 months ago        220MB
      tim23656/cheers2019    latest              21660382562c        3 months ago        4.01MB
      <none>                 <none>              cbaa020e0b1c        3 months ago        356MB
      golang                 1.11-alpine         e116d2efa2ab        4 months ago        312MB
      vulnerables/web-dvwa   latest              ab0d83586b6e        14 months ago       712MB
      elasticsearch          2                   5e9d896dc62c        15 months ago       479MB
   ~~~
 

 - __docker image push__

    - uploads changed layers to a image registry (default is Hub)

    - using `docker login` & `docker logout` 

       - `docker login docker.io`
       - `docker login -u "username" -p "password" docker.io  `

    - 然後我搞了半天！！　一直失敗，深深覺得老師欺騙我的感情的那塊崩潰的時刻，突然看到 `yuting/nginx` ....
     <br/>
     然後再看命名規則:  `<user>/<repo>` ，靠杯喔！！！！！！！！！　



 - 完美 push 

   - ![Imgur](https://i.imgur.com/ILZVF5t.jpg)
   - ~~~
      PS E:\> docker image tag nginx tim23656/nginx
      PS E:\> docker image ls
      REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
      alpine                 latest              c85b8f829d1f        7 days ago          5.59MB
      ubuntu                 14.04               6e4f1fe62ff1        8 days ago          197MB
      nginx                  1.17.6              231d40e811cd        4 weeks ago         126MB
      nginx                  latest              231d40e811cd        4 weeks ago         126MB
      nginx                  mainline            231d40e811cd        4 weeks ago         126MB
      tim23656/nginx         latest              231d40e811cd        4 weeks ago         126MB
      yuting/nginx           latest              231d40e811cd        4 weeks ago         126MB
      nginx                  alpine              a624d888d69f        5 weeks ago         21.5MB
      centos                 7                   5e35e350aded        6 weeks ago         203MB
      centos                 latest              0f3e07c0138f        2 months ago        220MB
      tim23656/cheers2019    latest              21660382562c        3 months ago        4.01MB
      <none>                 <none>              cbaa020e0b1c        3 months ago        356MB
      golang                 1.11-alpine         e116d2efa2ab        4 months ago        312MB
      vulnerables/web-dvwa   latest              ab0d83586b6e        14 months ago       712MB
      elasticsearch          2                   5e9d896dc62c        15 months ago       479MB
      PS E:\> docker image push tim23656/nginx
      The push refers to repository [docker.io/tim23656/nginx]
      4fc1aa8003a3: Pushed                                                                                    
      5fb987d2e54d: Pushed                                                                                    
      831c5620387f: Pushed                                                                                    
      latest: digest: sha256:189cce606b29fb2a33ebc2fcecfa8e33b0b99740da4737133cdbcee92f3aba0a size: 948
      ~~~

- EX: 幫剛剛的 create image 加上 tag

~~~
PS E:\> docker image tag tim23656/nginx tim23656/nginx:testing
PS E:\> docker image ls
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
alpine                 latest              c85b8f829d1f        7 days ago          5.59MB
ubuntu                 14.04               6e4f1fe62ff1        8 days ago          197MB
tim23656/nginx         latest              231d40e811cd        4 weeks ago         126MB
tim23656/nginx         testing             231d40e811cd        4 weeks ago         126MB
yuting/nginx           latest              231d40e811cd        4 weeks ago         126MB
nginx                  1.17.6              231d40e811cd        4 weeks ago         126MB
nginx                  latest              231d40e811cd        4 weeks ago         126MB
nginx                  mainline            231d40e811cd        4 weeks ago         126MB
nginx                  alpine              a624d888d69f        5 weeks ago         21.5MB
centos                 7                   5e35e350aded        6 weeks ago         203MB
centos                 latest              0f3e07c0138f        2 months ago        220MB
tim23656/cheers2019    latest              21660382562c        3 months ago        4.01MB
<none>                 <none>              cbaa020e0b1c        3 months ago        356MB
golang                 1.11-alpine         e116d2efa2ab        4 months ago        312MB
vulnerables/web-dvwa   latest              ab0d83586b6e        14 months ago       712MB
elasticsearch          2                   5e9d896dc62c        15 months ago       479MB
PS E:\> docker image push tim23656/nginx:testing
The push refers to repository [docker.io/tim23656/nginx]
4fc1aa8003a3: Layer already exists                                                                      5fb987d2e54d: Layer already exists                                                                      831c5620387f: Layer already exists                                                                      testing: digest: sha256:189cce606b29fb2a33ebc2fcecfa8e33b0b99740da4737133cdbcee92f3aba0a size: 948
~~~


## Review

- Properly tagging images
- Tagging images for upload to Docker Hub
- How tagging is related to image ID
- The Latest Tag 
- Logging into Docker Hub from docker cli
- How to create private Docker Hub images
   - 先在 docker hub 建立 private repo 再 push