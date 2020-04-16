---
layout: 'post'
title: 'Study Group: 凡歌出品 品質保證'
permalink: 'stydeGroup/pon-cors'
tags: 讀書會
---

## 練習 在 jan-dec 目錄建 

## Copy files /folders

   - cp file1 [file2 file3 ...] dest
   - cp -r srcFolder destFolder

## 練習 

- create test folder , in test folder create test{1..3}.txt
   1. 將 test.txt move ../
   2. test2.txt rename text2.pdf
   3. rename folder test to hello


## LOCATE

-  `-i` ignore case
- `-- limit N`
- `-e` 先檢查檔案 再輸出資料
- `-S` 輸出資料庫資訊


- 資料庫一天僅更新一次


## Find 

- 可設定 depth
- 特殊查詢
   - type
   - name
   - size
- show 找目錄, locate 列出檔案

- `find[PATH][option]`
- 列出所有東西
   ~~~
   [root@0fb7f7662cc0 test]# find
   .
   ./test2.txt
   ./test1.txt
   ./test3.txt
   ~~~

- 加目錄找位置
   
   ~~~
   [root@0fb7f7662cc0 /]# ls
   bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  test  tmp  usr  var
   [root@0fb7f7662cc0 /]#
   [root@0fb7f7662cc0 /]#
   [root@0fb7f7662cc0 /]#
   [root@0fb7f7662cc0 /]# find ./test
   ./test
   ./test/test2.txt
   ./test/test1.txt
   ./test/test3.txt
   ~~~

- find 

   - `-maxdepth(只有一個 - ) N`
   - `-type f|d`
   - `-name/iname name` i 忽略大小寫
   - `-size +/-N 單位`
      - `find ~ -size +100k`大於 100k 的檔案

         ~~~
         [root@0fb7f7662cc0 /]# find  ~ -size +1k
         /root
         /root/anaconda-ks.cfg
         /root/original-ks.cfg
         ~~~
      
      - `find ~ -name ?????.txt | wc-l` wc 數量

         ~~~
            [root@0fb7f7662cc0 /]# find ~ | wc -l
            9
         ~~~

## 練習

- 找尋檔案中 大於`100k` 且 `小於5M` 的檔案數量
- 小於 `100k` 或 `大於5M` 的檔案數量

![Imgur](https://i.imgur.com/elKfDTd.jpg)


## -exec 讓 find 搜尋出來後執行結果

- find ~ -size +5M `-exec` cp{}./copy_here\;

![Imgur](https://i.imgur.com/NeErZ9S.jpg)


## 練習

- 搜尋 home 大於 100k 檔案 ，把檔案複製到 ~/copy 下

## ls -lh

- `lh` human readable

## 大海撈針

![Imgur](https://i.imgur.com/rRDddjF.jpg)

- 在隨機目錄建立一個檔案
  - `touch ./folder$(shuf -i 1-500 -n 1)/needle.txt`

   ~~~
     [root@0fb7f7662cc0 temp]# find -name file1.txt
     ./folder232/file1.txt
     ./folder476/file1.txt
     ./folder234/file1.txt
     ./folder71/file1.txt
     ./folder18/file1.txt
     ./folder114/file1.txt
     ./folder150/file1.txt
     ./folder146/file1.txt
     ./folder383/file1.txt
     ./folder452/file1.txt
     ./folder21/file1.txt
     ./folder438/file1.txt
   ~~~
   
![Imgur](https://i.imgur.com/W397kJJ.jpg)

- `find ./ -name needle.txt -exec mv {} . \;`