---
layout: "single"
title: " HackerRank: String- Alternating Characters"
permalink: 'code-practice/hackerrank-string-alternating characters'
tags: 紮馬步 hackerrank
---


## [String: Alternating Characters](https://www.hackerrank.com/challenges/alternating-characters/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=strings){:target='_back'}

> 偷懶一陣子了唷~ XDD 

> 自我懶惰隔離 結束摟!! 該好好繼續蹲馬步惹~ XDD


- python

~~~py
# Complete the alternatingCharacters function below.
def alternatingCharacters(s):
    pre = ''
    dele = 0
    for i in range(len(s)):
        if pre is not s[i]:
            pre = s[i]
        else:
            dele = dele + 1
        
    return dele
~~~


- javascript

~~~js
// Complete the alternatingCharacters function below.
function alternatingCharacters(s) {
    let pre = ''
    let del = 0
    for (let i = 0; i< s.length; i ++) {
        if ( pre != s[i]) {
            pre = s[i]
        } else {
            del += 1
        }
    }
    return del

}
~~~