---
layout: 'post'
title: 'daily Programming: python wiht bs4'
permalink: 'daily-programming/python-bs4'
tags: daily-programming python
---

> 最近發現! 效率有微微下降的趨勢，粉容易發散~~~ 
  <br/>
  正所謂 ~~~人人為我我為人人~~~。
  <br/>
  所以想到 [包柏大叔](https://en.wikipedia.org/wiki/Robert_C._Martin){:target="_back"} 在 [The Clean Coder: A Code of Conduct for Professional Programmers](https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers/dp/0137081073){:target="_back"} 這本書裡提到，每天工作的開始，
  寫一些 小 coding challenges 當一天的開始的暖身!
  <br/>
  好! :smile: 我也來! 哈哈哈哈

- 今天從 [practice python](https://www.practicepython.org/){:target="_back"} 這網站下手
   - 用 bs4 抓 我最愛的 [Ted Radio Hour](https://www.npr.org/programs/ted-radio-hour/){:target="_back"}
   - 抓本週節目的標題

- 速度看CODE

~~~python   
import requests
from bs4 import BeautifulSoup


url = "https://www.npr.org/programs/ted-radio-hour/"
response = requests.get(url)
soup = BeautifulSoup(response.text)

find_ = [data.find('h1') for data in soup.find_all("div", {"class": "title-description"})]

print(find_)
~~~

> 這邊留下一個小作業給自己: 
 <br/>上面那個寫法 find_ 最後是一個 list，且外加 tag --> \<h1\>節目的標題\<h1\>。
 <br/>想辦法把 h1 給G掉~~ 哈哈哈 因為是每日小小 programming ，所以不要花太多時間上面~ 
 <br/>好 掰掰 開始快樂的一天:)