---
layout: 'post'
title: 'Study Group: 那壺X舞 有口接杯 Firebase & Github Pages & Angular & React & ???'
permalink: 'stydeGroup/firebase-and-i-totally-have-no-ideas-kkk'
tags: 讀書會 firebase angular react
---
![Imgur](https://i.imgur.com/KzUILYa.jpg)

## [Understand Firebase projects](https://firebase.google.com/docs/projects/learn-more){:target="_back"} 

- [What is a Firebase project?](https://support.google.com/firebase/answer/6399760)

1. 創建一個 [Firebase Porject](https://firebase.google.com/){:target="_back"}
2. 基本介紹
3. 拿 Firebase SDK snippet (firebaseConfig)
   -  > 想這個 點子的時候 我自己跟自己大哉問: `可以把 Firebase apiKey json (firebaseConfig) 公開出來嗎?` (如果我要玩 github pages的話)
   - [答案](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public#answer-37484053){:target="_back"} 是 可以的兒~
      - Only the database security rules can protect your data
4. 前端 code 吃 firebaseConfig 開始玩瞜~


## Firebase [價目表](https://firebase.google.com/pricing?authuser=0){:target="_back"}

> 挑幾個我有興趣的來看 XD

| Product / Free / Pay as you go |
|---------|
|![Imgur](https://i.imgur.com/iaifhBy.jpg)|
|![Imgur](https://i.imgur.com/jdrV2VY.jpg)|
|![Imgur](https://i.imgur.com/ZpeppXG.jpg)|
|![Imgur](https://i.imgur.com/fueeuhX.jpg)|




## [Choose a Database: Cloud Firestore or Realtim Database](https://firebase.google.com/docs/database/rtdb-vs-firestore#what_are_some_other_important_things_to_consider){:target="_back"}

- Firebase offers two cloud-based, client-accessible database solutions that support realtime data syncing:

   - `Cloud Firestore` is Firebase's newest database for mobile app development. It builds on the successes of the Realtime Database with a new, more intuitive data model. Cloud Firestore also features richer, faster queries and scales further than the Realtime Database.

   - `Realtime Database` is Firebase's original database. It's an efficient, low-latency solution for mobile apps that require synced states across clients in realtime.

## [Cloud Storage](https://firebase.google.com/docs/storage){:target="_back"}

- Cloud Storage is built for app developers who need to store and serve user-generated content, such as photos or videos.

<iframe src="https://www.youtube.com/embed/_tyjqozrEPY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## [Firebase Security Rules](https://firebase.google.com/docs/rules){:target="_back"}

- For `Cloud Firestor`e and `Cloud Storage`, Rules use the following syntax:

   ~~~js
   service <<name>> {
     // Match the resource path.
     match <<path>> {
       // Allow the request if the following conditions are true.
       allow <<methods>> : if <<condition>>
     }
   }
   ~~~

-  For `Realtime Database`, JSON-based Rules use the following syntax:

   ~~~json
   {
     "rules": {
       "<<path>>": {
       // Allow the request if the condition for each method is true.
         ".read": <<condition>>,
         ".write": <<condition>>
       }
     }
   }
   ~~~
 
## Github pages + Angular app

- https://github.com/angular-schule/angular-cli-ghpages

1. 去 GitHub 開一個 repo
2. 自己電腦 ng new 一個 Angular app
3. cd 進 剛剛 new 的 Angular app
4. `git remote add origin <剛剛在 github 開的 repo EX: https://github.com/<username>/<repositoryname>.git>`
5. `ng add angular-cli-ghpages`
6. `ng deploy --base-href=/<repoName>/`
7. 去 `https://<usernam>.github.io/<repositoryname>` 看有沒有可愛 Angular defalut 的 畫面


## 同廠家硬!! 硬起來~ [Github pages + React app](https://github.com/gitname/react-gh-pages){:target="_back"}

1. `npx create-react-app your-app-name`
2. cd 進剛剛的專案
3. 開一個 Github repo
4. `git remote add origin <剛剛在 github 開的 repo EX: https://github.com/<username>/<repositoryname>.git>`
5. `npm install gh-pages --saev-dev`
6. 在專案中 paackage.json 裡面 最上/外層(`name`, `version`, `private`) 加上 `"homepage":"http://gitname.github.io/<repositoryname>"`
    - 注意唷! 是github 上面 repo 的名稱喔!
7. 在專案中 paackage.json 裡 的 scripts 中加上
   ~~~js
   "scripts": {
     //...
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ~~~
8. `npm run deploy`
9. 去 `https://<usernam>.github.io/<repositoryname>` 看有沒有可愛 React defalut 的 畫面


# 超棒棒資源

- [Firebase YouTube](https://www.youtube.com/channel/UCP4bf6IHJJQehibu6ai__cg){:target="_back"}