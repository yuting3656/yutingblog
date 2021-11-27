---
layout: "single"
title: "小九九好棒棒"
permalink: 'diary/:year-:month-:day'
tags: 今日隨意 python
---
> 2019/06/27 早晨天氣晴 
美好的八點多 正在拉屎的時候 看到老姊 LINE 的訊息
四張手寫的師傅手稿
希望找出小柚子:baby:名字的組合!

開啟了一個 sign:sunny::sunny::sunny:~~~

* 手寫辨識: 辨識師傅的字
    > 這要等到下一階段書讀更多的時候來用 `一定會做出來!!!!` 等我~~~
    - 先丟查到的相關資料: 
    1. [Handwritten Chinese Character Recognition Using CNN][hand-writing]{:target="_black"}
    2. [CASIA Handwriting Recognition][hand-writing-2]{:target="_black"}
<br/>
<br/>

* python 基本組合: 組合各種可能的名字
    > 這簡單兒~~
    - AI 還沒法速度 train 出來辨識手寫的，我人腦應該可以了吧! 
    - 再怎麼說我大學聯考國文 也有**18分**!!!! :see_no_evil: XDD
    - 巽、綬、𦆮、... 怎麼念:blossom:


## 管你那姆多就排名字:

1. 給你一大堆單字，任選兩字組合
    ~~~python
    # 任選兩個字
    package_1 = ['欽', '鈞', '棋', '景', '堯', '皓', '傑',
                 '貴', '喬', '巽', '朝', '量', '登', '軼', '童',
                 '敦', '程', '棟', '統', '詠', '翔', '焬',
                 '富', '勛', '舒', '順', '集', '善', '舜', '斯', '勝',
                 '超', '然', '象', '策', '詔', '盛', '評', '喜',
                 '發', '雄', '普', '貿', '壹', '博', '幃', '項']
    
    yo_yo_list = []
    
    for x in range(len(package_1)):
        for y in range(len(package_1)):
            if x != y:
                yo_yo_list.append('[姓氏]' + package_1[x] + package_1[y])
    
    for i, a in enumerate(yo_yo_list):
        print(a, end=', ')
        if i % 12 == 11:
            print("\n")
    ~~~
2. 給你兩組(a, b)單字，a要在中間，b最後: 
    ~~~python
    package_2_m = ['綱', '魁', '誥', '嘉', '綸', '銓',
               '裳', '端', '圖', '彰', '爾', '齊', '榮', '維',
               '誠', '綬', '碩', '綮', '裴', '豪', '碧', '輔',
               '銘', '福']

    package_2_l = ['介', '午', '及', '孔', '中', '日', '太',
                   '天', '之', '友', '允', '升', '壬', '文',
                   '夫', '予', '水', '今']
    
    yo_yo_list_2 =[]
    for x in range(len(package_2_m)):
        for y in range(len(package_2_l)):
            yo_yo_list_2.append('[姓氏]' + package_2_m[x] + package_2_l[y])
    
    for index, data in enumerate(yo_yo_list_2):
        print(data, end=', ')
        if index % 12 == 11:
            print('\n')
    ~~~

- 讓名字每  row 有 12 個名字:
    ~~~python
        for index, data in enumerate(name_list):
            print(data, end=', ')
            if index % 12 == 11:
                print('\n')
    ~~~


[hand-writing]: https://coding.tools/blog/casia-handwritten-chinese-character-recognition-using-convolutional-neural-network-and-similarity-ranking

[hand-writing-2]: https://github.com/Jzou44/CASIA_Handwriting_Recognition