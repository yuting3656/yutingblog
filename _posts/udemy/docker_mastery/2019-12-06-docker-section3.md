---
layout: 'post'
title: 'Docker Mastery: docker containers'
permalink: 'docker_mastery/docker-containers'
tags: udemy-docker
---



## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


- `docker version`

   - `Server` also called `Engine`: running in the background on my machine. 
      - On Windows, it is usually called `servers`
      - On Mac, Linux, it is usually called `demons`

   - Docker command line is talking to the server on my machine and returning its values 

~~~
Client: Docker Engine - Community
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12
 Git commit:        633a0ea
 Built:             Wed Nov 13 07:22:37 2019
 OS/Arch:           windows/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.24)
  Go version:       go1.12.12
  Git commit:       633a0ea
  Built:            Wed Nov 13 07:36:50 2019
  OS/Arch:          windows/amd64
  Experimental:     false
~~~


- `docker info`


~~~
Client:
 Debug Mode: false

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 19.03.5
 Storage Driver: windowsfilter
  Windows:
 Logging Driver: json-file
 Plugins:
  Volume: local
  Network: ics internal l2bridge l2tunnel nat null overlay private transparent
  Log: awslogs etwlogs fluentd gcplogs gelf json-file local logentries splunk syslog
 Swarm: inactive
 Default Isolation: hyperv
 Kernel Version: 10.0 18362 (18362.1.amd64fre.19h1_release.190318-1202)
 Operating System: Windows 10 Pro Version 1903 (OS Build 18362.476)
 OSType: windows
 Architecture: x86_64
 CPUs: 12
 Total Memory: 7.816GiB
 Name: DESKTOP-J72SVHN
 ID: EIGV:NSYV:4IGF:LJNA:WXBX:A6WD:VX7Z:UJVR:CJNJ:MFMQ:32EP:OWZL
 Docker Root Dir: C:\ProgramData\Docker
 Debug Mode: true
  File Descriptors: -1
  Goroutines: 27
  System Time: 2019-12-06T15:29:17.2492349+08:00
  EventsListeners: 1
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false
 Product License: Community Engine
~~~

- docker command line

   - old (still works): `docker <command> (options)`
   - new: `docker <command> <sub-command> (options)`