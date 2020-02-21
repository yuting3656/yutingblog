---
layout: 'post'
title: 'daily Programming: linux 檔案權限 帆哥出品  品質保證!'
permalink: 'daily-programming/linux-file-access'
tags: daily-programming linux 讀書會
---

### 三個腳色

1. 檔案擁有者
2. 群組
3. 其他人

## show linux 檔案屬性

- `ls -al`

- EX:

~~~
         連結數        檔案所屬群組    檔案最後修改日期
            |              |              |
drwxr-xr-x 11 tim23656 tim23656  4096 Dec  6 18:50 .
   |            |                  |                |
  權限         擁有者            檔案大小           檔名 [這邊.指當前目錄] (. 開頭通常為隱藏檔)
~~~

## 權限

- 第一個字元表示該檔案為: `目錄`、`檔案`或`連結`

- 共10個字元

- 第1個字元為檔案類型

- 後9個字元每三個一組，擁有者、群組與其他人權限

## 第一個字元介紹

- d：⽬錄

- -：檔案

- l(L⼩寫)：連結檔

- b：裝置檔中週邊設備

- c：裝置檔中序列埠設備，如鍵盤滑鼠

## 字元介紹

- r(read)：讀的權限
- w(write)：寫的權限
- x(exec)：執⾏的權限
- -：表⽰無權限
- rwx 權限位置是固定不變的


## 改變檔案屬性與權限

- chgrp：改變檔案所屬群組
- chown：改變檔案擁有者
- chmod：改變檔案權限


## 改變檔案權限 CHMOD


- 權限分為三個區塊，owner、group與 other
- 各⾃有 r w x權限
- 權限可以透過數字表⽰
   - r：4
   - w：2
   - x：1

- EX:

   - 如 r w x 權限可表⽰為 7 (4+ 2 + 1)
   - r - x 權限可表⽰為 5 (4 + 1)
   - \- \- \- 權限可表⽰為 0 

- \- r w x r \- x r \- \- 權限表⽰⽅式
   - r w x: 4 + 2 + 1 = 7
   - r \- x: 4 + 0 + 1 = 5
   - r \- \-: 4 + 0 + 0 = 4
   - r w x r \- x r \- \-可表⽰為 7 5 4


## 改權限

- chmod [-R] xyz dirName/fileName
- 如 chmod 754 file.txt
   - 檔案權限會變為 \- r w x r \- x r \- \-
- chmod 766 file.tx
   - 檔案權限會變為 \- r w x r w \- r w \-

### 以符號改變檔案權限

- 以 u, g, o 分別代表 user, group與other
   - a 所有人

- |![Imgur](https://i.imgur.com/tankeRP.gif)|


- ex:

   ~~~
   touch file.txt
   chmod u=rwx,go=rx file.txt
   ls -l
   ~~~

- ex: 假設⼀個檔案權限為 - r w x r - x r - x，希望讓所有⼈皆擁有寫入權限

   - `chmod a+w file.txt`

- ex: 假設⼀個檔案權限為 - r w x r - - r - -，希望讓其他⼈(others)皆擁有寫入權限

   - `chmod o+w file.txt`

- ex: 假設⼀個檔案權限為 - r w x r w x r - -，希望移除群組的 wx權限

   - `chmod g-wx file.txt`


## ⽬錄與權限所對應之意義

- 權限對檔案之重要性
   - r: 可讀取此檔案內容
   - w: 可編輯新增或修改檔案內容(不含刪除)
   - x: 檔案可被執⾏

- Linux與Windows不同，無法藉由負檔名判斷是否可執⾏，如 exe與 bat，檔案是否可執⾏與副檔名沒有絕對關係

- 檔案的w權限接只關係到對`檔案內容`的變更，與`檔案是否存在與檔名無關`


## ⽬錄與權限所對應之意義

- 權限對⽬錄之重要性

   - r: 可讀取此⽬錄資訊之權限，有r權限才能對⽬錄下 ls指令
   - w: 有w權限才有異動⽬錄結構的權限
      - 建立/ 刪除 檔案與⽬錄
      - 檔案/⽬錄改名
      - 搬移檔案/⽬錄
   - x: 代表使⽤者是否能進入該⽬錄成為⼯作⽬錄
      - ⼯作⽬錄：表⽰現在所處之⽬錄，透過cd切換後之⽬錄

## 看現在工作目錄權限

- `ls -ald`



