---
layout: 'post'
title: 'Study Group: 內壺澄舞出品 音樂一夏'
permalink: 'stydeGroup/neihu-yuting-music-and-life'
tags: 讀書會
---

> 一年了~ 故事的開始就是這句話 :

![Imgur](https://i.imgur.com/Bs00bzX.jpg)


&nbsp;
&nbsp;
&nbsp;
>
>
> 時間快的很害羞~ 
>
> 當了[小九九](https://yuting3656.github.io/yutingblog//diary/2019-06-27){:target="_back"}之後
> 
> 後發生了很多事: 離了職、去[AIA](https://yuting3656.github.io/yutingblog//aiacademy/so-it-is){:target="_back'"}、開了[部落格](https://yuting3656.github.io/yutingblog/about/){:target="_back"}、老哥結婚、[小英當選](https://yuting3656.github.io/yutingblog//diary/2020-01-14/data-science-taiwan-presidential-election){:target="_back"}、新的[工作](https://yuting3656.github.io/yutingblog/daily-programming/dz-one-month){:target="_back"}
>
> 當小九九之前 也發生了很多事
>
> 有幾件事一直陪到現在 EX: music~~~ :musical_note: :notes:
>

- 我還是覺得，能夠將工作技能結合到自己愛的事物上，是一件很幸福的享受~

   - 可以將職業技能，在無形中，慢慢地用較小幅度的痛苦，快速成長 :sunglasses:
   - 一定會有低潮、沮喪、失望、後悔...etc 的 moment
      - 那就跟小柚子一樣吧 ! 哭一哭 鬧一鬧 然後下一秒 又可以傻笑討抱抱 :heart: :heart:
      - 找到內心的回血溫泉! 跟頂級運動員一樣極盡可能地將低潮期縮短吧!
   - 我的秘密回血溫泉
      - 音樂、運動、[跟自己對話](https://yuting3656.github.io/yutingblog//diary/2019-10-03){:target="_back"}
 

- 複習一下音樂八~ XDD

## C ~ B key

|![Imgur](https://i.imgur.com/ImTjvVT.jpg)|![Imgur](https://i.imgur.com/u7egPIB.jpg)|

## Am ~ Bm key

|![Imgur](https://i.imgur.com/JY4CxZF.jpg)|![Imgur](https://i.imgur.com/GIMn1Nt.jpg)|

## 基本三和弦

|![Imgur](https://i.imgur.com/9bEtbPe.jpg)|![Imgur](https://i.imgur.com/kEHci9J.jpg)|

|![Imgur](https://i.imgur.com/7lFsDCM.jpg)|![Imgur](https://i.imgur.com/12BYUd4.jpg)|

## 特殊三和弦

|![Imgur](https://i.imgur.com/fuCvWbq.jpg)|

## [Tone.js](https://tonejs.github.io/){:target="_back"}

# 告五人 - 披星戴月的想你 (Demo)
<iframe  src="https://www.youtube.com/embed/LX-qN5V1eiE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



~~~js
var synth = new Tone.MembraneSynth().toMaster()

  var ampEnv = new Tone.AmplitudeEnvelope({
      "attack": 0.1,
      "decay": 0.2,
      "sustain": 1.0,
      "release": 0.8
    }).toMaster();

    //create an oscillator and connect it
    var memb = new Tone.PolySynth({}).toMaster();
    
 var seq = new Tone.Sequence((time= 10, note) => {
 memb.triggerAttackRelease(note, "80hz", time);
}, [["E4", "E4"], [ "E4", "E4"],[ "E4", "E4"],[ "E4", "E4"], 
    ["E4", "E4"], [ "E4", "E4"],[ "E4", "E4"],[ "E4", "E4"], 
    ["G#4", "G#4"], ["G#4", "G#4"], ["G#4", "G#4"], ["G#4", "G#4"],
    ["G#4", "G#4"], ["G#4", "G#4"], ["G#4", "G#4"], ["G#4", "G#4"],
    ["C#5", "C#5"], ["C#5", "C#5"], ["C#5", "C#5"], ["C#5", "C#5"],
    ["C#5", "C#5"], ["C#5", "C#5"], ["C#5", "C#5"], ["C#5", "C#5"],
    ["A4", "A4"], ["A4", "A4"], ["A4", "A4"], ["A4", "A4"],
    ["A4", "A4"], ["A4", "A4"], ["A4", "A4"], ["A4", "A4"]
    ], "3n").start();
    
document.querySelector('tone-play-toggle').addEventListener('change', e => Tone.Transport.toggle())
~~~

- JS-Example:

<script async src="//jsfiddle.net/yuting23656/gkzvrf8d/1/embed/"></script>


- Game of Thrones


<script async src="//jsfiddle.net/yuting23656/n2yjasL3/1/embed/"></script>


## 希望 - 李宗盛

<iframe src="https://www.youtube.com/embed/OKO2UVZUlzo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
