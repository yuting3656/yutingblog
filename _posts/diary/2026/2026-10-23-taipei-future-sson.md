---
layout: "single"
title: "台北未來島：把沈伯洋的 HEART 政見蓋成五座島"
permalink: 'diary/:year-:month-:day'
tags: 台北市長 沈伯洋 HEART 政見 three.js 3D
---

> 我是沈伯洋的支持者，這篇是純手工的 3D 政見地圖。每一棟樓都是一條政見，有預算或數字的樓會長高、屋頂亮燈；點樓看白話解釋、受益的人和來源報導。對岸那座灰灰的小島是現任的「安可島」，自己看 😆
>
> 滑鼠拖拉旋轉、滾輪縮放，手機兩指也行。按「導覽」會有個小人帶你逐島走一圈。

<link rel="stylesheet" href="/yutingblog/assets/css/taipei-islands.css">
<div id="taipei-islands" class="tpi-root"></div>

<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }
}
</script>
<script type="module">
  import { mountTaipeiIslands } from "/yutingblog/assets/js/taipei-islands/islands.js?v=1";
  mountTaipeiIslands(document.getElementById("taipei-islands"));
</script>

### 這五座島怎麼來的

沈伯洋 8 月的政見發表會把政見分成五個主軸，首字母合起來是 **HEART**：

| 島 | 主軸 | 一句話 |
|---|---|---|
| H | Habitat 空間 | 住得起、走得到、呼吸得到 |
| E | Empower 培力 | 把機會直接放到年輕人手上 |
| A | Accompany 陪伴 | 從育兒到長照，市府陪在旁邊 |
| R | Resilience 韌性 | 安心，來自看不見的基礎建設 |
| T | Time 時間 | 把塞在路上的時間還給你 |

我把報導裡查得到的政見一條一條放上去：**有數字的樓比較高**，因為「編了預算」和「喊一喊」是兩回事。資料在 `assets/js/taipei-islands/data.js`，他之後有新政見，我加一行就多一棟樓。

### 關於對岸那座島

安可島上只有三棟樓：鮮奶、輝達、大巨蛋。這三樣都是真的政績，我沒有要否認，只是四年下來每一場都是這三樣，所以島上那個跑馬燈會一直重播 🥛🖥🏟。公平起見，告示牌上也寫了他清單裡其他的東西。

### 技術

純 three.js，沒有模型檔，島、樓、樹、小人全是程式畫的；InstancedMesh 批次、需要時才重繪，老電腦也跑得動。這套引擎是我白天做工廠地圖順手長出來的，晚上就拿來蓋島了。
