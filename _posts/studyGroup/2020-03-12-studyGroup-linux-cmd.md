---
layout: 'post'
title: 'Study Group: 帆哥出品 品質保證 - Linux cmd '
permalink: 'stydeGroup/linux-tree-like-cmd'
tags: 讀書會 linux
---


## 練習

- 嘗試在 jan-dec 目錄下建立 [1 -100].txt

~~~
root@e03e6ed9f482:/exe# mkdir {jan,feb,apr,may,jun,jul,aug,sep,oct,nov,dec}_{2017..2022}
root@e03e6ed9f482:/exe# touch ./{jan,feb,apr,may,jun,jul,aug,sep,oct,nov,dec}_{2017..2022}/{1..100}.txt
root@e03e6ed9f482:/exe#
root@e03e6ed9f482:/exe# cd jul_2018
root@e03e6ed9f482:/exe/jul_2018# ls
 1.txt     19.txt   29.txt   39.txt   49.txt   59.txt   69.txt   79.txt   89.txt   99.txt
 10.txt    2.txt    3.txt    4.txt    5.txt    6.txt    7.txt    8.txt    9.txt   '[1-100].txt'
 100.txt   20.txt   30.txt   40.txt   50.txt   60.txt   70.txt   80.txt   90.txt
 11.txt    21.txt   31.txt   41.txt   51.txt   61.txt   71.txt   81.txt   91.txt
 12.txt    22.txt   32.txt   42.txt   52.txt   62.txt   72.txt   82.txt   92.txt
 13.txt    23.txt   33.txt   43.txt   53.txt   63.txt   73.txt   83.txt   93.txt
 14.txt    24.txt   34.txt   44.txt   54.txt   64.txt   74.txt   84.txt   94.txt
 15.txt    25.txt   35.txt   45.txt   55.txt   65.txt   75.txt   85.txt   95.txt
 16.txt    26.txt   36.txt   46.txt   56.txt   66.txt   76.txt   86.txt   96.txt
 17.txt    27.txt   37.txt   47.txt   57.txt   67.txt   77.txt   87.txt   97.txt
 18.txt    28.txt   38.txt   48.txt   58.txt   68.txt   78.txt   88.txt   98.txt
~~~

## Delete folder/file 

- rmdir __(只能刪除空目錄)__

- rm filename

- rm file2 file2 file3

- 可搭配 wildcard

- `-r`遞迴刪除目錄

- `-f`可強制刪除

- `-i` 每刪除一個都可詢問是否刪除

##  Delete 刪除

1. 刪除 jan_2018 檔案 包含 2 的檔案

   ~~~
   root@e03e6ed9f482:/exe# rm -r ./jan_2018/*2*.txt
   root@e03e6ed9f482:/exe# cd jan_2018/
   root@e03e6ed9f482:/exe/jan_2018# ls
    1.txt     18.txt   37.txt   46.txt   55.txt   64.txt   73.txt   81.txt   90.txt  '[1-100].txt'
    10.txt    19.txt   38.txt   47.txt   56.txt   65.txt   74.txt   83.txt   91.txt
    100.txt   3.txt    39.txt   48.txt   57.txt   66.txt   75.txt   84.txt   93.txt
    11.txt    30.txt   4.txt    49.txt   58.txt   67.txt   76.txt   85.txt   94.txt
    13.txt    31.txt   40.txt   5.txt    59.txt   68.txt   77.txt   86.txt   95.txt
    14.txt    33.txt   41.txt   50.txt   6.txt    69.txt   78.txt   87.txt   96.txt
    15.txt    34.txt   43.txt   51.txt   60.txt   7.txt    79.txt   88.txt   97.txt
    16.txt    35.txt   44.txt   53.txt   61.txt   70.txt   8.txt    89.txt   98.txt
    17.txt    36.txt   45.txt   54.txt   63.txt   71.txt   80.txt   9.txt    99.txt
   ~~~

2. 刪除 jan_2018 所有 .txt檔案


   ~~~
   root@e03e6ed9f482:/exe# rm -r ./jan_2018/*.txt
   root@e03e6ed9f482:/exe# cd jan_2018
   root@e03e6ed9f482:/exe/jan_2018# ls
   ~~~


3. 刪除 jan_2019 包含 2 or 3 之檔案

   ~~~
   root@e03e6ed9f482:/exe# rm -r ./jan_2019/*[2,3]*.txt
   root@e03e6ed9f482:/exe# cd jan_2019
   root@e03e6ed9f482:/exe/jan_2019# ls
    1.txt     17.txt   45.txt   51.txt   6.txt    68.txt   76.txt   84.txt   90.txt   99.txt
    10.txt    18.txt   46.txt   54.txt   60.txt   69.txt   77.txt   85.txt   91.txt  '[1-100].txt'
    100.txt   19.txt   47.txt   55.txt   61.txt   7.txt    78.txt   86.txt   94.txt
    11.txt    4.txt    48.txt   56.txt   64.txt   70.txt   79.txt   87.txt   95.txt
    14.txt    40.txt   49.txt   57.txt   65.txt   71.txt   8.txt    88.txt   96.txt
    15.txt    41.txt   5.txt    58.txt   66.txt   74.txt   80.txt   89.txt   97.txt
    16.txt    44.txt   50.txt   59.txt   67.txt   75.txt   81.txt   9.txt    98.txt
   ~~~

4. 刪除 project 目錄

   ~~~
    root@e03e6ed9f482:/exe# rm -r $(pwd)/*
   ~~~



