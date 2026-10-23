---
layout: "single"
title: "台北未來島：把沈伯洋的 HEART 政見蓋成五座島"
permalink: 'diary/:year-:month-:day'
tags: 台北市長 沈伯洋 HEART 政見 three.js 3D
---

> 我是沈伯洋的支持者，這篇是純手工的 3D 政見地圖：14 座六角政策島拼成台北，94 棟小模型就是 94 條政見，全部連到官網原文。對岸那座灰灰的小島是現任的「安可島」，自己看 😆
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
  import { mountTaipeiIslands } from "/yutingblog/assets/js/taipei-islands/islands.js?v=2";
  mountTaipeiIslands(document.getElementById("taipei-islands"));
</script>

### 這些島怎麼來的

島的資料直接整理自沈伯洋官網的政見頁（puma.taipei/policies，2026-10 版）：**14 項政策主題、94 個細項**。每座六角島是一項主題，島上每一棟小模型是一條細項，拼起來的輪廓是台北市。島的顏色對應 HEART 五主軸：

| 色 | 主軸 | 一句話 |
|---|---|---|
| 綠 | H・Habitat 空間 | 住得起、走得到、呼吸得到 |
| 橘 | E・Empower 培力 | 把機會直接放到年輕人手上 |
| 紅 | A・Accompany 陪伴 | 從育兒到長照，市府陪在旁邊 |
| 藍 | R・Resilience 韌性 | 安心，來自看不見的基礎建設 |
| 紫 | T・Time 時間 | 把塞在路上的時間還給你 |

點島看主題卡：白話摘要、細項清單（有分期時程）、「和誰一起做」的協作線會從島上畫出去。點細項飛到那棟樓，看白話解釋、受益的人、重點與時程，底下都有官方原文連結。右上「☰ 清單」可以直接挑島，四個時段按鈕切清晨、白天、黃昏、夜晚，夜晚路燈會亮。

資料在 `assets/js/taipei-islands/data.js`，官網有新政見我就補一行。

### 關於對岸那座島

安可島上只有三棟樓：鮮奶、輝達、大巨蛋。這三樣都是真的政績，我沒有要否認，只是四年下來每一場都是這三樣，所以島上那個跑馬燈會一直重播 🥛🖥🏟。公平起見，告示牌上也寫了他清單裡其他的東西。

### 技術

純 three.js，沒有模型檔，島、樓、樹、小人、雲、水面全是程式畫的；InstancedMesh 批次、需要時才重繪，弱裝置自動關陰影。這套引擎是我白天做工廠地圖順手長出來的，晚上就拿來蓋島了。畫法參考了沈伯洋官網的 HEART 政策島，資料也是從那裡整理的；程式是自己重寫的。
