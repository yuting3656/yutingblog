---
layout: "single"
title: 'Docker Mastery: docker networks'
permalink: 'docker_mastery/docker-networks'
tags: udemy-docker docker-network
---

- section3-27, 28, 29

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Concepts for Private and Public Comms in Containers

- review of `docker container run -p`
- For local dev/testing, networks usually 'just work'
- `docker container port <container>` --> prot check


## Docker Networks Defaults 

- Each container connected to a private virtual network "bridge"
- Each virtual network routes throught NAT firewall on host IP
- All containers on a virtual network can talk to each other withou `-p`
- Best practice is to create a new virtual network for each app:
   - network "my_web_app" for mysql and php/apache containers
   - network "my_api" for mongo and nodejs contaienrs

- "Batteries included, But Removable"
   - Defaults work well in many cases, but easy to swap out parts to customize it
- Make new virtual networks
- Attach containers to more then one virtual network (or none)
- Skip virtual networks and use host IP (--net=host)
- Use different Docker network drivers to gain new abilities


#### docker container port <container-name>

~~~bash
PS E:\> docker container run -p 80:80 --name wehost -d nginx
af15feb619aae2d2ce67135383dfa5282decd8afabd69bc033b51b81a964419b
PS E:\> docker container port wehost
80/tcp -> 0.0.0.0:80
~~~

 
#### docker container inspect --format

- `format`

   - A common option for formatting the output of commands using "Go templates"

   - 影片有出現 ip, 我本機用沒有 不知道為啥 TAT! 
   
~~~
PS E:\> docker container inspect --format "{{println .NetworkSettings.IPAddress }}" wehost
~~~

## Docker Networks: CLI Management

- Show networks `docker network ls`
- Inspect a network `docker network inspect`
- Create a network `docker network create --driver`
- Attach a network to container `docker network connect`
- Detach a network from container `docker netwrok disconnect` 


###  docker netwokr ls

- nat 我猜應該才是 udemy 教的 default (bridge)
    - \-\-network bridge
        - Default Docker virtual netwrok, wich is NAT'ed behind the Host IP

~~~bash
PS E:\> docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
eac904f817d2        Default Switch      ics                 local
a0bd5f908394        nat                 nat                 local
d9815661b74d        none                null                local
~~~


### docker network inspect <network-id>

- inspect `nat` --> 這邊應該是 default 和 udemy 教的有點不一樣 (應該是版本不同 & os 不同)

~~~bash
PS E:\> docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
eac904f817d2        Default Switch      ics                 local
a0bd5f908394        nat                 nat                 local
d9815661b74d        none                null                local 
PS E:\> docker network inspect a0bd5f908394
[
    {
        "Name": "nat",
        "Id": "a0bd5f908394f9628d0a1dfa2a84f6b88191c38e42f7fe613e83d595ae59db62",
        "Created": "2019-12-17T11:09:22.1629564+08:00",
        "Scope": "local",
        "Driver": "nat",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "windows",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.28.48.0/20",
                    "Gateway": "172.28.48.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8": {
                "Name": "webhost",
                "EndpointID": "0a9fca0fb0fee7816c596a87672bb42d92c28cc9e582a4a743d1ab6a77e43d43",
                "MacAddress": "00:15:5d:37:98:84",
                "IPv4Address": "172.28.57.199/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.windowsshim.hnsid": "F4BE3A13-E3FF-41BF-9166-5B2F1EDE18C4",
            "com.docker.network.windowsshim.networkname": "nat"
        },
        "Labels": {}
    }
]
~~~

### docker network ls 

- [官網文件](https://docs.docker.com/v17.09/engine/userguide/networking/){:target="_back"} 和 Udemy 顯示的一樣

   - \-\-network host 
      - It gains performance by skipping virtual networks but sacrifices security of container model

   - \-\-network none
      - removes eh0 and onl leaves you with localhost intrface in container

~~~
  $ docker network ls
  NETWORK ID          NAME                DRIVER
  7fca4eb8c647        bridge              bridge
  cf03ee007fb4        host                host
  9f904ee27bf5        none                null
~~~


### docker network create 

- Spawns a new virtual network for you to attach containers to

- 我照著Udemy 教學
   - `docker network create my_app_net`
   - 出錯
   - 
   ~~~
       PS E:\> docker network create my_app_net
       Error response from daemon: could not find plugin bridge in v1 plugin registry: plugin not found
     ~~~
   - [查到](https://github.com/docker/for-win/issues/2109){:target="_back"}
      - 這篇清楚解釋 bridge driver 只有在 Linux or Linux container (Docker for Window 裝況下) 
      -  
      ~~~
         If you are using Docker EE and running Linux containers using LCOW way then you need to create a network using the NAT driver.
         The Bridge Driver is only available on Linux machine so whenever we use Docker CE (Docker for Windows) and run windows container,
         Bridge will not work but if we use Linux container Bridge will work smooth and user will face no issues.
         Though its also important to understand that Bridge Driver does not work for Linux container when we go LCOW way as LCOW internally uses Windows Kernel and Windows kernel has no support for Bridge Driver.
         It's important to remember that Docker has made Bridge as the default Network Driver so its the responsibility of the person running the container to make a judicious decision about which driver to choose.   
         Please use the command mentioned below to resolve the error
         docker network create --driver nat NetworkName
      ~~~
   - `docker network create --driver nat NetworkName` 可解
   - 成功

   ~~~
    PS E:\> docker network create --driver nat my_app_net
    0cf86ffd25fbe9c5f4d682f756eb0a1d7e7fcb89a9c0b38e0a4252777123d8c2
   ~~~

- docker network create 後 來看一下

   - `docker network ls`

~~~
PS E:\> docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
eac904f817d2        Default Switch      ics                 local
0cf86ffd25fb        my_app_net          nat                 local
a0bd5f908394        nat                 nat                 local
d9815661b74d        none                null                local
~~~


- docker network create --help

~~~batch
PS E:\> docker network create --help

Usage:  docker network create [OPTIONS] NETWORK

Create a network

Options:
      --attachable           Enable manual container attachment
      --aux-address map      Auxiliary IPv4 or IPv6 addresses used by
                             Network driver (default map[])
      --config-from string   The network from which copying the configuration
      --config-only          Create a configuration only network
  -d, --driver string        Driver to manage the Network (default "bridge")
      --gateway strings      IPv4 or IPv6 Gateway for the master subnet
      --ingress              Create swarm routing-mesh network
      --internal             Restrict external access to the network
      --ip-range strings     Allocate container ip from a sub-range
      --ipam-driver string   IP Address Management Driver (default "default")
      --ipam-opt map         Set IPAM driver specific options (default map[])
      --ipv6                 Enable IPv6 networking
      --label list           Set metadata on a network
  -o, --opt map              Set driver specific options (default map[])
      --scope string         Control the network's scope
      --subnet strings       Subnet in CIDR format that represents a
                             network segment
~~~

- EX:

  - run 一個新的 nginx 使用剛剛新建的 network: `my_app_net` 

~~~bash
PS E:\> docker container run -d --name new_nginx --network my_app_net nginx:alpine
82d03d8708d34e1b1a123c108c8e2fb683fd6e8e8e476a705c67ca5d8bcf6455
PS E:\> docker network inspect my_appnet
[]
Error: No such network: my_appnet
PS E:\> docker network inspect my_app_net
[
    {
        "Name": "my_app_net",
        "Id": "0cf86ffd25fbe9c5f4d682f756eb0a1d7e7fcb89a9c0b38e0a4252777123d8c2",
        "Created": "2019-12-19T16:33:10.1995444+08:00",
        "Scope": "local",
        "Driver": "nat",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "windows",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.19.64.0/20",
                    "Gateway": "172.19.64.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "82d03d8708d34e1b1a123c108c8e2fb683fd6e8e8e476a705c67ca5d8bcf6455": {
                "Name": "new_nginx",
                "EndpointID": "edbe4cb5d1205a2fd3433bce68644dbcf768982877c5563c2b31d0a0bda82ab0",
                "MacAddress": "00:15:5d:b9:43:82",
                "IPv4Address": "172.19.67.156/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.windowsshim.hnsid": "19134C1F-99A4-42E2-A22B-C794EC1D7041"
        },
        "Labels": {}
    }
]
~~~


- 讓running container `connect / disconnect`不同的 network

   - `docker network connect`

      - docker network connect <network-id/name> <container-id/name>

   - `docker network disconnect`

      - docker network disconnect <network-id/name> <container-id/name>


   -  > 做這練習 失敗 ! 都會出現怪怪的狀況，應該就是 docker for window (windows container 運作不一樣)

- EX:

   - 練習看 文件 docker container --help
   - 重新啟動 stop 的 container 
   - inspect container 狀況
      - network 只有連上 nat

   - connet netwokr to `my_app_net` 
      - 出現 
      ~~~
         PS E:\> docker network connect my_app_net webhost
         Error response from daemon: unsupported platform request
      ~~~

   - 再次檢視 container 
      - network 有接上 nat and `my_app_net`

   - 哈! 怪怪得兒~ XDD 
   - 沒關西 繼續學~ 

~~~
PS E:\> docker container --help

Usage:  docker container COMMAND

Manage containers

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  inspect     Display detailed information on one or more containers
  kill        Kill one or more running containers
  logs        Fetch the logs of a container
  ls          List containers
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  prune       Remove all stopped containers
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  run         Run a command in a new container
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker container COMMAND --help' for more information on a command.
PS E:\> docker container start webhost
webhost
PS E:\> docker container inspect webhost
[
    {
        "Id": "84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8",
        "Created": "2019-12-19T07:51:19.9745764Z",
        "Path": "nginx",
        "Args": [
            "-g",
            "daemon off;"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 292,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2019-12-19T09:18:12.4858539Z",
            "FinishedAt": "2019-12-19T17:16:55.0058039+08:00"
        },
        "Image": "sha256:a624d888d69ffdc185ed3b9c9c0645e8eaaac843ce59e89f1fbe45b0581e4ef6",
        "ResolvConfPath": "",
        "HostnamePath": "",
        "HostsPath": "",
        "LogPath": "C:\\ProgramData\\Docker\\containers\\84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8\\84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8-json.log",
        "Name": "/webhost",
        "RestartCount": 0,
        "Driver": "lcow",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "80/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "80"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Capabilities": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 0,
            "ConsoleSize": [
                57,
                104
            ],
            "Isolation": "hyperv",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": null,
            "ReadonlyPaths": null
        },
        "GraphDriver": {
            "Data": {
                "dir": "C:\\ProgramData\\Docker\\lcow\\84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8"
            },
            "Name": "lcow"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "84b21327e45e",
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
                "PKG_RELEASE=1"
            ],
            "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
            ],
            "Image": "nginx:alpine",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
            },
            "StopSignal": "SIGTERM"
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "80/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "80"
                    }
                ]
            },
            "SandboxKey": "84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "nat": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "a0bd5f908394f9628d0a1dfa2a84f6b88191c38e42f7fe613e83d595ae59db62",
                    "EndpointID": "cf436b8947c2e1e5ccd85f6fc9d23d86c9258ea7b9c3f3516f12f1975aa326d4",
                    "Gateway": "172.28.48.1",
                    "IPAddress": "172.28.50.50",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "00:15:5d:37:96:0b",
                    "DriverOpts": null
                }
            }
        }
    }
]
PS E:\> docker network connect my_app_net webhost
Error response from daemon: unsupported platform request
PS E:\> docker container inspect webhost
[
    {
        "Id": "84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8",
        "Created": "2019-12-19T07:51:19.9745764Z",
        "Path": "nginx",
        "Args": [
            "-g",
            "daemon off;"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 292,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2019-12-19T09:18:12.4858539Z",
            "FinishedAt": "2019-12-19T17:16:55.0058039+08:00"
        },
        "Image": "sha256:a624d888d69ffdc185ed3b9c9c0645e8eaaac843ce59e89f1fbe45b0581e4ef6",
        "ResolvConfPath": "",
        "HostnamePath": "",
        "HostsPath": "",
        "LogPath": "C:\\ProgramData\\Docker\\containers\\84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8\\84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8-json.log",
        "Name": "/webhost",
        "RestartCount": 0,
        "Driver": "lcow",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "80/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "80"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Capabilities": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 0,
            "ConsoleSize": [
                57,
                104
            ],
            "Isolation": "hyperv",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": null,
            "ReadonlyPaths": null
        },
        "GraphDriver": {
            "Data": {
                "dir": "C:\\ProgramData\\Docker\\lcow\\84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8"
            },
            "Name": "lcow"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "84b21327e45e",
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
                "PKG_RELEASE=1"
            ],
            "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
            ],
            "Image": "nginx:alpine",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
            },
            "StopSignal": "SIGTERM"
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "80/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "80"
                    }
                ]
            },
            "SandboxKey": "84b21327e45e6d81fc42ee6fb73a45510553291c5447064037bc956e21c51aa8",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "my_app_net": {
                    "IPAMConfig": {},
                    "Links": null,
                    "Aliases": [
                        "84b21327e45e"
                    ],
                    "NetworkID": "0cf86ffd25fbe9c5f4d682f756eb0a1d7e7fcb89a9c0b38e0a4252777123d8c2",
                    "EndpointID": "20d27854e2c1370c67e46e0abadd6fa69fcc22cf5739dcfde3e0bb4daab882ed",
                    "Gateway": "",
                    "IPAddress": "172.19.64.42",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "00:15:5d:b9:48:f4",
                    "DriverOpts": {}
                },
                "nat": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "a0bd5f908394f9628d0a1dfa2a84f6b88191c38e42f7fe613e83d595ae59db62",
                    "EndpointID": "cf436b8947c2e1e5ccd85f6fc9d23d86c9258ea7b9c3f3516f12f1975aa326d4",
                    "Gateway": "172.28.48.1",
                    "IPAddress": "172.28.50.50",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "00:15:5d:37:96:0b",
                    "DriverOpts": null
                }
            }
        }
    }
]
~~~