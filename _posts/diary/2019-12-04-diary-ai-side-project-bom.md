---
layout: "single"
title: "AI \"賽\" Project 採雷分享"
permalink: 'diary/:year-:month-:day'
tags: 今日隨意 ai-side-project 
---


- 前行提要

  - 自己計畫寫 [AI Side Project](https://yuting-dl-dream.appspot.com/){:target="_back"} 四大主題:

     - [Object Detection](https://yuting-object-detection.herokuapp.com/){:target="_back"}
     - AI Music
     - AIA Project
     - Chat Bot

  - 開始不到一週半，一堆炸彈和雷阿~~:zap::zap::zap::zap::zap:

  - `BUT` 這就是我當初寫 __賽PROJECT__ 的初衷阿!!! :heart::heart::heart:

### Object Detection - WebCam

- [MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia){:target="_back"}

- [Announcing WebRTC and Media Capture, JUN 7, 2017](https://stackoverflow.com/questions/12024770/access-camera-from-a-browser){:target="_back"}

- I am not holding my breath....

   - 我的手機  `Samsung S9+` __Android__ 玩  [Object Detection](https://yuting-object-detection.herokuapp.com/){:target="_back"} 跑起來都正常，但 APPLE 都會是黑螢幕，當初想說能不能用 Chorme 在 iphone 下開 Camera 結果查到 [這篇](https://stackoverflow.com/questions/51501642/chrome-and-firefox-are-not-able-to-access-iphone-camera){:target="_back"}

   - 後來修正後 已經測到 ipad (5th generation) ios: 13.1.3 目前用 Safari 開可以正常偵測到物件 :high_brightness:


- 還沒解決的問題 
 
  - iphone safari 開有兩種狀況

     - iphone 11 一開有抓到螢幕，也有呈現偵測到的 bounding box 然後就停住了... 像照相一樣!!! 就一張圖 XD

     - iphone 其他 一開就黑頻一遍 XD


### Object Detection - Text to Speech 

- [https://usefulangle.com/post/98/javascript-text-to-speech](https://usefulangle.com/post/98/javascript-text-to-speech){:target="_back"}

- https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API

- 這樣的寫法可以知道 使用者用的平台 有哪些語言

<select id="voicesOptions"> 
</select>

- ~~~js
     function populateVoiceList() {
       if(typeof speechSynthesis === 'undefined') {
         return;
       }
     
       var voices = speechSynthesis.getVoices();
     
       for(i = 0; i < voices.length ; i++) {
         var option = document.createElement('option');
         option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
         
         if(voices[i].default) {
           option.textContent += ' -- DEFAULT';
         }
     
         option.setAttribute('data-lang', voices[i].lang);
         option.setAttribute('data-name', voices[i].name);
         document.getElementById("voiceSelect").appendChild(option);
       }
     }
     
     populateVoiceList();
     if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
       speechSynthesis.onvoiceschanged = populateVoiceList;
     }
     ~~~

- 把 `var voices = speechSynthesis.getVoices();` 寫在 function 裡面超級重要!!!

- [https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices){:target="_back"}



<script>

var select = document.getElementById("voicesOptions");
function voiceGO() {
    let voices = speechSynthesis.getVoices();

    for (let i = 0; i < voices.length; i ++ ) {
        let opt = voices[i].name
    let optLang = voices[i].lang
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = optLang;
    select.appendChild(el);
 }
}
voiceGO();
speechSynthesis.onvoiceschanged = voiceGO;


// function populateVoiceList() {
//   if(typeof speechSynthesis === 'undefined') {
//     return;
//   }

//   let voices = speechSynthesis.getVoices();

//   alert(voices)
//   for(i = 0; i < voices.length ; i++) {
//     var option = document.createElement('option');
//     option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
//     if(voices[i].default) {
//       option.textContent += ' -- DEFAULT';
//     }

//     option.setAttribute('data-lang', voices[i].lang);
//     option.setAttribute('data-name', voices[i].name);
//     document.getElementById("voicesOptions").appendChild(option);
//   }
// }

// populateVoiceList();
// if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = populateVoiceList;
// }

</script>

- 乾貨

  - http://teropa.info/blog/2016/07/28/javascript-systems-music.html
  - https://codepen.io/teropa/pen/gvwwZL/
  - https://medium.com/@oluwafunmi.ojo/getting-started-with-magenta-js-e7ffbcb64c21
  - https://tensorflow.github.io/magenta-js/music/demos/