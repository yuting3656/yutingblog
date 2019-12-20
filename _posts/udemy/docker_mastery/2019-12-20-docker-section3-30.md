---
layout: 'post'
title: 'Docker Matery: docker networks - DNS'
permalink: 'docker_matery/docker-networks-dns'
tags: udemy-docker docker-network
---

- section3-30

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

__UPDATE__

- 原本在 [上一篇: docker networks](https://yuting3656.github.io/yutingblog/docker_matery/docker-networks){:target="_back"}認為是 windows container 的問題

   - 因為我想轉成 linux container (os: window 10) 都會出現 `Not Enough memory to start docker`
   - 找到[這篇](https://stackoverflow.com/questions/43170089/docker-wont-start-on-windows-not-enough-memory-to-start-docker){:target="_back"}
   - [RAMMap](https://docs.microsoft.com/en-us/sysinternals/downloads/rammap){:target="_back"} 完美成功～ :heart:
   - 來看一下在linux container: docker network ls :smile:
   ~~~
    PS E:\> docker network ls
    NETWORK ID          NAME                DRIVER              SCOPE
    03dd300148ee        bridge              bridge              local
    ac1758c62d02        docker_gwbridge     bridge              local
    38141a5dcd63        host                host                local
    2b8252cbc923        none                null                local
   ~~~


## Docker Networks: DNS

- Understandhow DNS is the key to easy inter-container comms
- See how it works by default with custom networks
- Learn how to use `--link` to enable DNS on default bridge network 


### Docker DNS

- Docker daemon has a buil-in DNS server that containers use by default

### DHS Default Names

- Docker defaults the hostname to the container's name, but you can also set aliases

~~~
PS E:\> docker container run -d --name my_nginx --network my_app_net nginx:alpine
271531dd2c370f7329972463bb9e21071a415973d69599b6cbdf63809bf5b1d9
PS E:\> docker network inspect my_app_net
[
    {
        "Name": "my_app_net",
        "Id": "954fd2e03b3260aa5f38b433b73b3c6ae718735331c79bc183083df08a368708",
        "Created": "2019-12-20T08:32:05.3098572Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.19.0.0/16",
                    "Gateway": "172.19.0.1"
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
            "271531dd2c370f7329972463bb9e21071a415973d69599b6cbdf63809bf5b1d9": {
                "Name": "my_nginx",
                "EndpointID": "25a947ebea06b02e83de7313ca149ec52da9f543033b7df155ff3c441f9827c5",
                "MacAddress": "02:42:ac:13:00:03",
                "IPv4Address": "172.19.0.3/16",
                "IPv6Address": ""
            },
            "7a2b26422c6bf58a5ce3df346a51fbf148e877faa12b9c983a4927ed82e7f60a": {
                "Name": "new_nginx",
                "EndpointID": "54233c18e840fef3c3be2210072df840828e1c268429fbfca689a10bec438908",
                "MacAddress": "02:42:ac:13:00:02",
                "IPv4Address": "172.19.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
~~~

## contaienrs 相互　ping

- docker container exec -it <container-id/name> <cmd> <args..>
   - [docker container exec: 複習](https://yuting3656.github.io/yutingblog/docker_matery/docker-containers-cli){:target="_back"}
   - 畢卡索葛！
       - |![Imgur](https://i.imgur.com/JDocG2i.jpg)|

~~~
PS E:\> docker container exec -it webhost ping new_nginx
PING new_nginx (172.19.0.2): 56 data bytes
64 bytes from 172.19.0.2: seq=0 ttl=64 time=0.048 ms
64 bytes from 172.19.0.2: seq=1 ttl=64 time=0.186 ms
64 bytes from 172.19.0.2: seq=2 ttl=64 time=0.187 ms
64 bytes from 172.19.0.2: seq=3 ttl=64 time=0.156 ms
64 bytes from 172.19.0.2: seq=4 ttl=64 time=0.137 ms
^C
--- new_nginx ping statistics ---
5 packets transmitted, 5 packets received, 0% packet loss
round-trip min/avg/max = 0.048/0.142/0.187 ms
PS E:\> docker container exec -it my_nginx ping new_nginx
PING new_nginx (172.19.0.2): 56 data bytes
64 bytes from 172.19.0.2: seq=0 ttl=64 time=0.085 ms
64 bytes from 172.19.0.2: seq=1 ttl=64 time=0.193 ms
64 bytes from 172.19.0.2: seq=2 ttl=64 time=0.072 ms
^C
--- new_nginx ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.072/0.116/0.193 ms
PS E:\> docker container exec -it webhost ping my_nginx
PING my_nginx (172.19.0.3): 56 data bytes
64 bytes from 172.19.0.3: seq=0 ttl=64 time=0.099 ms
64 bytes from 172.19.0.3: seq=1 ttl=64 time=0.188 ms
64 bytes from 172.19.0.3: seq=2 ttl=64 time=0.189 ms
~~~