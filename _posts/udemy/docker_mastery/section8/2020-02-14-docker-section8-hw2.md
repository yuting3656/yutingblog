---
layout: 'post'
title: 'Docker Matery: Section 8 作業2阿～！！！ Create Stack w/ Secrets'
permalink: 'docker_matery/docker-sections8-hw2-create-stack-with-secrets'
tags: udemy-docker swarm swarm-secrets ubuntu
---

- section8-74, 75

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Assignment: Create Stack w/ Secrets

- Let's use our Drupal comose file from last assignment 
   - `compose-assignment-2`

- Rename image back to official `drupal:8.2`
- Remove `build:`
- Add secret via `external:`
- use environment variable `POSTGRES_PASSWORD_FILE`
- Add secret via cli `echo "<pw>" | docker secret create psql-pw -`
- Copy compse insto a new yml file on you Swarm node1

## Ubuntu 小花園

- edit files

   - `nano`
      - __nano__ /path/to/filename
      - `Ctrl+O` to save 
      - `Ctrl+X` to exit

- copy files

   - cp -t `<dist>` `<resources>`
 
   - `man cp` 可看相關功能


~~~
NAME
       cp - copy files and directories

SYNOPSIS
       cp [OPTION]... [-T] SOURCE DEST
       cp [OPTION]... SOURCE... DIRECTORY
       cp [OPTION]... -t DIRECTORY SOURCE...

DESCRIPTION
       Copy SOURCE to DEST, or multiple SOURCE(s) to DIRECTORY.

       Mandatory arguments to long options are mandatory for short options too.

       -a, --archive
              same as -dR --preserve=all

       --attributes-only
              don't copy the file data, just the attributes

       --backup[=CONTROL]
              make a backup of each existing destination file

       -b     like --backup but does not accept an argument

       --copy-contents
              copy contents of special files when recursive

       -d     same as --no-dereference --preserve=links

       -f, --force
              if an existing destination file cannot be opened, remove it and try again (this option is ignored when the -n option is also used)

       -i, --interactive
              prompt before overwrite (overrides a previous -n option)

       -H     follow command-line symbolic links in SOURCE

       -l, --link
              hard link files instead of copying

       -L, --dereference
              always follow symbolic links in SOURCE

       -n, --no-clobber
              do not overwrite an existing file (overrides a previous -i option)

       -P, --no-dereference
              never follow symbolic links in SOURCE
~~~

- 在 node 上的實作結果

~~~
root@node1:/srv/udemy-docker-mastery/compose-assignment-2# cp -t /srv/udemy-docker-mastery/secrets-assignment-1/ /srv/udemy-docker-mastery/compose-assignment-2/docker-compose.yml
root@node1:/srv/udemy-docker-mastery/compose-assignment-2# cd ..
root@node1:/srv/udemy-docker-mastery# cd secrets-assignment-1/
root@node1:/srv/udemy-docker-mastery/secrets-assignment-1# ls
answer  docker-compose.yml
root@node1:/srv/udemy-docker-mastery/secrets-assignment-1# cat docker-compose.yml
# create your drupal and postgres config here, based off the last assignment
version: '3.1'

services:
  drupal:
    image: drupal:8.2
    ports:
      - 8080:80
    volumes:
      - drupal-modules:/var/www/html/modules
      - drupal-profiles:/var/www/html/profiles
      - drupal-sites:/var/www/html/sites
      - drupal-themes:/var/www/html/themes
  postgres:
    image: postgres:9.6
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/psql-pw
    secrets:
      - psql-pw
    volumes:
      - drupal-data:/var/lib/postgresql/data

volumes:
  drupal-data:
  drupal-modules:
  drupal-profiles:
  drupal-sites:
  drupal-themes:

secrets:
  psql-pw:
    external: true
~~~

## 作業

- 在 stack 裡面會自動　__忽略__ build

- 原本的

  ~~~yml
  # create your drupal and postgres config here, based off the last assignment
  version: '3'
  
  services: 
    drupal:
      image: custom-drupal
      build:
        context: .
        dockerfile: Dockerfile
      ports:
        - 8080:80
      volumes:
        - drupal-modules:/var//www/html/modules
        - drupal-profiles:/var/www/html/profiles
        - drupal-sites:/var/www/html/sites
        - drupal-themes:/var/www/html/themes
    postgres:
      image: postgres:9.6
      environment: 
        - POSTGRES_PASSWORD=mypasswd
      volumes:
        - drupal-data:/var/lib/postgresql/data
  volumes:
    drupal-data:
    drupal-modules:
    drupal-profiles:
    drupal-sites:
    drupal-themes:
  ~~~


- 本次作業改過後的

   ~~~yml
   version: '3.1'
   
   services:
     drupal:
       image: drupal:8.2
       ports:
         - 8080:80
       volumes:
         - drupal-modules:/var/www/html/modules
         - drupal-profiles:/var/www/html/profiles
         - drupal-sites:/var/www/html/sites
         - drupal-themes:/var/www/html/themes
     postgres:
       image: postgres:9.6
       environment:
         - POSTGRES_PASSWORD_FILE=/run/secrets/psql-pw
       secrets:
         - psql-pw
       volumes:
         - drupal-data:/var/lib/postgresql/data
   
   volumes:
     drupal-data:
     drupal-modules:
     drupal-profiles:
     drupal-sites:
     drupal-themes:
   
   secrets:
     psql-pw:
       external: true
   ~~~

- 老師的小貼心～

   - 沒有先在 `swarm` 裡建造 `secrets`
   - [我的筆記](https://yuting3656.github.io/yutingblog//docker_matery/docker-sections8-swarm-secrets-for-swarm){:target="_back"}

   ~~~
   root@node1:/srv/udemy-docker-mastery/secrets-assignment-1# docker stack deploy -c docker-compose.yml drupal
   Creating network drupal_default
   service postgres: secret not found: psql-pw
   ~~~

   - `echo "<sting>" | docker secret create psql-pw - <value>`

   ~~~
   root@node1:/srv/udemy-docker-mastery/secrets-assignment-1# echo "pwd" | docker secret create psql-pw -
   ykipbouv26p1v1mgd0qluhu2j
   root@node1:/srv/udemy-docker-mastery/secrets-assignment-1# docker stack deploy -c docker-compose.yml drupal
   Creating service drupal_postgres
   Creating service drupal_drupal
   root@node1:/srv/udemy-docker-mastery/secrets-assignment-1# docker stack ps drupal
   ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE              ERROR               PORTS
   evwh8wiqv52p        drupal_drupal.1     drupal:8.2          node2               Running             Preparing 29 seconds ago
   3ye18vwew8g8        drupal_postgres.1   postgres:9.6        node1               Running             Running 21 seconds ago
   ~~~