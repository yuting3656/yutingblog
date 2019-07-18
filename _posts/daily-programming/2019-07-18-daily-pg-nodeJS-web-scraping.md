---
layout: 'post'
title: 'daily Programming: node.js web scraping'
permalink: 'daily-programming/nodejs-web-scraping'
tags: daily-programming Node.js
---

> 今天是開站滿月~~ 耶~~ 吃紅蛋 吃油飯 吃雞腿~~~~ :)

- 想說今晚要介紹 LINE BOT ， 那就用機器人抓抓，大家部落格各個文章的標題好了ＸＤ

- 熱身操 :whale2:
1. [參考網站](https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/){:target="_back"}
2. 安裝套件
~~~node
npm install --save request request-promise cheerio puppeteer 
~~~


- 速度看code

   ~~~js
   const rp = require('request-promise');
   const $ = require('cheerio');
   const url = "https://josephjsf2.github.io/" // 帆哥
   const url2 = "https://pengpon.github.io/" // 一姊
   const url3 = "https://yuting3656.github.io/yutingblog/" // 偶的
   
   rp(url)
      .then((html) => console.log($('.post-title', html).text()))
      .catch((error) => console.log(error))
   
   rp(url2)
      .then((html) => console.log($('.post-link', html).text()))
      .catch((error) => console.log(error))
   
   rp(url3)
      .then((html) => console.log($('.post-link', html).text()))
      .catch((error) => console.log(error))
   ~~~

- console 結果 **2019/07/18**
   ~~~
    Rxjs - Operators part I
    Rxjs - 建立Observable
    SQL Server 新增 Mirror DB筆記
    資料結構與演算法：AVL Tree
    Deploy Angular 程式到 Github page
    資料結構與演算法：Binary Search Tree 二元搜索樹
    遇到 mysqldump Version Mismatch問題解決方法
    Ngrx 實做筆記 - 做一個簡單的 TodoList
    使用 SonarQube 檢測 Angular 專案程式碼
    資料結構與演算法：List 連結串列

    小七生日快樂!! 7/11 讀書會學習地圖
    CSS Flexbox　硬翻譯筆記
    CSS Display Basic property - Inline and Block
    Javascript基礎到不能更基礎 0.00000001%

    Backpropagation in Practice
    daily Programming: python wiht bs4
    Cost Function and Backpropagation 2
    Cost Function and Backpropagation
    week1 ~ week4 review VS TensorFlow.js
    Neural Networks: Applications
    Neural Networks 2
    Neural Networks
    Motivations: Neural Networkd [Non-linear hypotheses]
    Solving the Problem of Overfitting 2
    Solving the Problem of Overfitting
    挖賽! 是java耶~ jdbc and connection pooling
    Multiclass Classification
    Logistic Regression Model
    Classification and Representation
    week1 ~ week2 自我整理複習
    octave tutotial 3
    octave tutorial 2
    小九九好棒棒
    octave tutorial
    機器學習 - multivariate linear regression 2
    機器學習 - computing parameters analytically
    機器學習 - multivariate linear regression
    Tkinter 畫笑臉
    numpy 基本練習 dot
    數學 - linear algebra review
    機器學習 - parameter learning
    機器學習 - model and cost function
    機器學習 - introduction
   ~~~

> 每日熱身完畢～　開工：）