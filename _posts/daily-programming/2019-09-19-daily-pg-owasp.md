---
layout: 'post'
title: 'daily Programming: 帆哥 OWASP 資安 分享!'
permalink: 'daily-programming/owasp'
tags: daily-programming owasp
---
## [OWASP](https://www.owasp.org/index.php/Main_Page){:target="_back"}

#### [OWASP Prevention Cheet Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html){:target="_back"}

### XSS 類別

- XSS 攻擊可分三類型

- [XSS cheat sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){:taget="_back"}

1. Stored XSS attacks
  - Type-I XSS
  - 存在 database 裡面
    
2. Reflected XSS attacks
   - 不用進資料庫
   - 網頁有些參數
   - 網頁抓 params，塞到 inner html

3. DOM XSS attacks
   - 幾乎都在前端發生

### 滲透測試好棒棒的網站

- Docker hub DVWA

   - [DVWA](https://hub.docker.com/r/vulnerables/web-dvwa/){:target="_back"}
   
   ~~~docker
   docker run --rm -it -p 80:80 vulnerables/web-dvwa
   ~~~

   - 帳號密碼

      - admin 
      - passwoed

   - DVWA Security

      -  

- Metasplotable

   - [Metasplotable](https://sourceforge.net/projects/metasploitable/){:target="_back"}

   - 帳號密碼

      - msfadmin 
      - msfadmin

- Mutillidae

   - [Mutillidae](https://www.owasp.org/index.php/OWASP_Mutillidae_2_Project){:target="_back"}

- Kali linux