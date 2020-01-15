---
layout: "post"
title: " HackerRank: Mark and Toys "
permalink: 'code-practice/hackerrank-mark-and-toys'
tags: 紮馬步 hackerrank
---


## [Mark and Toys](https://www.hackerrank.com/challenges/mark-and-toys/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=sorting){:target='_back'}


![Imgur](https://i.imgur.com/cpQtfrJ.jpg)

- python

~~~py
# Complete the maximumToys function below.
def maximumToys(prices, k):
    max_unit = 0
    prices.sort()
    for i_price in prices:
        k = k - i_price
        if k >= 0:
            max_unit += 1
        else:
            break
    return max_unit
~~~