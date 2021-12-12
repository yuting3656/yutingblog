---
layout: "single"
title: " HackerRank: 2D Array DS "
permalink: 'code-practice/hackerrank-2d-array'
tags: 紮馬步 hackerrank
---

## [2D Array - DS](https://www.hackerrank.com/challenges/2d-array/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays){:target='_back'}

- ![Imgur](https://i.imgur.com/zWRS7l8.gif)
- ![Imgur](https://i.imgur.com/pIGwFrb.jpg)l

> 水唷! 越來越有FU~

- python 

~~~py
# Complete the hourglassSum function below.
def hourglassSum(arr):
    num_sum_dict = {}
    for nr in range(0, 4):
        for nc in range(0, 4):
            num_sum_dict['{}{}'.format(str(nr), str(nc))] = \
                arr[nr][nc] + arr[nr][nc+1] + arr[nr][nc+2]\
                            + arr[nr+1][nc+1] \
            + arr[nr+2][nc] + arr[nr+2][nc+1] + arr[nr+2][nc+2]
    return max(num_sum_dict.values())
~~~

- javascript

   - [https://stackoverflow.com/questions/33043562/javascript-find-max-and-min-values-using-loop-and-array-infinity-infinity](https://stackoverflow.com/questions/33043562/javascript-find-max-and-min-values-using-loop-and-array-infinity-infinity){:target="_back"}

~~~js
// Complete the hourglassSum function below.
function hourglassSum(arr) {
   let maxValue =  -Infinity;
   for (let nr = 0 ; nr <=3; nr++){
       for (let nc=0; nc <=3; nc++){
           let ncnrValue = arr[nr][nc] + arr[nr][nc+1] + arr[nr][nc+2]
                            + arr[nr+1][nc+1] 
            + arr[nr+2][nc] + arr[nr+2][nc+1] + arr[nr+2][nc+2];

            if (maxValue <= ncnrValue) {
               maxValue = ncnrValue
           }
       }
   }
   return maxValue
}
~~~