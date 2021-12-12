---
layout: "single"
title: " HackerRank: Hash Tables- Ransom Note "
permalink: 'code-practice/hackerrank-ransom-note'
tags: 紮馬步 hackerrank
---

> 2020 第一天

![Imgur](https://i.imgur.com/r6qbe1a.jpg)

> 感動自己的堅持阿!!! 
 
> 新的一年 一定很美麗~~~~~~ :heart: :blush: :grinning: :sunny: :gift_heart: :rocket: :fireworks:

## [Hash Tables: Ransom Note](https://www.hackerrank.com/challenges/ctci-ransom-note/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps){:target='_back'}

- ![Imgur](https://i.imgur.com/glvGMEF.jpg)

- python

   - [https://thispointer.com/python-how-to-check-if-a-key-exists-in-dictionary/](https://thispointer.com/python-how-to-check-if-a-key-exists-in-dictionary/){:target="_back"}

~~~py
# Complete the checkMagazine function below.
def checkMagazine(magazine, note):
    dict_m = {}
    yes_or_No = 'Yes'
    for word in magazine:
        # if dict_m has key word and not care of the value is None or not
        if dict_m.get(word, -1) != -1:
            dict_m[word] += 1 
        else:
            dict_m[word] = 1
    
    for note_word in note:
        if dict_m.get(note_word, -1) != -1 and dict_m.get(note_word) >= 1:
            dict_m[note_word] -= 1
        else:
            yes_or_No = 'No'
    
    print(yes_or_No)
~~~