---
layout: 'post'
title: 'Study Group: 那壺X舞 有口接杯 Firebase & Github Pages & Angular & React & ???'
permalink: 'stydeGroup/firebase-and-i-totally-have-no-ideas-kkk'
tags: 讀書會
---

> 想這個 點子的時候 我自己跟自己大哉問: `可以把 Firebase apiKey json 公開出來嗎?` (如果我要玩 github pages的話)

- [答案](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public#answer-37484053){:target="_back"} 是 可以的兒~

   - Only the database security rules can protect your data

## Firebase [價目表](https://firebase.google.com/pricing?authuser=0){:target="_back"}

## Understand Firebase projects

- https://firebase.google.com/docs/projects/learn-more?authuser=0#config-files-objects

## Firebase Security Rules
 
 - https://firebase.google.com/docs/rules



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