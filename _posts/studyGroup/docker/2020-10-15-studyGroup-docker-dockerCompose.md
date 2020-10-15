---
layout: 'post'
title: 'Study Group: 家姊出品 品質保證 docker-讀書會-11 docker-compose'
permalink: 'stydeGroup/docker-10'
tags: 讀書會 docker docker-compose
---

## Docker Compose 


- Compose is a tool for defining and running multi-container Docker applications

   - Contianers
   - NetWworks
   - Volumns
   - Environment Variables
   - Images

## Compose Vs Swarm

- dev mode vs production mode
- network: bridge vs overlay

## Service

- 如果沒有指定 container_name, service 下的 container name 就是: <當前工作目錄路徑名>_<servicename>_<sequencenumber>

## depends_on

~~~yaml
version: "3.0"
services: 
  web:
    build: .
    depends_on: 
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
~~~

## Volumes

- linux:
   - /var/lib/docker/volumes/ 中

## Name volumes vs. Anonymous Volumes

- Anonymous: docker-compose stop 再啟動會是同一個，但
docker-compsoe down 後再啟動就會再新增 volume

- Name: docker-compsoe down 後仍不會刪除，加上 -v 後才會刪
除 service 所有用到的 volume
