---
layout: 'post'
title: 'Docker Matery: Section 7 - (Swarm) create first service and scale it locally'
permalink: 'docker_matery/docker-sections7-swarm-create-first-service-and-scale-it-locally'
tags: udemy-docker swarm
---

- section7-60

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Create your first service and scale it locally

- 看現在 swarm 狀態
   - `docker info`

- 初始化 swarm 
   - `docker swarm init`
   - 
   
   ~~~
    PS E:\> docker swarm init
    Swarm initialized: current node (ffaok4w0uqwb6cgt25luwfv1v) is now a manager.
    
    To add a worker to this swarm, run the following command:
    
        docker swarm join --token SWMTKN-1-2e1r4xj3d00pcqpm60wv2fqk4if1umthgyey6l99b84rjj1uy2-f3zi7t6ec3xq2clh4jmdbc1l2 192.168.65.3:2377
    
    To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
    
    PS E:\>
   ~~~

## Docker swarm init: What Just Happened?

- Lots of PKI and security automation
   - Root Signing Certificate created for our Swarm
   - Certificate is issued for first Manager node
   - Join tokens are created

- Raft database created to store root CA, configs and secrets
   - Encrypted by default on disk (1.13+)
   - No need for another key/value system to hold orchestration/secrets
   - Replicate logs amongst Managers via mutual TLS in "control plane"

## Swarm cli

- `docker node ls`
   
   - 

   ~~~
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
    PS E:\> docker node ls
    ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
    ffaok4w0uqwb6cgt25luwfv1v *   docker-desktop      Ready               Active              Leader              19.03.5
   ~~~


- `docker node --help`

   - 

   ~~~
      PS E:\> docker node --help
   
      Usage:  docker node COMMAND
      
      Manage Swarm nodes
      
      Commands:
        demote      Demote one or more nodes from manager in the swarm
        inspect     Display detailed information on one or more nodes
        ls          List nodes in the swarm
        promote     Promote one or more nodes to manager in the swarm
        ps          List tasks running on one or more nodes, defaults to current node
        rm          Remove one or more nodes from the swarm
        update      Update a node
      
      Run 'docker node COMMAND --help' for more information on a command.
   ~~~

- `docker swarm --help`

   - 

   ~~~
      PS E:\> docker swarm --help
   
      Usage:  docker swarm COMMAND
      
      Manage Swarm
      
      Commands:
        ca          Display and rotate the root CA
        init        Initialize a swarm
        join        Join a swarm as a node and/or manager
        join-token  Manage join tokens
        leave       Leave the swarm
        unlock      Unlock swarm
        unlock-key  Manage the unlock key
        update      Update the swarm
      
      Run 'docker swarm COMMAND --help' for more information on a command.
   ~~~

- `docker service --help`

   - __service__ in swarm replace `docker run`

   ~~~
      PS E:\> docker service --help
   
      Usage:  docker service COMMAND
      
      Manage services
      
      Commands:
        create      Create a new service
        inspect     Display detailed information on one or more services
        logs        Fetch the logs of a service or task
        ls          List services
        ps          List the tasks of one or more services
        rm          Remove one or more services
        rollback    Revert changes to a service's configuration
        scale       Scale one or multiple replicated services
        update      Update a service
      
      Run 'docker service COMMAND --help' for more information on a command.
   ~~~

## Swarm Orchestration

- `docker service create alpine ping 8.8.8.8`

- `docker service ls`

   -  REPLICAS: [有幾個正在跑]/[定義總共有幾個] 

   ~~~
      PS E:\> docker service ls
      ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
      w16lr30xhmsv        tender_goldberg     replicated          1/1                 alpine:latest
   ~~~

- `docker service ps <name/id>`

   - `docker service ps tender_goldberg`

      - showing __tasks__ or __containers__ of the service

   - ~~~
    PS E:\> docker service ps tender_goldberg
    ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
    sswdox7tf8c0        tender_goldberg.1   alpine:latest       docker-desktop      Running             Running 15 minutes ago
   ~~~

- 跑回去，單純看 docker container ls 的狀態

   - `docker container ls`

   - ~~~
      PS E:\> docker container ls
      CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
      a8a22ee6fdcb        alpine:latest       "ping 8.8.8.8"      17 minutes ago      Up 17 minutes                           tender_goldberg.1.sswdox7tf8c0kkkaelexywhhq
   ~~~

- scale up the service

   - `docker service update <ID/Name> --replicas 3`

   - 先看 service id/name : `docker service ls`

      - `docker servcie update w16lr30xhmsv --replicas 3`

   - 
     ~~~
        PS E:\> docker service ls
        ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
        w16lr30xhmsv        tender_goldberg     replicated          1/1                 alpine:latest
        PS E:\> docker service update w16lr30xhmsv --replicas 3
        w16lr30xhmsv
        overall progress: 3 out of 3 tasks                                                                      
        1/3: running                                                                                            
        2/3: running                                                                                            
        3/3: running                                                                                            
        verify: Service converged 
     ~~~

    - 看 `docker service ls`, `docker service ps <servcieID/serviceName>` and `docker container ls`
   
    - ~~~
       PS E:\> docker service ls
       ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
       w16lr30xhmsv        tender_goldberg     replicated          3/3                 alpine:latest
       PS E:\> docker service ps tender_goldberg
       ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
       sswdox7tf8c0        tender_goldberg.1   alpine:latest       docker-desktop      Running             Running 31 minutes ago
       ufskmhuj4wj1        tender_goldberg.2   alpine:latest       docker-desktop      Running             Running 4 minutes ago
       ljbe1ru4f6t7        tender_goldberg.3   alpine:latest       docker-desktop      Running             Running 4 minutes ago

       PS E:\> docker container ls
       CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
       b8744dc7ce3e        alpine:latest       "ping 8.8.8.8"      5 minutes ago       Up 5 minutes                            tender_goldberg.3.ljbe1ru4f6t7k7m767nq3obbd
       31a05e27c24f        alpine:latest       "ping 8.8.8.8"      5 minutes ago       Up 5 minutes                            tender_goldberg.2.ufskmhuj4wj15qfz911i05684
       a8a22ee6fdcb        alpine:latest       "ping 8.8.8.8"      31 minutes ago      Up 31 minutes                           tender_goldberg.1.sswdox7tf8c0kkkaelexywhhq
    ~~~

   
## Update CLI

- `docker update --help`

   - cmd for docker run conatienr to update certain variables on a running container without having to kill it or restart it 


   -  ~~~
      PS E:\> docker update --help
   
      Usage:  docker update [OPTIONS] CONTAINER [CONTAINER...]
      
      Update configuration of one or more containers
      
      Options:
            --blkio-weight uint16        Block IO (relative weight), between 10
                                         and 1000, or 0 to disable (default 0)
            --cpu-period int             Limit CPU CFS (Completely Fair
                                         Scheduler) period
            --cpu-quota int              Limit CPU CFS (Completely Fair
                                         Scheduler) quota
            --cpu-rt-period int          Limit the CPU real-time period in
                                         microseconds
            --cpu-rt-runtime int         Limit the CPU real-time runtime in
                                         microseconds
        -c, --cpu-shares int             CPU shares (relative weight)
            --cpus decimal               Number of CPUs
            --cpuset-cpus string         CPUs in which to allow execution (0-3, 0,1)
            --cpuset-mems string         MEMs in which to allow execution (0-3, 0,1)
            --kernel-memory bytes        Kernel memory limit
        -m, --memory bytes               Memory limit
            --memory-reservation bytes   Memory soft limit
            --memory-swap bytes          Swap limit equal to memory plus swap:
                                         '-1' to enable unlimited swap
            --pids-limit int             Tune container pids limit (set -1 for
                                         unlimited)
            --restart string             Restart policy to apply when a
                                         container exits
   ~~~

- `docker service update --help`

   - 有超多選項，因為 __Swarm Service__ 本身就是設計成可以 to replace conatiners, update services without taking all things down 

   - ~~~
      PS E:\> docker service update --help
      
      Usage:  docker service update [OPTIONS] SERVICE
      
      Update a service
      
      Options:
            --args command                       Service command args
            --config-add config                  Add or update a config file on
                                                 a service
            --config-rm list                     Remove a configuration file
            --constraint-add list                Add or update a placement
                                                 constraint
            --constraint-rm list                 Remove a constraint
            --container-label-add list           Add or update a container label
            --container-label-rm list            Remove a container label by its key
            --credential-spec credential-spec    Credential spec for managed
                                                 service account (Windows only)
        -d, --detach                             Exit immediately instead of
                                                 waiting for the service to converge
            --dns-add list                       Add or update a custom DNS server
            --dns-option-add list                Add or update a DNS option
            --dns-option-rm list                 Remove a DNS option
            --dns-rm list                        Remove a custom DNS server
            --dns-search-add list                Add or update a custom DNS
                                                 search domain
            --dns-search-rm list                 Remove a DNS search domain
            --endpoint-mode string               Endpoint mode (vip or dnsrr)
            --entrypoint command                 Overwrite the default
                                                 ENTRYPOINT of the image
            --env-add list                       Add or update an environment
                                                 variable
            --env-rm list                        Remove an environment variable
            --force                              Force update even if no
                                                 changes require it
            --generic-resource-add list          Add a Generic resource
            --generic-resource-rm list           Remove a Generic resource
            --group-add list                     Add an additional
                                                 supplementary user group to
                                                 the container
            --group-rm list                      Remove a previously added
                                                 supplementary user group from
                                                 the container
            --health-cmd string                  Command to run to check health
            --health-interval duration           Time between running the check
                                                 (ms|s|m|h)
            --health-retries int                 Consecutive failures needed to
                                                 report unhealthy
            --health-start-period duration       Start period for the container
                                                 to initialize before counting
                                                 retries towards unstable (ms|s|m|h)
            --health-timeout duration            Maximum time to allow one
                                                 check to run (ms|s|m|h)
            --host-add list                      Add a custom host-to-IP
                                                 mapping (host:ip)
            --host-rm list                       Remove a custom host-to-IP
                                                 mapping (host:ip)
            --hostname string                    Container hostname
            --image string                       Service image tag
            --init                               Use an init inside each
                                                 service container to forward
                                                 signals and reap processes
            --isolation string                   Service container isolation mode
            --label-add list                     Add or update a service label
            --label-rm list                      Remove a label by its key
            --limit-cpu decimal                  Limit CPUs
            --limit-memory bytes                 Limit Memory
            --log-driver string                  Logging driver for service
            --log-opt list                       Logging driver options
            --mount-add mount                    Add or update a mount on a service
            --mount-rm list                      Remove a mount by its target path
            --network-add network                Add a network
            --network-rm list                    Remove a network
            --no-healthcheck                     Disable any
                                                 container-specified HEALTHCHECK
            --no-resolve-image                   Do not query the registry to
                                                 resolve image digest and
                                                 supported platforms
            --placement-pref-add pref            Add a placement preference
            --placement-pref-rm pref             Remove a placement preference
            --publish-add port                   Add or update a published port
            --publish-rm port                    Remove a published port by its
                                                 target port
        -q, --quiet                              Suppress progress output
            --read-only                          Mount the container's root
                                                 filesystem as read only
            --replicas uint                      Number of tasks
            --replicas-max-per-node uint         Maximum number of tasks per
                                                 node (default 0 = unlimited)
            --reserve-cpu decimal                Reserve CPUs
            --reserve-memory bytes               Reserve Memory
            --restart-condition string           Restart when condition is met
                                                 ("none"|"on-failure"|"any")
            --restart-delay duration             Delay between restart attempts
                                                 (ns|us|ms|s|m|h)
            --restart-max-attempts uint          Maximum number of restarts
                                                 before giving up
            --restart-window duration            Window used to evaluate the
                                                 restart policy (ns|us|ms|s|m|h)
            --rollback                           Rollback to previous specification
            --rollback-delay duration            Delay between task rollbacks
                                                 (ns|us|ms|s|m|h)
            --rollback-failure-action string     Action on rollback failure
                                                 ("pause"|"continue")
            --rollback-max-failure-ratio float   Failure rate to tolerate
                                                 during a rollback
            --rollback-monitor duration          Duration after each task
                                                 rollback to monitor for
                                                 failure (ns|us|ms|s|m|h)
            --rollback-order string              Rollback order
                                                 ("start-first"|"stop-first")
            --rollback-parallelism uint          Maximum number of tasks rolled
                                                 back simultaneously (0 to roll
                                                 back all at once)
            --secret-add secret                  Add or update a secret on a service
            --secret-rm list                     Remove a secret
            --stop-grace-period duration         Time to wait before force
                                                 killing a container
                                                 (ns|us|ms|s|m|h)
            --stop-signal string                 Signal to stop the container
            --sysctl-add list                    Add or update a Sysctl option
            --sysctl-rm list                     Remove a Sysctl option
        -t, --tty                                Allocate a pseudo-TTY
            --update-delay duration              Delay between updates
                                                 (ns|us|ms|s|m|h)
            --update-failure-action string       Action on update failure
                                                 ("pause"|"continue"|"rollback")
            --update-max-failure-ratio float     Failure rate to tolerate
                                                 during an update
            --update-monitor duration            Duration after each task
                                                 update to monitor for failure
                                                 (ns|us|ms|s|m|h)
            --update-order string                Update order
                                                 ("start-first"|"stop-first")
            --update-parallelism uint            Maximum number of tasks
                                                 updated simultaneously (0 to
                                                 update all at once)
        -u, --user string                        Username or UID (format:
                                                 <name|uid>[:<group|gid>])
            --with-registry-auth                 Send registry authentication
                                                 details to swarm agents
        -w, --workdir string                     Working directory inside the
                                                 container
   ~~~

## Swarm 會確保 contaienr 正常運作！

- 關掉某 container 的時候，會自動重啟！

- 
~~~
   PS E:\> docker service ls
   ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
   w16lr30xhmsv        tender_goldberg     replicated          3/3                 alpine:latest
   PS E:\> docker rm -f tender_goldberg.3.ljbe1ru4f6t7k7m767nq3obbd
   Error: No such container: tender_goldberg.3.ljbe1ru4f6t7k7m767nq3obbd
   PS E:\> docker container ls
   CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
   444518744d3c        alpine:latest       "ping 8.8.8.8"      31 seconds ago      Up 26 seconds                           tender_goldberg.3.j9rvj0l5jd8pnflt84lja7w6l
   31a05e27c24f        alpine:latest       "ping 8.8.8.8"      26 minutes ago      Up 26 minutes                           tender_goldberg.2.ufskmhuj4wj15qfz911i05684
   a8a22ee6fdcb        alpine:latest       "ping 8.8.8.8"      52 minutes ago      Up 52 minutes                           tender_goldberg.1.sswdox7tf8c0kkkaelexywhhq
   PS E:\> docker rm -f tender_goldberg.3.j9rvj0l5jd8pnflt84lja7w6l
   tender_goldberg.3.j9rvj0l5jd8pnflt84lja7w6l
   PS E:\> docker service ls
   ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
   w16lr30xhmsv        tender_goldberg     replicated          3/3                 alpine:latest
   PS E:\> docker service ps tendser_goldberg
   no such service: tendser_goldberg
   PS E:\> docker service ps tender_goldberg
   ID                  NAME                    IMAGE               NODE                DESIRED STATE       CURRENT STATE               ERROR                         PORTS
   sswdox7tf8c0        tender_goldberg.1       alpine:latest       docker-desktop      Running             Running 53 minutes ago
   ufskmhuj4wj1        tender_goldberg.2       alpine:latest       docker-desktop      Running             Running 27 minutes ago
   os9sui81ejos        tender_goldberg.3       alpine:latest       docker-desktop      Running             Running 24 seconds ago
   j9rvj0l5jd8p         \_ tender_goldberg.3   alpine:latest       docker-desktop      Shutdown            Failed 29 seconds ago       "task: non-zero exit (137)"
   ljbe1ru4f6t7         \_ tender_goldberg.3   alpine:latest       docker-desktop      Shutdown            Failed about a minute ago   "task: non-zero exit (137)"
~~~

- 關掉 Service 

    - `docker service rm <name/ID>`
   
    - 
    ~~~
       PS E:\> docker service ls
       ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
       w16lr30xhmsv        tender_goldberg     replicated          3/3                 alpine:latest
       PS E:\> docker service rm tender_goldberg
       tender_goldberg
       PS E:\> docker container ls
       CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
    ~~~