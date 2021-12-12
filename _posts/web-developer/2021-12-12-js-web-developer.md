---
layout: "single"
title: '挖賽! 我可能只是個打雜的！Closures 之 我不同意'
permalink: 'web-developer/not-a-web-developer-closures'
tags: js web-developer closures
excerpt: "四個不同意．一起來遊戲"
header:
  overlay_image: https://i.imgur.com/BkdhL0V.jpg
---


 > [If you cannot explain these concepts to another programmer, then you are not a Web Developer](https://mobile.twitter.com/sleeplessyogi/status/1446997406294417411?fbclid=IwAR12DxifX6OG3uem335gbK8WRvn717-xwF_01WXjrimPPq4oG0FsMwFRuYA){:target="_backs"}

>> - Closures
>> - Hoisting
>> - Reduce
>> - `this` in JS
>> - Prototypal inheritance
>> - IIFE
>> - Promises
>> - SPA
>> - React hooks
>> - Virtual DOM
>> - Webpack
>> - REST
>> - Lazy loading
>> - JWT
>> - CSRF
>> - XSS
>> - CORS


 >
 > 對！故事就是這樣開始的！
 >
 > 那天看到 [保哥](https://www.facebook.com/will.fans/){:target="_back"}分享 這篇
 >
 > ＨＡＨＡＨＡＨＡＨＡ！！！
 > 
 > 打雜師！🌻 認證討取！ＸＤ
 >
> BUT!!!!
> 
> 打雜歸打雜！
>
> 腦袋瓜刻畫未來的那個自己 😎 還是要堅持繼續扎穩馬步啊！！！
>
> GOGO~~~ 🌟 🌟 🌟 


## [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures){:target="_back"}

- MDN 解釋

`A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.`

```js
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init(); 
```

### [實用例子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#practical_closures){:target="_back"}

<div id="no-no-no-no" style="text-align:center; border-radius: 20px; ">
<img  alt="4-nos" src="https://i.imgur.com/xMQCeJo.gif"/>
</div>

<button id="green1" style="background-color:#58D68D; color:black">不同意 重啟核四</button>
<button id="green2" style="background-color:#7DCEA0; color:black">不同意 反萊豬</button>
<button id="green3" style="background-color:#76D7C4; color:black">不同意 三接遷移</button>
<button id="green4" style="background-color:#A2D9CE; color:black">不同意 公投綁大選</button>

<script>
    const changeBgColor = (color) => {
       return () => {
           document.getElementById("no-no-no-no").style.backgroundColor = color
       };
    };
    const green1 = changeBgColor('#58D68D');
    const green2 = changeBgColor('#7DCEA0');
    const green3 = changeBgColor('#76D7C4');
    const green4 = changeBgColor('#A2D9CE');

    document.getElementById('green1').onclick = green1;
    document.getElementById('green2').onclick = green2;
    document.getElementById('green3').onclick = green3;
    document.getElementById('green4').onclick = green4;
</script>


#### 怎麼寫的

~~~html

 <div id="no-no-no-no" style="text-align:center; border-radius: 20px; ">
<img  alt="4-nos" src="https://i.imgur.com/xMQCeJo.gif"/>
</div>

<button id="green1" style="background-color:#58D68D; color:black">不同意 重啟核四</button>
<button id="green2" style="background-color:#7DCEA0; color:black">不同意 反萊豬</button>
<button id="green3" style="background-color:#76D7C4; color:black">不同意 三接遷移</button>
<button id="green4" style="background-color:#A2D9CE; color:black">不同意 公投綁大選</button>

<script>
    const changeBgColor = (color) => {
       return () => {
           document.getElementById("no-no-no-no").style.backgroundColor = color
       };
    };
    const green1 = changeBgColor('#58D68D');
    const green2 = changeBgColor('#7DCEA0');
    const green3 = changeBgColor('#76D7C4');
    const green4 = changeBgColor('#A2D9CE');

    document.getElementById('green1').onclick = green1;
    document.getElementById('green2').onclick = green2;
    document.getElementById('green3').onclick = green3;
    document.getElementById('green4').onclick = green4;
</script>
~~~