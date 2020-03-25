---
layout: 'post'
title: 'Study Group: 內湖澄鵡 出品 webSockets'
permalink: 'stydeGroup/yuting-webSockets'
tags: 讀書會
---


## What are websockets?

- Communication between a client (browser) and server
- Bidirectional (data flows both ways)
- Allows real-time data flow

- wiki:
   - WebSocket is a computer communications protocol, providing [full-duplex](https://en.wikipedia.org/wiki/Duplex_(telecommunications)#FULL-DUPLEX){:target="_back"} communication channels over a single TCP connection. The WebSocket protocol was standardized by the IETF as RFC 6455 in 2011, and the WebSocket API in Web IDL is being standardized by the W3C.

   - [__中文:__](https://zh.wikipedia.org/wiki/WebSocket){:target="_back"} WebSocket是一種網路傳輸協定，可在單個TCP連接上進行全雙工通訊，位於[OSI模型](https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B){:target="_back"}的應用層。WebSocket協定在2011年由IETF標準化為RFC 6455，後由RFC 7936補充規範。Web IDL中的WebSocket API由W3C標準化。WebSocket使得客戶端和伺服器之間的資料交換變得更加簡單，允許伺服器端主動向客戶端推播資料。在WebSocket API中，瀏覽器和伺服器只需要完成一次交握，兩者之間就可以建立永續性的連接，並進行雙向資料傳輸。

![Imgur](https://i.imgur.com/ngFWruF.jpg)


### uses of websockets

- multiplayer browser games
- collaborative code editing 
- live text for sports/news websites
- online drawing canvas
- real-time to-do apps with multiple users


## 快樂來實作～

- [play-with-docker.com](https://labs.play-with-docker.com/){:target="_back"}

   - `docker container run --rm -p 80:4000 tim23656/web-socket`

- [github: https://github.com/iamshaunjp/websockets-playlist/tree/master](https://github.com/iamshaunjp/websockets-playlist/tree/master){:target="_back"}

   - 可以先 抓到本Ｇ來玩玩看，他每個 branch 都是一堂課。想 clone 最終版 `git clone --branch lesson-5 https://github.com/iamshaunjp/websockets-playlist.git`



#### npm install

- npm install express socket.io --save
- npm install nodemon --save-dev

## reference

- WebSockets (using Socket.io) Tutorial #1 - What Are WebSockets?

   <iframe src="https://www.youtube.com/embed/vQjiN8Qgs3c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- WebSockets (using Socket.io) Tutorial #2 - Creating an Express App

   <iframe src="https://www.youtube.com/embed/ggVsXljT0MI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- WebSockets (using Socket.io) Tutorial #3 - Using Socket.io

   <iframe src="https://www.youtube.com/embed/UwS3wJoi7fY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- WebSockets (using Socket.io) Tutorial #4 - Emitting Messages

   <iframe src="https://www.youtube.com/embed/KNqVpESuyQo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- WebSockets (using Socket.io) Tutorial #5 - Broadcasting Messages

   <iframe src="https://www.youtube.com/embed/FvArk8-qgCk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## BONUS: OKR

- John Doerr on OKRs and Goal Setting at Google and Intel

   <iframe src="https://www.youtube.com/embed/t-yeDb7stlw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Why the secret to success is setting the right goals | John Doerr

   <iframe src="https://www.youtube.com/embed/L4N1q4RNi9I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>