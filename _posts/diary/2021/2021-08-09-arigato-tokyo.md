---
layout: "post"
title: "Arigoto, Tokyo ❤️ lol.."
permalink: "diary/:year-:month-:day/arigato-tokyo"
tags: 今日隨意
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.1/fabric.min.js" integrity="sha512-ACqMrfAtm537AWzgx/xQ57JnFxXeq8RylQMGg4y/e6M2ew4Z8NycE8aId/Bt2ZE+w1gNsox3MgwxKl7SGMRdtA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

> 電腦開了又關 關了又開 XD
>
> 想寫些三八的東西
>
> 好好記錄一下 這兩週的感動
>
> 一下子太多情緒了 XD
>
> 那就單純一點吧! :star::star::star:

<canvas id="myCanvas" ></canvas>

<script>
const canvas = new fabric.Canvas('myCanvas');
canvas.setHeight(600);
canvas.setWidth(400);

// add backage
fabric.Image.fromURL('https://i.imgur.com/9VXLsk1.jpg', function(myImg) {
  canvas.setBackgroundImage(myImg, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / myImg.width,
        scaleY: canvas.height / myImg.height
    });
});

// add cure bird
fabric.Image.fromURL('https://i.imgur.com/vPlXPRW.jpg', function(myImg2) {
  canvas.add(myImg2.set({left: 100, top: 250}).scale(0.15))
});

fabric.Image.fromURL('https://i.imgur.com/sFmQEM9.jpg', function(myImg2) {
  canvas.add(myImg2.set({left: 100, top: 50}).scale(0.05))
});
</script>

### 怎麼寫的

```html
<!-- CDN  -->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.1/fabric.min.js"
  integrity="sha512-ACqMrfAtm537AWzgx/xQ57JnFxXeq8RylQMGg4y/e6M2ew4Z8NycE8aId/Bt2ZE+w1gNsox3MgwxKl7SGMRdtA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>

<canvas id="myCanvas"></canvas>

<script>
  const canvas = new fabric.Canvas("myCanvas");
  canvas.setHeight(600);
  canvas.setWidth(400);

  // add backage
  fabric.Image.fromURL("https://i.imgur.com/9VXLsk1.jpg", function (myImg) {
    canvas.setBackgroundImage(myImg, canvas.renderAll.bind(canvas), {
      scaleX: canvas.width / myImg.width,
      scaleY: canvas.height / myImg.height,
    });
  });

  // add cure bird
  fabric.Image.fromURL("https://i.imgur.com/vPlXPRW.jpg", function (myImg2) {
    canvas.add(myImg2.set({ left: 100, top: 250 }).scale(0.15));
  });

  fabric.Image.fromURL("https://i.imgur.com/sFmQEM9.jpg", function (myImg2) {
    canvas.add(myImg2.set({ left: 100, top: 50 }).scale(0.05));
  });
</script>
```
