---
layout: 'post'
title: 'Study Group: 那壺X舞 有口接杯 Firebase & Github Pages & Angular & React & ???'
permalink: 'stydeGroup/firebase-and-i-totally-have-no-ideas-kkk'
tags: 讀書會 firebase angular react
---

> 痛心! 難過! 日子還是要過! 該做的事還是做! :) 兄弟快拿總冠軍了 笑一個吧 :)

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


- [AngularFire Quickstart](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md){:target="_back"}

   1. cd 到剛剛創的 Angular Project `ng add @angular/fire` 
      - 會跑出 `Allow Firebase to collect CLI usage and error reporting information?` 選 N
   2. 把 firebase config 加到 `/src/environments/environment.ts` 裡面
     - 
      ~~~ts
         export const environment = {
           production: false,
           firebase: {
             apiKey: '<your-key>',
             authDomain: '<your-project-authdomain>',
             databaseURL: '<your-database-URL>',
             projectId: '<your-project-id>',
             storageBucket: '<your-storage-bucket>',
             messagingSenderId: '<your-messaging-sender-id>'
           }
         };
      ~~~
   3. 加 AngularFireModule  &  AngularFirestoreModule 到 `/src/app/app.module.ts`
      ~~~ts
         import { BrowserModule } from '@angular/platform-browser';
         import { NgModule } from '@angular/core';
         import { AppComponent } from './app.component';
         import { AngularFireModule } from '@angular/fire';
         import { AngularFirestoreModule } from '@angular/fire/firestore';
         import { environment } from '../environments/environment';
         
         @NgModule({
           imports: [
             BrowserModule,
             AngularFireModule.initializeApp(environment.firebase),
             AngularFirestoreModule
           ],
           declarations: [ AppComponent ],
           bootstrap: [ AppComponent ]
         })
         export class AppModule {}
      ~~~
   4. 使用 AngaulrFirestore 吃 資源

      - /src/app/app.component.ts:
         ~~~ts
           import { Component } from '@angular/core';
           import { AngularFirestore } from '@angular/fire/firestore';
           import { Observable } from 'rxjs';
           
           @Component({
             selector: 'app-root',
             templateUrl: 'app.component.html',
             styleUrls: ['app.component.css']
           })
           export class AppComponent {
             items: Observable<any[]>;
             constructor(firestore: AngularFirestore) {
               this.items = firestore.collection('items').valueChanges();
             }
          }
         ~~~
      - /src/app/app.component.html:
   
         ~~~html
           <ul>
            <li class="text" *ngFor="let item of items | async">
              {{item.name}}
            </li>
          </ul>
         ~~~


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


# 讀書會後紀錄! 我川感動 

- ng deploy issues 凡歌神救援!
   - [https://josephjsf2.github.io/angular/2019/06/13/deploy-angular-to-gitpage.html](https://josephjsf2.github.io/angular/2019/06/13/deploy-angular-to-gitpage.html){:target="_back"}

- 凡歌: [https://josephjsf2.github.io/test1/index.html](https://josephjsf2.github.io/test1/index.html){:target="_back"}
- 一解: [https://pengpon.github.io/yoyo/project/](https://pengpon.github.io/yoyo/project/){:target="_back"}
- 溫妮: [https://op30132.github.io/whatever/](https://op30132.github.io/whatever/){:target="_back"}
- 珊謎: [https://sammiehsieh.github.io/thursdaynight/](https://sammiehsieh.github.io/thursdaynight/){:target="_back"}


# 超棒棒資源

- [Firebase YouTube](https://www.youtube.com/channel/UCP4bf6IHJJQehibu6ai__cg){:target="_back"}