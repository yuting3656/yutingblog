---
layout: 'post'
title: 'Docker Mastery: Section 6 作業阿～！！！ Writting a compose file'
permalink: 'docker_mastery/docker-sections6-hw1-writting-a-cmopose-file'
tags: udemy-docker docker-compose
---

- section6-54, 55

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Writting A Compose File

- Build a basic compose file for a Drupal content management system website. Docker Hub is your friend
- Use the `drupal` image along with the `postgres` image
- Use `ports` to expose Drupal on 8080 so you can localhost:8080
- Be sure to set POSTGRES_PASSWORD for postgres
- Walk though Drupal setup via browser
- Tip: Drupal assumes DB is __localhost__, but it's service name
- Extra Credit: Use volumes to store Drupal unique data


## docker-compose.yml

~~~yml
version: '3.1'

services:
  drupal:
    image: drupal
    ports:
      - 8080:80
    volumes: 
      - drupal-modules:/var/www/html/modules
      - drupal-profiles:/var/www/html/profiles
      - drupal-themes:/var/www/html/themes
      # this takes advantage of the feature in Docker that a new anoymous
      # volume (which is what we're creating here) will be initialized with the 
      # existing content of the image at the same location
      - drupal-sites:/var/www/html/sites
  postgres:
    image: postgres:10
    environment:
     POSTGRES_PASSWORD: example
    

volumes:
  drupal-modules:
  drupal-profiles:
  drupal-themes:
  drupal-sites:
~~~

