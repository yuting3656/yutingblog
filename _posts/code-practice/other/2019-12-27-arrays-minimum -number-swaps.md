---
layout: "single"
title: " 紮馬步: Arrays Minimum number swaps "
permalink: 'code-practice/arrays-minimum-number-swaps'
tags: 紮馬步 
---

> 因為 [hackerrank: new year chaos](https://yuting3656.github.io/yutingblog/code-practice/hackerrank-new-year-chaos){:target="_back"} 的緣故，來入坑一下~~ XDD

## Minimum number swaps

<iframe src="https://www.youtube.com/embed/f7IIW0HVUcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- 寫了一版，從頭套尾自己腦袋瓜生成的兒~ 感動

~~~py
def min_swaps(arr):
    counter = 0
    length = len(arr) + 1
    arr_dict = {}
    for current_position, arr_value in enumerate(arr, start=1):
        # 要把 value 猜到 key 數值裡面這樣下面找原始位址時候才方便
        arr_dict[arr_value] = current_position

    checked = [False] * length
    for arr_value_from_dict, arr_position_from_dict in arr_dict.items():
        if checked[arr_value_from_dict] or arr_value_from_dict == arr_position_from_dict:
            continue
        cycle_count = 0
        wanted_value = arr_value_from_dict
        while not checked[wanted_value]:
            checked[wanted_value] = True
            get_original_position = arr_dict[wanted_value]
            wanted_value = get_original_position
            cycle_count += 1
        counter += cycle_count -1
    return counter

if __name__ == "__main__":
    arr = [1, 3, 2, 5, 6, 7, 4]
    result = min_swaps(arr)
    print(result)

~~~