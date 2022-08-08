---
layout: "single"
title: 'daily Programming: BIG O'
permalink: 'daily-programming/time-complexity-big-o'
tags: daily-programming 紮馬步 big-o time-complexity
---

> Big O time is the language and metric we use to describe the efficiency of algorithms. Not understanding it thoroughly can really hurt you in developing an algorithm. Not only might you be hudged harshly for not really understanding big O, but you will also struggle to judge when your alogorithm is getting gaster or slower.
>
>
> Gayle Laakmann McDowell, [Cracking the Coding Interview, 6th Edition 189 Programming Questions and Solutions](http://www.crackingthecodinginterview.com/){:target="_back"}


__開~ 紮馬步__，紮了一整個禮拜

還是要好好面對著個 XDD 之前工作的時候都自動忽略 (我不是本科系的拉~ 沒差~拉......)


## Time Complexity 


- Electronic Transfer: __O(s)__

   - s 指檔案大小，檔案越大，傳輸時間越長


- Airplane Transfer: __O(1)__

   - 有考慮慮到檔案大小，但時間是固定的 __不會__ 因為檔案越大時間越長


|![Imgur](https://i.imgur.com/518yUG6h.jpg)|

[時間複雜度分析](https://www.scaler.com/topics/data-structures/time-complexity-in-data-structure/)

## Best Case, Worst Case, and Expected Case

- 書用 quickSort 來當解釋範例

   - [比基準值小的數] __基準值 (pivot)__ [比基準值大的數]


__Best Case__

   - 整個array的數值都一樣，只會花上 O(N) 的時間，整個array只會刷一次~~ YA~~ (你以為可以天天過年這麼好運? XDD)


__Worst Case__

   - 帶賽狀態，每次隨機挑都挑到最大 XDD，就會花上 O(N*N) 的時間，哭哭~~~ :scream: (實際上蠻常帶賽的 XDD)

__Expected Case__

   - 正所謂中庸之道~ 行走江湖就是要看得開~ 通常來說不會遇到最極端的兩個情況，預期所執行的時間就會是 O(N log N)


## Space Complexity

- Space complexity is a parallel concept to time complexity.

   - O(n): create an array of size n

   - O(n*n): two-dimentional array of size n x n

- Take O(n) time and O(n) space

   - Recursive calls

    ~~~~java 
       int sum(int n){
          if (n <= 0) {
             return 0;
          }
          return n + sum(n-1);
       }
    ~~~~


    - Each call adds a level to the stack

     ~~~js
      sum(4)
        -> sum(3)
          -> sum(2)
            -> sum(1)
              -> sum(0)
     ~~~

- O(n) time and O(1) space

~~~java 
int pairSumSequence(int n) {
   int sum = 0;
   for (int i = 0; i < n; i++) {
       sum += pairSum(i, i + 1);
   }
   return sum;
}

int pairSum(int a, int b) {
   return a + b;
}
~~~
