---
layout: "single"
title: "daily Programming: 美好的事在 今年 2022 發生了 ❤️"
permalink: "daily-programming/all-about-love-2022"
tags: daily-programming css
excerpt: ""
header:
   overlay_image: https://i.imgur.com/gzTP2QS.jpg
---

> 看著每年遞減的 PO 文數量
>
> 2019 **200**
>
> 2020 **149**
> 
> 2021 **101**
>
> 2022 **20** (現在 2022-09-15 XDDDD)

## 很明顯的 今年有事發生  ❤️❤️❤️ 😋😋😋


<style>
    body {
  margin: 0;
}

#heart-container {
  height: 100vh;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.heart {
  background-color: red;
  display: inline-block;
  height: 30px;
  margin: 0 10px;
  position: relative;
  top: 0;
  transform: rotate(-45deg);
  width: 30px;
}

.heart:before,
.heart:after {
  content: "";
  background-color: red;
  border-radius: 50%;
  height: 30px;
  position: absolute;
  width: 30px;
}

.heart:before {
  top: -15px;
  left: 0;
}

.heart:after {
  left: 15px;
  top: 0;
}

@keyframes float {
  from {transform: translateY(100vh);
  opacity: 1;}
  to {transform: translateY(-300vh);
  opacity: 0;}
}
</style>

<script>
function random(num) {
  return Math.floor(Math.random()*num)
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5)+5;
  return `
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `
}

function createBalloons(num) {
  var heartContainer = document.getElementById("heart-container")
  for (var i = num; i > 0; i--) {
  var heart = document.createElement("div");
  heart.className = "heart";
  heart.style.cssText = getRandomStyles();           
  heartContainer.append(heart);
  }
}

window.onload = function() {
  createBalloons(100);
}

</script>

<div id="heart-container">
<h1 > LOVE</h1>
</div>

### 怎麼寫的

~~~html
<style>
    body {
  margin: 0;
}

#heart-container {
  height: 100vh;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.heart {
  background-color: red;
  display: inline-block;
  height: 30px;
  margin: 0 10px;
  position: relative;
  top: 0;
  transform: rotate(-45deg);
  width: 30px;
}

.heart:before,
.heart:after {
  content: "";
  background-color: red;
  border-radius: 50%;
  height: 30px;
  position: absolute;
  width: 30px;
}

.heart:before {
  top: -15px;
  left: 0;
}

.heart:after {
  left: 15px;
  top: 0;
}

@keyframes float {
  from {transform: translateY(100vh);
  opacity: 1;}
  to {transform: translateY(-300vh);
  opacity: 0;}
}
</style>

<script>
function random(num) {
  return Math.floor(Math.random()*num)
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5)+5;
  return `
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `
}

function createBalloons(num) {
  var heartContainer = document.getElementById("heart-container")
  for (var i = num; i > 0; i--) {
  var heart = document.createElement("div");
  heart.className = "heart";
  heart.style.cssText = getRandomStyles();           
  heartContainer.append(heart);
  }
}

window.onload = function() {
  createBalloons(100);
}

</script>

<div id="heart-container">
<h1 > LOVE</h1>
</div>

~~~

## Reference

> [Floating Balloons](https://codepen.io/Jemimaabu/pen/vYEYdOy){:target="_blank"}
>
> [I Heart CSS](https://css-tricks.com/hearts-in-html-and-css/){:target="_blank"}