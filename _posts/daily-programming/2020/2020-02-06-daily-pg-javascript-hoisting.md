---
layout: 'post'
title: 'daily Programming: 一姐出品 品質保證 Hoisting'
permalink: 'daily-programming/javascript-hoisting'
tags: daily-programming javascript 
---

## Hoisting

- [寶哥筆記](https://yuting3656.github.io/yutingblog//daily-programming/javascript-core-concepts-and-es6){:target="_back"}

- [一姐筆記](https://pengpon.github.io/web/javascript/2020/02/02/what-is-hoisting.html){:target="_back"}


## Javascript 

- 直譯語言

- ![img](https://i.imgur.com/cNYu6GC.jpg){:target="_back"}

- Javascript Engine:
   - Chrome V8: google chrome
   - SpiderMonkey: Firefox
   - Nitro: Safari
   - Chakra: Edge


## 基本概念

- Syntax Parser 
   - a program that reads your code and determines what it does and if its grammar is valid
- Execution context
   - a wrapper to help manage the code that is running
- Lexical environment 
   - where something sits physically in the code you write 


## 全域變數

> the javascript engine creates the global execution context before it starts to execute any code.

- 建造三個
   - global
   - this
   - outer environment

## 執行環境運作

- creation phase
   - setup memory space for variables and function

- execution phase

- 宣告變數 & 函數的順位

> Function declarations take precedence over variable declarations.

> Variables assignment takes precedence over fucntion declarations.

## 單執行續 & 同步執行

- single threaded: one command at a time
- synchronous: one at a time 

- [https://itnext.io/how-javascript-works-in-browser-and-node-ab7d0d09ac2f](https://itnext.io/how-javascript-works-in-browser-and-node-ab7d0d09ac2f){:target="_back"}


- ![img](https://miro.medium.com/max/990/1*lZ-KXoVNUSOwaq7q8zUBDg.png){:target="_back"}

~~~js
////同步
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
output:// 1 2 3 4 5

////非同步
function asyncConsole(time,value){
setTimeout(function(){console.log(value);},time);
}
asyncConsole(200,1);
asyncConsole(100,2);
asyncConsole(400,3);
asyncConsole(500,4);
asyncConsole(300,5);
output:// 2 1 5 3 4
////
~~~

## 函數 & 環境 & 變數環境

![imgur](https://i.imgur.com/ZDYFpjk.jpg)

~~~js
function b(){
    var myvar;
    console.log(myvar);
}
function a(){
    var myvar=2; // 創造myvar在自己的變數環境中
    console.log(myvar);
    b(); // 呼叫函數 創造出他的執行環境
}
var myvar=1;
console.log(myvar);
a();
console.log(myvar);
~~~


~~~js

function a(){
    var myvar=2; // 創造myvar在自己的變數環境中
    console.log(myvar);
    b(); // 呼叫函數 創造出他的執行環境
    function b(){
       console.log(myvar);
   }
}
~~~