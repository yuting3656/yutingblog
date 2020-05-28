---
layout: 'post'
title: 'Study Group: 一姐出品 品質保證 http and https'
permalink: 'stydeGroup/pon-http-and-https'
tags: 讀書會
---

- [一姐出品 品質保證](https://pengpon.github.io/studygroup/2020/05/26/http-and-https.html){:target="_back"}

## HTTP 

![img](https://i.imgur.com/NH53o7z.jpg)

![img](https://i.imgur.com/MdyKyuT.jpg)

## TCP 協議

- 建立: 三次握手
- 斷開: 四次揮手

![img](https://i.imgur.com/vy4FTad.jpg)

## HTTP 歷史

- 1991 出現 `HTTP/0.9` 只有 method GET，沒有 header!
- 1997 HTTP/1.1 出現
- 1999 HTTP/1.1 廣泛應用 options put trace connect delete
- 2010 patch


## HTTPS 

Hypertext Transfer Protocol Secure

![https](https://i.imgur.com/JVjPTyr.jpg)

## 特點 

- 公私鑰 (鎖箱開箱)

   - 建立安全的通道，確保數據傳輸

- 憑證 (證書)

   - 可確認網站的真實性，查看網站的憑證內容


![img](https://i.imgur.com/cCjfATW.jpg)


### [How Does HTTPS Work? RSA Encryption Explained](https://tiptopsecurity.com/how-does-https-work-rsa-encryption-explained/){:target="_back"}

![img](https://tiptopsecurity.com/wp-content/uploads/2017/06/How-HTTPS-Works.png)


## 加密演算法

- 對稱加密:只有一個私鑰，AES、RC4、3DES
- 非對稱加密:公私鑰各一，RSA、DSA/DSS

## 雜湊演算法

- SHA256
   - [SHA256](https://emn178.github.io/online-tools/sha256.html){:target="_back"}


- SHA: [Secure Hash Algorithms](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms){:target="_back"}


## 檢查

- TLS/SSL 憑證: [SSL Server Test](https://www.ssllabs.com/ssltest/){:target="_back"}

- HTTP/2 啟用 [HTTP/2 Test](https://tools.keycdn.com/http2-test){:target="_back"}

   - [ALPHAcamp技術筆記](https://tw.alphacamp.co/blog/2016-07-12-http2){:target="_back"}


## 封包攔截

- [Whireshark](https://www.wireshark.org/download.html){:target="_back"}