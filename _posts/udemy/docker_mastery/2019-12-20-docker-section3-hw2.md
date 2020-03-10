---
layout: 'post'
title: 'Docker Mastery: Section3 作業阿!!!! Using Containers for CLI Testing'
permalink: 'docker_mastery/docker-sections3-hw2-using-containers-for-cli-testing'
tags: udemy-docker
---
 
- section3-31, 32

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

### Assignment Requirements: CLI App Testing 

- Know how to use -it to get shell in container 
- Understand basics of what a Linux distrubution is like Ununtu and CentOS
- Know how to run a container 

### Assignment: CLI App Testing

- Use different Linux distro containers to check `curl` clci tool version
- Use two different terminal windows to start bash in both `centos:7` and `ubuntu:14.04`, using `-it`
- Learng the `docker container --rm` option so you can save cleanup
- Ensure `curl` is installed and on latest version for that distro
   - ubuntu: `apt-get update && apt-get install curl`
   - centos: `yum update curl`
- Check `curl --version`


#### Ubuntu

- `docker container run -it --name yuting_ubuntu ubuntu:14.04 bash`

   - `apt-get update`
   - `apt-get install curl`]
   - `curl --version`

    ~~~
    root@a5a485151f4f:/# curl --version
    curl 7.35.0 (x86_64-pc-linux-gnu) libcurl/7.35.0 OpenSSL/1.0.1f zlib/1.2.8 libidn/    1.28 librtmp/2.3
    Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s     rtmp rtsp smtp smtps telnet tftp
    Features: AsynchDNS GSS-Negotiate IDN IPv6 Largefile NTLM NTLM_WB SSL libz TLS-SRP
    ~~~

~~~
PS E:\> docker container run -it --name yuting_ubuntu ubuntu:14.04 bash
Unable to find image 'ubuntu:14.04' locally
14.04: Pulling from library/ubuntu
2e6e20c8e2e6: Pull complete                                                         
30bb187ac3fc: Pull complete                                                         
b7a5bcc4a58a: Pull complete                                                         
Digest: sha256:ffc76f71dd8be8c9e222d420dc96901a07b61616689a44c7b3ef6a10b7213de4
Status: Downloaded newer image for ubuntu:14.04
root@a5a485151f4f:/#
~~~


#### Centos

- ` docker container run -it --name yuting_centos centos:7 bash`

   - `yum update curl`

      ~~~
      [root@a46c0ef74200 /]# curl --version
      curl 7.29.0 (x86_64-redhat-linux-gnu) libcurl/7.29.0 NSS/3.44 zlib/1.2.7 libidn/1.28 libssh2/1.8.0
      Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp scp sftp smtp smtps telnet tftp
      Features: AsynchDNS GSS-Negotiate IDN IPv6 Largefile NTLM NTLM_WB SSL libz unix-sockets
      ~~~
   

~~~
PS E:\> docker container run -it --name yuting_centos centos:7 bash
Unable to find image 'centos:7' locally
7: Pulling from library/centos
ab5ef0e58194: Pull complete                                                                                             Digest: sha256:4a701376d03f6b39b8c2a8f4a8e499441b0d567f9ab9d58e4991de4472fb813c
Status: Downloaded newer image for centos:7
[root@a46c0ef74200 /]# 
~~~

## \-\-rm 

- 跑起後當關閉時 container 也自動清除!