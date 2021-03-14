---
layout: "post"
title: "我的蛙鏡 你別走阿~~~~~~~~~~~~~~"
permalink: 'diary/:year-:month-:day/my-goggle-dont-leave-me'
tags: 今日隨意 javascript svg
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>


<style>
/* body {
    margin: 0;
} */
.pic {
    text-align: center;
    position: relative;
    height: 80vh;
    width: 60wh;
}
.blur {
    height: 100%;
}
.overlay {
    position: inherit;
    top: 0px;
    left: 0px;
    height: 100%;
}
circle {
   opacity: 1;
   -webkit-transition: opacity 200ms linear;
   transition: opacity 200ms linear;
}

.pic2 {
    text-align: center;
    position: relative;
    height: 80vh;
    width: 60wh;
}
.blur2 {
    height: 100%;
}
.overlay2 {
    position: inherit;
    top: 0px;
    left: 0px;
    height: 100%;
}

.pic3 {
    text-align: center;
    position: relative;
    height: 100vh;
    width: 100wh;
}
.blur3 {
    height: 100%;
}
.overlay3 {
    position: inherit;
    top: 0px;
    left: 0px;
    height: 100%;
}

</style>


>
> 故事是這樣的兒 ~~~ :bowtie:
> 
> 高度近視的我 :whale:
>
> 拿下眼鏡 換上度數超淺的蛙鏡 看到的世界總是充滿想想空間 :sunny: :sunny: :sunny:
>
> BUT! :sunflower: 
> 
> 蛙鏡度數淺雖淺 在水中化身成水中蛟龍時 :swimmer: 
> 
> 還是可以看到許多美好的事物 :bikini: :thumbsup: :heart_eyes: :heart:
>
> :see_no_evil: :see_no_evil: :see_no_evil:
>
> 自從禮拜四 蛙鏡壞掉 :cry: :weary: 換了 沒度數的蛙鏡後 :anguished: :triumph:
>
> 我游泳的小確性:notes:&福利:gift_heart: 都沒惹~~~~~ :speech_balloon:
>
>
> 昨天游泳的時候 心中握緊拳頭 
>
> 為了增進我的泳技 :bikini: :stuck_out_tongue_winking_eye: :kissing_heart: 我一定要買一副 有度數的眼鏡!!!!!! :fireworks::fireworks::fireworks:
> 
> 就這樣 在水中 除了 泳鏡的發願! 還有 賽PROJECT 在腦海中~~~~~ 哈哈哈哈哈!!!
>
> 模糊的照片 戴上眼睛 就可以看到 美好的事物~~~~~~ :heart::heart::heart:

## 傳說中 司法之女乃!


<div class="overlay">
   <div class="pic">
     <svg class="blur" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%">
           <image filter="url(#filter2)" xlink:href="https://i.imgur.com/ZiJUoOY.png" width="100%" height="100%"></image>
           <filter id="filter2">
               <fegaussianblur stdDeviation="5" />
           </filter>
           <mask id="mask1">
               <circle cx="-50%" cy="-50%" r="30" fill="white" filter="url(#filter2)" />
           </mask>
           <image xlink:href="https://i.imgur.com/ZiJUoOY.png" width="100%" height="100%" mask="url(#mask1)"></image>
       </svg>
   </div>
</div>


## 怎麼寫的

### html, css

- css

~~~css
.pic {
    text-align: center;
    position: relative;
    height: 80vh;
    width: 60wh;
}
.blur {
    height: 100%;
}
.overlay {
    position: inherit;
    top: 0px;
    left: 0px;
    height: 100%;
}
circle {
   opacity: 1;
   -webkit-transition: opacity 200ms linear;
   transition: opacity 200ms linear;
}
~~~

- html

~~~s
<div class="overlay">
   <div class="pic">
     <svg class="blur" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%">
           <image filter="url(#filter2)" xlink:href="https://i.imgur.com/ZiJUoOY.png" width="100%" height="100%"></image>
           <filter id="filter2">
               <fegaussianblur stdDeviation="5" />
           </filter>
           <mask id="mask1">
               <circle cx="-50%" cy="-50%" r="30" fill="white" filter="url(#filter2)" />
           </mask>
           <image xlink:href="https://i.imgur.com/ZiJUoOY.png" width="100%" height="100%" mask="url(#mask1)"></image>
       </svg>
   </div>
</div>
~~~

### javascript, jQuery

~~~html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
~~~

~~~ javascript
const svgNS = "http://www.w3.org/2000/svg";

$(document).ready(function() {
//   let mask1 = $('#mask1 circle')[0];
//   let mask2 = $('#mask2 circle')[0];
  $('.pic').mousemove(function (event) {
    event.preventDefault();
    var upX = event.offsetX // event.clientX;
    var upY = event.offsetY // event.clientY;
    let mask = $('#mask1')[0];

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", upX)
    circle.setAttribute("cy", upY)    
    circle.setAttribute("r", "50")    
    circle.setAttribute("fill", "white");
    circle.setAttribute("filter", "url(#filter2)");
    
    mask.appendChild(circle);
    
    setTimeout(function(){ 
        circle.style.opacity = '0';
        setTimeout(function(){ 
            mask.removeChild(circle);
        }, 300);
    }, 300);
  });

  $('.pic2').mousemove(function (event) {
    event.preventDefault();
    var upX = event.offsetX // event.clientX;
    var upY = event.offsetY // event.clientY;
    let mask2 = $('#mask2')[0];

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", upX)
    circle.setAttribute("cy", upY)    
    circle.setAttribute("r", "50")    
    circle.setAttribute("fill", "white");
    circle.setAttribute("filter", "url(#filter2_2)");
    
    mask2.appendChild(circle);
    
    setTimeout(function(){ 
        circle.style.opacity = '0';
        setTimeout(function(){ 
            mask2.removeChild(circle);
        }, 300);
    }, 300);
  });

  $('.pic3').mousemove(function (event) {
    event.preventDefault();
    var upX = event.offsetX // event.clientX;
    var upY = event.offsetY // event.clientY;
    let mask2 = $('#mask3')[0];

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", upX)
    circle.setAttribute("cy", upY)    
    circle.setAttribute("r", "50")    
    circle.setAttribute("fill", "white");
    circle.setAttribute("filter", "url(#filter3)");
    
    mask2.appendChild(circle);
    
    setTimeout(function(){ 
        circle.style.opacity = '0';
        setTimeout(function(){ 
            mask2.removeChild(circle);
        }, 300);
    }, 300);
  });
}); 
~~~

## 阿珍

<div class="overlay2">
   <div class="pic2">
     <svg class="blur2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%">
           <image filter="url(#filter2_2)" xlink:href="https://i.imgur.com/fib72UQ.jpg" width="100%" height="100%"></image>
           <filter id="filter2_2">
               <fegaussianblur stdDeviation="5" />
           </filter>
           <mask id="mask2">
               <circle cx="-50%" cy="-50%" r="30" fill="white" filter="url(#filter2_2)" />
           </mask>
           <image xlink:href="https://i.imgur.com/fib72UQ.jpg" width="100%" height="100%" mask="url(#mask2)"></image>
       </svg>
   </div>
</div>


## >\\\\\\<

<div class="overlay3">
   <div class="pic3">
     <svg class="blur3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%">
           <image filter="url(#filter3)" xlink:href="https://cdn2.ettoday.net/images/3931/3931683.jpg" width="100%" height="100%"></image>
           <filter id="filter3">
               <fegaussianblur stdDeviation="5" />
           </filter>
           <mask id="mask3">
               <circle cx="-50%" cy="-50%" r="30" fill="white" filter="url(#filter3)" />
           </mask>
           <image xlink:href="https://cdn2.ettoday.net/images/3931/3931683.jpg" width="100%" height="100%" mask="url(#mask3)"></image>
       </svg>
   </div>
</div>




<script>
// const mask1 = document.getElementById("mask1").children[0];
const svgNS = "http://www.w3.org/2000/svg";

$(document).ready(function() {
//   let mask1 = $('#mask1 circle')[0];
//   let mask2 = $('#mask2 circle')[0];
  $('.pic').mousemove(function (event) {
    event.preventDefault();
    var upX = event.offsetX // event.clientX;
    var upY = event.offsetY // event.clientY;
    let mask = $('#mask1')[0];

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", upX)
    circle.setAttribute("cy", upY)    
    circle.setAttribute("r", "50")    
    circle.setAttribute("fill", "white");
    circle.setAttribute("filter", "url(#filter2)");
    
    mask.appendChild(circle);
    
    setTimeout(function(){ 
        circle.style.opacity = '0';
        setTimeout(function(){ 
            mask.removeChild(circle);
        }, 300);
    }, 300);
  });

  $('.pic2').mousemove(function (event) {
    event.preventDefault();
    var upX = event.offsetX // event.clientX;
    var upY = event.offsetY // event.clientY;
    let mask2 = $('#mask2')[0];

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", upX)
    circle.setAttribute("cy", upY)    
    circle.setAttribute("r", "50")    
    circle.setAttribute("fill", "white");
    circle.setAttribute("filter", "url(#filter2_2)");
    
    mask2.appendChild(circle);
    
    setTimeout(function(){ 
        circle.style.opacity = '0';
        setTimeout(function(){ 
            mask2.removeChild(circle);
        }, 300);
    }, 300);
  });

  $('.pic3').mousemove(function (event) {
    event.preventDefault();
    var upX = event.offsetX // event.clientX;
    var upY = event.offsetY // event.clientY;
    let mask2 = $('#mask3')[0];

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", upX)
    circle.setAttribute("cy", upY)    
    circle.setAttribute("r", "50")    
    circle.setAttribute("fill", "white");
    circle.setAttribute("filter", "url(#filter3)");
    
    mask2.appendChild(circle);
    
    setTimeout(function(){ 
        circle.style.opacity = '0';
        setTimeout(function(){ 
            mask2.removeChild(circle);
        }, 300);
    }, 300);
  });
}); 
</script>