---
layout: "single"
title: 'Principal Component Analysis'
permalink: 'ml-coursera/week8/principal-component-analysis'
tags: coursera-machine-learning dimensionality-reduction PCA
---

> week 8 延了 一週 因為上禮拜的 machine learning 課程太過瘋狂 XDDD 
<br/>
> 好~ GOGO!


### [Principal Component Analysis (PCA): problem formulation](https://www.coursera.org/learn/machine-learning/lecture/GBFTt/principal-component-analysis-problem-formulation){:target="_back"}


__PCA: problem formulation__

   ![Imgur](https://i.imgur.com/MHd2sDL.gif)

   - Reduce from 2-dimension to 1-dimension: Find a direction (a vector) onto which to project the data so as to minimize the projection error.

   - Reduce from n-dimension to k-dimension: Find k vectors onto which to project the data, so as to minimize the projection error. 


> 不得不說實話，還是大神教的好 ! 真的棒啊 :heart:


__PCA is not linear regression__


|![Imgur](https://i.imgur.com/xtfyqUA.gif)|![Imgur](https://i.imgur.com/kkTh0HU.gif)|



### [Principal Component Analysis (PCA): Algorithm](https://www.coursera.org/learn/machine-learning/lecture/ZYIPa/principal-component-analysis-algorithm){:target="_back"}


__Data preprocessing__

![Imgur](https://i.imgur.com/D84yQh3.gif)

![Imgur](https://i.imgur.com/YM2q6SF.gif)

![Imgur](https://i.imgur.com/eHKLZHK.gif)


### [Applying PCA:Reconstruction from Compressed Representation](https://www.coursera.org/learn/machine-learning/lecture/X8JoQ/reconstruction-from-compressed-representation){:target="_back"}


__Reconstuction:__

![Imgur](https://i.imgur.com/CztwF1P.gif)

![Imgur](https://i.imgur.com/sUdZzwK.gif)




### [Applying PCA:Choosing the Number of Principal Components](https://www.coursera.org/learn/machine-learning/lecture/S1bq1/choosing-the-number-of-principal-components){:target="_back"}


__Choosing k__

> variance 還是會保持住!!! 

![Imgur](https://i.imgur.com/ZodduOB.gif)

> 大神自己用octave 的時候 也直接用 svd funcs 來做 XDD

![Imgur](https://i.imgur.com/ehavx8D.gif)

![Imgur](https://i.imgur.com/CYDZ9Ll.gif)



### [Advice for Applying PCA](https://www.coursera.org/learn/machine-learning/lecture/RBqQl/advice-for-applying-pca){:target="_back"}


> 大神教到這邊的時候，我突然想到一個問題，在 python sklearn 的套件下，我們要給 `n_components` 的數值，疑問就來了~ 那要如何決定要幾個?
<br/>
> 速度查，看到這篇 [好棒棒的文章](https://towardsdatascience.com/an-approach-to-choosing-the-number-of-components-in-a-principal-component-analysis-pca-3b9f3d6e73fe){:target="_back"} :heart:

__Supervised learning speedup__

> 用 PCA 來做 __數據壓縮__!!! (我看 [書](https://www.tenlong.com.tw/products/9789864342723?list_name=rd){:target="_back"} 上寫的名詞 XDDD)

> 結果無意間發現這 [超級超級棒棒的資源](https://machine-learning-python.kspax.io/){:target="_back"}, [資源源源](https://machine-learning-python.kspax.io/){:target="_back"}


![Imgur](https://i.imgur.com/xwkzM1M.gif)


![Imgur](https://i.imgur.com/HYbKyCv.gif)

__Bad use of PCA: To prevent overfitting__

![Imgur](https://i.imgur.com/O4h1ygw.gif)


__PCA is sometimes used where it shouldn't be__


![Imgur](https://i.imgur.com/UxOKZzS.gif)


__Quiz__

![Imgur](https://i.imgur.com/LYTRtJh.gif)

