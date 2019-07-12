---
layout: 'post'
title: 'week1 ~ week4 review VS TensorFlow.js'
permalink: 'ml-coursera/week4/week1-to-week4-review-vs-tensorflowJS'
tags: machine-learning neural-networks tensorFlow
---

> HAHA 厲害啦! 複習 + [TednsorFlow.js](https://www.tensorflow.org/js/tutorials/setup){:target="_back"} YA!

- 用出來**超爽的兒~~**
  - 這練習的教學影片: [Linear Regression with TensorFlow.js](https://www.youtube.com/watch?v=dLp10CFIvxI&feature=youtu.be){:target="_back"}
  - 畫圖的JS: [p5.js](https://p5js.org/){:target="_back"}
  - [TendorFlow.js](https://www.tensorflow.org/js/tutorials/setup){:target="_back"}

<div id="tf-linear-regression-container"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js" integrity="sha256-WVsM3xrcqyuFNF3W1qtIKbHFsD0977nDQA8DCMp1zCw=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>


<script>
	const x_vals = [];
	const y_vals = [];

	let m, b;

	const learningRate = 0.05;
	const optimizer = tf.train.sgd(learningRate);

	function setup() {
       const canvas = createCanvas(400, 400);
       
       // scalar = real number
       m = tf.variable(tf.scalar(random(1)));
       b = tf.variable(tf.scalar(random(1)));
       canvas.parent('tf-linear-regression-container')
	}

	function loss(pred, labels) {
	  // J( θ0, θ1 ) = 1/2m * ∑ ( hθ * ( x^(i) ) - y^(i) )^2 
      return pred.sub(labels).square().mean();
	}

	function predict(x) {
	 const xs = tf.tensor1d(x);
	 // y = mx + b;
	 const ys = xs.mul(m).add(b);
     return ys;
	}

	function mousePressed() {
		const x = map(mouseX, 0, width, 0, 1);
		const y = map(mouseY, 0, height, 1, 0);
		x_vals.push(x);
		y_vals.push(y);
	}

	function draw() {

      // memory control
      tf.tidy(() => {
        if(x_vals.length > 0) {
          const ys = tf.tensor1d(y_vals);
          // https://js.tensorflow.org/api/latest/#train.sgd
	      optimizer.minimize(() => loss(predict(x_vals), ys));
        }           	
      });

      background('#7FB4BE');

      stroke(255);
      strokeWeight(8);
      for (let i = 0; i < x_vals.length; i ++) {
      	let px = map(x_vals[i], 0, 1, 0 , width);
      	let py = map(y_vals[i], 0, 1, height, 0);
      	point(px, py);
      }

      const LineX = [0, 1];
      const ys = tf.tidy(() => predict(LineX));
      let lineY = ys.dataSync();
      ys.dispose();
 
      let x1 = map(LineX[0], 0, 1, 0, width);
      let x2 = map(LineX[1], 0, 1, 0, width); 
        
      let y1 = map(lineY[0], 0, 1, height, 0);
      let y2 = map(lineY[1], 0, 1, height, 0);
      strokeWeight(2)
      line(x1,y1,x2,y2);
      
	}
</script>