---
layout: "single"
title: " HackerRank: Minimum Swaps 2 "
permalink: 'code-practice/hackerrank-minimum-swaps-2'
tags: 紮馬步 hackerrank
---

> 正所謂機會是給準備好的人XDD 

> 一看題目，心想阿不就是上禮拜自己去找網路上好心的叔叔伯伯哥哥姐姐阿姨學來的 XDDDFD

- [我的筆記](https://yuting3656.github.io/yutingblog/code-practice/arrays-minimum-number-swaps){:target="_back"}

## [Minimum Swaps 2](https://www.hackerrank.com/challenges/minimum-swaps-2/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays){:target='_back'}

- ![Imgur](https://i.imgur.com/t5Cb39C.jpg)

- ![Imgur](https://i.imgur.com/SzvVlPl.jpg)


- python

~~~python
# Complete the minimumSwaps function below.
def minimumSwaps(arr):
    arr_dict = {}
    counter = 0
    # the arr start from 1
    length = len(arr) + 1
    # looping checker
    checker = [False] * length
    for i, value in enumerate(arr, start=1):
        # set value as key, so we can access the index of the key latter  
        arr_dict[value] = i
    
    for value_arr, original_idex_arr in arr_dict.items():
        if checker[value_arr] or value_arr == original_idex_arr:
            continue

        cycle_checker = 0
        wanted_index = value_arr
        
        while not checker[wanted_index]:
            checker[wanted_index] = True
            wanted_index = arr_dict[wanted_index]
            cycle_checker += 1
        counter += cycle_checker -1

    return counter
~~~



- javascript 

   - [https://stackoverflow.com/questions/9848662/javascript-how-to-define-an-array-of-booleans-with-60-elements-in-it](https://stackoverflow.com/questions/9848662/javascript-how-to-define-an-array-of-booleans-with-60-elements-in-it){:target="_back"}

~~~js
// Complete the minimumSwaps function below.
function minimumSwaps(arr) {

    let arrObject = {}
    let counter = 0
    let arr_len = arr.length + 1
    let checker = new Array(arr_len)

    // making arr_len false array
    for (let c = 0; c < checker.length; c ++) {
       checker[c] = false;
    }
    
    // making arr dict wiht index 
    for (let i = 0; i < arr.length; i ++) {
        let arr_value = arr[i]
        arrObject[arr_value] = i + 1; // start from 1
    }
    
    for ( const [ arr_value , arr_index] of Object.entries(arrObject)){
        if (checker[arr_value] || arr_value === arr_index) {
            continue;
        }

        let cycle_checker = 0
        let wanted_index  = arr_value
        while (! checker[wanted_index]) {
            checker[wanted_index] = true;
            wanted_index = arrObject[wanted_index]
            cycle_checker += 1
        }
        counter += cycle_checker -1
    }
    return counter 

}
~~~