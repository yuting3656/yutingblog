---
layout: "single"
title: " HackerRank: Equalize the Array "
permalink: 'code-practice/hackerrank-equalize-the-array'
tags: 紮馬步 hackerrank
---


## [Equalize the Array](https://www.hackerrank.com/challenges/equality-in-a-array/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign){:target='_back'}


- ![Imgur](https://i.imgur.com/9cPOmvO.gif)

- 慢慢養把 pseudocode 的fu 找回來~ 紙本手寫是我最愛的好夥伴:herat:

- ![Imgur](https://i.imgur.com/QtZXbnp.jpg)


- python

   - [python: max()](https://docs.python.org/3/library/functions.html#max){:target="_back"}
   - [https://stackoverflow.com/questions/6987285/python-find-the-item-with-maximum-occurrences-in-a-list](https://stackoverflow.com/questions/6987285/python-find-the-item-with-maximum-occurrences-in-a-list){:target="_back"}

~~~py
def equalizeArray(arr):
    max_num = max(arr, key=arr.count)
    delection_count = 0
    for item in arr:
        if item != max_num:
            delection_count += 1
    return delection_count
~~~


- javascript 

   - 拉屎完後認真想 有沒有辦法只做一次 loop 來解
   - [https://medium.com/@AmJustSam/how-to-find-most-frequent-item-of-an-array-12015df68c65](https://medium.com/@AmJustSam/how-to-find-most-frequent-item-of-an-array-12015df68c65){:target="_back"}

~~~js
// Complete the equalizeArray function below.
function equalizeArray(arr) {
    let counter_dict = {};
    let most_occur_num = - Infinity;
    let mini_del = -Infinity;
    for (let i=0; i <= arr.length; i ++ ) {
        let el = arr[i];
        if (counter_dict[el] === undefined) {
            counter_dict[el] = 1;
        } else {
            counter_dict[el] += 1;
        };
        if (most_occur_num < counter_dict[el]) {
                most_occur_num = counter_dict[el]
                mini_del = arr.length - most_occur_num
        }
    }
    return mini_del;
}
~~~