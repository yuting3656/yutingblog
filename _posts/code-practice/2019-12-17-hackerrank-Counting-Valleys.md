---
layout: "post"
title: " HackerRank: Counting Valleys "
permalink: 'code-practice/hackerrank-counting-valleys'
tags: 紮馬步
---


## [Counting Valleys](https://www.hackerrank.com/challenges/counting-valleys/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup){:target="_back"}


- 真心覺得要練佛~ 靜下來 XDDD 好好思考!!!
   - |![Imgur](https://i.imgur.com/DfEUQDh.gif)|
   - 我用最熟悉的方法，手寫 flow chart 來幫助思考 :heart:
   - |![Imgur](https://i.imgur.com/df5DBpZ.jpg)|


- python

~~~py
# Complete the countingValleys function below.
def countingValleys(n, s):
    valley_deep = 0
    valley_count = 0
    # s: seal level, m: mountain, v: valley
    current_position = 's' 

    for step in s:
        if step == 'D':
            valley_deep -= 1

            if valley_deep == 0:
                current_position = 's'
            
            if valley_deep > 0:
                current_position = 'm'

            if current_position != 'v' and valley_deep < 0:
                current_position = 'v'
                valley_count += 1 
        elif step == 'U':

            valley_deep += 1

            if valley_deep == 0:
                current_position = 's'
            
            if valley_deep > 0:
                current_position = 'm'

            if current_position != 'v' and valley_deep < 0:
                current_position = 'v'
                valley_count += 1 

    return valley_count
~~~