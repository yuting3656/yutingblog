---
layout: "single"
title: 'daily Programming: 股市抓抓'
permalink: 'daily-programming/stock-crawling'
tags: daily-programming python music21
---


> 專題列車啟動! 來基本功練習下

> 爬蟲抓股市 & 畫圖!

- API 網站

   - [https://www.alphavantage.co/](https://www.alphavantage.co/){:target="_back"}

- code 

~~~js

function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("view").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=QJJEIG66V8ASQX57", true);
  xhttp.send();
}

~~~

<script src="https://cdnjs.cloudflare.com/ajax/libs/then-request/2.2.0/request.js"></script>


<script> 

// request('GET', 'https://tw.quote.finance.yahoo.net/quote/q?type=tick&perd=1m&mkt=10&sym=%23001&callback=jQuery111306345513470863309_1571886515819&_=1571886515839', 
//               headers: true  ).done(function (res) {
//   console.log(res.getBody());
// });


// request('GET', 'https://crunchify.com/how-to-fix-access-control-allow-origin-issue-for-your-https-enabled-wordpress-site-and-maxcdn/', {
//     'Access-Control-Allow-Headers' : '*',
//     'headers': '*'
//     }).done(function (res) {
//   console.log(res.getBody());
// });


function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=QJJEIG66V8ASQX57", true);
  xhttp.send();
}
</script>

<button type='button' style="color: snow; background-color: blue" onclick="loadXMLDoc()">點我</button>

<div id='view'></div>