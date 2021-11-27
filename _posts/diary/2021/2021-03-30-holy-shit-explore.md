---
layout: "single"
title: "人間有愛系列: 謝謝你進平❤️ "
permalink: 'diary/:year-:month-:day/holy-shit-almost-explore'
tags: 今日隨意 javascript
---

> 故事是這樣的 :crescent_moon:
>
> 上週六 舒爽的夜晚  
> 
> 享受著我最愛的夜跑 一路向北 :musical_note:
>
> 過了圓山後 騷動腸胃開始作怪 :dash::dash: :fire::fire::fire:
> 
> 一路憋到洲美橋 當下我真的快炸裂ㄖㄜˉ  :shit::shit::shit:
> 
> 人生不過吃啦撒 
>
> 原來如此這麼基本的人類 生理需求 我都無法滿足我自己!!!!  :weary::weary::weary:
>
> 所有可能的 情形都在 腦海裡排演過一遍了 :scream: :scream:
>
> 拉出來 路邊野草堆直接解放 吃下去(誤 :droplet::droplet::droplet:
>
> 已經很模糊的回想 不知道是怎麼到 廁所的我 :facepunch::facepunch:
>
> 有馬桶 BUT!!! 沒有衛生紙 :baby_chick::baby_chick:
>
> 就當我已經放下所有尊嚴&交出手指頭的那一切的瞬間 :partly_sunny::partly_sunny:
>
> 進平 出現在不起點的洗手台旁 約莫還有五~六張的額度 :gift_heart: :gift_heart: :heartpulse: :heartpulse: :heart: :heart:
> 
> :dash: :dash: :fire: :star: :two_hearts: :dash: :exclamation: :exclamation: :sparkles: :boom: :boom: :+1:
>
> 我想 我人生會一路這樣跑下去的 :) :sunglasses:
 
<style>
.img1 {
    filter: blur(10px)
}

.img-final{
    display: none
}

.over{
    display: none
}

.showOver{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

.byebye{
    width: 100vw ;
    height: 100vh;
    background-image: url('https://i.imgur.com/CN7nQre.jpg');
    background-position: center;
}
</style>


### 怎麼寫的

- style

~~~css
   .img1 {
       filter: blur(10px)
   }
   .img-final{
       display: none
   }
   .over{
       display: none
   }
   .showOver{
       position: fixed;
       left: 50%;
       top: 50%;
       transform: translate(-50%, -50%)
   }
   .byebye{
       width: 100vw ;
       height: 100vh;
       background-image: url('https://i.imgur.com/CN7nQre.jpg');
       background-position: center;
   }
~~~

- html

~~~html
<h3 id="countdown10"></h3>

<h3 id="counterH3" class="counterNumber"> </h3>

<div id="runningImg" class="img1">
   <img src="https://i.imgur.com/1N9YbZo.jpg" title="source: imgur.com" />
<div>

<div id="winnerView" class="img-final">
   <img src="https://i.imgur.com/rCsc67e.jpg" title="source: imgur.com" />
   <img src="https://i.imgur.com/Qpt7UWE.jpg" title="source: imgur.com" />
   <img src="https://i.imgur.com/RBEYjKU.jpg" title="source: imgur.com" />
</div>

<div id="overView" class="over">
   <div class="byebye"></div>
</div>
~~~

- js

~~~javascript
   // enter counter
   let counter = 0;
   let countdownNumber = 10
   const runningImg =  document.getElementById('runningImg')
   const counterH3 =  document.getElementById('counterH3')
   const countdown10 =  document.getElementById('countdown10')
   const winnerView =  document.getElementById('winnerView')
   const overView =  document.getElementById('overView')
   const keepRunning = (e) => {
       console.log(e);
       if (e.keyCode === 13) {
            counter++
            counterH3.innerHTML = counter
       }
       console.log(counter)
      
       if (counter === 20 ){
          // runningImg.style.setProperty()
           runningImg.style.webkitFilter = "blur(0px)"
       }
       // game over
       if (countdownNumber <= 0) {
           window.removeEventListener('keydown', keepRunning)
           window.alert('時間到!!!')
           if (counter < 60) {
               overView.classList.remove('over')
               overView.classList.add('showOver')
           }
       }
       if (counter === 60) {
            winnerView.classList.remove("img-final")
       }
   }
      const keepRunningMobile = (e) => {
       console.log(e);
       if (e) {
            counter++
            counterH3.innerHTML = counter
       }
       console.log(counter)
      
       if (counter === 20 ){
          // runningImg.style.setProperty()
           runningImg.style.webkitFilter = "blur(0px)"
       }
      
       // game over
       if (countdownNumber <= 0) {
           window.removeEventListener('touchstart', keepRunningMobile)
           window.alert('時間到!!!')
           if (counter < 60) {
               overView.classList.remove('over')
               overView.classList.add('showOver')
           }
       }
   
       if (counter === 60) {
            winnerView.classList.remove("img-final")
       }
   }
   
   // start
   window.addEventListener('keydown', keepRunning);
   window.addEventListener('touchstart', keepRunningMobile);
   // countdown
   const timer = setInterval( () => {
       if(countdownNumber <= 0 ) {
           clearInterval(timer)
       }
       countdownNumber--
       countdown10.innerHTML = countdownNumber 
   }, 1000)
~~~


--- 


## 快要屎炸拉~~~ :scream_cat: :scream_cat: :scream_cat:

> 在 10 秒 快速按 `ENTER` **(手機直接方點螢幕就行啦)** 讓跑速 超過 60!!! 可以看到 進平唷~~~~ >\\\\\\\<
>
> 可以 跳出本頁 再近來玩一次~~~
>

<button onclick="startPlay()" id="playButton">開始玩</button>

### 倒數計時:
<h3 id="countdown10"></h3>

### 跑速:
<h3 id="counterH3" class="counterNumber"> </h3>

<div id="runningImg" class="img1">
   <img src="https://i.imgur.com/1N9YbZo.jpg" title="source: imgur.com" />
<div>

<div id="winnerView" class="img-final">
   <img src="https://i.imgur.com/rCsc67e.jpg" title="source: imgur.com" />
   <img src="https://i.imgur.com/Qpt7UWE.jpg" title="source: imgur.com" />
   <img src="https://i.imgur.com/RBEYjKU.jpg" title="source: imgur.com" />
</div>

<div id="overView" class="over">
   <div class="byebye"></div>
</div>


<script>
// enter counter
let counter = 0;
let countdownNumber = 10
const runningImg =  document.getElementById('runningImg')
const counterH3 =  document.getElementById('counterH3')
const countdown10 =  document.getElementById('countdown10')
const winnerView =  document.getElementById('winnerView')
const overView =  document.getElementById('overView')
const playButton = document.getElementById('playButton')


const keepRunning = (e) => {
    if (e.keyCode === 13) {
         counter++
         counterH3.innerHTML = counter
    }
   
    if (counter === 20 ){
       // runningImg.style.setProperty()
        runningImg.style.webkitFilter = "blur(0px)"
    }
   
    // game over
    if (countdownNumber <= 0) {
        window.removeEventListener('keydown', keepRunning)
        window.alert('時間到!!!')
        if (counter < 60) {
            overView.classList.remove('over')
            overView.classList.add('showOver')
        }
    }

    if (counter === 60) {
         winnerView.classList.remove("img-final")
    }
}


const keepRunningMobile = (e) => {
    if (e) {
         counter++
         counterH3.innerHTML = counter
    }
   
    if (counter === 20 ){
       // runningImg.style.setProperty()
        runningImg.style.webkitFilter = "blur(0px)"
    }
   
    // game over
    if (countdownNumber <= 0) {
        window.removeEventListener('touchstart', keepRunningMobile)
        if (counter < 60) {
            overView.classList.remove('over')
            overView.classList.add('showOver')
        }
    }

    if (counter === 60) {
         winnerView.classList.remove("img-final")
    }
}



const startPlay = () => {
// hide button
playButton.style.display= "none";

// start
window.addEventListener('keydown', keepRunning);
window.addEventListener('touchstart', keepRunningMobile);

// countdown
const timer = setInterval( () => {
    if(countdownNumber <= 0 ) {
        clearInterval(timer)
    }
    countdownNumber--
    countdown10.innerHTML = countdownNumber 
}, 1000)
}
</script>