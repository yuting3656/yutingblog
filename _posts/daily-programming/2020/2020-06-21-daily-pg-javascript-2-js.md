---
layout: "single"
title: 'daily Programming: 又見 寶哥出品 javascript 品質保證 第二次拉!!'
permalink: 'daily-programming/javascript-core-concepts-and-es6'
tags: daily-programming javascript
---

> 專題完後一天無縫直接再上課看我多棒棒～～

`2020/06/21 又來上拉!`

- [觀念驗證](https://gist.github.com/doggy8088/07c6dde26a42b622e03e90d714b7a502?fbclid=IwAR3UZIcGHVlXd_VPmwpMzguJ90vQuR4z9i8kIa2Hzo4OoWzjwdyFkZh5UHo){:target="_back"}

## 物件、變數與型別

> javascript `物件` 可以指派給一個`變數`並會在`執行時期`擁有形別

- 執行時期
   - 被電腦執行的時候
   - 腦袋裡是執行時期

- 開發時期
   - 在寫code的時候

- 型別
   - 一個物件該有的樣子

- javascript　是弱型別的語言


## 何謂 物件

- 物件
   - 物件就是記憶體中的一個值(資料)
   - in `computer sciene`, an `object` is a `value in memory` which is possibly referenced by an `identifier`(識別符號)

- 名詞解釋
   - computer science 
   - value in memory
   - referenced by an identifier


## Javascript 是 OOP

- 所有的物件都是 __Object Type__ 除了 primitive Type (6個) :

   - Primitive Type
      - number
      - string
      - boolean
      - null
      - undefined 
      - symbol `ES6+`

- Object Type

## 物件型別 Object Type 的基本特性 (擁有屬性)

- Property
   - 任何一個 Javascript 物件只有一種成分: `屬性(Property)`
   - `屬性`的特性和`變數`很像，可以指派`任意資料`給`任意屬性`

- 建立物件
 
   ~~~js
   var car = {};      // 物件 (Object)
   ~~~

- 擴增屬性

   ~~~js
   car.name = "Tesla";
   car.start = function() {
       return "ok";
   }
   ~~~

## javaScript 取得物件屬性資料的方式

- 建立一個物件

   ~~~js
   var car = {
       name: 'Tesla',
       miles: 2000,
       001: 'LogoEntry#1',
       start: function (){
           return "go"
       }    
   }
   ~~~

   - 取用物件的方式
      - car.name
      - car[001]
      - car['001'] 
      - car['start']()
      - 上面兩種呼叫方式，幾乎一樣不會影響效能

   - 有時候會遇到 拿不到東西!?  因為拿不到有效的識別語言
      - car.001  
      - car[001]


## 取得網頁上第一個表單的 DOM 物件


- window.document.forms[0]
 - window['document']['forms']['0']
 - 我取得 window 的物件，有一個 document 的屬性，document 下有一個屬性叫 forms

 - js array 就是一個物件，物件下就只有屬性
    - 在js 中 array 就是 object!!!
    - 
    ~~~js
       var a = [1, 2, 3]
       a['name'] = 'will'
       a 
       [1, 2, 3, name: will]
    ~~~

 - 來了啦! 眼睛 compile!!! :notes::notes::notes:

    - [http://utf-8.jp/public/aaencode.html](http://utf-8.jp/public/aaencode.html){:target="_back"}
    - 這樣呼叫都可以 work

~~~js
window.document.forms['0']
window['document'].forms['0']
window['doc' + 'ument'].forms['0']
window['doc' + 'ument'].forms[ 1 -1]
~~~

javascript 語法非常靈活


- javascript 混淆器

   - [http://utf-8.jp/public/jjencode.html](http://utf-8.jp/public/jjencode.html){:target="_back"}

   - [http://www.jsfuck.com/](http://www.jsfuck.com/){:target="_back"}


## JavaScript 是動態型別語言

- 型別不可以單獨存在

~~~js
var x; // 沒有給值的變數預設為 undefined
x = 5;
var x;
typeof(x); // number
x = "Will"
~~~

- js 的動態型別特性
   - Untyped 無法在`開發時期`宣告性別
   - Weak-typed 只能在`執行時期`檢查型別

- 變數沒有型別，物件有型別

   - 在 js `變數` 只是記憶體位置 沒有型別的概念

## Object, Variable and Type 間的關係

- Object
   - 僅存在於`執行時期`
   - 這裡的物件代表的是一種存在於記憶體中的`資料`

- Variable
   - 只能在開發時期進行宣告(var/let/const 關鍵字)
   - 在執行時期只會用來儲存`物件`的`記憶體位置`(類似指標)

- Type
   - 僅存在於`執行時期`，並用來標示`物件`的種類 (類型)
   - – 不同型別之間可能會有不同的預設`屬性`與`方法`


## Object, Variable and Type (範例)

-  在記憶體中`建立`過幾個`變數`?
-  在記憶體中`出現`過幾個`型別`?
-  在記憶體中`出現`過幾個`物件`?

~~~js
var a ;
a = 1;
a = 'a';
a = 'a' + a;
~~~

- 等號 `(=)` 右邊先執行
   - a = "a" + a

- ANS:
   - 1
   - 3
      - undefined
      - number
      - string
   - 5

### 這段 code 怎麼寫 怎麼 run!!!

- javascript 沒有 callby value 
- javascript 只會傳位置

- ex 1:

~~~js
var a = 1
function test(p) {
   p = 2
}
test(a);
/// ans: a = 1
~~~

- ex 2: (side effect)

~~~js
var a = {'a1': 1, 'a2': 2};
function test(p) {
   p.a1 = 2;
}
test(a);
~~~

## 變數與屬性之間的關係

|__屬性__|__變數__|
|執行時期為主|開發時期為主|
|擁有指標特性|擁有指標特性|
|屬性只會存在於特定物件下屬性可以透過 `delete` 刪除|只有用 var / let / const 宣告的才能算變數變數只存在於當前範圍下，而且`不能刪除`|

- 全域變數: 宣告變數的同時 就會被註冊到跟物件的屬性
   - `變數就是屬性`

## Scoping

- browser 
   - window (根物件)
   -  不在 function 內執行的程式碼　`全域變數`
   -  在 function 內執行　`區域‵變數`

- nodeJs
   - js file 就是一個模組(module)
   - global (根物件)
   - 每個 `模組` 都會擁有一個 `變數` 的 作用域範圍
   - 每個 `函式` 也會擁有一個 `變數` 的 作用域範圍
   - 嚴格來說 Node.js 沒有 __全域變數__ 的概念
      - 但 Node.js 有 global 可用來設定 __類全域變數__

## 執行時期的變數特性

- 變數和屬性的差別

   - 變數宣告後不能被刪除
      - 
        ~~~js
        var a = 1
        window.a // 1
        delete window.a // false
        ~~~
   - 屬性可以
      - 
        ~~~js
        a = 1;
        window.a // 1
        delete window.a // true
        ~~~

## 變數 與 屬性 之間的關係

- 變數

   ~~~js
   var a = 1;
   var b = a; // 幾個物件? 1
   ~~~

- 存取一個不存在的屬性不會出包
   ~~~js
   var a = window.b
   // 會汙染 window.a
   ~~~


- 存取一個不存在的變數會出包

   |![Imgur](https://i.imgur.com/hipgULZ.gif)|

   ~~~js
   var a = b
   // Uncaught ReferenceError: c is not defined
   //  at <anonymous>:1:9
   ~~~


## 變數 與 屬性 之間的關係 (2)

- 請問下程式碼，輸出為何?

~~~js
var a = 1;
window['a'] = 2;
delete window.a;
console.log(a); // 2

b = 2; // 屬性， window 下的屬性
delete b;
console.log(b); // 讀取一個不存在的變數 會報錯
// Uncaught ReferenceError: b is not defined
//    at <anonymous>:1:13
~~~

## 經典題目

- 畢卡葛的藝術

   - ![Imgur](https://i.imgur.com/iprfpOx.jpg)

- 1

   ~~~js
   var a = { 'a1': 1, 'a2': 2};
   var b  = [];
   b.push(a);
   b.push(a);
   b[0]['a1'] = 2;
   
   // b[1]['a1'] = ?
   // ANS: 2
   ~~~

- 2

   ~~~js
   var a = { 'a1': 1, 'a2': 2};
   var b = [];
   b.push(a);
   b[0]['a1'] = 2;
   
   // a['a1] = ?
   // ANS: 2
   ~~~


- 3 

   ~~~js
   var a = {x: 1};
   var b = a;
   a = {x:2};
   
   // b.x ?
   // ANS: 1
   ~~~

   > javascript:  GC 隨時都在跑，會立刻回收如果沒有人參考的時候

- 4 

   ~~~js
   var a = {x: 1};
   var p = a.x;
   p = 2;
   
   // a.x = ?
   // ANS: 1
   ~~~

- 5 

   ~~~js
   var a = {x: 1};
   var b = a;
   a.x = a = {x: 2}; // 把最右邊的東西　"同時" assigement 到左邊
   
   // b.x and a.x ?
   // {x:2} , 2
   ~~~


## ES6 變數與常數

- var

   - Hoisting

      ~~~js

      functin Main() {
         var a = 1;
         if ( a == 1) {
             a = 2;
             var b = a;
         }
         b = 3;
      }

      ////////////////////////////////

      functin Main() {
         var a, b;
         a = 1;
         if ( a == 1) {
             a = 2;
             b = a;
         }
         b = 3;
      }

      ////////////////////////////////

      functin Main() {
         let a = 1;
         if ( a == 1) {
             a = 2;
             let b = a;
         }
         b = 3;
      }
      ~~~

- let

   - 屬於 block scope 且同一範圍不允許重複宣告變數
   -  用 var 宣告過的變數，不能再使用 let 宣告一次
   -  用 let 宣告變數之後才能開始使用 ( 變數特性與 C# 非常類似 )

- const

   - 常數是針對變數 (variable)
   - ![Imgur](https://i.imgur.com/Yb4wliG.gif)

   - 宣告一個唯讀的變數 (變數無法再指向其他物件)
   - 宣告完變數後必須立刻初始化變數 (給予變數預設值)
   - 變數作用域範圍與 let 完全相同 ( block scope )


## 觀念驗證

1.

~~~js
const a = {}
a.name = 'will'

// error or not ?
// no error 
~~~

2. 

~~~js
function f(type) {
   var a = 1;
   if (type == 1) {
      let a = 2;
   }
}
f(2);
~~~

3. 

~~~js
(funciont () {
   let a = 1;
   var test = function() {
      console.log(a);
      let a = 2;
      console.log(a);
   }
   return test()
})
~~~



4. 

~~~js
(function () {
   let matrix = [[], [], []]
   let sum = 0;
   for (let i = 0; i < matrix.length; i ++){
       var currentRow = matrix[i];
       for (var i = 0; i < currentRow.length; i ++) {
         sum += currentRow[i];
       }
   }
})
~~~

5. 

~~~js
(function () { 
   let getCity; 
   let city = "Taiwan"; 
   if (true) { 
      let city = "Seattle";
      getCity = function() { 
         return city; 
         } 
   } 
   return getCity();
   })();
~~~


6. 

~~~js
(function () { for (let i = 0; i < 10 ; i++) { setTimeout(function() { console.log(i); }, 100 * i); } })(); // 0, 1, 2, 3, 4 ... 9
(function () { for (var i = 0; i < 10 ; i++) { setTimeout(function() { console.log(i); }, 100 * i); } })(); // 10 個 10
~~~ 


## Javascript 特性

- Primitive Type

  - string
  - number
  - boolean
  - undefined
  - null 
  - symbol

  - `無法自由擴增屬性`
  - 亂加屬性... 但是不會報錯
  - Primitive Type 不會有屬性
  - Primitive Type (String, number, boolean) 有繼承父類別

- Object Type

   - 原生物件
   - 宿主物件

   - `可以自由擴增屬性`
   
   ~~~js
   delete window.xxx
   // 幾乎都會回傳 true
   // 刪除沒存在的 attribute
   //　除非刪除 variables
   ~~~

- Object.prototype 最上層
   - 所有物件的祖先物件
- window
   - 根物件

- [https://alf.nu/ReturnTrue](https://alf.nu/ReturnTrue){:target="_back"}

## 原始型別 不允許擁有屬性~~~

- Number, string, boolean, null, undefined, symbol

   - 你所用到 Number, string, 等的 屬性都是 原始 prototype 的屬性 用不了

## 物件型別資料下的屬性操作

~~~js
if ('c' in obj) {}
if (typeof(obj) == undefined)  // --> 可能是Bug
~~~

![Imgur](https://i.imgur.com/vXemkSv.gif)


## JavaScript: Primitive Type - number

~~~js
var  = 100;
var = 0100;
var a = new Number(100);
var a = new Number('110a'); // --> NaN
var b = +'10' // 直接轉 number type
~~~

## 數值型別常見的使用技巧


- 使用 `parseInt / parseFloat` 一律加上第 2 個參數
   - `parseInt('070'); // IE8 以下會變成 8 進制`
   - `parseInt('070', 10) // 這個才是建議的寫法！`

-  使用 + 引發型別自動轉換 (自動轉成 number 型別)
   - `var a = +'7';`
   - `var b = +(a);`

-  使用 (N).toString(baseN) 轉換進制
   - `(0xAF).toString(10)`
   - `65535..toString(16)`
- 判斷 NaN 的唯一寫法
   - Number.isNaN(NaN)


- parseInt
  - 從左到右遇到看不懂後面的就忽略
  - ![Imgur](https://i.imgur.com/5IGA0Fe.gif)


- 不要用js　做金錢運算 會不準 精準度有上限值

   - ![Imgur](https://i.imgur.com/lUZzi0D.gif)

- bigInt

   - ![Imgur](https://i.imgur.com/Edkb0UE.gif)

- float

   - ![Imgur](https://i.imgur.com/Xti0C9C.gif)


## 數值型別的 整數運算 特性

- 最大安全整數 = 2^53 (判斷`最大安全整數`非常重要)
   - Number.MAX_SAFE_INTEGER == 2**53-1
   - Number.MAX_SAFE_INTEGER+1
   - Number.MAX_SAFE_INTEGER+2
-  浮點數系統可保存極大數值 (但有精準度問題)
   - Number.MAX_VALUE == 1.7976931348623157e+308
   - Number.MIN_VALUE == 5e-324
- 判斷無限大數值的表示方法
   - var a = 1 / 0;
   - Number.POSITIVE_INFINITY == Infinity
   - Number.NEGATIVE_INFINITY == -Infinity

## 關於 BigInt 型別


- Chrome 67+ / Opera 54+ 開始支援 BigInt 型別 (相容性)

- 基本用法
   - var a = 39837212195743250943287503298475432n
   - var a = BigInt('39837212195743250943287503298475432')
- 錯誤用法
   - BigInt(39837212195743250943287503298475432)
   - BigInt(1.5) // RangeError
   - BigInt('1.5') // SyntaxError
   - 1 + 1n // TypeError: 不能混用型別
   - new BigInt(123) // TypeError: 不能用 new 建立物件

- 比較運算
   - 42n == 42 // true
   - 42n === 42 // false
   - 123 < 124n // true
   - 42n === BigInt(42) // true
   - typeof 42n === 'bigint' // true

- 數學運算
   - const num = BigInt(Number.MAX_SAFE_INTEGER);
   - var a = num + 1n
   - var a = num - 1n
   - var a = num ** 2n
   - var a = num * 1n
   - var a = num / 10n (只取整數)
   - var a = num % 10n

## 數值型別的浮點數運算特性

• 0.1 + 0.2 != 0.3
• 0.2 + 0.4 != 0.6
• 0.3 + 0.6 != 0.9
• 0.4 + 0.8 != 1.2
• 0.123123123123123123123 == 0.123123123123123123124
• Math.ceil(0.1*0.2*100)
• Math.ceil(0.1*0.2*1000)
• Math.ceil(0.1*0.2*10000)
• parseInt(0.000001)
• parseInt(0.0000001) 

## 數值名別處裡浮點數的注意事項

- 自動取整數
   - parseInt(2.99)
   - ~~2.99
- 自動取小數幾位
   - parseInt(2.99 * 10) / 10
   - +(2.999).toFixed(3)
- 四捨五入 (負數超過 0.5 才會進位)
   - Math.round(2.5) == 3
   - Math.round(-2.5) == -2
   - Math.round(-2.51) == -3
- 無條件捨去 (小於自己的最大整數)
   - Math.floor(2.99) == 2
- 無條件進位 (大於自己的最小整數)
   - Math.ceil(2.11) == 3

## JavaScript: Primitive Type - string

- ES6 string

   ~~~js
   var name = `Will`;
   
   var str = `Mr. ${name}`;
   ~~~


## JavaScript: Primitive Type - boolean

~~~js
var d = (null == false);           // false
var e = (null == true);            // false
var f = (undefined == false);      // false
var g = (undefined == true);       // false
var h = (null == null);            //true
var i = (undefined == undefined);  // true
var j = (undefined == null);       // true
~~~

- Falsy
   
   - ''
   - 0
   - NaN
      - NaN 跟任何物件比較都是 false
   - false
   - undefined
   - null


- boolean 使用技巧 

   - [https://dorey.github.io/JavaScript-Equality-Table/](https://dorey.github.io/JavaScript-Equality-Table/){:target="_back"}

   - 一律使用 `===` , `!==`

   - 使用 !! 強迫引發自動轉型
      - var a = !!(0);
      - var b = !!("0");

   - 判斷物件是否有初始值
      - if (myVar) {}
   
   - 給予變數預設值
      - var arr = arr || [];
      - var num = num || 99;
      - var str = str || "";
      - var bool = bool || true;
      - var obj = obj || {};

> 任何兩個物件相比一定為 `false`

## JavaScript: Primitive Type - null

![Imgur](https://i.imgur.com/91bxlBZ.gif)

- Nan  不是一個`物件`，但是型別卻是個`數值`| typeof(Nan) == "number"
- null 不是一個`物件`，但是型別卻是個`物件`| typeof(null) == "object"


## JavaScript: Primitive Type - nudefined

- 使用方法

   ~~~js
   var a;  // 變數 a 尚未定義 ( a === undefined )
   a = undefined;
   ~~~

- 重點觀念

    - undefined (型別) 是一個內建型別 (原始型別)
    - undefined (物件) 在執行時期的記憶體中有個物件存在
    - undefined (變數/屬性) 是一個全域變數 (也是個屬性)
       - window.undefined === undefined
       - 在 IE8 以下 (含) undefined 可以被重新指派成其他物件！
    - 無論 null 或是 undefined 都會隱含轉型成 false
       - undefined == null // true


## JavaScript: Primitive Type - symbol

> 沒事不要用～

![Imgur](https://i.imgur.com/l3O4G2f.gif)


## 物件型別

- JavaScript 物件型別
   
   - 原生物件(Native Objects)

      - ECMAScript 標準中定義的物件

   - 宿主物件(Host Objects)
      
      - 由 `JavaScript 執行環境` 額外提供的物件 

       - Browsers: Winodow, 所有 DOM 物件
       - Node.js: Global, Proces, OS, Net, Path

## JavaScript 原生物件：使用者定義物件

~~~js
var obj = {};
obj.name = 'Will';
obj.company = '多奇數位創意有限公司''
~~~

## ES2015 新增的物件語法

~~~js
var obj = { 
     // 直接指定上層物件 ( __proto__ ) 
     __proto__: Lesson, 
     // 簡化設定屬性的語法 ( handler: handler ) 
     handler, 
     // 直接宣告或覆寫屬性方法 
     toString() { 
        // 可直接呼叫上層物件的方法 
        return 'd ' + super.toString(); 
        }, 
        // 可在建立物件時動態計算屬性名稱
~~~

## JavaScript 原生物件　Array

~~~js
var mycars = [];
mycars[0] = 'will';
~~~

## JavaScript 原生物件　Date


- Date 字串格式與時區的關系

~~~js
new Date('2019-06-16') new Date('2019-06-16 00:00:00') 
new Date('2019/06/16') new Date('2019/06/16 00:00:00')
~~~

## JavaScript 原生物件 Math

## JavaScript 原生物件 RegExp


## JavaScript 物件概念

- 任何一個javascript 執行環境　都只有一個根物件

- 所有物件資料都從`根物件`開始`連結`(chain)


   - window
      - ![Imgur](https://i.imgur.com/Xf1Isim.gif)


> 任何兩個物件型別相比一定為 false, primitive tyep 例外!!!


- object 自己跟自己比

   - ![Imgur](https://i.imgur.com/db2t7AH.gif)


## 跟物件　window　有什麼?

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects){:taregt="_back"}



## 深入理解　JavaScript Function

- function expression 具名函式

   ~~~js
   var add = function add(a, b) { return a + b; };
   add.name
   ~~~

- function expression 匿名函式

   ~~~js
   var add = function (a, b) { return a + b; };
   add.name // 匿名函式無法取得函式名稱
   ~~~

- function declaration 具名函式

   ~~~js
   function add(a, b) { return a + b; }
   add.name
   ~~~

- function declaration 匿名函式

   ~~~js
   function (a, b) { return a + b; }
   // Uncaught SyntaxError: Unexpected token (
   ~~~

## Immediate Function

- IIFE =  Immediately-invoked function expression 

   ~~~js
   (function (a, b) { var c = 10; return a + b + c; })(10, 20);
   ~~~

- 主要用途
   - 限制變數存在的`作用域`！ 
   - 讓`變數`不輕易成為「`全域變數`」的方法


## 全域變數 vs. 區域變數

- Global Variables

   - 在全域範圍宣告的變數，通稱為「`全域變數`」(Global Variables) 

- Local Variabeles

   - 在有限範圍內宣告的變數，通稱為「`區域變數`」(Local Variables)

-  不是變數 

   - 不用 var / let / const 宣告的變數，通通都不能算是變數 

- 全域屬性 

   - 所有置於「`根物件`」下的屬性，通稱為「`全域屬性`」 

- 區域屬性

  - 沒有這個玩意


## 作用區域空間

![Imgur](https://i.imgur.com/db2t7AH.gif)



## Hoisting 

- 宣告往上提

1. 

   ~~~js
   var tmp = 'React';
   function Choose() {
      console.log(tmp);
      var tmp = 'Angular';
      console.log(tmp);
   }
   
   // ANS:
   // undefined
   // Angular
   
   ////////////// HOISTING /////////
   
   var tmp = 'React'
   function Choose(){
      var tmp;
      console.log(tmp);
      tmp = 'Angular';
      consol.log(tmp);
   }
   ~~~

2. 

   ~~~js
   (function GetBook() {
      var test = function() {return 1;}
      function test() { return 2;}
      return test();   
   })();
   
   
   ///////////HOISTING////////////
   
   (function GetBook() {
      var test; function test() { return 2;}
      test = function() {return 1;}
      return test();   
   })();
   ~~~

3. 

   ~~~js
   (function GetBook() {
      var test = function() {return 1;}
      function test() { return 2;}
      return test();   
   })();
   
   //////HOISTING//////
   
   (function GetBook() {
      var test; 
      function test() { return 2;}
      
      test = function() {return 1;}
      return test();   
   })();
   
   ~~~

4. 

   ~~~js
   (function GetBook(){
     var test = function() { return 1;}
     return test();
     function test() {return 2;}
   })()
   
   /////////HOISTING/////////// 
   
   (function GetBook(){
     var test; function test() {return 2;};
     test = function() { return 1;}
     return test();
   })();
   ~~~

5. 

   ~~~js
   (function GetBook(){
     return test();
     function test() {return 2;}
     var test = function() {return 1;}
   })();
   
   
   //////////////HOISTING/////////////////
   
   (function GetBook(){
     var test; function test() {return 2;}
     return test();
     test = function() {return 1;}
   })();
   ~~~

## Closure　閉包

- Function 兩大特色

  - js `一級物件`(First-class object)
  - 提供了`變數`的`作用域` (scope)
  - 閉包可以鎖住一個你要的區域變數

~~~js
// o.count()
function counter (){
   var i =  0;
   return {
      count: function() {
        i ++;
        return 1;
      }
   }
}
~~~


## function exercise

1.

~~~js
// 請依據以下範本撰寫一個 MyFunc 函式：
// function MyFunc() {
// // YOUR CODE HERE
// }
// 
// 撰寫完成後，必須可以正常執行以下程式碼：
// var o = MyFunc();
// console.log(o.Key1); // 回傳 1
// console.log(o.Key2); // 回傳 2

function MyFunc() {
 return {
   key1: 1,
   key2: 2
 }
}

var o = MyFunc();

~~~

2. 

~~~js
// 請依據以下範本撰寫一個 MyFunc 函式：
// function MyFunc() {
// // YOUR CODE HERE
// }
// 
// 撰寫完成後，必須可以正常執行以下程式碼：
// var o = MyFunc();
// console.log(o.GetA()); // 回傳值為 1
// console.log(o.GetB()); // 回傳值為 2

function Myfun(){
   var obj = {}
   
   obj.GetA = function() {return 1; };
   obj.GetB = function() {return 2; };
   
   return obj
}




~~~


## ES6 新增的函式特性


- Arrow Function 

   -  箭頭函式沒有自己的 this, arguments, super 或 new.target 可用


- Rest Parameters (...)

~~~js
function f(a, b, ...args){
  return args;
}
~~~

- 展開運算子

~~~js
var arr1 = [0, 1, 2]
var arr2 = [2, 4, 5]

//ES5
Array.prototype.concat.apply(arr1, arr2);

// ES6
[...arr1, ...arr2]
arr1.push(..arr2)

~~~

- Immutable

   - ![Imgur](https://i.imgur.com/LNr0NUm.gif)

- 疊代物件
   
   - 物件不能疊代

   - 把 window 變成可疊代的
      ~~~js
      window[Symbol.iterator] = function*() {
          for (let i in window) { 
             yield window[i]; 
             } 
         }; 
      
      ~~~

## for ... of 

~~~js
let list = [4, 5, 6];
for (let i in list) { console.log(i); // "0", "1", "2" }
for (let i of list) { console.log(i); // "4", "5", "6" }
~~~

## Descructing assignment

~~~js
var a, b, resr; [a, b] = [10, 20]

[a, b, ...rest] = [10, 20, 30, 40, 50]

~~~


~~~js 
// 在參數列使用解構賦值最好可以給一個空物件當預設值 (避免例外) 
function f({size = 'big', cords = {x: 0, y: 0}} = {}) { 
   console.log(size, cords); 
   }
// 從函式使用者的角度來看，使用物件解構賦值的可讀性極高 
f({ 
   cords: {x: 18, y: 30} 
   });

~~~

## function and constructor

~~~js
var Car = function (name) { 
   this.name = name; 
   this.slogan = function () { 
      return 'Driven by technology. ' + this.name + '.'; 
      } 
   }
var o = new Car('Tesla');
~~~

- ES5 

~~~js
// 宣告上層物件藍圖 
function Mammals() { } 
Mammals.prototype.getName = function() { return this.name; } 
// 宣告下層物件藍圖 
function Cat(name = 'kitty') { this.name = name; } 

// 建立物件繼承關係 
Cat.prototype = new Mammals(); //鏈結上層物件
 Cat.prototype.constructor = Cat; //重設建構式為自己 
 // 建立物件 
 var obj = new Cat('Cookie');

~~~

- ES6

~~~js
// 宣告上層物件藍圖 
class Mammals { 
   constructor() { }
   getName() { return this.name; }
} 

// 宣告下層物件藍圖 
class Cat extends Mammals { 
   constructor(name = 'kitty') { 
      super(); 
      this.name = name; 
   } 
 }
var obj = new Cat('Cookie'); 
~~~

## Classes

~~~js
class Greeter {
   
   constructor(name, title = 'Mr.') {
    this.name = name;
    this.title = title; }
    
    greet() { 
       return `Hello, ${this.title} ${this.name}`; 
      } 
   }
let greeter = new Greeter("world");
~~~


## Accessors

> 保哥個人不建議

## ES2015 組化技術

- [https://blog.miniasp.com/post/2019/01/29/How-to-get-start-with-ES6-ES2015-Modules-with-Parcel](https://blog.miniasp.com/post/2019/01/29/How-to-get-start-with-ES6-ES2015-Modules-with-Parcel){:target="_back"}

- ES Modules

   - 重要觀念

      - 每個 JavaScript 檔案都是一個「模組」(module)
      - 每個「模組」都會自動形成一個「作用域範圍」(module scope) 
   
   - 主要優點

      - 可將變數限制在一個獨立的 JavaScript 檔案內 (模組內) 
      - 變數的可見範圍可透過 export 語法「匯出」給其他模組使用
      - 不同的模組之間可透過 import 語法將模組內的變數「匯入」使用

## 產生「變數」的時間點

- 使用 var 宣告變數的時候 
   - var a = 1; 
- 使用 let 宣告變數的時候 
   - let a = 1;
- 使用 const 宣告變數的時候
   - const a = 1;
- 使用 function 宣告函式的時候( 如同 var 變數 )
   - function f() { }
   - var f = function () { }
- 使用 class 宣告類別的時候( 如同 let 變數 )
   - class Rect { }
   - let Rect = class { }

##  匯出模組變數

- 具名匯出

   ~~~js
   function f() { }
   export { f }; 
   export var foo = Math.sqrt(2); 
   export let name = 'Will H'; 
   export const PI = Math.PI;
   ~~~

- 預設匯出 (一個模組只能有一個預設匯出) 

   ~~~js
   export default function() {}
   export default class {}
   export { name as default }
   ~~~

## 匯入模組變數

- 基本語法 
   - import { 變數名稱 } from '模組名稱或路徑';

- 更多範例
   
   ~~~js
   import varname from 'module-name'; // 取得預設匯出物件 
   import * as varname from 'module-name'; // 取得所有匯出
   import { exportName1, exportName2 } from 'module-name';
   import { exportName as varname } from 'module-name';
   import varname, { exportName } from 'module-name';
   import 'module-name'; // side effects only (ref)
   ~~~