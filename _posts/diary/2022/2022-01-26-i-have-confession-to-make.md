---
layout: "single"
title: '出包了! I Have a Confession to Make '
permalink: 'diary/:year-:month-:day'
tags: 今日隨意 工作反思
excerpt: "我一直以為就是 xxx, 自以為...., 自負&自大, 我超級急~~~"
header:
  overlay_image: https://i.imgur.com/BYWTYcE.jpg
---

> e04! 好久沒有這種低級失誤的感覺!! 幹! :rage::rage::rage:


> 先來看上回 出包的[紀錄反省 2020-10-25](https://yuting3656.github.io/yutingblog/diary/2020-10-25){:target="_back"} 
>>
>> 那次的狀況是 客戶的需求 沒做到
>>
>> 後來 AAR 的檢討 就是
>>
>> 1. 以後拿到 回饋信 or 相關資訊 全部打上 jira 一項一項 千萬不要憑記憶!!!!!
>>
>> 2. 完成後 直接先主動 找對應人員 幫忙比對&查看 (找 coach 的概念)

## 很開心 過去這一年多的 這低級得錯誤沒有再犯了 :)


# 好! 這次的包 :poop::poop::poop::poop::poop:   

> 主要就是改了一個數據顯示的算法
>
> 結果影響到既有客戶的使用習慣
>
> 我自以為是的認為 `修正的東西是對的` 
>
> 卻忘了 `更新` 最重要的 **基本原則**
> 
> **不影響既有客戶**



> :persevere: **我一直以為** 這畫面 `沒有客戶在看`
>
> :confused: **自以為** 客戶用錯的解讀方式 使用我們的東西
>
> :stuck_out_tongue_winking_eye: **自負&自大**的認為 客戶應該要直接修改 而沒有事前的溝通
>
> :angry: **我一直以為** 更新 update 的提示可以偷偷地補上 `反正沒有人會 care`
>
> :triumph: **我急**者想要快速的上新的東西 卻忘了冷靜的思考和 `測試` 所有的可能 只因為 `我一直認為這邊沒人會看....`
> 

## 越是讓你心情起伏刺耳的事物 越有成長學習的空間 :heart:

# [AAR](https://en.wikipedia.org/wiki/After-action_review){:target="_back"}

- 比較 `staging` 和 `master` 上 **變動範圍&畫面&數值** 上的差異!
   - 之前做新功能, 之所以可以把持住**不影響既有客戶**的大原則, 是因為有 `config 設定` 的設計**保護住!** 這回沒了 `config 設定` 的保護, 就出包了 :shit:. 未來只要是類相關, **非** `config 設定` 可以保護的變動更新, 都要比較 staging 和 master 上 **變動範圍畫面數值** 上的差異!

- 依舊保有快速開發快速上版的態度 [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product){:target="_back"}  
    - 重點就是要回到上面的目標,  要**測** 要**比較** 要**多問多尋求各方觀點**, 看新的 `Update` 會不會有異常 

- 把壞習慣: **我認為沒人會看** / **沒人在用** / **沒人會care** 的糟糕想法慢慢的消除掉! :muscle::muscle::muscle:
    - 其實今天的感覺很矛盾:
       -  一下覺得自己怎麼犯這種低級的錯... :sob::sob::sob:, 
       - 一下覺得ㄟ~~~ 東西有人用ㄟ 開心XDDD :heart::heart::heart: :blush::blush::blush:


>  寫完拉! 棒棒~ :) 還是那句話! 
>
> 越是讓你心情起伏刺耳的事物 越有成長學習的空間 :heart:
>
> 也感謝團隊的包容 是團隊成就了現在的我 :star::star::star:
>
> 人往往有時候會不自覺地認為所有的成長與提升 都是靠自己一己之力
>
>> 大錯特錯!! 錯翻了!! 
>>
>> [寫下你的故事](http://localhost:4000/yutingblog/2021-13th-ironman/day-28){:target="_back"} 紀錄一下過去成長的點點滴滴
>>
>> 會發現一路上的成長 貴人很多 當然也有自己拉! :heart:
>
> 我們一路的成長其實受環境影響很深 
> 
> 你所自認為的提升其實多少都受周遭的環境所幫助到 :+1::+1::+1:
>
>> 無形有形的 你自己沒察覺而已 不要太把光環都往自己身上照唷唷!
>
> 所以阿! 謝謝團隊的共同努力 當然也要謝謝自己的堅持與熱情:fire::fire::fire::sparkles::sparkles:
>
> 好唷唷!! 就這樣在過年前 爽快的反思一回阿! :sunny::sunny::sunny: