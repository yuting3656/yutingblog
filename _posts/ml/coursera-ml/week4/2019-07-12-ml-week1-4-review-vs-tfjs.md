---
layout: 'post'
title: 'week1 ~ week4 review VS TensorFlow.js'
permalink: 'ml-coursera/week4/week1-to-week4-review-vs-tensorflowJS'
tags: machine-learning neural-networks tensorFlow
---

> HAHA 厲害啦! 複習 + TednsorFlow YA!

<div id="test"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js" integrity="sha256-WVsM3xrcqyuFNF3W1qtIKbHFsD0977nDQA8DCMp1zCw=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>


<script>
	let xs = [];
	let ys = [];

	let m, b;

	function setup() {
       const canvas = createCanvas(400, 400);
       
       // scalar = real number
       m = tf.variable(tf.scalar(random(1)));
       b = tf.variable(tf.scalar(random(1)));
       canvas.parent('test')
	}

	function predict(x) {
	 const xs = tf.tensor1d(x);
	 // y = mx + b
	 const ys = tfxs.mul(m).add(b);
     return ys;
	}

	function mousePressed() {
		const x = map(mouseX, 0, width, 0, 1);
		const y = map(mouseY, 0, height, 1, 0);
		xs.push(x);
		ys.push(y);
	}

	function draw() {
     
      background(200);

      stroke(255);
      strokeWeight(8);
      for (let i = 0; i < xs.length; i ++) {
      	let px = map(xs[i], 0, 1, 0 , width);
      	let py = map(ys[i], 0, 1, height, 0);
      	point(px, py);

      }

	}
</script>