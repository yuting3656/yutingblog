---
layout: 'post'
title: 'aiacademy: 深度學習 Deep Learning 手刻神經網路!'
permalink: 'aiacademy/week4/deep-learning-hand-craft-nerual-network-and-backpropagation'
tags: aiacademy deep-learning neural-networks backpropagation
---

### 手刻就是帥!!!! :heart::heart::heart::heart::heart::heart::heart::heart::heart:

### NN_BP_HANDCRAFT_1

<iframe src="https://www.youtube.com/embed/65pIPhVx4l0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### NN_BP_HANDCRAFT_2

<iframe src="https://www.youtube.com/embed/RKYEUORyQtA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Derivative
   
   - 先來簡單的方程式:

      ![Imgur](https://i.imgur.com/9MoEegc.gif)
      ~~~python
      # Define our target function
      def my_function(x):
          # Write your code below!
          result = 0.05*x**2 + 0.8*x
          return result
      ~~~

   - 定義微分公式:

      ![Imgur](https://i.imgur.com/Uv3NVvy.gif)
      ~~~python
      # Define derivative
      epsilon = 0.1
      def derivative(f, x):
          # f in here stands for our function, and x is our input
          # I usually set a variable called epsilon, it represents a small number
          # Write your code below!
          h = epsilon
          result = (f(x + h) - f(x)) / h
          return result
      ~~~

- Partial Derivative
   
   - 再來定義定一個方程式:

      ![Imgur](https://i.imgur.com/BBE4G0g.gif)
      ~~~python
      def my_function2(X):
          # For me, I tend to use uppercase X to represent a list or a matrix
          # and use lowercase x to represent a single value
          # You can change the variable to whatever that you feel natural
          # just remember that the X here represent a list of two variables x and y
          # in which X[0] represents x and X[1] represents y
          # Write your code below!
          result = 2*X[0]**2 + 3*X[0]*X[1] + 5*X[1]**2
          return result
      ~~~

    
    - 定義篇微分方程式:

       ![Imgur](https://i.imgur.com/G1E0plC.gif)
       ~~~python
       def partial_derivative(f, X, i):
           # f is our function, and i is simply the index which we are
           # excuting our partial derivative on
           H = X.copy()
           h = epsilon
           H[i] = X[i] + h
           result = (f(H) - f(X)) /h
           return result
       """
       print('The partial with respect to x at (2, 3) is',partial_derivative(my_function2,    np.array([2., 3.]), 0))
       print('The partial with respect to y at (2, 3) is',partial_derivative(my_function2,    np.array([2., 3.]), 1))
       The partial with respect to x at (2, 3) is 17.000002003442205
       The partial with respect to y at (2, 3) is 36.000004996594726
       """
       ~~~


### NN_BP_HANDCRAFT_3

<iframe src="https://www.youtube.com/embed/6NKIl2gKJOw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Gradient 

   - Gradient 方程式

      ![Imgur](https://i.imgur.com/aFV49CO.gif)
      ~~~python
      def gradient(f, X):
          grad = []
          for i in range(len(X)):
              grad.append(partial_derivative(f, X, i))
          return grad
      ~~~



### NN_BP_HANDCRAFT_4

<iframe src="https://www.youtube.com/embed/FbaWjcEZ844" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Loss

   - MSE 方程式

      ![Imgur](https://i.imgur.com/IJjUWuW.gif)
      ~~~python
      def mse(actual, pred):
          MSE = 0
          for i in range(len(actual)):
              MSE += (actual[i]-pred[i])**2
          return MSE / len(actual)
      ~~~

### NN_BP_HANDCRAFT_5

<iframe src="https://www.youtube.com/embed/ZDQ8L_d3sYI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Model Building

   - 先來 import 好棒棒 iris 花花
      - [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week4/week1-to-week4-review-vs-tensorflowJS){:target="_back"}

      ~~~python
      from sklearn import datasets
      iris = datasets.load_iris()
      X = iris.data
      Y = iris.target
      Y = Y.reshape(len(Y), 1)
      names = iris.target_names
      # Train valid test split

      X_train = np.vstack([X[0:40], X[50:90], X[100:140]])
      X_valid = np.vstack([X[40:45], X[90:95], X[140:145]])
      X_test = np.vstack([X[45:50], X[95:100], X[145:150]])
      
      Y_train = np.vstack([Y[0:40], Y[50:90], Y[100:140]])
      Y_valid = np.vstack([Y[40:45], Y[90:95], Y[140:145]])
      Y_test = np.vstack([Y[45:50], Y[95:100], Y[145:150]])
      ~~~

   - 定義 __function__
      
      - ![Imgur](https://i.imgur.com/GeCvZzi.gif)
      - 這邊可以看[我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/review/week1-week2){:target="_back"}，大神介紹 cost function: J(θ0, θ1, ...)<br/>![img](https://i.imgur.com/XsaXu5wm.jpg?1)<br/>是不是長得很像阿~~哈哈　就是一樣的拉！
      <br/> [大神](https://www.coursera.org/learn/machine-learning/lecture/ka3jK/model-representation-i){:target="_back"}，在這邊有說到，"in neural networks, in the neural network literature sometimes you might hear people talk about weights of a model and weights just means exactly the same thing as parameters of a model." __意思就是W == θ__

      ~~~python
      def function_(W, data, target):
          z = np.matmul(data, W)
          f = mse(target, z) / 2
          return f
      ~~~


   - Gradient Descent

      - ![img](https://i.imgur.com/TQah4m9h.gif)
      - 我認為精華就在這張式子了

      ~~~python
      def gradient_descent(X_train, Y_train, X_valid, Y_valid, W, alpha, num_iters):
          m = len(Y_train)
          train_loss = np.zeros((num_iters, 1))
          valid_loss = np.zeros((num_iters, 1))
      
          for i in range(num_iters):
              A = np.matmul(X_train, W)
              delta = np.sum((A-Y_train)*X_train/m , axis=0)
              W -= alpha*delta.reshape(len(delta), 1)
      
              train_loss[i] = mse(Y_train, np.matmul(X_train, W))
              valid_loss[i] = mse(Y_valid, np.matmul(X_valid, W))
      
              if i % 10 == 0:
                  print("The training loss of the {} epoch is {}, and the validation loss of the {} epoch is {}"
                        .format(i+1, train_loss[i][0].round(4), i+1, valid_loss[i][0].round(4)))
      
          return W, train_loss, valid_loss
      ~~~

   - 結果：

      ~~~python
      if __name__ == "__main__":
          # Initializing
          np.random.seed(37)
          W = np.random.random((4, 1))
          W, train_loss, valid_loss = gradient_descent(X_train, Y_train, X_valid, Y_valid, W, 0.03, 100)
          predict = np.matmul(X_test, W).round()
          print('The MSE score of our prediction is ', mse(Y_test, predict)[0])
    
      """
      The training loss of the 1 epoch is 42.1148, and the validation loss of the 1 epoch is 39.4721
      The training loss of the 11 epoch is 2.715, and the validation loss of the 11 epoch is 2.4563
      The training loss of the 21 epoch is 0.2498, and the validation loss of the 21 epoch is 0.1886
      The training loss of the 31 epoch is 0.0764, and the validation loss of the 31 epoch is 0.0403
      The training loss of the 41 epoch is 0.0593, and the validation loss of the 41 epoch is 0.027
      The training loss of the 51 epoch is 0.0565, and the validation loss of the 51 epoch is 0.0244
      The training loss of the 61 epoch is 0.0557, and the validation loss of the 61 epoch is 0.0234
      The training loss of the 71 epoch is 0.0554, and the validation loss of the 71 epoch is 0.0229
      The training loss of the 81 epoch is 0.0553, and the validation loss of the 81 epoch is 0.0227
      The training loss of the 91 epoch is 0.0551, and the validation loss of the 91 epoch is 0.0225
      The MSE score of our prediction is  0.0
      """  
      ~~~


### NN_BP_HANDCRAFT_6 (BackPropagation)

<iframe src="https://www.youtube.com/embed/f0NCZYDaVls" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### NN_BP_HANDCRAFT_7 (BackPropagation)

<iframe src="https://www.youtube.com/embed/QepktWBrQ70" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>