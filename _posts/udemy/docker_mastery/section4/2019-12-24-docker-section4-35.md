---
layout: 'post'
title: 'Docker Matery: Section 4 - Whats in An Image (and what isnt)'
permalink: 'docker_matery/docker-sections4-what-is-in-an-image'
tags: udemy-docker
---

> 平安夜一樣認真～～～～～～～:santa::santa::santa::santa::santa::santa:

> 教的超好～～　不過　～～　一直瘋狂方便灌東西，空間一下少好多阿～～　ＸＤＤＤ

- section3-35

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


### This Section 

- All about images, the builing blocks of containers
- Wht's in an image (and what isn't)
- Using Docker Hub registry
- Managing our local image cache
- Building our own images


## What's In An Image (And What's Isn't)

- App binaries and dependencies
- Metatdata about the image data and how to run the image
- [official definition](https://docs.docker.com/glossary/){:target="_back"}: "An Image is an ordered collection of root filesystem changes and the corresponding execution parameters for use within a container runtime."
   - [Docker Overview](https://docs.docker.com/engine/docker-overview/){:target-"_back"}

- Not a complete OS, No kernel, kernel modules (e.g. drivers)
- Small as one file (your app binary) like a golang static binary
- Big as a Ununtu distro with apt, and Apache, PHP, and more installed 

## Docker Image Specification

- [link](https://github.com/moby/moby/blob/master/image/spec/v1.md){:target="_back"}