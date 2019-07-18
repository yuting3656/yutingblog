---
layout: 'post'
title: 'Line Bot'
permalink: 'ndoe/line-bot'
tags: line-bot Node.js heroku
---

## 前置作業 LINE & Heroku
   - 安裝 [nodejs](https://nodejs.org/en/){:target="_back"}
   - 安裝 [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install){:target="_back"}
   - 安裝 [git](https://git-scm.com/){:target="_back"}
   - [註冊](https://signup.heroku.com/login){:target="_back"} heroku
   - 你要有一個 [**LINE**](https://developers.line.biz/en/){:target="_back"} 帳號，就是你手機裡面那個帳號就可以　：）


## 前置: LINE
  1. [登入](https://developers.line.biz){:target="_back"}
  <br/>
  <br/>
  2. 新建 provider
   <br/>
  <br/>
  - __按create__
  <br/>
  <br/>
  ![Imgur](https://i.imgur.com/o8HTRIf.gif)
   <br/>
  <br/>
  - __寫個最棒棒的名字__
  <br/>
  <br/>
  ![Imgur](https://i.imgur.com/xwOMgzp.gif)
  <br/>
  <br/>
  - 寫完按下 confrim
  - Provider 創建完成
  <br/>
  <br/>
  3. 新建 [Messaging API] Channel
  <br/>
  <br/>
      - 我的 Provider 名稱為　**yutingNodeLineBot**
      ![Imgur](https://i.imgur.com/6n2LUiM.gif)
      - 在 [Messaging API] 按下 Create Channel
      <br/>
      <br/>
      - 上傳 app 圖片
      - 給 app 命名
      - 描述 app
      ![Imgur](https://i.imgur.com/p4lZiKh.gif)
      <br/><br/>
      - 選擇 app 類型
      - 填寫 email
      ![Imgur](https://i.imgur.com/zt70mxl.gif)
      <br/><br/>
### __完成__
      ![Imgur](https://i.imgur.com/LR8CtzD.gif)


---

## 前置: Heroku
  1. 安裝[heroku-cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install){:target="_back"}
  2. 檢查安裝
     - heroku --version
  ~~~
  heroku --version
  heroku/7.19.4 win32-x64 node-v11.3.0
  ~~~
  3. [登入](https://signup.heroku.com/login){:target="_back"} heroku
  ~~~
  heroku login
  ~~~
  4. 創建 [heroku-app](https://dashboard.heroku.com/apps){:target="_back"}
      - create new app
  ![Imgur](https://i.imgur.com/tPGKH0b.gif)
      <br/><br/>
      - 輸入app 名稱
      - 選擇 region 位置
  ![Imgur](https://i.imgur.com/zWu55qu.gif)

### __完成__
![Imgur](https://i.imgur.com/12wvDWq.gif)

---
---
---

## 主菜: 
   - 安裝 [nodejs](https://nodejs.org/en/){:target="_back"}
   - 開發程式
   - 丟到Heorku
   - 測試看有沒有出包～

### 1 找個舒服的地方，開一個資料夾
   - mkdir `資料夾名稱`
   - cd `資料夾名稱`
   - npm init

>
~~~
E:\>mkdir yuting-node-line-bot
E:\>cd yuting-node-line-bot
E:\yuting-node-line-bot>npm init
~~~


### 2 install
   - express
   - @line/bot-sdk
   
~~~
E:\yuting-node-line-bot>npm install express @line/bot-sdk
~~~


### 3. 在根目錄的地方(和 package.json 同一層　)新增　server.js 

- 長這個樣子
~~~
-- [Your_root_folder]
 |
 |-- node_modules
 |
 |-- package-lock.json
 |
 |-- package.json
 |
 |-- server.js
~~~

- server.js
   ~~~javascript
   'use srict';
   
   const express = require('express')
   const app = express()
   const line = require('@line/bot-sdk');
   
   // create LINE SDK config from env variables
   const config = {
     channelAccessToken: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     channelSecret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   };
   
   // create LINE SDK client
   const client = new line.Client(config);
   
   // create Express app
   app.post('/callback', line.middleware(config), (req, res) => {
     Promise
       .all(req.body.events.map(handleEvent))
       .then((result) => res.json(result))
       .catch((err) => {
         console.error(err);
         res.status(500).end();
       });
   });
   
   // event handler
   function handleEvent(event) {
     if (event.type !== 'message' || event.message.type !== 'text') {
       // ignore non-text-message event
       return Promise.resolve(null);
     }
   
     // create a echoing text message
     const echo = { type: 'text', text: event.message.text };
   
     // use reply API
     return client.replyMessage(event.replyToken, echo);
   }
   
   // listen on port
   const port = process.env.PORT || 3000;
   app.listen(port, () => {
     console.log(`listening on ${port}`);
   });
   ~~~

### 4. channelAccessToken & channelSecret

去 [line-Developer](https://developers.line.biz/en/){:target="_back"} 網頁拿 channelAccessToken / channelSecret
<br/>
- channelSecret:　
   ![Imgur](https://i.imgur.com/qxLqY2p.gif)

- channelAccessToken:　__按下issue__
   ![Imgur](https://i.imgur.com/c3XFyoW.gif)

   - 選 0 hours! 代表沒有有效期限:) __按下issue__
   ![Imgur](https://i.imgur.com/BZhfhfy.gif)

貼回到上面的程式碼面
~~~js
  // create LINE SDK config from env variables
   const config = {
     channelAccessToken: "你拿到的　channelAccessToken",
     channelSecret: "你拿到的　channelSecret",
   };
~~~



## 5. 整合到 git + heroku
5.1 在你可愛的資料夾裡面加入 git 管控 & 新增 .gitnore 檔案
   - git init 
   - (windows) echo /node_modules > .gitignore

~~~
E:\yuting-node-line-bot>git init
Initialized empty Git repository in E:/yuting-node-line-bot/.git/

E:\yuting-node-line-bot>echo /node_modules > .gitignore
~~~

### 現在專案應該長78分像這樣
![Imgur](https://i.imgur.com/aQThcrJ.gif)
- 如果沒有，就 ~~~發大財~~~

5.2 __新增 heroku remote 位置到這個專案__

- 去剛剛上面前置作業 [heroku](https://dashboard.heroku.com/apps){:target="_back"} 新創的 app 拿 remote url
   - heroku git:remote -a `你herokuApp的url`
   ![Imgur](https://i.imgur.com/1MWYYAl.gif)

~~~
E:\yuting-node-line-bot>heroku git:remote -a <<<<<你的URL>>>>>>
 »   Warning: heroku update available from 7.19.4 to 7.26.2
set git remote heroku to https://git.heroku.com/<<<<<你的URL>>>>>>
~~~

## 6. 加入 Procfile & 加入 package.json start 指令

- 在目錄下新建一Procfile
~~~
web: node serve.js
~~~

- package.json 加入 "start": "node server.js"

   ~~~
   {
     "name": "yuting-node-line-bot",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "start": "node server.js"   <============================ 這行
     },
     "author": "",
     "license": "ISC",
     "dependencies": {
       "@line/bot-sdk": "^6.8.0",
       "express": "^4.17.1"
     }
   }   
   ~~~


### 目錄結構現在應該 87 分像這樣
![Imgur](https://i.imgur.com/1q9yHt1.gif)

## 7. 丟上 heroku

~~~
git add . 
git commit -m "init"
git push heroku master
~~~

## 8. LINE webhooks 設定

![Imgur](https://i.imgur.com/hqvM7BO.gif)

## 除錯
~~~
heroku logs
~~~

> 靠好像來不及了 哈哈哈 掰
