---
layout: "post"
title: " HackerRank 靠邀 XD "
permalink: 'diary/:year-:month-:day'
tags: 今日隨意 紮馬步
---

> 幹! 當剪貼工程師太久了，不能查、不能用 IDE... 根本不會寫程式了 XDDDDDD 感覺連基本功都廢了 :stuck_out_tongue_winking_eye:

馬步要紮穩阿~~~~ 看來真的要開始來好好蹲馬步了 XDDD 

真的要說一下腦袋開機和活化真的需要時間ㄟ  :sweat_smile:

而且我真的要花好久的時間才能好好靜下來思考 LOL... 練習 練習 過動~ 過動~ :sweat_drops::sweat_drops:

- 好啦! 要努力繼續皮繃緊了~ 每日開機`1~2題`做筆記，可以是:
    - [HackerRank](https://www.hackerrank.com/dashboard){:target="_back"}
    - [leetCode](https://leetcode.com/){:target="_back"}
    - [Codility](https://www.codility.com/){:target="_back"}
    - 當初的 10 分鐘定理(10分鐘內想不出來就找解答XDDDDD) 要放棄了
    - 好好訓練思考腦能力!
    - 和重訓一樣!

事不宜遲深夜直接來一題:

- [Sock Merchant](https://www.hackerrank.com/challenges/sock-merchant/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup){:target="_back"}

   - |![Imgur](https://i.imgur.com/OSqu6dV.gif)|

- 這題寫的很有信心阿! XDDD

   ~~~py
   # Complete the sockMerchant function below.
   def sockMerchant(n, ar):
       ar.sort()
       pair_num = 0
       pair_num_list = []
       for i in range(1, len(ar)):
           if ar[i] not in pair_num_list:
               pair_num_list.append(ar[i])
               count = ar.count(ar[i])
               if count % 2 == 0:
                   pair_num = pair_num + count/2
               else:
                   pair_num = pair_num + (count-1)/2
       return pair_num
   ~~~