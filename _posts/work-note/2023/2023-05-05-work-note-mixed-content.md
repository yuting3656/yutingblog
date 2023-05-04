---
layout: "single"
title: "工作筆記:  清朝的 https 想吃明朝的 http 阿！ / Mixed content "
permalink: "work-note/js-mixed-content"
tags: 工作筆記 
excerpt: ""
header:
   overlay_image: "https://i.imgur.com/ZcpBOQ5.jpg"
---

|![Imgur](https://i.imgur.com/ZcpBOQ5.jpg)|

### 工作遇到的狀況是這樣

 - 想要讓客戶用我們雲端的網頁服務(https)，抓取客戶端內網某 Ip 上的服務(http)。

 - 這時候網頁自動把把你擋掉出現 [`Mixed Content`](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content){:target="_back"}
    - `When a user visits a page served over HTTPS, their connection with the web server is encrypted with TLS and is therefore safeguarded from most sniffers and man-in-the-middle attacks. An HTTPS page that includes content fetched using cleartext HTTP is called a mixed content page. Pages like this are only partially encrypted, leaving the unencrypted content accessible to sniffers and man-in-the-middle attackers. That leaves the pages unsafe.`



## 解法

 1. 在可戶端那台ＩＰ上架自簽憑證
 2. 在使用者的電腦
     - 再起一個 localhost service 打內網的 IP  
     - 讓雲端的服務直接吃 localhost service 
     - |![Imgur](https://i.imgur.com/5igzVOU.jpg)|

> 我自己對第1招沒疑問
>
> 反倒是第2招 
>
> 所以做了點功課

### localhost 免搶可以視為是安全的拉 ＸＤＤ 

- [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts){:target="_back"}
   - `Locally-delivered resources such as those with http://127.0.0.1 URLs, http://localhost and http://*.localhost URLs (e.g. http://dev.whatever.localhost/), and file:// URLs are also considered to have been delivered securely.`

- [w3C](https://w3c.github.io/webappsec-secure-contexts/#localhost){:target="_back"}
   - `... user agents MAY treat localhost names as having potentially trustworthy origins ...`
   - [potentially trustworthy](https://w3c.github.io/webappsec-secure-contexts/#potentially-trustworthy-origin)


> 爽！ 長知識就是開心 ：）