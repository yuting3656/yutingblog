---
layout: 'post'
title: 'Docker Matery: Section 9 - Full App Lifecycle: Dev, Build and Deploy With a Single Compose Design'
permalink: 'docker_matery/docker-sections9-full-app-lifecycle-dev-build-deploy'
tags: udemy-docker  swarm-secrets 
---

- section9-76

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Full App Lifecycle With Compose

- Live The Dream!
- Single set of Compose files for:
   - Local `docker-compose up` development environment
   - Remote `docker-compose up` CI environment
   - Remote `docker stack deploy` production environment

## 範例: swarm-stack-3

- 看資料夾內有什麼

   ~~~
    目錄: E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3 
    Mode                LastWriteTime         Length Name
    ----                -------------         ------ ----
    d-----      2019/12/6  上午 10:07                themes
    -a----      2019/12/6  上午 10:07             13 .gitignore
    -a----      2019/12/6  上午 10:07            614 docker-compose.override.yml
    -a----      2019/12/6  上午 10:07            589 docker-compose.prod.yml
    -a----      2019/12/6  上午 10:07            663 docker-compose.test.yml
    -a----      2019/12/6  上午 10:07            115 docker-compose.yml
    -a----      2019/12/6  上午 10:07            535 Dockerfile
    -a----      2019/12/6  上午 10:07             10 psql-fake-password.txt
   ~~~


- __Default compose file:__ `docker-compose.yml`

   ~~~yml
   version: '3.1'
   
   services:
     drupal:
       image: bretfisher/custom-drupal:latest
     postgres:
       image: postgres:9.6   
   ~~~

- Override: `docker-compose.override.yml`

   - 當執行 `docker-compose up` 會自動吃到這支 `docker-compose.override.yml` 上面的 __default compose file__ 是展示基本架構

   - 這隻會直接取代 `docker-compose.yml`‵　裡面的內容

   ~~~yml
   version: '3.1'
   
   services:
   
     drupal:
       build: .
       ports:
         - "8080:80"
       volumes:
         - drupal-modules:/var/www/html/modules
         - drupal-profiles:/var/www/html/profiles
         - drupal-sites:/var/www/html/sites
         - ./themes:/var/www/html/themes
    
     postgres:
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
       file: psql-fake-password.txt
   ~~~

   - 看到這邊是不是很想知道，上面 `build: .` 的 Dockerfile 長什麼樣子阿～

   - Dockerfile

      ~~~dockerfile
         FROM drupal:8.6

         RUN apt-get update && apt-get install -y git \
             && rm -rf /var/lib/apt/lists/*
         
         # this next part was corrected in 2018 to be more clear on how you'd typically 
         # customize your own theme. first you need to clone the theme into this repo
         # with something like downloading the lastest theme for bootstrap
         # https://www.drupal.org/project/bootstrap and extract into themes dir on host.
         # then you'll COPY it into image here:
         
         WORKDIR /var/www/html/core
         
         COPY ./themes ./themes
         
         WORKDIR /var/www/html
      ~~~
 