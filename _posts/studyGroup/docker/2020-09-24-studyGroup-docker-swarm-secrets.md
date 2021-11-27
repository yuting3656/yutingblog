---
layout: "single"
title: 'Study Group: 一姐出品 品質保證 docker-讀書會-10 docker swarm secrets storage '
permalink: 'stydeGroup/docker-10'
tags: 讀書會 docker swarm secrets
---

- [快樂筆記](https://yuting3656.github.io/yutingblog//docker_mastery/docker-sections8-swarm-secrets-for-swarm){:target="_back"}


## Assignment: Create Stack w/ Secrets
- Let’s use our Drupal comose file from last assignment
  - `compose-assignment-2`
- Rename image back to official `drupal:8.2`
- Remove `build:`
- Add secret via `external:`
- use environment variable `POSTGRES_PASSWORD_FILE`
- Add secret via cli echo `"<pw>" | docker secret create psql-pw -`
- Copy compse insto a new yml file on you Swarm node1


- demo.yml

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

## Service Update

- docker service create -p 8080:80 --name web nginx:1.13.7
- docker serviec ls
- docker service scale web=5
- docker service update --image nginx:1.13.6 web
- docker service update --publish-rm 8088 --publish-add 90j90:80 web
- docker service update --force web `強制更新,rebalancing!!`