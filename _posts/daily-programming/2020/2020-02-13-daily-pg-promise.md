---
layout: 'post'
title: 'daily Programming: 家姐出品 品質保證 promise & async & awit'
permalink: 'daily-programming/javascript-promise-async-await'
tags: daily-programming javascript 
---

## Promise 

- ES6 實現鍊式調用

- promise 規範

   - Promise/A
   - Promise/B
   - Promise/C
   - Promise/A+
   - ES6: Promise/A+ 訂定的標準

## 建立一個　Promise


~~~js
new promsie(resolve, reject) => {
    if () {

    } else {

    }
}
~~~

- 三種狀態

   - pending
   - fulfilled
   - rejected


   ~~~js
    const promise1 = new Promise(function(resolve, reject) {
    resolve('Success!');
    });
    
    promise1.then(function(value) {
      console.log(value);
      // expected output: "Success!"
    });
   ~~~


   ~~~js
    p.then(onFulfilled[, onRejected]);
 
    p.then(value => {
      // fulfillment
    }, reason => {
      // rejection
    });
   ~~~

   - example

   ~~~js
   function timer(val, ms) {
      return new Promise((resolve, reject) =>{
         setTimeout(() => {
             console.log(val);
             resolve(val+1)
         }, 1000);
      })
   }

   timer(1, 1000).then(val => {
       return timer(val, 1000)
   }).then(val =>{
       return timer(val, 1000)
   })
   ~~~


   ~~~js
   setTimeOut(()=>{
      console.log('1')  
   },0)

   new Promise((res, rej)=>{
      console.log('2');
      res()
   }).then(()=>{
       console.log('3')
   }).then(()=>{
       console.log('4')
   })

   console.log('5')
   ~~~

## Microtask and Macrotask

![Imgur](https://i.imgur.com/THGRwWT.jpg)

- [https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/652128/](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/652128/){:target="_back"}

- Microtasks
   - Promise
   - Process.nextTick(node.Js)
   - Object.observe(deprecated)
   - MutationObserver

- Macrotasks 
   - 執行主線程的 javascript
   - http request
   - setTimeOut
   - setInterval

## Promise 錯誤處理: catch

~~~js
new Promise(() => {

}).then()
  .catch()
~~~

## Promise 的靜態方法

~~~js
Promise.resolve('Success')
.then(val=> {})
~~~

## Promse.all(iterable)

## Promse.race(iterable)

## async/await

- ES8(ES2017) 引入 promise 的語法糖

~~~js
async function series() {
    aeait wait()
}
~~~

- [https://nodejs.dev/modern-asynchronous-javascript-with-async-and-await](https://nodejs.dev/modern-asynchronous-javascript-with-async-and-await){:target="_back"}

~~~js
new Promise((resolve, reject)=>{
   console.log("promise1")
   resolve()
}).then(()=>{
   console.log("then11")
   new Promise((resolve, reject)=>{
      console.log("promise2")
      resolve()
   }).then(()=>{
       console.log("then21")
   }).then(()=>{
       console.log("then23")
   })
}).then(()=>{
    console.log("then12")
})
~~~

## hackmd.io 簡報好幫手！

- reveal js