---
layout: 'post'
title: 'Study Group: 一姊出品 品質保證'
permalink: 'stydeGroup/pon-cors'
tags: 讀書會
---

> [一姊](https://pengpon.github.io/web/2020/03/29/CORS.html){:target="_back"}

- browser 保護 user 的一朝~


## cross-origin-writes 允許 cros 的寫入

   - link, form submit

## cross-origin embedding 允許 cros 的嵌入

   - `<script src="xxx"></script>`
   - `<link rel="style">`
   - `<link rel="stylesheet" href="xxxx">`　
   - `<img>`
   - `<video>`
   - `<iframe>`
   
## CORS

~~~
Access-Control-Allow-Origin: *            			# 允許所有網站發送的請求
Access-Control-Allow-Origin: http://foo.example  	# 只允許 http://foo.example 的請求
~~~


## Preflight Request 

- [https://livebook.manning.com/book/cors-in-action/chapter-4/20](https://livebook.manning.com/book/cors-in-action/chapter-4/20){:target="_back"}


## Interceptor Http

- [https://httptoolkit.tech/](https://httptoolkit.tech/){:target="_back"}

## JSONP

> JSON with Padding

## Proxy

- Client

  - ![img](https://i.imgur.com/oRFMcx0.jpg)


  - EX: Angular add Proxy

     -  `"ng serve --proxy-config proxy-file.json"`


- Server 

   - ![img](https://i.imgur.com/G5oTXxV.jpg)

- Server 之間

   - ![img](https://i.imgur.com/VQ0NZeh.jpg)


## https://sketch.io/sketchpad/

- [https://sketch.io/sketchpad/](https://sketch.io/sketchpad/){:target="_back"}


## Prevent 

- `<img src='https://books.com/delete?id=3' width='0' height='0' />`

- Server sameSite

~~~
// Server
// Set-Cookie: key=value   SameSite有三個值 None, Strict & Lax 
Set-Cookie: cat_image_loaded=1, SameSite=None 不限制同源
Set-Cookie: cat_image_loaded=1, SameSite=Strict 限同源網站，完全禁止第三方cookies
Set-Cookie: cat_image_loaded=1, SameSite=Lax 部分request允許 (<a>, <link> )
~~~

## clickjacking

- [https://www.netsparker.com/blog/web-security/clickjacking-attacks/](https://www.netsparker.com/blog/web-security/clickjacking-attacks/){:target="_back"}

- 不准其他網頁內嵌 X-Frame-options(DENY/ SAMEORIGIN/ ALLOW-FROM uri) 