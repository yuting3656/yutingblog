---
layout: "single"
title: "daily Programming: XMLHttpRequest & Ajax & fetch 之阿華三週年拉!!! "
permalink: "daily-programming/xmlHttpRequest-ajax-fetch"
tags: daily-programming javascript ajax
excerpt: "egg tart!"
header:
   overlay_image: https://i.imgur.com/TOyEJ0e.jpg
---

> 今天跟三週年的阿華在聊技術的時候
>
> 突然發現各個位置都有專精和專攻的地方
>
> 我們真的都是站在巨人的肩膀上阿~
>
> 有時候還真要好好地低頭看看腳底下的世界
>
> 才懂得感恩唷~~~~

## 我們都是站在巨人的肩膀上!

- 現在前端把玩  [Ajax](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX){:target="_back"} 的時候不外乎就是
  - [jquery](https://jquery.com/){:target="_back"}
  - [axios](https://axios-http.com/docs/intro){:target="_back"}

- 上述的基底都是來自於瀏覽器原生的 Object 
   - [**XMLHttpRequest**]((https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)){:target="_back"} 

- 自己來用 XMLHttpRequest 抓寶可夢圖片! 
  - **體驗看看前人寫前端有多痛苦 XDDD**

<style>

    /* CSS */
    .submitBtn {
      background-color: #fff000;
      border-radius: 12px;
      color: #000;
      cursor: pointer;
      font-weight: bold;
      padding: 10px 15px;
      text-align: center;
      transition: 200ms;
      width: 100%;
      box-sizing: border-box;
      border: 0;
      font-size: 20px;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }
    
    .submitBtn:not(:disabled):hover,
    .submitBtn:not(:disabled):focus {
      outline: 0;
      background: #f4e603;
      box-shadow: 0 0 0 2px rgba(0,0,0,.2), 0 3px 8px 0 rgba(0,0,0,.15);
    }
    .submitBtn:disabled {
      filter: saturate(0.2) opacity(0.5);
      -webkit-filter: saturate(0.2) opacity(0.5);
      cursor: not-allowed;
    }
    .imgDiv{
        border:3px dashed black;
        text-align:center;
        border-radius:10px;
    }
    .labelText{
        color:snow;
        font-weight:900;
        font-size:24px;
    }
    .outSideDiv{
        border:8px solid yellow;
        border-radius:15px;
        background: linear-gradient(to bottom, #00b09b, #96c93d); 
        padding:3px;
        animation: rainbow 5s infinite;
    }
    @keyframes rainbow{
        0% {border:8px solid #ef5350;}
        30% {border:8px solid #7e57c2;}
        15% {border:8px solid #f48fb1;}
        45% {border:8px solid #2196f3;}
        60% {border:8px solid #26c6da;}
        75% {border:8px solid #43a047;}
        80% {border:8px solid #eeff41;}
        90% {border:8px solid #f9a825;}
        100% {border:8px solid #ff5722;}
    }
</style>

<script>
const submitButton = (id) => {    
 let pokemonId = id; 
 const inputPokemonId = document.getElementById("pokemonId")
 if (inputPokemonId) {
    pokemonId = inputPokemonId.value
 }
 // 1. new XMLHttpRequest Object
 const xhr = new XMLHttpRequest();
 xhr.responseType = "arraybuffer";
 xhr.addEventListener("load",function(){
     if(xhr.status == 200){
      // 3. get data
      const response = xhr.response;
      document.getElementById("pokemonImg").setAttribute('src', 
      'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(response))));
    }else{
        alert(xhr.status);
        alert("LOL~~~你無法成為神奇寶貝訓練大師!!!!")
    }
 })
 // 2 send request
 xhr.open("GET",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`);
 xhr.send();
}    
submitButton(1)
</script>

<div class="outSideDiv">
   <label class="labelText" for="pokemonId">寶可夢 ID:</label>
   <input type="number" id="pokemonId" name="pokemonId" size="5" value="1" /><br><br>
   <button class="submitBtn" onClick="submitButton()">送出</button>
   <hr/>
   <div class="imgDiv">
    <img id="pokemonImg" width="300" />
   </div> 
</div>


## 怎麼寫的

> 真的覺得超麻煩 XDDDDD

- html
   ~~~html
      <style>
          
         /* CSS */
         .submitBtn {
           background-color: #fff000;
           border-radius: 12px;
           color: #000;
           cursor: pointer;
           font-weight: bold;
           padding: 10px 15px;
           text-align: center;
           transition: 200ms;
           width: 100%;
           box-sizing: border-box;
           border: 0;
           font-size: 20px;
           user-select: none;
           -webkit-user-select: none;
           touch-action: manipulation;
         }
         
         .submitBtn:not(:disabled):hover,
         .submitBtn:not(:disabled):focus {
           outline: 0;
           background: #f4e603;
           box-shadow: 0 0 0 2px rgba(0,0,0,.2), 0 3px 8px 0 rgba(0,0,0,.15);
         }
         .submitBtn:disabled {
           filter: saturate(0.2) opacity(0.5);
           -webkit-filter: saturate(0.2) opacity(0.5);
           cursor: not-allowed;
         }
         .imgDiv{
             border:3px dashed black;
             text-align:center;
             border-radius:10px;
         }
         .labelText{
             color:snow;
             font-weight:900;
             font-size:24px;
         }
         .outSideDiv{
             border:8px solid yellow;
             border-radius:15px;
             background: linear-gradient(to bottom, #00b09b, #96c93d); 
             padding:3px;
             animation: rainbow 5s infinite;
         }
         @keyframes rainbow{
             0% {border:8px solid #ef5350;}
             30% {border:8px solid #7e57c2;}
             15% {border:8px solid #f48fb1;}
             45% {border:8px solid #2196f3;}
             60% {border:8px solid #26c6da;}
             75% {border:8px solid #43a047;}
             80% {border:8px solid #eeff41;}
             90% {border:8px solid #f9a825;}
             100% {border:8px solid #ff5722;}
         }
      </style>
      
      <div class="outSideDiv">
         <label class="labelText" for="pokemonId">寶可夢 ID:</label>
         <input type="number" id="pokemonId" name="pokemonId" size="5" value="1" ><br><br>
         <button class="submitBtn" onClick="submitButton()">送出</button>
         <hr/>
         <div class="imgDiv">
          <img id="pokemonImg" width="300" />
         </div> 
      </div>
   ~~~

- js

    ~~~js
    const submitButton = (id) => {    
     let pokemonId = id; 
     const inputPokemonId = document.getElementById("pokemonId")
     if (inputPokemonId) {
        pokemonId = inputPokemonId.value
     }
     // 1. new XMLHttpRequest Object
     const xhr = new XMLHttpRequest();
     xhr.responseType = "arraybuffer";
     xhr.addEventListener("load",function(){
         if(xhr.status == 200){
          // 3. get data
          const response = xhr.response;
          document.getElementById("pokemonImg").setAttribute('src', 
          'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(response))));
        }else{
            alert(xhr.status);
            alert("LOL~~~你無法成為神奇寶貝訓練大師!!!!")
        }
     })
     // 2 send request
     xhr.open("GET",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`);
     xhr.send();
    }    
    submitButton(1)
    ~~~

## Reference

- [When trying to put the image/png response of an xmlHTTPRequest I am getting garbage data](https://stackoverflow.com/questions/42924898/when-trying-to-put-the-image-png-response-of-an-xmlhttprequest-i-am-getting-garb)

- [pokemon github](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon)

- [pretty button css](https://getcssscan.com/css-buttons-examples)