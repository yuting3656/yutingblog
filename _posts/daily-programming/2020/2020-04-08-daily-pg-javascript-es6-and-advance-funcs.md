---
layout: "single"
title: 'daily Programming: js adv. func and es6'
permalink: 'daily-programming/javascript-adv-func-es6'
tags: daily-programming javascript
---


## Array.from

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from){:target="_back"}

~~~js
// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]


// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
~~~

## Object to Array

- [reference](https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript){:target="_back"}


~~~js
var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
var result = Object.keys(obj).map(function(key) {
  return [Number(key), obj[key]];
});
~~~