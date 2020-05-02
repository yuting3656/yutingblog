---
layout: 'post'
title: 'daily Programming: javascript json for life'
permalink: 'daily-programming/javascript-json-for-life'
tags: daily-programming javascript
---

> 靜下來 你就會浮起來
> 
> 蹲馬步吧 :dog::dog::dog: :beer::beer::beer:



## [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce){:target="_backd"}

> The `reduce()` method executes a __reducer__ function (that you provide) on each element of the array, resulting in a single output value.

- The reducer function takes four arguments:

   - Accumulator (acc)
   - Current Value (cur)
   - Current Index (idx)
   - Source Array (src)

   > Your reducer function's returned value is assigned to the accumulator, whose value is remembered across each iteration throughout the array, and ultimately becomes the final, single resulting value.

- Syntax

   > `arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])`

- Parameters

   - callback
      - A function to execute on each element in the array (except for the first, if no initialValue is supplied).

      - It takes __four__ arguments:

        1. __accumulator__
           * The accumulator accumulates callback's return values. It is the accumulated value previously returned in the last invocation of the callback—or initialValue, if it was supplied (see below).

        2. __currentValue__
           * The current element being processed in the array.
         
        3. __index `(Optional)`__
           * The index of the current element being processed in the array. Starts from index 0 if an initialValue is provided. Otherwise, it starts from index 1.

        4. __array `(Optional)`__
           * The array reduce() was called upon.

      - initialValue `(Optional)`
         * A value to use as the first argument to the first call of the callback. If no initialValue is supplied, the first element in the array will be used as the initial accumulator value and skipped as currentValue. Calling reduce() on an empty array without an initialValue will throw a TypeError.

- MDN

   ~~~js
   const array1 = [1, 2, 3, 4];
   const reducer = (accumulator, currentValue) => accumulator + currentValue;
   
   // 1 + 2 + 3 + 4
   console.log(array1.reduce(reducer));
   // expected output: 10
   
   // 5 + 1 + 2 + 3 + 4
   console.log(array1.reduce(reducer, 5));
   // expected output: 15
   ~~~

- YoutTube: Array Reduce

<iframe  src="https://www.youtube.com/embed/g1C40tDP0Bk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- [example: freeCodeCamp](https://www.freecodecamp.org/news/reduce-f47a7da511a9/){:target="_back"} 

~~~js
const data = [
  {a: 'happy', b: 'robin', c: ['blue','green']}, 
  {a: 'tired', b: 'panther', c: ['green','black','orange','blue']}, 
  {a: 'sad', b: 'goldfish', c: ['green','red']}
];

const colors = data.reduce((total, amount) => {
  amount.c.forEach( color => {
      total.push(color);
  })
  return total;
}, [])

colors //['blue','green','green','black','orange','blue','green','red']
~~~


## using useState in Form

- 獨立建出來

~~~js
import React, { useState } from "react";
export const useForm = (initialValues) => {
    const [ values, setValues ] = useState(initialValues)
    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
}
~~~


## Moment with time zone

- `npm install moment moment-timezone`

~~~js

import moment from 'moment-timezone'

const onDatePicker = (date, dateString, name) => {
  const time  =  moment.tz(dateString , "Asia/Taipei").format()
  const obj = { target: { "name": name, "value": time  } }
  setWorkOrderForm(obj)
}

<Form.Item label="完工時間 END_TIME">
  <DatePicker
     name="end_time"
     onChange={(date, dateString) => onDatePicker(date, dateString, "end_time")} 
     showTime={true}
     />
</Form.Item>
~~~


