---
layout: 'post'
title: 'Study Group: 凡哥出品 品質保證 - Linux 目錄結構 '
permalink: 'stydeGroup/linux-tree-like-structure'
tags: 讀書會 linux
---

## Redirection:

- [how do i save terminal output to a file](https://askubuntu.com/questions/420981/how-do-i-save-terminal-output-to-a-file){:target="_back"}

## Linux 目錄結構

- Tree-like structure
- 所有檔案皆可從/開始找起
- root user 帳號在系統中有 SUPER POWER!!!
- /home 目錄處存 一般帳號
   - `cd /home/`
- /root 目錄存 root user

- linux 中，附檔名不影響系統判斷檔案內容
   - ex: temp.png 改 temp.jpg, system 會依樣知道 temp 為 png 格式資料
   - 第三方安裝軟體，可能需要知道副檔名
   - 可使用 file 來看檔案的內容

## Wildcatd

- `*` 代表 0 ~ 多個
- `?` 一定有一個
- `[]` or 
- `[-]` ex: [0-9]
- `[^]` not

## 建造檔案

- touch
   - touxh text2.txt

- echo
   - echo 'hello world' > test.txt

- nano
- vi

## [讀檔案](https://riptutorial.com/ubuntu/example/17617/reading-a-text-file){:target="_back"}

- cat 
- more
- less

...

## 找檔案

- cd yuting

~~~
root@74c91245bee8:~# ls /yuting/*txt
/yuting/test.txt  /yuting/text3.txt
~~~

- 找數字的檔案

~~~
root@74c91245bee8:~# ls /yuting/*[0-9]*.txt
/yuting/text3.txt
~~~

- 找開頭不是大寫

~~~
root@74c91245bee8:~# ls /yuting/[^A-Z]*.txt
/yuting/52423423.txt  /yuting/test.txt  /yuting/test_333.txt  /yuting/text3.txt
~~~

## 複製檔案 

- 把有 `test` 關鍵字複製到 test 資料夾裡面

- cp
   - `root@74c91245bee8:~# cp /yuting/*[test]*.txt  ~/test`

   - ~~~
      root@74c91245bee8:~/test# ls
      E_yjt.txt  test.txt  test_333.txt  text3.txt
   ~~~

## 建造檔案、目錄

- 建造目錄
   - mkdir
     - 強制建造 `-p`
        - `mkdir -p ~/bla/bla/bla/myFolder`
     - 有空格的檔名
        - mkdir 'Hello World'
        - mkdir Hello\ World
        - ~~~
           root@74c91245bee8:~/bla# mkdir Hello\ World
           root@74c91245bee8:~/bla# ls
           'Hello World'   bla
        ~~~        

- 建造檔案
   - touch
   - echo
   - vi
   - nano

## Brace Expansion

- Bash brace expansion is used to `generate stings` at the command line or in a shell script

-  mkdir{jan,feb.mar,apr,may,jun,jul,aug,sep,oct,nov,dec}_{2017..2022}

- 

~~~
root@74c91245bee8:/yuting# mkdir {1..12}_{2017..2020}
root@74c91245bee8:/yuting# ls
 10_2017   11_2017   12_2017   1_2017   2_2017   3_2017   4_2017   52423423.txt   5_2020   6_2020   7_2020   8_2020   9_2020      test_333.txt
 10_2018   11_2018   12_2018   1_2018   2_2018   3_2018   4_2018   5_2017         6_2017   7_2017   8_2017   9_2017   E_yjt.txt   text3.txt
 10_2019   11_2019   12_2019   1_2019   2_2019   3_2019   4_2019   5_2018         6_2018   7_2018   8_2018   9_2018  '[A'
 10_2020   11_2020   12_2020   1_2020   2_2020   3_2020   4_2020   5_2019         6_2019   7_2019   8_2019   9_2019   test.txt
~~~

- 

~~~
root@74c91245bee8:/yuting/months# mkdir {jan,feb,apr,may,jun,aug,sep,oct,nov,dec}_{2017..2020}
root@74c91245bee8:/yuting/months# ls
apr_2017  aug_2018  dec_2019  feb_2020  jun_2017  may_2018  nov_2019  oct_2020
apr_2018  aug_2019  dec_2020  jan_2017  jun_2018  may_2019  nov_2020  sep_2017
apr_2019  aug_2020  feb_2017  jan_2018  jun_2019  may_2020  oct_2017  sep_2018
apr_2020  dec_2017  feb_2018  jan_2019  jun_2020  nov_2017  oct_2018  sep_2019
aug_2017  dec_2018  feb_2019  jan_2020  may_2017  nov_2018  oct_2019  sep_2020
~~~


## Developer Roadmap


- [https://github.com/kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap){:target="_back"}

### Front-end

![img](https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/img/frontend.png)


### Backend

![img](https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/img/backend.png)

### DevOps

![img](https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/img/devops.png)