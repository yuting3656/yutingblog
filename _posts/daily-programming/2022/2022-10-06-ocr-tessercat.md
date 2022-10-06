---
layout: "single"
title: "daily Programming: OCR tesseract 看圖"
permalink: "daily-programming/ocr-python-tesseract"
tags: daily-programming python ocr tesseract
---

> 到本單位工作快 三年了
>
> 終於有比較有趣的東西了~
>
> 錄使用者畫面 擷取文字資訊
>
> 萬張高樓平地起
>
> 影像就是 一張張圖片在跳舞的組合
>
> 這回先來 看圖 下回再來把影片整個 情境串起來

1. 安裝

 - Tesseract: **OCR engine**
   - [github](https://github.com/tesseract-ocr/tesseract){:target="_back"}
 - python: 
    - [pytesseract](https://pypi.org/project/pytesseract/){:target="_back"} 
       - **站在巨人的肩膀上 把 tesseract 當核心 使用python完成 OCR需求**
       - **pytesseract requires Python '>=3.7' but the running Python is 3.6.8**
       - `pip install pytesseract` 
    - [opencv-python](https://pypi.org/project/opencv-python/){:target="_back"}
       - `pip install opencv-python`

2. 範例

- 辨識語系選擇
  - [github](https://github.com/tesseract-ocr/tessdata){:target="_back"}
  - `lang="chi_tra" --> 我在安裝 tesseract 已經額外選擇安裝 chinese tradition`

~~~python
import cv2
import pytesseract

# 我灌在
# C:\Program Files\Tesseract-OCR
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract'
img_cv = cv2.imread(r'yutingBlog.JPG')
img_rgb = cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB)
## lang="chi_tra" --> 我在安裝 tesseract 已經額外選擇安裝 chinese tradition
print(pytesseract.image_to_string(img_rgb, lang='chi_tra'))
~~~


3. 成果

|原圖|辨識結果|
|:---:|:---:|
|![Imgur](https://i.imgur.com/eB23NWB.png)|![Imgur](https://i.imgur.com/fyxEpXB.jpg) ![Imgur](https://i.imgur.com/aoMnbEE.jpg) ![Imgur](https://i.imgur.com/BIbY0ZO.jpg)|