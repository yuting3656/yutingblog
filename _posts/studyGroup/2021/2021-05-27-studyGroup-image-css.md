---
layout: "post"
title: "Study Group: 珊謎姐出品 一年一齣 品質保證 CSS 神奇圖片的魔法"
permalink: "stydeGroup/magic-image-css"
tags: 讀書會 css
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

## 廢話不多說! 傳送門~~~

- [珊謎姐: CSS 可能是圖片不爆版的小秘密](https://sammiehsieh.github.io/CSS/){:target="\_back"}

## position

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position){:target="\_back"}

|      value      |                                                                                description                                                                                |
| :-------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| static(default) |                                                            當元素設定為 static 時，不管怎麼設定 TRBLZ 都沒意義                                                            |
|    relative     |                                       當元素設定為 relative 時，代表元素要放的位置與預設的不同，而不同的程度會再依據設定 TRBLZ 而定                                       |
|    absolute     | 當元素設定為 absolute 時，瀏覽器會往該元素的外層找是否有其他 position 非預設值的元素(如果沒有，就會以網頁頁面<body>左上角為定位點)，並根據外層元素的位置再根據 TRBLZ 改變 |
|      fixed      |                                        當元素設定為 fixed 時，除了放置位置 TRBLZ 可設定外，當網頁卷軸滾動時，該元素的位置不會改變                                         |
|     sticky      |                當元素設定為 sticky 時，在沒有遇到可滾動的父層元素時，效果就和 relative 一樣；但碰到可滾動的副層元素時，會有類似 absolute 浮在最上層的效果                 |

### object-fit

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit){:target="\_back"}

|     value     |                                              description                                              |
| :-----------: | :---------------------------------------------------------------------------------------------------: |
| fill(default) | 填滿容器，如長或寬的長度不足時，會將圖片比例破壞並延長到將整個容器填滿(如 windows 桌布「延展」的效果) |
|    contain    |  根據圖片較長邊對應容器的比例，等比例縮放將整張圖片完整呈現於容器中(如 windows 桌布「全螢幕」的效果)  |
|     cover     |               維持圖片比例，並以類似裁剪的方式將容器填滿(如 windows 桌布「填滿」的效果)               |
|     none      |                                            不調整圖片大小                                             |
|  scale-down   |            圖片尺寸會和 none 或 contain 其中一個相同，並依據哪一個的結果圖片會比較小來決定            |

### object-position

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position){:target="\_back"}

- x/y 位移值
- 靠上(top)、靠右(right)、靠下(bottom)、靠左(left)，或置中(center)

### css global values: inherit, initial, unset

|inherit| 繼承父層元素屬性|
|initial| 根據瀏覽器預設值而定|
|unset| 實際呈現為 inherit 或 initial 其中一個，如果父層有設定就是 inherit，反之則為 initial|

## Ex:

- [範例](https://jsbin.com/taxubax/edit?html,output){:target="\_back"}

- html

  ```html
  <figure class="myWrapper">
    <img src="" class="myImage" />
  </figure>
  ```

- css

  ```css
  figure.myWrapper {
    position: relative;
    width: 500px; /* 外層控制寬度大小 */
    height: 500px; /* 外層控制高度大小 */
    border: 2px solid #ccc; /* 方便參考外框大小，不需要就拿掉 */
  }

  img.myImage {
    position: absolute;
    width: 100%; /* 適應外層寬度 */
    height: 100%; /* 適應外層高度 */
    object-fit: cover; /* 填滿外層給的寬高 */
    object-position: center; /* 調整圖片根據外層置中對齊 */
  }
  ```

## 練習是成長之母!

1. 製作一張包含 250px\*250px 圖片的人物介紹小卡，如果沒想法的話可以從 這裡 開始
2. 試著和 [Bootstrap 4 的 Grid System](https://getbootstrap.com/docs/4.5/layout/grid/){:target="\_back"} 合用，製作出像 [KKBOX 歌曲排行榜](https://kma.kkbox.com/charts/yearly/newrelease?lang=tc&terr=tw){:target="\_back"} 的呈現方式，專輯封面高度不小於 80px

> 山迷姐的解答:
>
> 1. [ANS_1](https://output.jsbin.com/kogivak){:target="\_back"}
>
> 2. [ANS_2](https://output.jsbin.com/lasuyic){:target="\_back"}

## 我愛 CSS 我愛 CSS:

1.

<div 
  style="
    border: 10px dotted yellow;
    width: 400px;
    height: 500px;
    background-color: black;
    color: snow;
    "> 
  <div 
  style="
  border:5px solid snow;
  margin:5px;
  padding:5px;
  text-align:center;
  ">
     <img
     style="
     position: relative;
     width: 250px;
     height: 250px;
     object-fit: cover;
     object-position: top;
     "
     src="https://stickershop.line-scdn.net/stickershop/v1/product/12797/LINEStorePC/main.png;compress=true"
     />
  </div>
  <h1>我是可愛皮卡糾 ~ </h1>
  </div>

ans: **我就是 inline 之王!!! XDDD**

```html
<div
  style="
    border: 10px dotted yellow;
    width: 400px;
    height: 500px;
    background-color: black;
    color: snow;
    "
>
  <div
    style="
  border:5px solid snow;
  margin:5px;
  padding:5px;
  text-align:center;
  "
  >
    <img
      style="
     position: relative;
     width: 250px;
     height: 250px;
     object-fit: cover;
     object-position: top;
     "
      src="https://stickershop.line-scdn.net/stickershop/v1/product/12797/LINEStorePC/main.png;compress=true"
    />
  </div>
  <h1>我是可愛皮卡糾 ~</h1>
</div>
```

2.

好先吃飯 XDDD

<div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
