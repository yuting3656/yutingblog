---
layout: "single"
title: " HackerRank: Bubble Sort "
permalink: 'code-practice/hackerrank-two-strings'
tags: 紮馬步 hackerrank
---


## [Sorting: Bubble Sort](https://www.hackerrank.com/challenges/ctci-bubble-sort/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=sorting){:target='_back'}


:sunny::sunny::sunny::sunny::sunny::sunny:
![Imgur](https://i.imgur.com/jOZG6wH.jpg)

> 朝著夢想 & 計畫前進 GOGO~~~

- python

   - [Bubble Sort: GeeksforGeeks](https://www.youtube.com/watch?v=nmhjrI-aW5o){:target="_back"}

   - [https://www.w3resource.com/python-exercises/data-structures-and-algorithms/python-search-and-sorting-exercise-4.php](https://www.w3resource.com/python-exercises/data-structures-and-algorithms/python-search-and-sorting-exercise-4.php){:target="_back"}

~~~py
# Complete the countSwaps function below.
def countSwaps(a):
    swaps = 0
    for check_range in range(len(a)-1, 0, -1):
        for i in range(check_range):
            if a[i] > a[i + 1]:
                tmp = a[i]
                a[i] = a[i + 1]
                a[i +1] = tmp
                swaps += 1

    print("Array is sorted in {} swaps.".format(swaps))
    print("First Element: {}".format(a[0]))
    print("Last Element: {}".format(a[-1]))
~~~


- javascript 

~~~js
// Complete the countSwaps function below.
function countSwaps(a) {
    let swaps = 0;
    for (let i = 0; i < a.length; i ++) {
        for (let j =0; j < a.length - i; j ++){
            if (a[j] > a[j +1]){
                let tmp;
                tmp = a[j]
                a[j] = a[j+1]
                a[j+1] = tmp
                swaps ++;
            }
        }
    }
    console.log(`Array is sorted in ${swaps} swaps.`)
    console.log(`First Element: ${a[0]}`)
    console.log(`Last Element: ${a[a.length - 1]}`)
}
~~~