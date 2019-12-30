---
layout: "post"
title: " HackerRank: Array Manipulation"
permalink: 'code-practice/hackerrank-array-mainpulation'
tags: 紮馬步 hackerrank
---


## [Array Mainpulation](https://www.hackerrank.com/challenges/crush/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays){:target='_back'}


![Imgur](https://i.imgur.com/GQWR74j.jpg)

- python

   - 沒過時間複雜度 TAT!!!

~~~py
# Complete the arrayManipulation function below.
def arrayManipulation(n, queries):
    # n:
    #   3 ~ 10^7  lol......
    base = [0] * n

    # queries:
    #      1 ~ 2 * 10^5   lol....
    for q_list in queries:
        start = q_list[0] - 1
        end = q_list[1] 
        operator = q_list[2]

        base[start: end] = [ i + operator for i in base[start: end] ]

    return max(base)
~~~