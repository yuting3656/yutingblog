---
layout: "single"
title: 'Docker Mastery: Section 6 作業阿～！！！ Build and Run Compose'
permalink: 'docker_mastery/docker-sections6-hw2-build-and-run-compose'
tags: udemy-docker docker-compose
---

- section6-57, 58

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---

## Build and Run Compose

- "Building Custom `drupal` image for local testing"
- Compose isn't just for developers. Testing apps is easy/run!
- Maybe your learning Drupal admin, or are a software tester
- Start with Compose file from prevous assignment 
- Maky your `Dockerfile` and `docker-compose.yml` in dir `compose-assignment-2`
- Use the `drupal` image along with the `postgres` image as before
- Use `README.md` in that dir for details

## 作業的 READNE

---
---
---

# Assignment: Compose For On-The-Fly Image Building and Multi-Container Testing

Goal: This time imagine you're just wanting to learn Drupal's admin and GUI, or maybe you're a software tester and you need to test a new theme for Drupal. When configured properly, this will let you build a custom image and start everything with `docker-compose up` including storing important db and config data in volumes so the site will remember your changes across Compose restarts.

- Use the compose file you created in the last assignment (drupal and postgres) as a starting point.
- Let's pin image version from Docker Hub this time. It's always a good idea to do that so a new major version doesn't surprise you.

## Dockerfile
- First you need to build a custom Dockerfile in this directory, `FROM drupal:8.6` NOTE: if it fails to build, try the lastest 8 branch version with `FROM drupal:8`
- Then RUN apt package manager command to install git: `apt-get update && apt-get install -y git`
- Remember to cleanup after your apt install with `rm -rf /var/lib/apt/lists/*` and use `\` and `&&` properly. You can find examples of them in drupal official image. More on this below under Compose file.
- Then change `WORKDIR /var/www/html/themes`
- Then use git to clone the theme with: `RUN git clone --branch 8.x-3.x --single-branch --depth 1 https://git.drupal.org/project/bootstrap.git`
- Combine that line with this line, as we need to change permissions on files and don't want to use another image layer to do that (it creates size bloat). This drupal container runs as www-data user but the build actually runs as root, so often we have to do things like `chown` to change file owners to the proper user: `chown -R www-data:www-data bootstrap`. Remember the first line needs a `\` at end to signify the next line is included in the command, and at start of next line you should have `&&` to signify "if first command succeeds then also run this command"
- Then, just to be safe, change the working directory back to its default (from drupal image) at `/var/www/html`

## Compose File
- We're going to build a custom image in this compose file for drupal service. Use Compose file from previous assignment for Drupal to start with, and we'll add to it, as well as change image name.
- Rename image to `custom-drupal` as we want to make a new image based on the official `drupal:8.6`.
- We want to build the default Dockerfile in this directory by adding `build: .` to the `drupal` service. When we add a build + image value to a compose service, it knows to use the image name to write to in our image cache, rather then pull from Docker Hub.
- For the `postgres:9.6` service, you need the same password as in previous assignment, but also add a volume for `drupal-data:/var/lib/postgresql/data` so the database will persist across Compose restarts.

## Start Containers, Configure Drupal
- Start containers like before, configure Drupal web install like before.
- After website comes up, click on `Appearance` in top bar, and notice a new theme called `Bootstrap` is there. That's the one we added with our custom Dockerfile.
- Click `Install and set as default`. Then click `Back to site` (in top left) and the website interface should look different. You've successfully installed and activated a new theme in your own custom image without installing anything on your host other then Docker!
- If you exit (ctrl-c) and then `docker-compose down` it will delete containers, but not the volumes, so on next `docker-compose up` everything will be as it was.
- To totally clean up volumes, add `-v` to `down` command.


---
---
---

## Dockerfile

~~~dockerfile
# create your custom drupal image here, based of official drupal
FROM drupal:8.6
# install git 
RUN apt-get update && apt-get install -y git \
     # using apt-get will leave cache 
     # so it's best practice to rm cache
     && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html/themes

RUN git clone --branch 8.x-3.x --single-branch --depth 1 https://git.drupal.org/project/bootstrap.git \
    # change permission
    # chown: change owner
    # -R: all files including subDirs and subFiles
    # www-data:www-data (user:group)
    && chown -R www-data:www-data bootstrap

WORKDIR /var/www/html
~~~

## docker-compose.yml

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
      - drupal-modules:/var/www/html/modules
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