---
layout: "single"
title: "daily Programming: 遲來的影像處理拉~~~ [py-opencv: image enlarge]"
permalink: "daily-programming/ocr-img-preprocessing"
tags: daily-programming python ocr tesseract 
---


> 前行提要
>
> [daily Programming: OCR tesseract 看圖](https://yuting3656.github.io/yutingblog/daily-programming/ocr-python-tesseract){:target="_back"}
>
>
> [daily Programming: OCR 專案把玩路程](https://yuting3656.github.io/yutingblog/daily-programming/ocr-yuting-project){:target="_back"}
>
> 等了那麼久~~ 
>
> 趴山終於爬完 要來寫了拉~~ XDDD


### Enlarge

- [openCV-Python Tutorials](https://opencv24-python-tutorials.readthedocs.io/en/latest/py_tutorials/py_tutorials.html){:target="_back"}

   - [OpenCV](https://docs.opencv.org/4.x/){:target="_back"}

~~~python
# 1 直接用 fx, fy
cv2.resize(img, None, fx=1.3, fy=1.3, interpolation=cv2.INTER_CUBIC)

# 2 dim的方式
def enlarge_img(img,scale_percent = 300 ):
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    return resized
~~~
