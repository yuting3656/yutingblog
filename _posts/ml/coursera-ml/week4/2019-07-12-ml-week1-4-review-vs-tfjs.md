---
layout: "single"
title: 'week1 ~ week4 review VS TensorFlow.js'
permalink: 'ml-coursera/week4/week1-to-week4-review-vs-tensorflowJS'
tags: coursera-machine-learning neural-networks tensorflow linear-regression
---

> 超爽~~~ 很多細節 要留著 下禮拜上完後我再一一補上!!! YA!!

> HAHA 厲害啦! 複習 + [TednsorFlow.js](https://www.tensorflow.org/js/tutorials/setup){:target="_back"} YA!

- 用出來**超爽的兒~~**
  - 這練習的教學影片: [Linear Regression with TensorFlow.js](https://www.youtube.com/watch?v=dLp10CFIvxI&feature=youtu.be){:target="_back"}
  - 畫圖的JS: [p5.js](https://p5js.org/){:target="_back"}
  - [TendorFlow.js](https://www.tensorflow.org/js/tutorials/setup){:target="_back"}

### Linear Regression

> 在圖紙上點 。 tensorflow 自動幫你找 最棒棒的 regression line

<div id="tf-linear-regression-container"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js" integrity="sha256-WVsM3xrcqyuFNF3W1qtIKbHFsD0977nDQA8DCMp1zCw=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>


<script>
	const x_vals = [];
	const y_vals = [];

	let m, b;

	const learningRate = 0.2;
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


**先來速度看code:**

- 加入相關的libraries
   1. [TensorFlow.js](https://www.tensorflow.org/js/tutorials/setup){:target="_back"}
   2. [p5.js](https://p5js.org/){:target="_back"}

   ~~~html
   <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js" integrity="sha256-WVsM3xrcqyuFNF3W1qtIKbHFsD0977nDQA8DCMp1zCw=" crossorigin="anonymous"></script>   
   ~~~

- javascript code

   ~~~javascript
   	const x_vals = [];
   	const y_vals = [];
   
   	let m, b;
   
   	const learningRate = 0.2;
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
   ~~~


---



<br/>
### Neural Network

- 學習影片
  - [Build a neural network with TensorFlow](https://www.youtube.com/watch?v=XdErOpUzupY){:target="_back"}

> 用最經典的範例!

- [Iris DataSet](http://archive.ics.uci.edu/ml/datasets/Iris){:target="_back"}
![Imgur](https://i.imgur.com/2HdAcgmh.gif)


> 用美美的花花來學習 AI 真的是再幸福不過的事情了~ :smile:

- 速度看 code
  - optimizer的地方，要到 week5 大神才會介紹，這次就當課前預習吧 :) 
  - 有要用到 json 資料 所以會很醜 可以練習 :eye:  :eye: compile 一下 XDDD

~~~javascript 
iris = [
    {"sepal_length": "5.1", "sepal_width": "3.5", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.0", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.7", "sepal_width": "3.2", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.6", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.9", "petal_length": "1.7", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.4", "petal_length": "1.4", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.4", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.4", "sepal_width": "2.9", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.7", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.4", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.0", "petal_length": "1.4", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "4.3", "sepal_width": "3.0", "petal_length": "1.1", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.8", "sepal_width": "4.0", "petal_length": "1.2", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.7", "sepal_width": "4.4", "petal_length": "1.5", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.9", "petal_length": "1.3", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.5", "petal_length": "1.4", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.7", "sepal_width": "3.8", "petal_length": "1.7", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.8", "petal_length": "1.5", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.4", "petal_length": "1.7", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.7", "petal_length": "1.5", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.6", "petal_length": "1.0", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.3", "petal_length": "1.7", "petal_width": "0.5", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.4", "petal_length": "1.9", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.0", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.4", "petal_length": "1.6", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.2", "sepal_width": "3.5", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.2", "sepal_width": "3.4", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.7", "sepal_width": "3.2", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.1", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.4", "petal_length": "1.5", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.2", "sepal_width": "4.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.5", "sepal_width": "4.2", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.2", "petal_length": "1.2", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.5", "sepal_width": "3.5", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "4.4", "sepal_width": "3.0", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.4", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.5", "petal_length": "1.3", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "4.5", "sepal_width": "2.3", "petal_length": "1.3", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "4.4", "sepal_width": "3.2", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.5", "petal_length": "1.6", "petal_width": "0.6", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.8", "petal_length": "1.9", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.0", "petal_length": "1.4", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.8", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.2", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.3", "sepal_width": "3.7", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.3", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "7.0", "sepal_width": "3.2", "petal_length": "4.7", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "6.4", "sepal_width": "3.2", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.9", "sepal_width": "3.1", "petal_length": "4.9", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.3", "petal_length": "4.0", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.5", "sepal_width": "2.8", "petal_length": "4.6", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.8", "petal_length": "4.5", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "3.3", "petal_length": "4.7", "petal_width": "1.6", "species": "versicolor"},
    {"sepal_length": "4.9", "sepal_width": "2.4", "petal_length": "3.3", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "6.6", "sepal_width": "2.9", "petal_length": "4.6", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.2", "sepal_width": "2.7", "petal_length": "3.9", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.0", "sepal_width": "2.0", "petal_length": "3.5", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.9", "sepal_width": "3.0", "petal_length": "4.2", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "2.2", "petal_length": "4.0", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "2.9", "petal_length": "4.7", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "2.9", "petal_length": "3.6", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.7", "sepal_width": "3.1", "petal_length": "4.4", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "3.0", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "4.1", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "6.2", "sepal_width": "2.2", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "2.5", "petal_length": "3.9", "petal_width": "1.1", "species": "versicolor"},
    {"sepal_length": "5.9", "sepal_width": "3.2", "petal_length": "4.8", "petal_width": "1.8", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "2.8", "petal_length": "4.0", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "2.5", "petal_length": "4.9", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "2.8", "petal_length": "4.7", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "6.4", "sepal_width": "2.9", "petal_length": "4.3", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.6", "sepal_width": "3.0", "petal_length": "4.4", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "6.8", "sepal_width": "2.8", "petal_length": "4.8", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "6.7", "sepal_width": "3.0", "petal_length": "5.0", "petal_width": "1.7", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "2.9", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.6", "petal_length": "3.5", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.4", "petal_length": "3.8", "petal_width": "1.1", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.4", "petal_length": "3.7", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "3.9", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "2.7", "petal_length": "5.1", "petal_width": "1.6", "species": "versicolor"},
    {"sepal_length": "5.4", "sepal_width": "3.0", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "3.4", "petal_length": "4.5", "petal_width": "1.6", "species": "versicolor"},
    {"sepal_length": "6.7", "sepal_width": "3.1", "petal_length": "4.7", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "2.3", "petal_length": "4.4", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "3.0", "petal_length": "4.1", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.5", "petal_length": "4.0", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.6", "petal_length": "4.4", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "3.0", "petal_length": "4.6", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.8", "sepal_width": "2.6", "petal_length": "4.0", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "5.0", "sepal_width": "2.3", "petal_length": "3.3", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "2.7", "petal_length": "4.2", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "3.0", "petal_length": "4.2", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.9", "petal_length": "4.2", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.2", "sepal_width": "2.9", "petal_length": "4.3", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.1", "sepal_width": "2.5", "petal_length": "3.0", "petal_width": "1.1", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.8", "petal_length": "4.1", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "3.3", "petal_length": "6.0", "petal_width": "2.5", "species": "virginica"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "5.1", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "7.1", "sepal_width": "3.0", "petal_length": "5.9", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.9", "petal_length": "5.6", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.0", "petal_length": "5.8", "petal_width": "2.2", "species": "virginica"},
    {"sepal_length": "7.6", "sepal_width": "3.0", "petal_length": "6.6", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "4.9", "sepal_width": "2.5", "petal_length": "4.5", "petal_width": "1.7", "species": "virginica"},
    {"sepal_length": "7.3", "sepal_width": "2.9", "petal_length": "6.3", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "2.5", "petal_length": "5.8", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "7.2", "sepal_width": "3.6", "petal_length": "6.1", "petal_width": "2.5", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.2", "petal_length": "5.1", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "2.7", "petal_length": "5.3", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "6.8", "sepal_width": "3.0", "petal_length": "5.5", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "5.7", "sepal_width": "2.5", "petal_length": "5.0", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "5.8", "sepal_width": "2.8", "petal_length": "5.1", "petal_width": "2.4", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "3.2", "petal_length": "5.3", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.0", "petal_length": "5.5", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "3.8", "petal_length": "6.7", "petal_width": "2.2", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "2.6", "petal_length": "6.9", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.0", "sepal_width": "2.2", "petal_length": "5.0", "petal_width": "1.5", "species": "virginica"},
    {"sepal_length": "6.9", "sepal_width": "3.2", "petal_length": "5.7", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "5.6", "sepal_width": "2.8", "petal_length": "4.9", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "2.8", "petal_length": "6.7", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.7", "petal_length": "4.9", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.3", "petal_length": "5.7", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "7.2", "sepal_width": "3.2", "petal_length": "6.0", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.2", "sepal_width": "2.8", "petal_length": "4.8", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.1", "sepal_width": "3.0", "petal_length": "4.9", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "2.8", "petal_length": "5.6", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "7.2", "sepal_width": "3.0", "petal_length": "5.8", "petal_width": "1.6", "species": "virginica"},
    {"sepal_length": "7.4", "sepal_width": "2.8", "petal_length": "6.1", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "7.9", "sepal_width": "3.8", "petal_length": "6.4", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "2.8", "petal_length": "5.6", "petal_width": "2.2", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.8", "petal_length": "5.1", "petal_width": "1.5", "species": "virginica"},
    {"sepal_length": "6.1", "sepal_width": "2.6", "petal_length": "5.6", "petal_width": "1.4", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "3.0", "petal_length": "6.1", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "3.4", "petal_length": "5.6", "petal_width": "2.4", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "3.1", "petal_length": "5.5", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.0", "sepal_width": "3.0", "petal_length": "4.8", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.9", "sepal_width": "3.1", "petal_length": "5.4", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.1", "petal_length": "5.6", "petal_width": "2.4", "species": "virginica"},
    {"sepal_length": "6.9", "sepal_width": "3.1", "petal_length": "5.1", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "5.1", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "6.8", "sepal_width": "3.2", "petal_length": "5.9", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.3", "petal_length": "5.7", "petal_width": "2.5", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.0", "petal_length": "5.2", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.5", "petal_length": "5.0", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.0", "petal_length": "5.2", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.2", "sepal_width": "3.4", "petal_length": "5.4", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "5.9", "sepal_width": "3.0", "petal_length": "5.1", "petal_width": "1.8", "species": "virginica"}
]

irisTesting = [
    {"sepal_length": "5.4", "sepal_width": "3.9", "petal_length":"", "petal_width":"", "species":"",},
    {"sepal_length": "5.9", "sepal_width": "3", "petal_length":"", "petal_width":"", "species":"",},
    {"sepal_length": "5.6", "sepal_width": "", "petal_length":"", "petal_width":"", "species":"",}
]

// convert/setup our data
const trainingData = tf.tensor2d(iris.map(item => [
  parseFloat(item.sepal_length), parseFloat(item.sepal_width), parseFloat(item.petal_length), parseFloat(item.petal_width),
]))
const outputData = tf.tensor2d(iris.map(item => [
  item.species === "setosa" ? 1 : 0,
  item.species === "virginica" ? 1 : 0,
  item.species === "versicolor" ? 1 : 0,
]))
const testingData = tf.tensor2d(irisTesting.map(item => [
  parseFloat(item.sepal_length), parseFloat(item.sepal_width), parseFloat(item.petal_length), parseFloat(item.petal_width),
]))

// build neural network
const model = tf.sequential()

model.add(tf.layers.dense({
  inputShape: [4],
  activation: "sigmoid",
  units: 5,
}))
model.add(tf.layers.dense({
  inputShape: [5],
  activation: "sigmoid",
  units: 3,
}))
model.add(tf.layers.dense({
  activation: "sigmoid",
  units: 3,
}))
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(.06),
})
// train/fit our network
const startTime = Date.now()
model.fit(trainingData, outputData, {epochs: 100})
  .then((history) => {
    // console.log(history)
    model.predict(testingData).print()
  })
// test network

~~~


<script>
iris = [
    {"sepal_length": "5.1", "sepal_width": "3.5", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.0", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.7", "sepal_width": "3.2", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.6", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.9", "petal_length": "1.7", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.4", "petal_length": "1.4", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.4", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.4", "sepal_width": "2.9", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.7", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.4", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.0", "petal_length": "1.4", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "4.3", "sepal_width": "3.0", "petal_length": "1.1", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.8", "sepal_width": "4.0", "petal_length": "1.2", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.7", "sepal_width": "4.4", "petal_length": "1.5", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.9", "petal_length": "1.3", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.5", "petal_length": "1.4", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.7", "sepal_width": "3.8", "petal_length": "1.7", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.8", "petal_length": "1.5", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.4", "petal_length": "1.7", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.7", "petal_length": "1.5", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.6", "petal_length": "1.0", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.3", "petal_length": "1.7", "petal_width": "0.5", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.4", "petal_length": "1.9", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.0", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.4", "petal_length": "1.6", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.2", "sepal_width": "3.5", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.2", "sepal_width": "3.4", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.7", "sepal_width": "3.2", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.1", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.4", "sepal_width": "3.4", "petal_length": "1.5", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "5.2", "sepal_width": "4.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.5", "sepal_width": "4.2", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.2", "petal_length": "1.2", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.5", "sepal_width": "3.5", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.9", "sepal_width": "3.1", "petal_length": "1.5", "petal_width": "0.1", "species": "setosa"},
    {"sepal_length": "4.4", "sepal_width": "3.0", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.4", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.5", "petal_length": "1.3", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "4.5", "sepal_width": "2.3", "petal_length": "1.3", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "4.4", "sepal_width": "3.2", "petal_length": "1.3", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.5", "petal_length": "1.6", "petal_width": "0.6", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.8", "petal_length": "1.9", "petal_width": "0.4", "species": "setosa"},
    {"sepal_length": "4.8", "sepal_width": "3.0", "petal_length": "1.4", "petal_width": "0.3", "species": "setosa"},
    {"sepal_length": "5.1", "sepal_width": "3.8", "petal_length": "1.6", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "4.6", "sepal_width": "3.2", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.3", "sepal_width": "3.7", "petal_length": "1.5", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "5.0", "sepal_width": "3.3", "petal_length": "1.4", "petal_width": "0.2", "species": "setosa"},
    {"sepal_length": "7.0", "sepal_width": "3.2", "petal_length": "4.7", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "6.4", "sepal_width": "3.2", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.9", "sepal_width": "3.1", "petal_length": "4.9", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.3", "petal_length": "4.0", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.5", "sepal_width": "2.8", "petal_length": "4.6", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.8", "petal_length": "4.5", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "3.3", "petal_length": "4.7", "petal_width": "1.6", "species": "versicolor"},
    {"sepal_length": "4.9", "sepal_width": "2.4", "petal_length": "3.3", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "6.6", "sepal_width": "2.9", "petal_length": "4.6", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.2", "sepal_width": "2.7", "petal_length": "3.9", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.0", "sepal_width": "2.0", "petal_length": "3.5", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.9", "sepal_width": "3.0", "petal_length": "4.2", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "2.2", "petal_length": "4.0", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "2.9", "petal_length": "4.7", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "2.9", "petal_length": "3.6", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.7", "sepal_width": "3.1", "petal_length": "4.4", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "3.0", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "4.1", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "6.2", "sepal_width": "2.2", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "2.5", "petal_length": "3.9", "petal_width": "1.1", "species": "versicolor"},
    {"sepal_length": "5.9", "sepal_width": "3.2", "petal_length": "4.8", "petal_width": "1.8", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "2.8", "petal_length": "4.0", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "2.5", "petal_length": "4.9", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "2.8", "petal_length": "4.7", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "6.4", "sepal_width": "2.9", "petal_length": "4.3", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.6", "sepal_width": "3.0", "petal_length": "4.4", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "6.8", "sepal_width": "2.8", "petal_length": "4.8", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "6.7", "sepal_width": "3.0", "petal_length": "5.0", "petal_width": "1.7", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "2.9", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.6", "petal_length": "3.5", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.4", "petal_length": "3.8", "petal_width": "1.1", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.4", "petal_length": "3.7", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "3.9", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "2.7", "petal_length": "5.1", "petal_width": "1.6", "species": "versicolor"},
    {"sepal_length": "5.4", "sepal_width": "3.0", "petal_length": "4.5", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.0", "sepal_width": "3.4", "petal_length": "4.5", "petal_width": "1.6", "species": "versicolor"},
    {"sepal_length": "6.7", "sepal_width": "3.1", "petal_length": "4.7", "petal_width": "1.5", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "2.3", "petal_length": "4.4", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "3.0", "petal_length": "4.1", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.5", "petal_length": "4.0", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.5", "sepal_width": "2.6", "petal_length": "4.4", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "6.1", "sepal_width": "3.0", "petal_length": "4.6", "petal_width": "1.4", "species": "versicolor"},
    {"sepal_length": "5.8", "sepal_width": "2.6", "petal_length": "4.0", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "5.0", "sepal_width": "2.3", "petal_length": "3.3", "petal_width": "1.0", "species": "versicolor"},
    {"sepal_length": "5.6", "sepal_width": "2.7", "petal_length": "4.2", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "3.0", "petal_length": "4.2", "petal_width": "1.2", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.9", "petal_length": "4.2", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.2", "sepal_width": "2.9", "petal_length": "4.3", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "5.1", "sepal_width": "2.5", "petal_length": "3.0", "petal_width": "1.1", "species": "versicolor"},
    {"sepal_length": "5.7", "sepal_width": "2.8", "petal_length": "4.1", "petal_width": "1.3", "species": "versicolor"},
    {"sepal_length": "6.3", "sepal_width": "3.3", "petal_length": "6.0", "petal_width": "2.5", "species": "virginica"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "5.1", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "7.1", "sepal_width": "3.0", "petal_length": "5.9", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.9", "petal_length": "5.6", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.0", "petal_length": "5.8", "petal_width": "2.2", "species": "virginica"},
    {"sepal_length": "7.6", "sepal_width": "3.0", "petal_length": "6.6", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "4.9", "sepal_width": "2.5", "petal_length": "4.5", "petal_width": "1.7", "species": "virginica"},
    {"sepal_length": "7.3", "sepal_width": "2.9", "petal_length": "6.3", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "2.5", "petal_length": "5.8", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "7.2", "sepal_width": "3.6", "petal_length": "6.1", "petal_width": "2.5", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.2", "petal_length": "5.1", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "2.7", "petal_length": "5.3", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "6.8", "sepal_width": "3.0", "petal_length": "5.5", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "5.7", "sepal_width": "2.5", "petal_length": "5.0", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "5.8", "sepal_width": "2.8", "petal_length": "5.1", "petal_width": "2.4", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "3.2", "petal_length": "5.3", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.0", "petal_length": "5.5", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "3.8", "petal_length": "6.7", "petal_width": "2.2", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "2.6", "petal_length": "6.9", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.0", "sepal_width": "2.2", "petal_length": "5.0", "petal_width": "1.5", "species": "virginica"},
    {"sepal_length": "6.9", "sepal_width": "3.2", "petal_length": "5.7", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "5.6", "sepal_width": "2.8", "petal_length": "4.9", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "2.8", "petal_length": "6.7", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.7", "petal_length": "4.9", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.3", "petal_length": "5.7", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "7.2", "sepal_width": "3.2", "petal_length": "6.0", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.2", "sepal_width": "2.8", "petal_length": "4.8", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.1", "sepal_width": "3.0", "petal_length": "4.9", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "2.8", "petal_length": "5.6", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "7.2", "sepal_width": "3.0", "petal_length": "5.8", "petal_width": "1.6", "species": "virginica"},
    {"sepal_length": "7.4", "sepal_width": "2.8", "petal_length": "6.1", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "7.9", "sepal_width": "3.8", "petal_length": "6.4", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "2.8", "petal_length": "5.6", "petal_width": "2.2", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.8", "petal_length": "5.1", "petal_width": "1.5", "species": "virginica"},
    {"sepal_length": "6.1", "sepal_width": "2.6", "petal_length": "5.6", "petal_width": "1.4", "species": "virginica"},
    {"sepal_length": "7.7", "sepal_width": "3.0", "petal_length": "6.1", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "3.4", "petal_length": "5.6", "petal_width": "2.4", "species": "virginica"},
    {"sepal_length": "6.4", "sepal_width": "3.1", "petal_length": "5.5", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.0", "sepal_width": "3.0", "petal_length": "4.8", "petal_width": "1.8", "species": "virginica"},
    {"sepal_length": "6.9", "sepal_width": "3.1", "petal_length": "5.4", "petal_width": "2.1", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.1", "petal_length": "5.6", "petal_width": "2.4", "species": "virginica"},
    {"sepal_length": "6.9", "sepal_width": "3.1", "petal_length": "5.1", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "5.8", "sepal_width": "2.7", "petal_length": "5.1", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "6.8", "sepal_width": "3.2", "petal_length": "5.9", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.3", "petal_length": "5.7", "petal_width": "2.5", "species": "virginica"},
    {"sepal_length": "6.7", "sepal_width": "3.0", "petal_length": "5.2", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "6.3", "sepal_width": "2.5", "petal_length": "5.0", "petal_width": "1.9", "species": "virginica"},
    {"sepal_length": "6.5", "sepal_width": "3.0", "petal_length": "5.2", "petal_width": "2.0", "species": "virginica"},
    {"sepal_length": "6.2", "sepal_width": "3.4", "petal_length": "5.4", "petal_width": "2.3", "species": "virginica"},
    {"sepal_length": "5.9", "sepal_width": "3.0", "petal_length": "5.1", "petal_width": "1.8", "species": "virginica"}
]

irisTesting = [
    {"sepal_length": "5.4", "sepal_width": "3.9", "petal_length":"1.7", "petal_width":"0.4", "species":"setosa",},
    {"sepal_length": "5.9", "sepal_width": "3", "petal_length":"5.1", "petal_width":"1.8", "species":"virginica",},
    {"sepal_length": "5.6", "sepal_width": "2.9", "petal_length":"4.2", "petal_width":"1.3", "species":"versicolor",}
]

// convert/setup our data
const trainingData = tf.tensor2d(iris.map(item => [
  parseFloat(item.sepal_length), parseFloat(item.sepal_width), parseFloat(item.petal_length), parseFloat(item.petal_width),
]))
const outputData = tf.tensor2d(iris.map(item => [
  item.species === "setosa" ? 1 : 0,
  item.species === "virginica" ? 1 : 0,
  item.species === "versicolor" ? 1 : 0,
]))
const testingData = tf.tensor2d(irisTesting.map(item => [
  parseFloat(item.sepal_length), parseFloat(item.sepal_width), parseFloat(item.petal_length), parseFloat(item.petal_width),
]))

// build neural network
const model = tf.sequential()

model.add(tf.layers.dense({
  inputShape: [4],
  activation: "sigmoid",
  units: 5,
}))
model.add(tf.layers.dense({
  inputShape: [5],
  activation: "sigmoid",
  units: 3,
}))
model.add(tf.layers.dense({
  activation: "sigmoid",
  units: 3,
}))
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(.06),
})
// train/fit our network
const startTime = Date.now()
model.fit(trainingData, outputData, {epochs: 100})
  .then((history) => {
    // console.log(history)
    model.predict(testingData).print();
  })
// test network
</script>

## :heart: 如果真的認真看到這裡的話 請按 f12 看看 console 有沒有一個長得很像:
~~~javascript
// 哈哈哈 用你電腦 train 了一個小 model 然後又順便測試了一下 這 model OK 不 OK~~ YA!
Tensor
     [[0.9712404, 0.001853 , 0.088761 ],
     [0.0020284, 0.9328192, 0.1161195],
     [0.0264381, 0.0329727, 0.8904994]]

~~~
- 跟我們 Testing 比較:
   - 上面 Tensor 第一個row 的結果 大約趨近於 [1, 0 ,0]
   - 上面 Tensor 第二個row 的結果 大約趨近於 [0, 1 ,0]
   - 上面 Tensor 第三個row 的結果 大約趨近於 [0, 0 ,1]
~~~javascript
irisTesting = [
    {"sepal_length": "5.4", "sepal_width": "3.9", "petal_length":"1.7", "petal_width":"0.4", "species":"setosa",},
    {"sepal_length": "5.9", "sepal_width": "3", "petal_length":"5.1", "petal_width":"1.8", "species":"virginica",},
    {"sepal_length": "5.6", "sepal_width": "2.9", "petal_length":"4.2", "petal_width":"1.3", "species":"versicolor",}
]
~~~

> 恩~~ 很棒棒 測試資料都正確:)


> 資料很重要! 好的、乾淨的、整理過的資料，對訓練 model 就跟呼吸一樣平常且重要! 重要! 重要!

> 所以多看一下IRIS 資料的 TABLE 吧  XDD

|sepal.length|sepal.width|petal.length|petal.width|variety|
|5.1|3.5|1.4|.2|"Setosa"|
|4.9|3|1.4|.2|"Setosa"|
|4.7|3.2|1.3|.2|"Setosa"|
|4.6|3.1|1.5|.2|"Setosa"|
|5|3.6|1.4|.2|"Setosa"|
|5.4|3.9|1.7|.4|"Setosa"|
|4.6|3.4|1.4|.3|"Setosa"|
|5|3.4|1.5|.2|"Setosa"|
|4.4|2.9|1.4|.2|"Setosa"|
|4.9|3.1|1.5|.1|"Setosa"|
|5.4|3.7|1.5|.2|"Setosa"|
|4.8|3.4|1.6|.2|"Setosa"|
|4.8|3|1.4|.1|"Setosa"|
|4.3|3|1.1|.1|"Setosa"|
|5.8|4|1.2|.2|"Setosa"|
|5.7|4.4|1.5|.4|"Setosa"|
|5.4|3.9|1.3|.4|"Setosa"|
|5.1|3.5|1.4|.3|"Setosa"|
|5.7|3.8|1.7|.3|"Setosa"|
|5.1|3.8|1.5|.3|"Setosa"|
|5.4|3.4|1.7|.2|"Setosa"|
|5.1|3.7|1.5|.4|"Setosa"|
|4.6|3.6|1|.2|"Setosa"|
|5.1|3.3|1.7|.5|"Setosa"|
|4.8|3.4|1.9|.2|"Setosa"|
|5|3|1.6|.2|"Setosa"|
|5|3.4|1.6|.4|"Setosa"|
|5.2|3.5|1.5|.2|"Setosa"|
|5.2|3.4|1.4|.2|"Setosa"|
|4.7|3.2|1.6|.2|"Setosa"|
|4.8|3.1|1.6|.2|"Setosa"|
|5.4|3.4|1.5|.4|"Setosa"|
|5.2|4.1|1.5|.1|"Setosa"|
|5.5|4.2|1.4|.2|"Setosa"|
|4.9|3.1|1.5|.2|"Setosa"|
|5|3.2|1.2|.2|"Setosa"|
|5.5|3.5|1.3|.2|"Setosa"|
|4.9|3.6|1.4|.1|"Setosa"|
|4.4|3|1.3|.2|"Setosa"|
|5.1|3.4|1.5|.2|"Setosa"|
|5|3.5|1.3|.3|"Setosa"|
|4.5|2.3|1.3|.3|"Setosa"|
|4.4|3.2|1.3|.2|"Setosa"|
|5|3.5|1.6|.6|"Setosa"|
|5.1|3.8|1.9|.4|"Setosa"|
|4.8|3|1.4|.3|"Setosa"|
|5.1|3.8|1.6|.2|"Setosa"|
|4.6|3.2|1.4|.2|"Setosa"|
|5.3|3.7|1.5|.2|"Setosa"|
|5|3.3|1.4|.2|"Setosa"|
|7|3.2|4.7|1.4|"Versicolor"|
|6.4|3.2|4.5|1.5|"Versicolor"|
|6.9|3.1|4.9|1.5|"Versicolor"|
|5.5|2.3|4|1.3|"Versicolor"|
|6.5|2.8|4.6|1.5|"Versicolor"|
|5.7|2.8|4.5|1.3|"Versicolor"|
|6.3|3.3|4.7|1.6|"Versicolor"|
|4.9|2.4|3.3|1|"Versicolor"|
|6.6|2.9|4.6|1.3|"Versicolor"|
|5.2|2.7|3.9|1.4|"Versicolor"|
|5|2|3.5|1|"Versicolor"|
|5.9|3|4.2|1.5|"Versicolor"|
|6|2.2|4|1|"Versicolor"|
|6.1|2.9|4.7|1.4|"Versicolor"|
|5.6|2.9|3.6|1.3|"Versicolor"|
|6.7|3.1|4.4|1.4|"Versicolor"|
|5.6|3|4.5|1.5|"Versicolor"|
|5.8|2.7|4.1|1|"Versicolor"|
|6.2|2.2|4.5|1.5|"Versicolor"|
|5.6|2.5|3.9|1.1|"Versicolor"|
|5.9|3.2|4.8|1.8|"Versicolor"|
|6.1|2.8|4|1.3|"Versicolor"|
|6.3|2.5|4.9|1.5|"Versicolor"|
|6.1|2.8|4.7|1.2|"Versicolor"|
|6.4|2.9|4.3|1.3|"Versicolor"|
|6.6|3|4.4|1.4|"Versicolor"|
|6.8|2.8|4.8|1.4|"Versicolor"|
|6.7|3|5|1.7|"Versicolor"|
|6|2.9|4.5|1.5|"Versicolor"|
|5.7|2.6|3.5|1|"Versicolor"|
|5.5|2.4|3.8|1.1|"Versicolor"|
|5.5|2.4|3.7|1|"Versicolor"|
|5.8|2.7|3.9|1.2|"Versicolor"|
|6|2.7|5.1|1.6|"Versicolor"|
|5.4|3|4.5|1.5|"Versicolor"|
|6|3.4|4.5|1.6|"Versicolor"|
|6.7|3.1|4.7|1.5|"Versicolor"|
|6.3|2.3|4.4|1.3|"Versicolor"|
|5.6|3|4.1|1.3|"Versicolor"|
|5.5|2.5|4|1.3|"Versicolor"|
|5.5|2.6|4.4|1.2|"Versicolor"|
|6.1|3|4.6|1.4|"Versicolor"|
|5.8|2.6|4|1.2|"Versicolor"|
|5|2.3|3.3|1|"Versicolor"|
|5.6|2.7|4.2|1.3|"Versicolor"|
|5.7|3|4.2|1.2|"Versicolor"|
|5.7|2.9|4.2|1.3|"Versicolor"|
|6.2|2.9|4.3|1.3|"Versicolor"|
|5.1|2.5|3|1.1|"Versicolor"|
|5.7|2.8|4.1|1.3|"Versicolor"|
|6.3|3.3|6|2.5|"Virginica"|
|5.8|2.7|5.1|1.9|"Virginica"|
|7.1|3|5.9|2.1|"Virginica"|
|6.3|2.9|5.6|1.8|"Virginica"|
|6.5|3|5.8|2.2|"Virginica"|
|7.6|3|6.6|2.1|"Virginica"|
|4.9|2.5|4.5|1.7|"Virginica"|
|7.3|2.9|6.3|1.8|"Virginica"|
|6.7|2.5|5.8|1.8|"Virginica"|
|7.2|3.6|6.1|2.5|"Virginica"|
|6.5|3.2|5.1|2|"Virginica"|
|6.4|2.7|5.3|1.9|"Virginica"|
|6.8|3|5.5|2.1|"Virginica"|
|5.7|2.5|5|2|"Virginica"|
|5.8|2.8|5.1|2.4|"Virginica"|
|6.4|3.2|5.3|2.3|"Virginica"|
|6.5|3|5.5|1.8|"Virginica"|
|7.7|3.8|6.7|2.2|"Virginica"|
|7.7|2.6|6.9|2.3|"Virginica"|
|6|2.2|5|1.5|"Virginica"|
|6.9|3.2|5.7|2.3|"Virginica"|
|5.6|2.8|4.9|2|"Virginica"|
|7.7|2.8|6.7|2|"Virginica"|
|6.3|2.7|4.9|1.8|"Virginica"|
|6.7|3.3|5.7|2.1|"Virginica"|
|7.2|3.2|6|1.8|"Virginica"|
|6.2|2.8|4.8|1.8|"Virginica"|
|6.1|3|4.9|1.8|"Virginica"|
|6.4|2.8|5.6|2.1|"Virginica"|
|7.2|3|5.8|1.6|"Virginica"|
|7.4|2.8|6.1|1.9|"Virginica"|
|7.9|3.8|6.4|2|"Virginica"|
|6.4|2.8|5.6|2.2|"Virginica"|
|6.3|2.8|5.1|1.5|"Virginica"|
|6.1|2.6|5.6|1.4|"Virginica"|
|7.7|3|6.1|2.3|"Virginica"|
|6.3|3.4|5.6|2.4|"Virginica"|
|6.4|3.1|5.5|1.8|"Virginica"|
|6|3|4.8|1.8|"Virginica"|
|6.9|3.1|5.4|2.1|"Virginica"|
|6.7|3.1|5.6|2.4|"Virginica"|
|6.9|3.1|5.1|2.3|"Virginica"|
|5.8|2.7|5.1|1.9|"Virginica"|
|6.8|3.2|5.9|2.3|"Virginica"|
|6.7|3.3|5.7|2.5|"Virginica"|
|6.7|3|5.2|2.3|"Virginica"|
|6.3|2.5|5|1.9|"Virginica"|
|6.5|3|5.2|2|"Virginica"|
|6.2|3.4|5.4|2.3|"Virginica"|
|5.9|3|5.1|1.8|"Virginica"|