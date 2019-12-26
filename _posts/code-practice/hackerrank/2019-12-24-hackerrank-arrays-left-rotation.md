---
layout: "post"
title: " HackerRank: Arrays Left rotation "
permalink: 'code-practice/hackerrank-left-rotation'
tags: 紮馬步 hackerrank
---


## [Arrays Left rotation](https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays){:target='_back'}

> 哈哈哈 這題之前在 [codility](https://www.codility.com/){:="target="_back""} 有玩過~ python 速解!


- ![Imgur](https://i.imgur.com/d5Xg820.gif)


- python

   - [python: rotate()](https://pythontic.com/containers/deque/rotate){:target="_back"}

~~~py
import collections
# Complete the rotLeft function below.
def rotLeft(a, d):
    qu = collections.deque(a)
    qu.rotate(-d)
    return qu
~~~


- javascript

   - 現學現賣，這個執行時間 應該是 O(n) XDD 應該吧....

   - ![Imgur](https://i.imgur.com/KKhlDoq.jpg)

~~~js
// Complete the rotLeft function below.
function rotLeft(a, d) {
    let leading_arr = []
    let rotated_arr = []
    for ( let i = 0; i < a.length; i++ ) {
        // leading
        if (i < d) {
           leading_arr.push(a[i])
        }
        else if /** rear_ar **/ (i >= d) {
          rotated_arr.push(a[i])
        }
    }
    rotated_arr.push(...leading_arr)
    return rotated_arr
}
~~~