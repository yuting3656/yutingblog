---
layout: "single"
title: '模組化建構工作細節~'
permalink: 'diary/:year-:month-:day'
tags: 今日隨意
---

> 練習把工作細項 模組化!
>
> 可以練習 規劃能力 和 理解自己技術掌握程度!
>
> 身心輕鬆的在各種狀態 姿勢 情緒 下快樂學習&成長
>
> 把寫 code 當藝術創作 YA!
>
> 不要太拘泥於細節 但要注意各項細節!
> 
> 隨時地保持好奇心 inner peace 
>
> 傲氣拿掉 你會學得更多唷~~~~~
>
> 拆解 分析 慢工 消化 學習 突破 組裝 優化 放下
> 
> YA!

# Modular Thinking 

- [https://medium.com/igniterspace/modular-thinking-breaking-complicated-systems-down-into-simpler-pieces-534cbb72a047](https://medium.com/igniterspace/modular-thinking-breaking-complicated-systems-down-into-simpler-pieces-534cbb72a047){:target="_back"}


## 模組化

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v4.js"></script>

<!-- Load d3-cloud -->
<script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js"></script>
<div style="background-color:yellow">
<div id="my_dataviz"></div>
</div>


<script>
// List of words
var myWords = [{word: "人一定要靠自己", size: "20"}, {word: "逆風高飛", size: "30"}, {word: "難就是懶。懶就是難", size: "35"}, {word: "inner peace :)", size: "40"}, {word: "fake it until you become it", size: "30"}, {word: "我的未來不是夢", size: "40"}, {word: "有夢最美。希望相隨", size: "28"} ]

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#69b3a2")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}
</script>


## D3.js

>  D3.js is a data visualization library for user interfaces, that any developer comfortable with javascript can use, without much effort, to beautifully represent data in a variety of ways.


- [https://www.d3-graph-gallery.com/graph/wordcloud_size.html](https://www.d3-graph-gallery.com/graph/wordcloud_size.html){:target="_back"}

- example

~~~html

<!DOCTYPE html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v4.js"></script>

<!-- Load d3-cloud -->
<script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js"></script>

<!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>


<script>
   // List of words
   var myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"},    {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"} ]
   
   // set the dimensions and margins of the graph
   var margin = {top: 10, right: 10, bottom: 10, left: 10},
       width = 450 - margin.left - margin.right,
       height = 450 - margin.top - margin.bottom;
   
   // append the svg object to the body of the page
   var svg = d3.select("#my_dataviz").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");
   
   // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
   // Wordcloud features that are different from one word to the other must be here
   var layout = d3.layout.cloud()
     .size([width, height])
     .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
     .padding(5)        //space between words
     .rotate(function() { return ~~(Math.random() * 2) * 90; })
     .fontSize(function(d) { return d.size; })      // font size of words
     .on("end", draw);
   layout.start();
   
   // This function takes the output of 'layout' above and draw the words
   // Wordcloud features that are THE SAME from one word to the other can be here
   function draw(words) {
     svg
       .append("g")
         .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
         .selectAll("text")
           .data(words)
         .enter().append("text")
           .style("font-size", function(d) { return d.size; })
           .style("fill", "#69b3a2")
           .attr("text-anchor", "middle")
           .style("font-family", "Impact")
           .attr("transform", function(d) {
             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
           })
           .text(function(d) { return d.text; });
   }
   </script>
~~~

> 這樣的規劃方式已經快一個月了 慢慢地掌握度越來越高 很開心! ~~ 繼續向前行吧!
