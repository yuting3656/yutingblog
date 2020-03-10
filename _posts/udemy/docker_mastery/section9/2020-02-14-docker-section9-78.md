---
layout: 'post'
title: 'Docker Mastery: Section 9 - Full App Lifecycle: Dev, Build and Deploy With a Single Compose Design'
permalink: 'docker_mastery/docker-sections9-full-app-lifecycle-dev-build-deploy'
tags: udemy-docker  docker-full-app-lifecycle
---

- section9-78

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

- __Override:__ `docker-compose.override.yml`

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

- __test:__ `docker-compose.test.yml`

   ~~~ yml
   version: '3.1'

   services:
   
     drupal:
       image: custom-drupal
       build: .
       ports:
         - "80:80"
   
     postgres:
       environment:
         - POSTGRES_PASSWORD_FILE=/run/secrets/psql-pw
       secrets:
         - psql-pw
       volumes:
         # NOTE: this might be sample data you host in your CI server
         # so you can do integration testing with sample data
         # this may not work on Docker for Windows/Mac due to bind-mounting
         # database data across OS's, which doesn't always work
         # in those cases you should use named volumes
         - ./sample-data:/var/lib/postgresql/data
   secrets:
     psql-pw:
       file: psql-fake-password.txt
   ~~~

- __production:__ `docker-compose.prod.yml`

   ~~~ yml
   version: '3.1'
   
   services:
   
     drupal:
       ports:
         - "80:80"
       volumes:
         - drupal-modules:/var/www/html/modules
         - drupal-profiles:/var/www/html/profiles
         - drupal-sites:/var/www/html/sites
         - drupal-themes:/var/www/html/themes
    
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
       external: true
   ~~~


## CI Solution: 7:00

- `docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d`

## CI Production Config: 7:45

- `docker-compose -f docker-compose.yml -f docker-compose.prod.yml config --help`

   - 
   ~~~
      Validate and view the Compose file.
      Usage: config [options]
      Options:
          --resolve-image-digests  Pin image tags to digests.
          -q, --quiet              Only validate the configuration, don't print
                                   anything.
          --services               Print the service names, one per line.
          --volumes                Print the volume names, one per line.
          --hash="*"               Print the service config hash, one per line.
                                   Set "service1,service2" for a list of specified services
                                   or use the wildcard symbol to display all services
   ~~~

- 把兩個 compose files 都看過後 合成一隻
   - `docker-compose -f docker-compose.yml -f docker-compose.prod.yml config`
   - `docker-compose -f docker-compose.yml -f docker-compose.prod.yml config > output.yml`

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> docker-compose -f docker-compose.yml -f docker-compose.prod.yml config
secrets:
  psql-pw:
    external: true
services:
  drupal:
    image: custom-drupal:latest
    ports:
    - 80:80/tcp
    volumes:
    - drupal-modules:/var/www/html/modules:rw
    - drupal-profiles:/var/www/html/profiles:rw
    - drupal-sites:/var/www/html/sites:rw
    - drupal-themes:/var/www/html/themes:rw
  postgres:
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/psql-pw
    image: postgres:9.6
    secrets:
    - source: psql-pw
    volumes:
    - drupal-data:/var/lib/postgresql/data:rw
version: '3.1'
volumes:
  drupal-data: {}
  drupal-modules: {}
  drupal-profiles: {}
  drupal-sites: {}
  drupal-themes: {}
~~~

~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\swarm-stack-3> more .\output.yml
secrets:
  psql-pw:
    external: true
services:
  drupal:
    image: custom-drupal:latest
    ports:
    - 80:80/tcp
    volumes:
    - drupal-modules:/var/www/html/modules:rw
    - drupal-profiles:/var/www/html/profiles:rw
    - drupal-sites:/var/www/html/sites:rw
    - drupal-themes:/var/www/html/themes:rw
  postgres:
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/psql-pw
    image: postgres:9.6
    secrets:
    - source: psql-pw
    volumes:
    - drupal-data:/var/lib/postgresql/data:rw
version: '3.1'
volumes:
  drupal-data: {}
  drupal-modules: {}
  drupal-profiles: {}
  drupal-sites: {}
  drupal-themes: {}
~~~



## Full App Lifecycle With Compose

- Live The Dream!
- Single set of Compose files for:
   - Local `docker-compose up` development environment
   - Remote `docker-compose up` CI environment
   - Remote `docker stack deploy` production environment
   - __Note:__ `docker-compose -f a.yml -f b.yml config` __mostly works__
   - __Nots:__ Compose `extends:` __doesn't work yet__ in Stacks

### [Use Compose in production](https://docs.docker.com/compose/production/){:target="_back"}

### [Multiple Compose files](https://docs.docker.com/compose/extends/#multiple-compose-files){:target="_back"}