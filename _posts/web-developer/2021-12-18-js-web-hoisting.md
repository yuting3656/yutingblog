---
layout: "single"
title: '挖賽! 我可能只是個打雜的！Hoisting'
permalink: 'web-developer/not-a-web-developer-hoisting'
tags: js web-developer hoisting
---


 > [If you cannot explain these concepts to another programmer, then you are not a Web Developer](https://mobile.twitter.com/sleeplessyogi/status/1446997406294417411?fbclid=IwAR12DxifX6OG3uem335gbK8WRvn717-xwF_01WXjrimPPq4oG0FsMwFRuYA){:target="_backs"}

> 開票看歸看!
>
> 力宏歸力宏!
>
> 該做的事還是要堅持阿!!
>
> GO GO GO!
> 
> :heart::heart::heart::heart::heart: 

# [Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting){:target="_back"}

>> MDN:
>
> JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of `functions`, `variables` or `classes` to the **top** of their scope, prior to execution of the code.


### Function hoisting

- One of the advantages of hoisting is that it lets you use a function before you declare it in your code. 

```js
yutingGoGo('ya~');

function yutingGoGo(words) {
    console.log("yuting say: " + words);
    // yuting say: ya~
}
```

```js
function yutingGoGo(words) {
    console.log("yuting say: " + words);
    // yuting say: ya~
}

yutingGoGo('ya~');
```

### Variable hoisting

- However JavaScript only hoists declarations, not initializations! This means that initialization doesn't happen until the associated line of code is executed, even if the variable was originally initialized then declared, or declared and initialized in the same line.

- Until that point in the execution is reached the variable has its default initialization (`undefined` for a variable declared using `var`, otherwise `uninitialized`).

```js
console.log(tim); // return undefined (from var declaration)
var tim; // declaration
tim = 'yuting'; // initialization
console.log(tim); // return yuting
```

```js
console.log(tim); // return undefined (from var declaration)
var tim = 'yuting'; // declaration and initialization
console.log(tim); // return yuting
```

- If we forget the declaration altogether (and only initialize the value) the variable isn't hoisted. Trying to read the variable before it is initialized results in **ReferenceError** exception.

```js
console.log(fourNos);
// Uncaught ReferenceError: a is not defined
//   at <anonymous>:1:13
fourNos = '4 nos';
```

- **let** and **const** hoisting

   - Variables declared with let and const are also hoisted but, unlike var, are not initialized with a default value. An exception will be thrown if a variable declared with let or const is read before it is initialized.

```js
console.log(noNoNoNo);
//  Uncaught ReferenceError: noNoNoNo is not defined
//     at <anonymous>:1:13 
let noNoNoNo = '4nos';
```