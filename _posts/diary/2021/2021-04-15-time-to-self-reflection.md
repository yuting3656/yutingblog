---
layout: "single"
title: "看看自己 靜一下 我愛CSS"
permalink: 'diary/:year-:month-:day/time-to-self-reflection'
tags: 今日隨意 css
---

## 今天各種火氣 !@#$%^&$#@%$^&@!@#$ XDD

# 面對它 接受它 處理它 放下它

> 反正就是
>
> 我認為已經用 [ant design](https://ant.design/){:target="_back"} 開發 就盡量用官方的用法 達到期許的畫面
>
> 一直額外 刻一拖拉機 **CSS** 是不對的 :triumph::triumph::triumph:
>
> 就算已經寫完 後幾個小時的我還是很不舒服 XDD :collision::collision:

> 自己檢討的原因 除了 上面自己下的原則外 :sunny:
>
> 還有 對 css 真的還是很有距離感 :wave::wave::wave:

# 拿今天寫的 來渣馬步吧!

~~~js
export const datePickerParentSpan = {
  margin: 0,
  padding: 0,
  color: '#000000',
  listStyle: 'none',
  position: 'relative',
  display: 'flex',
  border: '1px solid #d9d9d9',
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
};

export const datePickerAddOnBeforeSpan ={
  padding: '8px 11px',
  fontWeight: 'normal',
  borderRight: '1px solid #d9d9d9',
  fontSize: '19px',
  textAlign: 'center',
  backgroundColor: '#fafafa',
  borderRadius: '2px',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  transition: 'all 0.3s',
};
~~~


## [list-style](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style){:target="_back"}

The **list-style** CSS shorthand property allows you to set all the list style properties at once.

~~~css
/* type */
list-style: square;

/* image */
list-style: url('../img/shape.png');

/* position */
list-style: inside;

/* type | position */
list-style: georgian inside;

/* type | image | position */
list-style: lower-roman url('../img/shape.png') outside;

/* Keyword value */
list-style: none;

/* Global values */
list-style: inherit;
list-style: initial;
list-style: unset;
~~~

ex:
   <ul style="list-style:square">
     <li> item 1</li>
     <li> item 2</li>
     <li> item 3</li>
   </ul>

~~~html
<ul style="list-style:square">
  <li> item 1</li>
  <li> item 2</li>
  <li> item 3</li>
</ul>
~~~

~~~html
<ul style="list-style:url('https://cdn.iconscout.com/icon/premium/png-256-thumb/pikachu-2-625205.png') inside">
  <li> item 1</li>
  <li> item 2</li>
  <li> item 3</li>
</ul>
~~~


## [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position){:target="_back"}

> 有時候還是會忘記確切的用法!!!!!

The **position** CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.

- values
   - static
   - relative
   - absolute
   - fixed
   - sticky

ex;

<div style="width:100px;height:100px;background:red;display:inline-block;">a</div>
<div style="width:100px;height:100px;background:green;display:inline-block;position:relative;top:20px;right:20px">b</div>
<div style="width:100px;height:100px;background:red;display:inline-block;">c</div>

~~~html
<div style="width:100px;height:100px;background:red;display:inline-block;">a</div>
<div style="width:100px;height:100px;background:green;display:inline-block;position:relative;top:20px;right:20px">b</div>
<div style="width:100px;height:100px;background:red;display:inline-block;">c</div>
~~~

## [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display){:target="_back"}

## [border-collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse){:target="_back"}

## [border-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing){:target="_back"}

## [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition){:target="_back"}


> 累了 也舒服多了~ 睡飽後 再來寫 :)
