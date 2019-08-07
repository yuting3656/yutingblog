---
layout: 'post'
title: 'daily Programming: 阿北的按讚數'
permalink: 'daily-programming/kp-likes'
tags: daily-programming python 
---

> 看著阿北的言行，讓我有點憂鬱憂鬱的兒 :cry:，但我很喜歡阿北給的很多好棒棒的人生觀 :smile:
好啦就這樣啦！　自己變強比較重要

寫了一隻抓阿北ＦＢ讚數的爬蟲，每三分鐘抓一次寫到 txt 檔，今天下課時把紀錄結果丟上來

### 阿北加油

<iframe src="https://www.youtube.com/embed/N0zhdMwD2Z8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

~~~python
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import threading

def write_recode():
    # 3 分鐘寫一次 (60(s)*3)
    threading.Timer(180, write_recode).start()

    url = "https://www.facebook.com/DoctorKoWJ/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text)
    # 顯示like <div class="_4bl9"><div> xxxxx </div></div>

    find = [data.find_all('div', {'class': '_4bl9'}) for data in soup.find_all('div', {'class': 'clearfix _ikh'})]

    with open('kp_likes_recode.txt', 'a') as a_writer:
        now_time = datetime.now().strftime('%Y/%m/%d %H:%M:%S')
        result = '\n{} {}'.format(find[0], now_time)
        a_writer.write(result)


if __name__ == "__main__":
    write_recode()
    """
    寫出來的樣子
    [<div class="_4bl9"><div>2,119,875 人說這讚</div></div>] 2019/08/07 10:59:56
    """

~~~