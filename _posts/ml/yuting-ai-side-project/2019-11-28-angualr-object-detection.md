---
layout: 'post'
title: 'Angular Object Detection 2 Heroku'
permalink: 'ai-side-project/angular-object-detection'
tags: ai-side-project angular object-detection
---

![Imgur](https://i.imgur.com/srXs0Pk.jpg)

## 前行提要

### Browser Engine

- [Wikipedia](https://en.wikipedia.org/wiki/Browser_engine){:target="_back"}

   - A browser engine (also known as a layout engine or rendering engine) is a core software component of every major web browser. The primary job of a browser engine is to transform HTML documents and other resources of a web page into an interactive visual representation on a user's device.

- [Notable engines](https://en.wikipedia.org/wiki/Browser_engine){:target="_back"}

   - |![brower-engine](https://upload.wikimedia.org/wikipedia/en/timeline/aaf6ee95dd2aa93f3cae833c240af522.png)|


- [Operating system support](https://en.wikipedia.org/wiki/Comparison_of_browser_engines){:target="_back"}

   - |![Imgur](https://i.imgur.com/Dmzsduc.gif)|

   

### Progressive web applications

- [Wikipiedia](https://en.wikipedia.org/wiki/Progressive_web_applications){:target="_back"}

   - Progressive web applications (PWAs) are a type of application software delivered through the web, built using common web technologies including HTML, CSS and JavaScript. They are intended to work on any platform that uses a standards-compliant browser.

### WebRTC

- [WebRTC](https://webrtc.org/){:target="_back"}

   - __WebRTC is a free, open project__ that provides browsers and mobile applications with Real-Time Communications (RTC) capabilities via simple APIs. The WebRTC components have been optimized to best serve this purpose.


## Deep Learning - Convolutional neural network 

- [Wikipedia](https://en.wikipedia.org/wiki/Convolutional_neural_network){:target="_back"}

   - ![cnn-img](https://upload.wikimedia.org/wikipedia/commons/6/63/Typical_cnn.png)
   - |![Imgur](https://i.imgur.com/R0RnUEx.jpg))|![Imgur](https://i.imgur.com/a1nMqXD.jpg)|

### COCO DataSet

- [CoCo DataSet](http://cocodataset.org/#home){:target="_back"}

- [COCO Explorer](http://cocodataset.org/#explore){:target="_back"}

   - ![Imgur](https://i.imgur.com/2qSyneB.gif)


### tensorflow models

- [github](https://github.com/tensorflow/models){:target="_back"}

- [tensorflow detection model zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md){:target="_back"}


### Angualr 2 Heroku

- Heroku
   - create [Heroku app](https://dashboard.heroku.com/apps){:target="_back"}
      - |![Imgur](https://i.imgur.com/nkYGCyJ.gif)|

- Angular
   - 到自己電腦本機，找一個喜歡的位置 `git clone https://github.com/yuting3656/angualr-object-detection.git` 
   - [github: angualr-object-detection](https://github.com/yuting3656/angualr-object-detection){:target="_back"}

- add `Heroku` remote 

   - cd 到 剛剛 clone 的專案中
   - 輸入　`git heroku git:remote -a <<你剛剛新建的 heroku　App name>>

- push 到 Heroku 
   
   - `git psuh heroku master`

### 看看 這包 Angular Project 有甚麼特別

- ./server.js

    ~~~js
    //Install express server
    const express = require('express');
    const path = require('path');
    
    const app = express();
    
    // Serve only the static files form the dist directory
    app.use(express.static(__dirname + '/dist/angular-object-detection'));
    
    app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
    });
    
    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);
    ~~~

- ./package.json

   ~~~json
   {   ...
      "scripts": {
       "ng": "ng",
       "start": "node server.js",
       "build": "ng build",
       "test": "ng test",
       "lint": "ng lint",
       "e2e": "ng e2e",
       "postinstall": "ng build --prod=true",
       "heroku-postbuild": "ng build --prod"
     },
     ...
   }
   ~~~
   
##### Reference 

- [https://en.wikipedia.org/wiki/Browser_engine](https://en.wikipedia.org/wiki/Browser_engine){:target="_back"}
- [https://en.wikipedia.org/wiki/Progressive_web_applications](https://en.wikipedia.org/wiki/Progressive_web_applications){:target="_back"}

- deploy angular on Heroku
   - [https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147){:target="_back"}