---
layout: "single"
title: 'Study Group: 一姊出品 品質保證 Event capturing & bubbling'
permalink: 'stydeGroup/pon-events-capturing-bubbling'
tags: 讀書會
---

- [一姊出品](https://pengpon.github.io/studygroup/2020/05/05/Browser-Event-Object.html){:target="_back"}
- [一姊出品2](https://pengpon.github.io/studygroup/2020/05/06/Event-use-in-real-world.html){:target="_back"}

## What is DOM

- Javascript use the DOM to access the document and element.

The page content is stored in the DOM and may be accessed and manipulated via JavaScript,

API = DOM + JavaScript

![dom](https://hackernoon.com/hn-images/1*9mgDpZrvaO8gB7Kv8Ol95Q.png)

- 畢卡葛
![Imgur](https://i.imgur.com/Ki7kuBq.jpg)

- `BOM`: Browser Object Model(BOM) & Document Object Model(DOM)
   - ![bom](https://i.imgur.com/bOxoDp1.jpg)
   - 和內容無關

- `DOM`: Javascript 可以藉由DOM API去改變html中的內容或樣式

## Event Driven

- Javascript是一個事件驅動的程式設計(Event-driven)

1. event 
2. handler 

[event reference](https://developer.mozilla.org/zh-TW/docs/Web/Events){:target="_back"}

## 監聽方式

1. in html(inline)

   ~~~js
   <button onclick="console.log('click')">
   
   <body onload="doFirst()">
   ~~~

2. in js 

   ~~~js
   document.getElementById('button').onclick=function(){
   console.log('click')
   }
   
   window.onload=doFirst();
   ~~~

3. GOOD! :heart:

   ~~~js
   const element=document.getElementById('button');
   element.addEventListener('click',function(){
   console.log('hello');
   },false)
   
   window.addEventListener('load',doFisrt,false);
   ~~~

![Imgur](https://i.imgur.com/jQPcU7s.jpg)


- ​addEventListener( event, handler, useCature)
- removeEventlistener(event, handler, useCature)

## event trigger / 傳遞流程

ex: 三層 div, grandma > mama > daughter

~~~html
<div id="grandma">
  阿嬤
  <div id="mama">
    媽媽
    <div id="daughter">
      女兒
    </div>
  </div>
</div>
~~~

~~~css
body{
  width:50%;
}
#grandma{
  height:200px;
  background-color:#3D8CFF;
}
#mama{
  height:100px;
  background-color:#45FF89;
}
#daughter{
  height:50px;
  background-color:#FFF92B;
}
~~~

~~~js
var grandma=document.getElementById('grandma');
var mama=document.getElementById('mama');
var daughter=document.getElementById('daughter');

grandma.addEventListener('click',function(){
  console.log('grandma');
});
mama.addEventListener('click',function(){
~~~


![Imgur](https://i.imgur.com/WDmQLrd.jpg)

## Event Phase

- eventPhase

~~~js
// PhaseType
  const unsigned short      CAPTURING_PHASE                = 1;
  const unsigned short      AT_TARGET                      = 2;
  const unsigned short      BUBBLING_PHASE                 = 3;
~~~

![eventPhase](https://i.imgur.com/Z9vLKVc.jpg)


__addEventListener(event, handler, useCature)__ 的第三個參數，代表是否要把listener放到CAPTURING_PHASE，預設為false!

__PS.__ 有幾種事件沒有支援事件的propagation，Ex:onfocus, onblur

![Imgur](https://i.imgur.com/D9VmWaY.jpg)

## Bubbling 

- 內部元素觸發時先執行自己的handler 再執行父元素的handler


## Capturing

- 當內部(target)被觸發時 從最外圍的handler執行，再執行本身

__p.s.__ 當事件傳遞到目標對象時，無論第三個參數為何，__event phase都為at_target__

既然已經是目標就不會再分capturing / bubbling，handler照程式碼執行的順序


## 補充

- Event 補充

   - [https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/event.html](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/event.html){:target="_back"}


   ![Imgur](https://i.imgur.com/m800aNd.jpg)


## Event Delegation


~~~html
<ul id="menu">
    <li><a id="home">home</a></li>
    <li><a id="dashboard">Dashboard</a></li>
    <li><a id="report">report</a></li>
</ul>
~~~

~~~js
let menu = document.querySelector('#menu');

menu.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id) {
        case 'home':
            console.log('Home menu item was clicked');
            break;
        case 'dashboard':
            console.log('Dashboard menu item was clicked');
            break;
        case 'report':
            console.log('Report menu item was clicked');
            break;
    }
});
~~~

## Event Stop Propagation

- [範例](https://codepen.io/pengpon77/pen/PoPQzWx){:target="_back"}

~~~js
const popup = document.getElementById('popup');
document.getElementById('openPop').addEventListener('click',(e)=>{
    e.stopPropagation();
    popup.classList.add("active");
});

// document 監聽click >> close跳窗
document.addEventListener('click',()=>{
    close();
});

popup.addEventListener('click',(e)=>{
    e.stopPropagation();
});

document.getElementById('closePop').addEventListener('click',()=>{
    close();
});

function close () {
    popup.classList.remove('active');
}
~~~

~~~css
#popup {
  display: none;
    position: fixed;
    background: #c5b6b6;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    color: #fff;
    height: 100px;
    text-align: center; 
}

#popup.active {
   display: block;
}

#closePop {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 50px;
    color: #000;
    transform: translate(50%,-50%);
  cursor: pointer; 
}
~~~

~~~html

  <button id="openPop">open popup</button>
  <div id="text">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  </div>

  <div id="popup" class="">
    <span id="closePop">x</span>
    <div>
      This is popup
      <button onclick="alert('hello')">Alert Button</button>
    </div>
  </div>
~~~


## Emmet Documentataion 

   - [https://docs.emmet.io/cheat-sheet/](https://docs.emmet.io/cheat-sheet/){:target="_back"}