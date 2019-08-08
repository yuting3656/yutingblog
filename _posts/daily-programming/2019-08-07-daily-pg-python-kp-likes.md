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

### 從 2019/08/07 10:47:22 ~ 2019/08/07 18:09:11

> 案讚數從 `2,119,890` --> `2,119,009` 少了 881 ~

~~~
[<div class="_4bl9"><div>2,119,890 人說這讚</div></div>] 2019/08/07 10:47:22
[<div class="_4bl9"><div>2,119,890 人說這讚</div></div>] 2019/08/07 10:48:25
[<div class="_4bl9"><div>2,119,890 人說這讚</div></div>] 2019/08/07 10:48:34
[<div class="_4bl9"><div>2,119,889 人說這讚</div></div>] 2019/08/07 10:50:47
[<div class="_4bl9"><div>2,119,885 人說這讚</div></div>] 2019/08/07 10:52:35
[<div class="_4bl9"><div>2,119,880 人說這讚</div></div>] 2019/08/07 10:56:56
[<div class="_4bl9"><div>2,119,875 人說這讚</div></div>] 2019/08/07 10:59:56
[<div class="_4bl9"><div>2,119,872 人說這讚</div></div>] 2019/08/07 11:02:56
[<div class="_4bl9"><div>2,119,870 人說這讚</div></div>] 2019/08/07 11:05:56
[<div class="_4bl9"><div>2,119,866 人說這讚</div></div>] 2019/08/07 11:08:56
[<div class="_4bl9"><div>2,119,864 人說這讚</div></div>] 2019/08/07 11:11:56
[<div class="_4bl9"><div>2,119,864 人說這讚</div></div>] 2019/08/07 11:14:56
[<div class="_4bl9"><div>2,119,855 人說這讚</div></div>] 2019/08/07 11:17:56
[<div class="_4bl9"><div>2,119,847 人說這讚</div></div>] 2019/08/07 11:20:56
[<div class="_4bl9"><div>2,119,845 人說這讚</div></div>] 2019/08/07 11:23:56
[<div class="_4bl9"><div>2,119,843 人說這讚</div></div>] 2019/08/07 11:26:56
[<div class="_4bl9"><div>2,119,841 人說這讚</div></div>] 2019/08/07 11:29:56
[<div class="_4bl9"><div>2,119,839 人說這讚</div></div>] 2019/08/07 11:32:56
[<div class="_4bl9"><div>2,119,836 人說這讚</div></div>] 2019/08/07 11:35:56
[<div class="_4bl9"><div>2,119,829 人說這讚</div></div>] 2019/08/07 11:38:56
[<div class="_4bl9"><div>2,119,822 人說這讚</div></div>] 2019/08/07 11:41:56
[<div class="_4bl9"><div>2,119,821 人說這讚</div></div>] 2019/08/07 11:44:56
[<div class="_4bl9"><div>2,119,817 人說這讚</div></div>] 2019/08/07 11:47:56
[<div class="_4bl9"><div>2,119,812 人說這讚</div></div>] 2019/08/07 11:50:56
[<div class="_4bl9"><div>2,119,802 人說這讚</div></div>] 2019/08/07 11:53:56
[<div class="_4bl9"><div>2,119,794 人說這讚</div></div>] 2019/08/07 11:56:56
[<div class="_4bl9"><div>2,119,789 人說這讚</div></div>] 2019/08/07 11:59:56
[<div class="_4bl9"><div>2,119,788 人說這讚</div></div>] 2019/08/07 12:02:56
[<div class="_4bl9"><div>2,119,781 人說這讚</div></div>] 2019/08/07 12:05:56
[<div class="_4bl9"><div>2,119,773 人說這讚</div></div>] 2019/08/07 12:08:56
[<div class="_4bl9"><div>2,119,765 人說這讚</div></div>] 2019/08/07 12:11:56
[<div class="_4bl9"><div>2,119,753 人說這讚</div></div>] 2019/08/07 12:14:56
[<div class="_4bl9"><div>2,119,744 人說這讚</div></div>] 2019/08/07 12:17:56
[<div class="_4bl9"><div>2,119,737 人說這讚</div></div>] 2019/08/07 12:20:56
[<div class="_4bl9"><div>2,119,718 人說這讚</div></div>] 2019/08/07 12:23:56
[<div class="_4bl9"><div>2,119,702 人說這讚</div></div>] 2019/08/07 12:26:56
[<div class="_4bl9"><div>2,119,695 人說這讚</div></div>] 2019/08/07 12:29:56
[<div class="_4bl9"><div>2,119,687 人說這讚</div></div>] 2019/08/07 12:32:56
[<div class="_4bl9"><div>2,119,681 人說這讚</div></div>] 2019/08/07 12:35:57
[<div class="_4bl9"><div>2,119,669 人說這讚</div></div>] 2019/08/07 12:38:56
[<div class="_4bl9"><div>2,119,662 人說這讚</div></div>] 2019/08/07 12:41:56
[<div class="_4bl9"><div>2,119,657 人說這讚</div></div>] 2019/08/07 12:44:56
[<div class="_4bl9"><div>2,119,646 人說這讚</div></div>] 2019/08/07 12:47:56
[<div class="_4bl9"><div>2,119,637 人說這讚</div></div>] 2019/08/07 12:50:56
[<div class="_4bl9"><div>2,119,624 人說這讚</div></div>] 2019/08/07 12:53:56
[<div class="_4bl9"><div>2,119,618 人說這讚</div></div>] 2019/08/07 12:56:56
[<div class="_4bl9"><div>2,119,609 人說這讚</div></div>] 2019/08/07 12:59:56
[<div class="_4bl9"><div>2,119,605 人說這讚</div></div>] 2019/08/07 13:02:56
[<div class="_4bl9"><div>2,119,600 人說這讚</div></div>] 2019/08/07 13:05:56
[<div class="_4bl9"><div>2,119,586 人說這讚</div></div>] 2019/08/07 13:08:56
[<div class="_4bl9"><div>2,119,579 人說這讚</div></div>] 2019/08/07 13:11:56
[<div class="_4bl9"><div>2,119,577 人說這讚</div></div>] 2019/08/07 13:14:56
[<div class="_4bl9"><div>2,119,571 人說這讚</div></div>] 2019/08/07 13:17:56
[<div class="_4bl9"><div>2,119,563 人說這讚</div></div>] 2019/08/07 13:20:56
[<div class="_4bl9"><div>2,119,558 人說這讚</div></div>] 2019/08/07 13:23:56
[<div class="_4bl9"><div>2,119,550 人說這讚</div></div>] 2019/08/07 13:26:56
[<div class="_4bl9"><div>2,119,542 人說這讚</div></div>] 2019/08/07 13:29:56
[<div class="_4bl9"><div>2,119,528 人說這讚</div></div>] 2019/08/07 13:32:56
[<div class="_4bl9"><div>2,119,524 人說這讚</div></div>] 2019/08/07 13:35:56
[<div class="_4bl9"><div>2,119,519 人說這讚</div></div>] 2019/08/07 13:38:56
[<div class="_4bl9"><div>2,119,515 人說這讚</div></div>] 2019/08/07 13:41:57
換教室
[<div class="_4bl9"><div>2,119,507 人說這讚</div></div>] 2019/08/07 13:46:34
[<div class="_4bl9"><div>2,119,494 人說這讚</div></div>] 2019/08/07 13:51:38
[<div class="_4bl9"><div>2,119,488 人說這讚</div></div>] 2019/08/07 13:54:39
[<div class="_4bl9"><div>2,119,482 人說這讚</div></div>] 2019/08/07 13:57:39
[<div class="_4bl9"><div>2,119,478 人說這讚</div></div>] 2019/08/07 14:00:39
[<div class="_4bl9"><div>2,119,468 人說這讚</div></div>] 2019/08/07 14:03:39
[<div class="_4bl9"><div>2,119,456 人說這讚</div></div>] 2019/08/07 14:06:39
[<div class="_4bl9"><div>2,119,449 人說這讚</div></div>] 2019/08/07 14:09:39
[<div class="_4bl9"><div>2,119,441 人說這讚</div></div>] 2019/08/07 14:12:39
[<div class="_4bl9"><div>2,119,431 人說這讚</div></div>] 2019/08/07 14:15:39
[<div class="_4bl9"><div>2,119,418 人說這讚</div></div>] 2019/08/07 14:18:39
[<div class="_4bl9"><div>2,119,410 人說這讚</div></div>] 2019/08/07 14:21:39
[<div class="_4bl9"><div>2,119,403 人說這讚</div></div>] 2019/08/07 14:24:39
[<div class="_4bl9"><div>2,119,395 人說這讚</div></div>] 2019/08/07 14:27:39
[<div class="_4bl9"><div>2,119,387 人說這讚</div></div>] 2019/08/07 14:30:39
[<div class="_4bl9"><div>2,119,379 人說這讚</div></div>] 2019/08/07 14:33:39
[<div class="_4bl9"><div>2,119,367 人說這讚</div></div>] 2019/08/07 14:36:39
[<div class="_4bl9"><div>2,119,362 人說這讚</div></div>] 2019/08/07 14:39:39
[<div class="_4bl9"><div>2,119,356 人說這讚</div></div>] 2019/08/07 14:42:39
[<div class="_4bl9"><div>2,119,354 人說這讚</div></div>] 2019/08/07 14:45:39
[<div class="_4bl9"><div>2,119,347 人說這讚</div></div>] 2019/08/07 14:48:39
[<div class="_4bl9"><div>2,119,338 人說這讚</div></div>] 2019/08/07 14:51:39
[<div class="_4bl9"><div>2,119,327 人說這讚</div></div>] 2019/08/07 14:54:39
[<div class="_4bl9"><div>2,119,315 人說這讚</div></div>] 2019/08/07 14:57:39
[<div class="_4bl9"><div>2,119,301 人說這讚</div></div>] 2019/08/07 15:00:39
[<div class="_4bl9"><div>2,119,297 人說這讚</div></div>] 2019/08/07 15:03:40
[<div class="_4bl9"><div>2,119,288 人說這讚</div></div>] 2019/08/07 15:06:39
[<div class="_4bl9"><div>2,119,287 人說這讚</div></div>] 2019/08/07 15:09:43
[<div class="_4bl9"><div>2,119,282 人說這讚</div></div>] 2019/08/07 15:12:39
[<div class="_4bl9"><div>2,119,277 人說這讚</div></div>] 2019/08/07 15:15:39
[<div class="_4bl9"><div>2,119,264 人說這讚</div></div>] 2019/08/07 15:18:40
[<div class="_4bl9"><div>2,119,262 人說這讚</div></div>] 2019/08/07 15:21:39
[<div class="_4bl9"><div>2,119,252 人說這讚</div></div>] 2019/08/07 15:24:39
[<div class="_4bl9"><div>2,119,245 人說這讚</div></div>] 2019/08/07 15:27:39
[<div class="_4bl9"><div>2,119,238 人說這讚</div></div>] 2019/08/07 15:30:39
[<div class="_4bl9"><div>2,119,230 人說這讚</div></div>] 2019/08/07 15:33:40
[<div class="_4bl9"><div>2,119,227 人說這讚</div></div>] 2019/08/07 15:36:39
拉屎
[<div class="_4bl9"><div>2,119,192 人說這讚</div></div>] 2019/08/07 15:57:28
[<div class="_4bl9"><div>2,119,184 人說這讚</div></div>] 2019/08/07 16:00:29
[<div class="_4bl9"><div>2,119,182 人說這讚</div></div>] 2019/08/07 16:03:29
[<div class="_4bl9"><div>2,119,177 人說這讚</div></div>] 2019/08/07 16:06:29
[<div class="_4bl9"><div>2,119,167 人說這讚</div></div>] 2019/08/07 16:09:29
[<div class="_4bl9"><div>2,119,160 人說這讚</div></div>] 2019/08/07 16:12:29
[<div class="_4bl9"><div>2,119,158 人說這讚</div></div>] 2019/08/07 16:15:28
[<div class="_4bl9"><div>2,119,158 人說這讚</div></div>] 2019/08/07 16:18:28
[<div class="_4bl9"><div>2,119,157 人說這讚</div></div>] 2019/08/07 16:21:29
[<div class="_4bl9"><div>2,119,148 人說這讚</div></div>] 2019/08/07 16:24:29
[<div class="_4bl9"><div>2,119,145 人說這讚</div></div>] 2019/08/07 16:27:28
[<div class="_4bl9"><div>2,119,123 人說這讚</div></div>] 2019/08/07 16:39:11
[<div class="_4bl9"><div>2,119,116 人說這讚</div></div>] 2019/08/07 16:42:11
[<div class="_4bl9"><div>2,119,110 人說這讚</div></div>] 2019/08/07 16:45:11
[<div class="_4bl9"><div>2,119,102 人說這讚</div></div>] 2019/08/07 16:48:11
[<div class="_4bl9"><div>2,119,094 人說這讚</div></div>] 2019/08/07 16:51:11
[<div class="_4bl9"><div>2,119,091 人說這讚</div></div>] 2019/08/07 16:54:11
[<div class="_4bl9"><div>2,119,084 人說這讚</div></div>] 2019/08/07 16:57:11
[<div class="_4bl9"><div>2,119,078 人說這讚</div></div>] 2019/08/07 17:00:11
[<div class="_4bl9"><div>2,119,071 人說這讚</div></div>] 2019/08/07 17:03:11
[<div class="_4bl9"><div>2,119,069 人說這讚</div></div>] 2019/08/07 17:06:11
[<div class="_4bl9"><div>2,119,070 人說這讚</div></div>] 2019/08/07 17:09:11
[<div class="_4bl9"><div>2,119,062 人說這讚</div></div>] 2019/08/07 17:12:11
[<div class="_4bl9"><div>2,119,060 人說這讚</div></div>] 2019/08/07 17:15:11
[<div class="_4bl9"><div>2,119,056 人說這讚</div></div>] 2019/08/07 17:18:11
[<div class="_4bl9"><div>2,119,054 人說這讚</div></div>] 2019/08/07 17:21:11
[<div class="_4bl9"><div>2,119,051 人說這讚</div></div>] 2019/08/07 17:24:12
[<div class="_4bl9"><div>2,119,046 人說這讚</div></div>] 2019/08/07 17:27:12
[<div class="_4bl9"><div>2,119,046 人說這讚</div></div>] 2019/08/07 17:30:12
[<div class="_4bl9"><div>2,119,043 人說這讚</div></div>] 2019/08/07 17:33:11
[<div class="_4bl9"><div>2,119,041 人說這讚</div></div>] 2019/08/07 17:36:12
[<div class="_4bl9"><div>2,119,038 人說這讚</div></div>] 2019/08/07 17:39:11
[<div class="_4bl9"><div>2,119,040 人說這讚</div></div>] 2019/08/07 17:42:11
[<div class="_4bl9"><div>2,119,037 人說這讚</div></div>] 2019/08/07 17:45:11
[<div class="_4bl9"><div>2,119,035 人說這讚</div></div>] 2019/08/07 17:48:11
[<div class="_4bl9"><div>2,119,028 人說這讚</div></div>] 2019/08/07 17:51:12
[<div class="_4bl9"><div>2,119,019 人說這讚</div></div>] 2019/08/07 17:54:12
[<div class="_4bl9"><div>2,119,019 人說這讚</div></div>] 2019/08/07 17:57:12
[<div class="_4bl9"><div>2,119,015 人說這讚</div></div>] 2019/08/07 18:00:11
[<div class="_4bl9"><div>2,119,015 人說這讚</div></div>] 2019/08/07 18:03:12
[<div class="_4bl9"><div>2,119,011 人說這讚</div></div>] 2019/08/07 18:06:12
[<div class="_4bl9"><div>2,119,009 人說這讚</div></div>] 2019/08/07 18:09:11
~~~