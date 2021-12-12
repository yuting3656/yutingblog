---
layout: "single"
title: 'daily Programming: Angular 小聚#6'
permalink: 'daily-programming/angualr-meeting-ml-tensorflowJS'
tags: daily-programming
---

## Tensorflow.js

- ChenKuan Sun 

   - [link](https://www.cakeresume.com/chenkuan-sun-ck-sun?locale=en){:target="_back"}

   - 建議安裝 tensorflow.js 的時候確定版本，因為一直改版
      - [tensorflow.js](https://www.tensorflow.org/js){:target="_back"} 

   - [code](https://stackblitz.com/edit/angular-tensorflow-demo?fbclid=IwAR2nQdzOTEU2l9olHmrEyjCH4l7R0YngX-i_445QBicttMRdZzCBbwGYQ2k){:target="_back"}

> 看吃多少記憶體 `shift + esc`


- posenet: 別人寫好的 model 可以直接拿

- edge computing: 邊緣運算

- Object detection

   - `@tensorflow-models/coco-ssd`

- install 

 - npm install @tensorflow/tfjs-node


## Schematics

- Leo Chen 

   - [link](https://www.cakeresume.com/leo-2ce9ed?locale=zh-TW){:target="_back"}


- Schematics
 
  - 應用
  - 實作 Schematics
  - 為 Schematics 選寫測試

- Schematics ?
  
  - 程式碼產生器

- Angular CLI
   - Ember CLI

   - angualr CLI v1.4
      - Schematics

- Schematics 的應用

   - ng new 

   - ng generate

   - ng add

   - ng update


- 實作第一個
   
   - [https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2){:target="_back"}

   1. `npm install -g @angular-devkit/schematics-cli`

      ![Imgur](https://i.imgur.com/v7vszgs.jpg)

   2. `schematics blank --name=hello-world`

      ![Imgur](https://i.imgur.com/qmNfgc4.jpg)

      - src/collection.json 

         - 這裡顯示所有可以用的: schematics


   3. `npm run build`

   4. `schematics .:hello-world --name=test`


- TypeScript Compiler API

   - [link](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API){:target="_back"}


   - 高效 Coding 術: Angular Schematics 實戰三十天!

- TypeScript 
   - 都是 Node

   - TypeScript AST Viewer:
      - https://ts-ast-viewer.com/
