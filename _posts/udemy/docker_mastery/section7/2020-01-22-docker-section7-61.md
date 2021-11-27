---
layout: "single"
title: 'Docker Mastery: Section 7 - (Swarm) Creating a 3-Node Swarm Cluster'
permalink: 'docker_mastery/docker-sections7-swarm-create-a-3-node-swarm-cluster'
tags: udemy-docker swarm
---

- section7-61, 62, 63

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Creating 3-Node Swarm: Host Options


- A. [play-with-docker.com](https://labs.play-with-docker.com/){:target="_back"}
   - Only needs a browser, but resets after 4 hours

- B. docker-machine + VirtualBox
   - Free and runs locally, but requires a machine with 8GB memory
      - `docker-machine create node1`
      - `docker-machine ssh node1`
      - `docker-machine env node1`

- C. Digital Ocean + Docker install
   - Most like a production setup, but costs $5-10/node/month while learning
   - Use my referral code in section resources to get $10 free

- D. Roll your own
   - docker-machine can provision machines for Amazon, Azure, DO, Google, etc.
   - Install docker anywhere with `get.docker.com`


## C. Digital Ocean + Docker install 

- Create With Putty

   - [https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/create-with-putty/](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/create-with-putty/){:target="_back"}


   - [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html){:target="_back"}

- Windows: Using SSH Keys to Connect to your Droplet

   - 完美設定!

<iframe  src="https://www.youtube.com/embed/plIeC5Zpp8A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- 自行安裝 docker 

   - [get.docker.com](https://get.docker.com/{:target='_back'}


- 成功連線三台 + 完美安裝 docker

   - ![Imgur](https://i.imgur.com/hkYIYyd.jpg)

- `docker swarm inint`

   - 會遇到雲端常見的　__multiple address__

      - `
root@node1:~# docker swarm init
Error response from daemon: could not choose an IP address to advertise since this system has multiple addresses on interface eth0 (128.199.251.10 and 10.15.0.5) - specify one with --advertise-addr
`


   - `docker searm init --advertise-addr <IP-ADDRESS>`

      - 
       ~~~
         root@node1:~# docker swarm init --advertise-addr 128.199.251.10
         Swarm initialized: current node (s12y6v6a9bflwg5ilgt1snqnj) is now a manager.  
         To add a worker to this swarm, run the following command:
             docker swarm join --token SWMTKN-1-3eg3s9pydsljge5als6julzr13iyr61ja55vdvi5e0i6ok0z2g-2pq15e04myfcb5tbry45kl927 128.199.251.10:2377
         To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
       ~~~


- 把別人加進來 (Add a worker to this swarm)
   
   - `docker swarm join --token <token> <IP>`
      - ssh 到 node2 
         - `docker swarm join --token SWMTKN-1-3eg3s9pydsljge5als6julzr13iyr61ja55vdvi5e0i6ok0z2g-2pq15e04myfcb5tbry45kl927 128.199.251.10:2377`
   - 把 node2 加入後
      - 到 node1 看: `docker node ls`
         - 
         ~~~
         　　　root@node1:~# docker node ls
         　　　ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
         　　　s12y6v6a9bflwg5ilgt1snqnj *   node1               Ready               Active              Leader              19.03.5
         　　　ap6hv4cn5a169nrz9y6ekb55d     node2               Ready               Active                                  19.03.5
         ~~~ 

    - works cannot use any swarm cmd

       - 把 node2 變成 manager 

          - `docker node update --role manager node2`

             - 
             ~~~
                root@node1:~# docker node update --role manager node2
                node2
                root@node1:~# docker node ls
                ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
                s12y6v6a9bflwg5ilgt1snqnj *   node1               Ready               Active              Leader              19.03.5
                ap6hv4cn5a169nrz9y6ekb55d     node2               Ready               Active              Reachable           19.03.5
             ~~~

- 把別人加進來 直接 __default__ 是 __manager__

   - `docker swarm join-token manager`

      - 
      ~~~
         root@node1:~# docker swarm join-token manager
         To add a manager to this swarm, run the following command:
             docker swarm join --token SWMTKN-1-3eg3s9pydsljge5als6julzr13iyr61ja55vdvi5e0i6ok0z2g-6wg4geuthyrej5yuqldd588kc 128.199.251.10:2377
      ~~~

   - ssh 到 node3 貼上

      - 
      ~~~
         root@node3:~# docker swarm join --token SWMTKN-1-3eg3s9pydsljge5als6julzr13iyr61                                      
         ja55vdvi5e0i6ok0z2g-6wg4geuthyrej5yuqldd588kc 128.199.251.10:2377
         This node joined a swarm as a manager.
      ~~~

- 整體看一次

   - 
   ~~~
      root@node1:~# docker node ls
      ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
      s12y6v6a9bflwg5ilgt1snqnj *   node1               Ready               Active              Leader              19.03.5
      ap6hv4cn5a169nrz9y6ekb55d     node2               Ready               Active              Reachable           19.03.5
      qk9r4437q9b0hk2yzwgyyc7yf     node3               Ready               Active              Reachable           19.03.5
   ~~~


## 建造 三個 alpine

~~~
root@node1:~# docker service create --replicas 3 alpine ping 8.8.8.8
k9qvzxq8yopiyg3nhy0xps0dn
overall progress: 3 out of 3 tasks
1/3: running
2/3: running
3/3: running
verify: Service converged
~~~

> 幹！　超狂 :sunny::sunny::sunny:　直接把三個 alpine 分別部屬到 node1, node2, node3

~~~
root@node1:~# docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
s12y6v6a9bflwg5ilgt1snqnj *   node1               Ready               Active              Leader              19.03.5
ap6hv4cn5a169nrz9y6ekb55d     node2               Ready               Active              Reachable           19.03.5
qk9r4437q9b0hk2yzwgyyc7yf     node3               Ready               Active              Reachable           19.03.5
root@node1:~# docker node ps node1
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
q1m5t3k4edex        funny_franklin.1    alpine:latest       node1               Running             Running 5 minutes ago
root@node1:~# docker node ps node2
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
n2syw72rciq1        funny_franklin.2    alpine:latest       node2               Running             Running 5 minutes ago
root@node1:~# docker node ps node3
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
j6g1myeu5v4f        funny_franklin.3    alpine:latest       node3               Running             Running 5 minutes ago
~~~

- 看整個 servcie 狀況
   
   - `docker servcie ls`
   - `docker servcie ps <service-name>`

~~~
root@node1:~# docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
k9qvzxq8yopi        funny_franklin      replicated          3/3                 alpine:latest
root@node1:~# docker service ps funny_franklin
ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
q1m5t3k4edex        funny_franklin.1    alpine:latest       node1               Running             Running 7 minutes ago
n2syw72rciq1        funny_franklin.2    alpine:latest       node2               Running             Running 7 minutes ago
j6g1myeu5v4f        funny_franklin.3    alpine:latest       node3               Running             Running 7 minutes ago
~~~