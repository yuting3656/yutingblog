---
layout: "single"
title: " HackerRank: Jumping on the Clouds "
permalink: 'code-practice/hackerrank-jumping-on-the-cluds'
tags: 紮馬步 hackerrank
---

## [Jumping on the Clouds](https://www.hackerrank.com/challenges/jumping-on-the-clouds/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup){:target="_back"}

> 連續第三天 真的有進步 哈哈 ，過去五個月玩AI 都直接剪貼東西XDD 真的沒好好動腦 XDDD

- ![Imgur](https://i.imgur.com/rjpJOvh.gif)

- ![Imgur](https://i.imgur.com/b9j9Nwz.jpg)

- python

~~~py
# Complete the jumpingOnClouds function below.
def jumpingOnClouds(c):
    clounds = len(c)
    step = 0
    i = 0

    while i < clounds-1:
        if i+2 == clounds or c[i+2] == 1 :
            i += 1
            step += 1
        else:
            i +=2
            step += 1

    return step
~~~

- js

~~~js
// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
    let steps = 0;
    let i = 0;
    while ( i < c.length -1) {
       if (i+2 == c.length || c[i+2] == 1) {
          steps ++;
          i ++; 
       } else {
          i += 2;
          steps ++;
       }
    }
    return steps
}
~~~

