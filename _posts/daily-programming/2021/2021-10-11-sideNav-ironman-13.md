---
layout: "post"
title: "daily Programming:  自製 鐵人賽 (13th) Side Navigation "
permalink: "daily-programming/ironman-13th-side-nav"
tags: daily-programming js
---

<style>
.sideNav{
   height: 100%;
   width: 0;
   position: fixed;
   z-index: 1;
   top: 0;
   left: 0;
   background-image: url("https://i.imgur.com/3ZiSRYE.jpg");
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
   overflow-x: hidden;
   padding-top: 60px;
   transition: 0.5s;
   padding-bottom: 25px;
}

.sideNav a {
   padding: 8px 8px 8px 32px;
   text-decoration: none;
   font-size: 18px;
   color: #f1f1f1;
   display: block;
   transition: 0.3s;
}

.sideNav a:hover {
   color: #85C1E9;
}

.sideNav .closeBtn{
   position: absolute;
   top: 0;
   right: 25px;
   font-size: 36px;
   margin-left: 50px;
   font-family: cursive;
}

@media screen and (max-height: 450px) {
   .sideNav{ padding-top: 15px;}
   .sideNav a {font-size: 14px;}
}

</style>


<script>

const openNav = () => {
   document.getElementById("sideNav").style.width = "100%";
}

const closeNav = () => {
   document.getElementById("sideNav").style.width = "0";
}
</script>

<div id="sideNav" class="sideNav">
   <a href="javascript:void(0)" class="closeBtn" onclick="closeNav()">X</a>
   <a href="https://yuting3656.github.io/yutingblog/blog/tag#2021-13th-ironman" target="blank">帶腦去上班 & No Rules Rules</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-01" target="blank">Day 01 - 你終究要開始的</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-02" target="blank">Day 02 - 沒有規則 就是唯一規則</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-03" target="blank">Day 03 - 有頂尖的同事 才有一流的工作環境</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-04" target="blank">Day 04 - 以正面動機 說出你的真心話</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-05" target="blank">Day 05 - 開始減少控制 刪除休假規定</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-06" target="blank">Day 06 - 開始減少控制 廢除差旅和費用規定</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-07" target="blank">Day 07 - 強化人才密度 拿出業界最高薪資</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-08" target="blank">Day 08 - 增進誠實敢言 把一切攤在陽光下</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-09" target="blank">Day 09 - 放寬更多限控制 決策不必上級核準</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-10" target="blank">Day 10 - 人才密度最大化 留任測試</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-11" target="blank">Day 11 - 誠實敢言最大化 建立回饋循環</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-12" target="blank">Day 12 - 除去大部分控制 充分資訊 放心授權</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-13" target="blank">Day 13 - 走向全球</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-14" target="blank">Day 14 - 改組一隻爵士樂隊吧!</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-15" target="blank">Day 15 - 認知科學中的成功之路</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-16" target="blank">Day 16 - 找出你珍視的機會</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-17" target="blank">Day 17 - 熱情從何處來</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-18" target="blank">Day 18 - 我在這裡幫忙 把人類送上月球</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-19" target="blank">Day 19 - 10 種普世價值</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-20" target="blank">Day 20 - 應徵與面試 掌握勝出的訣竅</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-21" target="blank">Day 21 - 獲得工作機會 談條件 做出決定</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-22" target="blank">Day 22 - 填補知識缺口 尋找導師 持續學習</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-23" target="blank">Day 23 - 有聲 無聲 在不同模式下 有效溝通</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-24" target="blank">Day 24 - 突破生產障礙 高效產出</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-25" target="blank">Day 25 - 不埨頭銜 發揮領導領導力</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-26" target="blank">Day 26 - 轉行 跳槽或尋求升遷</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-27" target="blank">Day 27 - 適合你的 才是真正的好職涯</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-28" target="blank">Day 28 - 寫下你的故事 :)</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-29" target="blank">Day 29 - 零規則的帶腦去上班</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-30" target="blank">Day 30 - </a>
   <br/>
   <br/>
   <br/>
  </div>

<button onclick="openNav()">看一看</button>



### 怎麼寫的

~~~html
<style>
.sideNav{
   height: 100%;
   width: 0;
   position: fixed;
   z-index: 1;
   top: 0;
   left: 0;
   background-image: url("https://i.imgur.com/3ZiSRYE.jpg");
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
   overflow-x: hidden;
   padding-top: 60px;
   transition: 0.5s;
   padding-bottom: 25px;
}

.sideNav a {
   padding: 8px 8px 8px 32px;
   text-decoration: none;
   font-size: 18px;
   color: #f1f1f1;
   display: block;
   transition: 0.3s;
}

.sideNav a:hover {
   color: #85C1E9;
}

.sideNav .closeBtn{
   position: absolute;
   top: 0;
   right: 25px;
   font-size: 36px;
   margin-left: 50px;
   font-family: cursive;
}

@media screen and (max-height: 450px) {
   .sideNav{ padding-top: 15px;}
   .sideNav a {font-size: 14px;}
}

</style>


<script>

const openNav = () => {
   document.getElementById("sideNav").style.width = "100%";
}

const closeNav = () => {
   document.getElementById("sideNav").style.width = "0";
}
</script>

<div id="sideNav" class="sideNav">
   <a href="javascript:void(0)" class="closeBtn" onclick="closeNav()">X</a>
   <a href="https://yuting3656.github.io/yutingblog/blog/tag#2021-13th-ironman" target="blank">帶腦去上班 & No Rules Rules</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-01" target="blank">Day 01 - 你終究要開始的</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-02" target="blank">Day 02 - 沒有規則 就是唯一規則</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-03" target="blank">Day 03 - 有頂尖的同事 才有一流的工作環境</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-04" target="blank">Day 04 - 以正面動機 說出你的真心話</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-05" target="blank">Day 05 - 開始減少控制 刪除休假規定</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-06" target="blank">Day 06 - 開始減少控制 廢除差旅和費用規定</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-07" target="blank">Day 07 - 強化人才密度 拿出業界最高薪資</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-08" target="blank">Day 08 - 增進誠實敢言 把一切攤在陽光下</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-09" target="blank">Day 09 - 放寬更多限控制 決策不必上級核準</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-10" target="blank">Day 10 - 人才密度最大化 留任測試</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-11" target="blank">Day 11 - 誠實敢言最大化 建立回饋循環</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-12" target="blank">Day 12 - 除去大部分控制 充分資訊 放心授權</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-13" target="blank">Day 13 - 走向全球</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-14" target="blank">Day 14 - 改組一隻爵士樂隊吧!</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-15" target="blank">Day 15 - 認知科學中的成功之路</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-16" target="blank">Day 16 - 找出你珍視的機會</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-17" target="blank">Day 17 - 熱情從何處來</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-18" target="blank">Day 18 - 我在這裡幫忙 把人類送上月球</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-19" target="blank">Day 19 - 10 種普世價值</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-20" target="blank">Day 20 - 應徵與面試 掌握勝出的訣竅</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-21" target="blank">Day 21 - 獲得工作機會 談條件 做出決定</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-22" target="blank">Day 22 - 填補知識缺口 尋找導師 持續學習</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-23" target="blank">Day 23 - 有聲 無聲 在不同模式下 有效溝通</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-24" target="blank">Day 24 - 突破生產障礙 高效產出</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-25" target="blank">Day 25 - 不埨頭銜 發揮領導領導力</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-26" target="blank">Day 26 - 轉行 跳槽或尋求升遷</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-27" target="blank">Day 27 - 適合你的 才是真正的好職涯</a>
   <a href="https://yuting3656.github.io/yutingblog/2021-13th-ironman/day-28" target="blank">Day 28 - 寫下你的故事 :)</a>
  </div>
~~~

### 參考

- [W3: How TO - Side Navigation](https://www.w3schools.com/howto/howto_js_sidenav.asp){:target="_back"}