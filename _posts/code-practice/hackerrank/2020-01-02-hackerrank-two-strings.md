---
layout: "post"
title: " HackerRank: Two Strings "
permalink: 'code-practice/hackerrank-two-strings'
tags: 紮馬步 hackerrank
---


## [Two Strings](https://www.hackerrank.com/challenges/two-strings/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps){:target='_back'}


- ![Imgur](https://i.imgur.com/ssj2XhD.jpg)


- python

~~~py
# Complete the twoStrings function below.
def twoStrings(s1, s2):
    yes_or_no = 'NO'
    string_dict = {}
    for i in s1:
        string_dict[i] = 1
    
    for i_2 in s2:
        if string_dict.get(i_2, -1) != -1:
            yes_or_no = 'YES'
            return yes_or_no
        else:
            continue
    
    return yes_or_no
~~~



- javascript 

   - [https://stackoverflow.com/questions/1966476/how-can-i-process-each-letter-of-text-using-javascript](https://stackoverflow.com/questions/1966476/how-can-i-process-each-letter-of-text-using-javascript){:target="_back"}


~~~js
// Complete the twoStrings function below.
function twoStrings(s1, s2) {
    let checkStringObj = {}
    let yesOrNo = 'NO'
    for (let i = 0; i < s1.length; i++) {
         checkStringObj[s1.charAt(i)] = 1
    };

    for (let i =0; i < s2.length; i++) {
        if (checkStringObj[s2.charAt(i)] != undefined) {
            yesOrNo = 'YES'
            return yesOrNo;
        } else {
            continue;
        }
    }
    return yesOrNo;
}
~~~