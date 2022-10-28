---
layout: "single"
title: "daily Programming: OCR 專案把玩路程"
permalink: "daily-programming/ocr-yuting-project"
tags: daily-programming python ocr tesseract
excerpt: "OCR!!!"
header:
   overlay_image: https://i.imgur.com/eB23NWB.png
---

> 前行提要
>
> [daily Programming: OCR tesseract 看圖](https://yuting3656.github.io/yutingblog/daily-programming/ocr-python-tesseract){:target="_back"}

> 搞了 三個多禮拜
>
> 終於把辨識度 30% ---> 90%!? (自己說XDD)
>
> 然後小測試程式已經在客戶那邊跑 
>
> 繼續觀察可能的情境 :)


# 影像前處理 太重要了!

- 讓我辨識度飆高的原應就是  
  - 影像前處理
  > 等我爬山玩回來補上! XDDD
    - enlarge
    - gray
    - erosion & dilation
    - remover border
    - blur
  
  - 做這類專案時 知道[**主要題目&目標**](https://yuting3656.github.io/yutingblog/diary/2019-07-24) 非常關鍵
    -  在 [AIA](https://yuting3656.github.io/yutingblog/aiacademy/so-it-is){:target="_back"} 上課的時候有幾個很重要的重點
      - **70%** 的時間都是在處理資料
      - 目標&題目清楚 `可以幫助解決問題`
        - 在工作上 就是很清楚知道要辨識哪幾個**區域&項目&&**
          - 各個項目的資訊都是固定的 
          - 再來就用對的 modal 去辨識 成功率就高很多了唷! 
    