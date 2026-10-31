---
layout: single
title: "留一點光：王偉忠 × 蔡康永，兩個人的 3D 深夜對談"
permalink: 'diary/:year-:month-:day'
date: 2026-11-01 00:00:00 +0800
tags: 今日隨意 蔡康永 王偉忠 訪談 three.js 3D 手機開發
classes: wide
author_profile: false
excerpt: "兩張椅子、兩支麥克風，還有值得留在心裡的幾句話。用手機和 AI 做一間會說金句的小小錄音室。"
---

偶是小水滴的啦！！這次直接**拿 Android 手機，遠端跟 Mac 上的 Codex 一起做部落格**。延續台北未來島、台北打架史的 3D 玩法，這回把鏡頭縮到一間小小的錄音室：王偉忠坐左邊，蔡康永坐右邊，讓幾句話慢慢留下來。

<link rel="stylesheet" href="{{ '/assets/css/kangyong-radio.css' | relative_url }}?v=1">
<section id="kangyong-radio" class="kyr-root" aria-label="王偉忠與蔡康永的互動語錄錄音室">
  <div class="kyr-loading">錄音室準備中……<br><small>下方也有純文字語錄與原始訪談連結。</small></div>
</section>

<script type="importmap">
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}
</script>
<script type="module">
  import { mountRadio } from "{{ '/assets/js/kangyong-radio/radio.js' | relative_url }}?v=1";
  mountRadio(document.getElementById('kangyong-radio'));
</script>

**玩法：** 自動換句，或按「下一句」慢慢看；點底下的小圓點也能直接挑句子。拖曳轉動錄音室、滾輪或兩指縮放。沒有播放聲音，安靜看就好。

### 這場對話從哪裡來

2026 年 10 月 29 日，中廣流行網《欸！我說到哪裡了？》播出王偉忠專訪蔡康永的 **「康永你 OK 嗎？」**。從近況談到風波、身分、代價，以及怎麼繼續生活。想看完整語境，可以回到[中廣流行網原始訪談](https://www.youtube.com/watch?v=3wP2VCoz3KM)。

畫面是我做的想像錄音室，人物是程式捏的小模型。**蔡康永的文字是報導引述的短句摘錄；左邊的「主題提問」與下面的旁註是編輯整理，不是王偉忠的原話，也不是原節目的逐字對答。** 沒有模仿兩人的聲音。

### 想留下來的幾句話

<div class="kyr-transcript" markdown="1">

- **想要的生活**：「當你把票投給你想要的生活的時候，你就贏了。」——[TVBS：專訪五大金句](https://news.tvbs.com.tw/entertainment/variety/4043377)
- **留一點光**：「你不把它燒了，換一點溫暖跟亮光，要幹嘛？」這裡談的是名聲與影響力。——[商業周刊：六十多歲仍想冒險](https://www.businessweekly.com.tw/careers/blog/3023496)
- **還想折騰**：「我不要全身而退」——[TVBS：專訪五大金句](https://news.tvbs.com.tw/entertainment/variety/4043377)
- **帶著傷前進**：「人生除了死亡，剩下都是擦傷。」這是他在訪談中提到並認同的話，並非標示為他的原創。——[NOWnews：訪談整理](https://www.nownews.com/news/6887753)
- **好好活著**：「沒死就好好活著」——[NOWnews：訪談整理](https://www.nownews.com/news/6887753)
- **理解的起點**：「我整個長大過程中我沒有對惡意感到陌生過。」談的是作為同志的成長經驗。——[民視新聞：身分認同的對話](https://www.ftvnews.com.tw/news/detail/2026A30W0331)
- **緣分的段落**：「人的緣分到一個段落就好了。」——[商業周刊：六十多歲仍想冒險](https://www.businessweekly.com.tw/careers/blog/3023496)

</div>

### 手機開發，真的可以耶

這篇也是一次小實驗：我在手機上講想法，Mac 負責建置，AI 查資料、寫程式，把一場訪談變成可以摸摸看、轉轉看的場景。跟前兩篇一樣用 three.js，椅子、人物、桌子和麥克風都是程式畫出來的。

查核與整理日期：2026-11-01。短句依上述媒體報導摘錄，標點略作統一；完整意思仍請回原訪談看。想繼續逛場景，可以去[台北打架史]({{ '/diary/2026-10-28' | relative_url }})和[台北未來島]({{ '/diary/2026-10-23' | relative_url }})。
