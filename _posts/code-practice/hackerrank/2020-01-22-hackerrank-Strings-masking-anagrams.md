---
layout: "post"
title: " HackerRank: String- Making Anagrams"
permalink: 'code-practice/hackerrank-string-making-anagrams'
tags: 紮馬步 hackerrank
---


## [String: Making Anagrams](https://www.hackerrank.com/challenges/ctci-making-anagrams/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=strings){:target='_back'}

![Imgur](https://i.imgur.com/g0nYjtv.jpg)

- python 

   - 一早醒來就想到要來練習 XD
   - 寫得醜醜的 但是有過 XDDD
      - 開兩個 `dict`
      - 開一個 delete_count 紀錄刪除幾次
      - 把 2 個 string 都掃進去 dict 裡面:
         - `key`: 英文字母
         - `value`: 出現的次數
      - 相互比較兩個 dict
         - `key` 有一樣的時候後比出現的次數: `value` 
            - 不一樣: 抓出來差異 +delete_count ，__只做一次__
         - `key` 不一樣(a有b沒有 or b有a沒有) 的時候 +delete_count

~~~python
# Complete the makeAnagram function below.
def makeAnagram(a, b):
    checker_b = {}
    checker_a = {}
    delete_count = 0
    for i in range(len(a)):
        if checker_a.get(a[i], -1) != -1:
            checker_a[a[i]] += 1
        else:
            checker_a[a[i]] = 1

    for i in range(len(b)):
        if checker_b.get(b[i], -1) != -1:
            checker_b[b[i]] += 1
        else:
            checker_b[b[i]] = 1

    for key, value in checker_b.items():
        if checker_a.get(key, -1) != -1:
            # has same value but count num not equal
            if checker_b[key] != checker_a[key]: 
                delete_count += abs(checker_b[key] - checker_a[key])
        else:
            delete_count += checker_b[key]

    for key, value in checker_a.items():
        if checker_b.get(key, -1) != -1:
            pass
        else:
            # char only in a 
            delete_count += checker_a[key]

    return delet_count
~~~


- javaScript 

   - [https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object](https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object){:target="_back"}


~~~js
// Complete the makeAnagram function below.
function makeAnagram(a, b) {
    let aObj = {}
    let bObj = {}
    let deletCount = 0

    for (let i = 0; i < a.length; i ++) {
        let key = a.charAt(i)
         if (aObj[key] === undefined ){
             aObj[key] = 1
         } else {
             aObj[key] ++
         }
    }

    for (let i = 0; i < b.length; i ++) {
        let key = b.charAt(i)
         if (bObj[key] === undefined ){
             bObj[key] = 1
         } else {
             bObj[key] ++
         }
    }

    for ( let key of Object.keys(aObj) ){
        console.log(key)
    }

    Object.entries(aObj).forEach(([k, v]) => {
        if (bObj[k] != undefined ){
           if (bObj[k] != v) {
               deletCount += Math.abs(bObj[k] - v)
           }
        } else {
            deletCount += v
        }
    })

    Object.entries(bObj).forEach(([k, v]) => {
        if (aObj[k] === undefined ){
           deletCount += v
        }
    })
    return deletCount
}
~~~