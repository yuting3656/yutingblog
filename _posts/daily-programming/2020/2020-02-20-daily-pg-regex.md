---
layout: "single"
title: 'daily Programming: sammie 姐出品 品質保證 Regex'
permalink: 'daily-programming/studyGroup-sammie-regex'
tags: daily-programming regex 讀書會
---

## Regex

Sammie 姊: [regex](https://sammiehsieh.github.io/regex/2020/02/05/Regex/)

- Background

   - 狀態機 [Finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine){:target="_back"}

   - 樹狀結構 [Tree Structure](https://en.wikipedia.org/wiki/Tree_structure){:target="_back"}


- Windows 網頁搜 REGEX

   - F12
      - `Ctrl + Shift + F`

- Regex Sources:

   - [https://regex101.com/](https://regex101.com/){:target="_back"}
   - [https://www.regextester.com/](https://www.regextester.com/)
   - Library:
      - [http://regexlib.com/Default.aspx?AspxAutoDetectCookieSupport=1](http://regexlib.com/Default.aspx?AspxAutoDetectCookieSupport=1)

- 語法

   - [MDN: Regex](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions){:target="_back"}

   - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions){:target="_back"}

   - [https://www.tutorialspoint.com/javascript/javascript_regexp_object.htm](https://www.tutorialspoint.com/javascript/javascript_regexp_object.htm){:target="_back"}

- Javascript 用法

   - exec: 以陣列回傳字串中匹配到的部分，無匹配則回傳null
   - test: 搜尋字串中是否有符合的部分，回傳true/false
   - match: 以陣列回傳字串中匹配到的部分，無匹配則回傳null
   - search: 尋找字串中是否有符合的部分，有會回傳index，無則回傳-1
   - replace: 尋找字串中匹配的部，第二個參數為取代之新字串
   - split: 在字串根據匹配到的項目拆成陣列


- 狀態機 

   - 字母數字
   
      - ![imgur](https://i.imgur.com/4tcPjHW.png)

   - 集合

      - ![imgur](https://i.imgur.com/N9B1B8K.png)
