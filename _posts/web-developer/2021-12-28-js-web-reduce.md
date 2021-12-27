---
layout: "single"
title: '挖賽! 我可能只是個打雜的！Reduce'
permalink: 'web-developer/not-a-web-developer-reduce'
tags: js web-developer reduce
---

 > [If you cannot explain these concepts to another programmer, then you are not a Web Developer](https://mobile.twitter.com/sleeplessyogi/status/1446997406294417411?fbclid=IwAR12DxifX6OG3uem335gbK8WRvn717-xwF_01WXjrimPPq4oG0FsMwFRuYA){:target="_backs"}

 > 剛剛歡送 2021 最後星期一 :blush:
 >
 > 現在來 認真渣馬步啦!
 >
 > 在 2021 最後星期二的凌晨
 >
 > 認真一下 :heart::heart::heart: 哈哈哈! 


# [Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce){:target="_back"}

 > Ha! 工作上我還用蠻多的  :)

> MDN: 
>
> The **reduce()** method executes a user-supplied “reducer” callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

> The first time that the callback is run there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise array element 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).


~~~js
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
~~~



### 大新竹計畫 XD


~~~js
 const cityCombination1 = [ '新竹市', '新竹縣', '苗栗縣']
 const cityCombination2 = [ '新竹市', '新竹縣']

const bigHsinchuProject = (pre, current) => {
   if (pre === 1450 && current.includes('新竹')) {
     return 1450
   } else {
     return '你沒有台灣價值'
   }
}

const result1 = cityCombination1.reduce(bigHsinchuProject, 1450)
const result2 = cityCombination2.reduce(bigHsinchuProject, 1450)

console.log("cityCombination1 [ '新竹市', '新竹縣', '苗栗縣']:", result1)
console.log("cityCombination2 [ '新竹市', '新竹縣']:", result2)
 ~~~