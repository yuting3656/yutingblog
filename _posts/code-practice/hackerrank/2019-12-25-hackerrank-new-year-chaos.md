---
layout: "single"
title: " HackerRank: New Year Chaos "
permalink: 'code-practice/hackerrank-new-year-chaos'
tags: 紮馬步 hackerrank
---

> 寫到這題超級應景阿~~~ Happy New Year~~ HAHAHA! 

![Imgur](https://i.imgur.com/clcqZeg.gif)

## [New Year Chaos](https://www.hackerrank.com/challenges/new-year-chaos/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays){:target='_back'}

- ![Imgur](https://i.imgur.com/sKT3kqS.jpg)

- ![Imgur](https://i.imgur.com/SH3pglP.jpg)


- python

   - ![Imgur](https://i.imgur.com/HTQW6uJ.jpg)
   - 這不會過 哭哭~~
   - 我真的只想的到 `Chaotic` 的情況~

~~~py
# Complete the minimumBribes function below.
def minimumBribes(q):
    origin_list = [ i for i in range(1, len(q) +1)]
    move_count = 0
    for i in range(len(q)):
        if q[i] - i > 3 :
            print ('Too chaotic')
            return 
        move_step = origin_list[i] - q[i]
        if move_step > 0:
            move_count += move_step
    print(move_count)
~~~


- 看看高手怎麼解

<iframe src="https://www.youtube.com/embed/LszGnIL3PLQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- python

   - 還是沒有全懂... 但是卡一天了 哈哈哈 XDDD

~~~py
# Complete the minimumBribes function below.
def minimumBribes(q):
    move_count = 0
    for i in range(len(q)):
        if q[i] - i > 3 :
            print ('Too chaotic')
            return 
        
        for j in range(max(0, q[i] - 2), i):
            if q[j] > q[i]:
                move_count +=1
    print(move_count)
~~~