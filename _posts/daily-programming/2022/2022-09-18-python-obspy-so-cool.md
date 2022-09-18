---
layout: "single"
title: "daily Programming: 地震 好大!"
permalink: "daily-programming/obspy-python-2022-09-18-taiwan-earthquake"
tags: daily-programming python obspy
excerpt: ""
header:
   overlay_image: https://i.imgur.com/gzTP2QS.jpg
---

# 震 好 大!

### 故事是這樣的

> 搖到不行的 禮拜天
>
> 在等待 阿拿打 ❤️ 的時候 
>
> 新聞突然看到
>
> [連2起規模6以上強震！ 挪威專家第一時間示警：非常危險](https://www.ettoday.net/news/20220918/2340736.htm){:target="_back"}
>
> 新聞一打開~ 挖~~ 是我最愛的 Python ㄟ

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Magnitude 7.2 <a href="https://twitter.com/hashtag/earthquake?src=hash&amp;ref_src=twsrc%5Etfw">#earthquake</a> in <a href="https://twitter.com/hashtag/Taiwan?src=hash&amp;ref_src=twsrc%5Etfw">#Taiwan</a> today (2022-09-18Z06:44) likely very dangerous and <a href="https://t.co/AxdMJ6cGYF">https://t.co/AxdMJ6cGYF</a> gives <a href="https://twitter.com/hashtag/tsunami?src=hash&amp;ref_src=twsrc%5Etfw">#tsunami</a> threat. Follow there for updates. Signal on IU.MAJO (Japan, data via <a href="https://twitter.com/IRIS_EPO?ref_src=twsrc%5Etfw">@IRIS_EPO</a>)<a href="https://t.co/BeTJaLLb6j">https://t.co/BeTJaLLb6j</a> <a href="https://t.co/oltdzKUkqG">pic.twitter.com/oltdzKUkqG</a></p>&mdash; Dr. Steven J. Gibbons (@stevenjgibbons) <a href="https://twitter.com/stevenjgibbons/status/1571396253900066817?ref_src=twsrc%5Etfw">September 18, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

>
> 偷看了一下 套件

- [ObsPy](https://docs.obspy.org/){:target="_back"}

   - 一個關於 地震測量的套件 **超酷!!!!!**

   - 速度玩了一下 順便看了下文件~


~~~py
import obspy
from obspy.clients.fdsn import Client
from obspy import UTCDateTime

client = Client("IRIS")
t = UTCDateTime("2022-09-18 06:44:14")
[sbef, saft] = [0, 1800]
st = client.get_waveforms("IU", "MAJO", "10", "BH*", t - sbef, t + saft)
st.plot( linewidth=0.75, equl_scale=False)
~~~

- [Client] (from obspy.clients.fdsn import Client){:target="_back"}

   - [FDSN Web Service](https://www.fdsn.org/webservices/){:target="_back"}
      - `This specification defines RESTful web service interfaces for accessing common FDSN data types. This specification serves as a baseline level of compatibility allowing data request tools to work with any FDSN data center implementing these services.`


## 輸入時間

- 台灣主震時間 `今（18）日下午14時44分台東又發生芮氏規模6.8地震`
- UTC 時間
   - 2022-09-18 06:44:14


## Reference

- [ObsPy](https://docs.obspy.org/){:target="_back"}
- [twitter: Dr. Steven J. Gibbons](https://twitter.com/stevenjgibbons){:target="_back"}