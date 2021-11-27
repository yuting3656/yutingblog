---
layout: "single"
title: "Study Group: 一姐出品 品質保證 KaBoom.js"
permalink: "stydeGroup/kaboom-js"
tags: 讀書會 KaBoom.js
---

# [KaBoom.js](https://kaboomjs.com/){:target="\_back"}

<script src="https://kaboomjs.com/lib/0.5.1/kaboom.js"></script>
<script type="module">

// initialize kaboom context
const k = kaboom();

// define a scene
k.scene("main", () => {

    // add a text at position (100, 100)
    k.add([
        k.text("ohhimark", 32),
        k.pos(100, 100),
    ]);

});

// start the game
k.start("main");

</script>

```html
<script src="https://kaboomjs.com/lib/0.5.1/kaboom.js"></script>
<script type="module">
  // initialize kaboom context
  const k = kaboom();

  // define a scene
  k.scene("main", () => {
    // add a text at position (100, 100)
    k.add([k.text("ohhimark", 32), k.pos(100, 100)]);
  });

  // start the game
  k.start("main");
</script>
```
