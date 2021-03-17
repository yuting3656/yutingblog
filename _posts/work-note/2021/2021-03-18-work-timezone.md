---
layout: 'post'
title: '工作筆記: ㄟ~~~ 是不是怪怪的 有甚麼問題!?'
permalink: 'work-note/moment-greate-losses-are-great-lessons-utc'
tags: 工作筆記 moment UTC postgres
---

> 還是那句話跟自己說 
>
> 越是讓你 身心港絕 
>
> G八毛 :sunglasses: 不舒爽:grinning: 被挑戰:yum: :dash: 
>
> 的相關事情出現 
>
> 越有我可以學習和成長的空間 YYA!!!!! :heart:
>
> 就這樣 千杯謙卑再千卑的 GO 下去ㄅ~~~ :+1:
>
> 感恩再感恩:sunny: 謝謝團隊的大家:sparkles: 
>
> 在溝通良好的團隊中工作日長 & 慢慢變小瘦瘦(誤)
>
> 是一件很有福報的 奢華:fireworks: 喔唷~~~~ :hibiscus:


## 故事情節大綱

![Imgur](https://i.imgur.com/gM9pjuv.jpg)


## [UTC](https://www.unixtimestamp.com/){:target="_back"}

|Date||
|:---|:---|
|`03/17/2021 @ 4:42pm`|[UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)|
|`2021-03-17T16:42:11+00:00`|[ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)|
|`2021-03-17T16:42:11+00:00`|[RFC 3339](https://tools.ietf.org/html/rfc3339)|
|`Wed, 17 Mar 2021 16:42:11 +0000`|[RFC 822](https://tools.ietf.org/html/rfc822),[1036](https://tools.ietf.org/html/rfc1036),[1123](https://tools.ietf.org/html/rfc1123),[2822](https://tools.ietf.org/html/rfc2822)|
|`Wednesday, 17-Mar-21 16:42:11 UTC`|[RFC 822](https://tools.ietf.org/html/rfc2822)|

## [moment 轉成 toISOString()](https://momentjs.com/docs/#/displaying/as-iso-string/){:target="_back"}

~~~javascript
moment('date').toISOString()
~~~

## [MDN toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString){:target="_back"}

~~~javascript
const event = new Date('05 October 2011 14:48 UTC');
console.log(event.toString());
// expected output: Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)
// (note: your timezone may vary)

console.log(event.toISOString());
// expected output: 2011-10-05T14:48:00.000Z
~~~

## [postgres datetime](https://www.postgresql.org/docs/9.1/datatype-datetime.html){:target="_back"}

### Date Input 

|Example|Description|
|:---|:---|
|1999-01-08	       |ISO 8601; January 8 in any mode (recommended format)|
|January 8,1999    |unambiguous in any datestyle input mode|
|1/8/1999	       |January 8 in MDY mode; August 1 in DMY mode|
|1/18/1999	       |January 18 in MDY mode; rejected in other modes|
|01/02/03	       |January 2, 2003 in MDY mode; February 1, 2003 in DMY mode; February 3, 2001 in YMD mode|
|1999-Jan-08	   |January 8 in any mode|
|Jan-08-1999	   |January 8 in any mode|
|08-Jan-1999	   |January 8 in any mode|
|99-Jan-08	       |January 8 in YMD mode, else error|
|08-Jan-99	       |January 8, except error in YMD mode|
|Jan-08-99	       |January 8, except error in YMD mode|
|19990108	       |ISO 8601; January 8, 1999 in any mode|
|990108	           |ISO 8601; January 8, 1999 in any mode|
|1999.008	       |year and day of year|
|J2451187	       |Julian day|
|January 8, 99 BC  |year 99 BC|

## Time Zone Input

|Example	|Description|
|:---|:---|
|PST	    |Abbreviation (for Pacific Standard Time)|
|America/New_York	|Full time zone name|
|PST8PDT	        |POSIX-style time zone specification|
|-8:00	            |ISO-8601 offset for PST|
|-800	            |ISO-8601 offset for PST|
|-8	                |ISO-8601 offset for PST|
|zulu	            |Military abbreviation for UTC|
|z	                |Short form of zulu|