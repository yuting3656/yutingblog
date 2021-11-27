---
layout: "single"
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

- Sigmoid

   - Sigmoid 方程式

      ![Imgur](https://i.imgur.com/uKSEjKB.gif)

      ~~~python
      def sigmoid(X):
          output = 1 / ( 1 + np.exp(-X) )
          return output
      ~~~

      ~~~python
      # Examples
      X = np.arange(5)
      sigmoid(X)
      # array([0.5 , 0.73105858, 0.88079708, 0.95257413, 0.98201379])
      ~~~

- Sigmoid Gradient:

   - Sigmoid Gradient 式子

      ![Imgur](https://i.imgur.com/d0KFGz1.gif)

      ~~~python
      def sigmoid_gradient(X):
          output = sigmoid(X) * (1 - sigmoid(X))
          return output
      ~~~

      ~~~python
      # Examples
      X = np.arange(5)
      sigmoid_gradient(X)
      # array([0.25 , 0.19661193, 0.10499359, 0.04517666, 0.01766271])
      ~~~

- Softmax:
    
    - Softmax & Sigmoid

       - sigmoid 至直接針對單一數值做壓縮

       - softmax 至針對一整組數字做壓縮

          - EX:
    
             ~~~
             如果我們有一組數列  1,3,5  
             Softmax 會回傳  0.016,0.117,0.867
             ~~~

    - Softmax 式子

       ![Imgur](https://i.imgur.com/tV6U9Zy.gif)
   
    - [看不懂 keepdims在寫沙姣?](https://stackoverflow.com/questions/39441517/in-numpy-sum-there-is-parameter-called-keepdims-what-does-it-do){:target="_back"}

       ~~~python
       def softmax(X):
           # Something to keeep in mind is that 
           # np.sum can control the direction we are summing over
           # which is why it is superior than the regular sum from python
           # but when the shape of a matrix is (n, ) instead of (n,1)
           # broadcasting can act in unexpected ways
           # you can use keepdims (function within np.sum) to make sure the shape is right
           # Write your code below!
           return np.exp(X) / np.sum(np.exp(X), axis=1, keepdims=True)
       ~~~

- Cross entropy (Multiclass)

   - Definition: Cross-entropy loss, or log loss, measures the performance of a classification model
whose output is a probability value between 0 and 1. Cross-entropy loss increases as the predicted
probability diverges from the actual label. So predicting a probability of .012 when the actual
observation label is 1 would be bad and result in a high loss value. A perfect model would have a 
log loss of 0.


   ![Imgur](https://i.imgur.com/fgMGmDq.gif)

   - [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week3/logistic-regression-model){:target="_back"}，有多少帶到一點觀念~ YA!
   - [我的筆記2](https://yuting3656.github.io/yutingblog//ml-coursera/week5/cost-function-and-backpropagation){:target="_back"}，有多少帶到一點觀念~ YA!


   ~~~python
   def cross_entropy(p, q):
    # As you probably notice
    # log(0) = negative infinity 
    # to avoid this we usually add a epsilon to our calculation
    # and in sklearn they like to use 1e-15
    # so thats what we'll be using here
    # Write your codes below!
    epsilon = 1e-15
    H = 0
    for i in range(len(p)):
        H += - p[i] * np.log(q[i]+epsilon)
    output = H.sum() / p.shape[0]
    return output
   ~~~

   ~~~python
   # Example
   p = np.array([[1,0,0]])
   q = np.array([[0.7, 0.2, 0.1]])
   cross_entropy(p,q)
   # 0.356674943938731
   ~~~


- One Hot Encoding

   - [我的筆記](https://yuting3656.github.io/yutingblog//ml-coursera/week4/neural-networks-applications){:target="_back"}

   - [how-to-one-hot-encode-in-python](https://machinelearningmastery.com/how-to-one-hot-encode-sequence-data-in-python/){:target="_back"}

> 超級舒服的練習!! 燒腦:)

   - 手刻 one hot encoding!!!
   
      ~~~python
      def one_hot_encoding(array):
      
          sorted_array = np.sort(array)
          count = 1
          unique = [sorted_array[0]]
          temp = sorted_array[0]
          for i in range(len(array)):
              if sorted_array[i] != temp:
                  count += 1
                  temp = sorted_array[i]
                  unique.append(temp)
          len_ = len(unique)
          eye = np.zeros((len_, len_))
          print('len_:', len_)
          print('unique', unique)
          for i in range(len_):
              eye[i, i] = 1
          print('eye: ', eye)
          for i in range(len(array)):
              for j in range(len(unique)):
                  if array[i] == unique[j]:
                      array[i] = j
                      print('changing array', array)
          result = eye[array]
          return result
      ~~~
      
      __example__
      
      ~~~python
      if __name__ == '__main__':
          array = ['John', 'Tim', 'Tom', 'John', 'Marry', 'Tom']
          one_hot = one_hot_encoding(array)
          print(one_hot)
      
      # len_: 4
      # unique ['John', 'Marry', 'Tim', 'Tom']
      # eye:  [[1. 0. 0. 0.]
      #  [0. 1. 0. 0.]
      #  [0. 0. 1. 0.]
      #  [0. 0. 0. 1.]]
      # changing array [0, 'Tim', 'Tom', 'John', 'Marry', 'Tom']
      # changing array [0, 2, 'Tom', 'John', 'Marry', 'Tom']
      # changing array [0, 2, 3, 'John', 'Marry', 'Tom']
      # changing array [0, 2, 3, 0, 'Marry', 'Tom']
      # changing array [0, 2, 3, 0, 1, 'Tom']
      # changing array [0, 2, 3, 0, 1, 3]
      # [[1. 0. 0. 0.]
      #  [0. 0. 1. 0.]
      #  [0. 0. 0. 1.]
      #  [1. 0. 0. 0.]
      #  [0. 1. 0. 0.]
      #  [0. 0. 0. 1.]]
      ~~~

### NN_BP_HANDCRAFT_7 (BackPropagation)

<iframe src="https://www.youtube.com/embed/QepktWBrQ70" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Neural Network

   ![Imgur](https://i.imgur.com/0Mq7tu1.gif)

   - working flow chart
   
   ![Imgur](https://i.imgur.com/iJVu61P.gif)

   ~~~python
   def two_layer_net(X, Y, W1, W2):
       # Forward
       z1 = np.matmul(X, W1)
       a1 = sigmoid(z1)
       z2 = np.matmul(a1, W2)
       out = softmax(z2)
       J = cross_entropy(Y, out)
       # Backward
       d2 = out - Y
       dW2 = np.matmul(a1.T, d2)
       d1 = np.matmul(d2, (W2.T))*sigmoid_gradient(a1)
       dW1 = np.matmul(X.T, d1)
   
       return J, dW1, dW2
   ~~~

   - example

    ~~~python
    iris = datasets.load_iris()
    X = iris.data
    Y = iris.target
    Y = one_hot_encoding(Y)
    names = iris.target_names
    
    X_train = np.vstack([X[0:40], X[50:90], X[100:140]])
    X_valid = np.vstack([X[40:45], X[90:95], X[140:145]])
    X_test = np.vstack([X[45:50], X[95:100], X[145:150]])
    
    Y_train = np.vstack([Y[0:40], Y[50:90], Y[100:140]])
    Y_valid = np.vstack([Y[40:45], Y[90:95], Y[140:145]])
    Y_test = np.vstack([Y[45:50], Y[95:100], Y[145:150]])
    
    # Neural Network
    iteration = 1000
    alpha = 0.01
    history_train = np.zeros((iteration, 1))
    history_valid = np.zeros((iteration, 1))
    
    np.random.seed(37)
    W1 = np.random.randn(4, 10)
    W2 = np.random.randn(10, 3)
    
    for i in range(iteration):
        J_train, dW1, dW2 = two_layer_net(X_train, Y_train, W1, W2)
        J_valid, _, _, = two_layer_net(X_valid, Y_valid, W1, W2)
        W1 -= alpha * dW1
        W2 -= alpha * dW2

        history_train[i] = J_train
        history_valid[i] = J_valid

        if (i+1) % 50 == 0:
            print("The training loss of the", i+1, "epoch is", history_train[i][0].round(4), ",", end="")
            print("The validation loss of the", i+1, "epoch is", history_valid[i][0].round(4))

    print("\n The loss of our testing set is", two_layer_net(X_test, Y_test, W1, W2)[0],round(4))
    
    # The training loss of the 50 epoch is 0.5166 ,The validation loss of the 50 epoch is 0.5436
    # The training loss of the 100 epoch is 0.4769 ,The validation loss of the 100 epoch is 0.5154
    # The training loss of the 150 epoch is 0.4492 ,The validation loss of the 150 epoch is 0.492
    # The training loss of the 200 epoch is 0.3166 ,The validation loss of the 200 epoch is 0.2497
    # The training loss of the 250 epoch is 0.244 ,The validation loss of the 250 epoch is 0.206
    # The training loss of the 300 epoch is 0.1796 ,The validation loss of the 300 epoch is 0.1811
    # The training loss of the 350 epoch is 0.122 ,The validation loss of the 350 epoch is 0.1271
    # The training loss of the 400 epoch is 0.1348 ,The validation loss of the 400 epoch is 0.0477
    # The training loss of the 450 epoch is 0.1349 ,The validation loss of the 450 epoch is 0.0451
    # The training loss of the 500 epoch is 0.1336 ,The validation loss of the 500 epoch is 0.0412
    # The training loss of the 550 epoch is 0.1308 ,The validation loss of the 550 epoch is 0.0373
    # The training loss of the 600 epoch is 0.1283 ,The validation loss of the 600 epoch is 0.0343
    # The training loss of the 650 epoch is 0.1264 ,The validation loss of the 650 epoch is 0.0322
    # The training loss of the 700 epoch is 0.1249 ,The validation loss of the 700 epoch is 0.0306
    # The training loss of the 750 epoch is 0.1238 ,The validation loss of the 750 epoch is 0.0293
    # The training loss of the 800 epoch is 0.1228 ,The validation loss of the 800 epoch is 0.0282
    # The training loss of the 850 epoch is 0.1221 ,The validation loss of the 850 epoch is 0.0272
    # The training loss of the 900 epoch is 0.1215 ,The validation loss of the 900 epoch is 0.0261
    # The training loss of the 950 epoch is 0.1212 ,The validation loss of the 950 epoch is 0.0251
    # The training loss of the 1000 epoch is 0.1213 ,The validation loss of the 1000 epoch is 0.0239
    # 
    # The loss of our testing set is 0.024856599493450916 4
    ~~~