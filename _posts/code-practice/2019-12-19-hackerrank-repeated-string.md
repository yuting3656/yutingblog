---
layout: "post"
title: " HackerRank: Repeated String "
permalink: 'code-practice/hackerrank-repeated-string'
tags: 紮馬步
---

## [Repeated String](https://www.hackerrank.com/challenges/repeated-string/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup){:target='_back'}

- ![Imgur](https://i.imgur.com/1vJpczJ.gif)

- python

   - 先說我這解法會出包 XDD
   - memory 爆炸!


~~~py
# Complete the repeatedString function below.
def repeatedString(s, n):
    # repeate the s 到最小長度 len(s) 剛剛 超過 n 就好
    repeate_s = s * (int(n/len(s) + 1))
    # trim 到剛好的長度
    repeate_s = repeate_s[:n]
    result = repeate_s.count('a')
    return result
    
~~~

   - |![Imgur](https://i.imgur.com/8nbxQk5.jpg)|![Imgur](https://i.imgur.com/q1IA03g.gif)|


- 多看、多學、多聽、多謙卑

   - 如果沒記錯的話，之前掃 Angular 2019 年會活動照片
   <br/>
   有看到一個很像 workshop brainstorm 的 [海報](https://www.facebook.com/photo.php?fbid=3486860874659122&set=oa.2849174228426262&type=3&theater&ifg=1){:target="_back"} 裡面有一句話我超級認同&共鳴!

      - > 多看別人的 coce

    - 非本科系出生的兒~ 就是要多學、多看、多聽、多謙卑阿~~~

    - 好扯多了~~ XDD


- 知識分享好棒棒

<iframe src="https://www.youtube.com/embed/1fqNjZ1Gsxs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 全新學習後的成果

- pyhton

~~~py
# Complete the repeatedString function below.
def repeatedString(s, n):
    intact_s = n // len(s)
    remain_s = n % len(s)
    count_a = s.count('a')
    if remain_s != 0:
        return intact_s * count_a + (s[:remain_s]).count('a')
    else:
        return intact_s * count_a
~~~

- javascript 

   - [Match](https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string){:target="_back"}
   - [slicke & substr](https://stackoverflow.com/questions/2243824/what-is-the-difference-between-string-slice-and-string-substring){:target="_back"}

~~~js
// Complete the repeatedString function below.
function repeatedString(s, n) {
    let intact_s = Math.floor(n/(s.length))
    let remain_s = n % (s.length)
    let count_a = s.match(/a/g).length
    if (remain_s !== 0) {
        let left_s = s.substring(0, remain_s)
        let left_a_count = (left_s.match(/a/g) || []).length
        return (intact_s * count_a + left_a_count)
    } else {
        return intact_s * count_a
    }
}
~~~
