---
layout: "single"
title: "難就是懶 懶就是難"
permalink: "diary/:year-:month-:day/hello-minimal-mistake"
tags: 今日隨意 jekyll minimal-mistake git
excerpt: "越是讓你刺耳的聲音 越有學習成長的機會"
header:
  overlay_image: https://i.imgur.com/EF3vWiq.png
  text_color: snow
gallery:
  - url: https://i.imgur.com/EF3vWiq.png
    image_path: https://i.imgur.com/EF3vWiq.png
    alt: "tags in home page"
---

> 我一進這網站 就會離開 🤓🤓🤓
>
> 大約在 11 月初的時候
>
> 愛情好同事 給了 J 個愛情的 feed back
>
> 慘忍 但是很真實 XDDD

>> '這 blog 看起來太舊了'

### 越是讓你刺耳的聲音 越有學習成長的機會

> 好 就這樣~ 
>
> 在 2021 快結束前夕 我改版了 :)
>
> 自己還算滿意~~~~ :heart:

用了:[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/){:target="_back"}

好先運動 動完再來補 :)

## 從 [minimal](https://jekyllthemes.io/theme/minimal){:target="_back"} 轉到 [minimal-mistake](https://jekyllthemes.io/theme/minimal-mistakes){:target="_back"}

- 我怎做的 
  - 先開新的 branch
  - 去 [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) 
    - 把 `assets`,  `_layouts`, `_includes`, `_sass` 都抓下來放到自己的目錄裡 
    - 原本舊的 `minimal` 一樣名稱的資料夾改另一個名 **(我是都加上 `yuting_xxx`避免 build 的時候炸掉)**
      - [官網](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/){:target="_back"}
    - 對 jekyll 不熟的話 可以先去做功課 [傳送門](https://jekyllrb.com/){:=target="_back"}

- 其它自己客製的

    - 我自己有 想要讓首頁的 標題也可以顯示 `tag` 朝連結
       - `/_layouts/home.html`
         {% include gallery caption="範例唷唷!!" %}
    
    - blog 上面的 `About` `Tags` `Yuting Projects`
      - /_data/navigation.yml
         ~~~yml
            main:
             - title: "About"
               url: /about
             - title: "Tags"
               url: /tags
             - title: "Yuting Projects"
               url: /yuting-projects
         ~~~
      - /_pages/
         - 放上自己 navigation 的 md 檔案

- 遇到的雷

   - [**Jekyll: fix Scss Conversion error: Jekyll::Converters::Scss Invalid CP950 character \xE2 on line 54**](https://blog-host-d6b29.firebaseapp.com/jekyll/2017/09/05/fix-sass-encoding-on-windows.html){:target="_back"}

      - 解:
        - 在自己 ruby lib 的 sass.rb 加上
           ```rb
             Encoding.default_external = Encoding.find('utf-8')
           ```
        - 阿不知道 自己 ruby 藏在哪裡 **bundle** 加上 `--trace` 
           - `bundle exec jekyll serve --trace`  

- 都確定好了後 

  - 切回 原本的 branch
     - `git rm -r *`
     - `git add .`
     - `git commit -m "[update] clean all"`
     - 推上 github pages 
     - local merge 你剛剛愛情修改的所有東西!
     - 大致上是這樣 哈哈哈!!!! 爽!!! :hearts: :hearts: :hearts: :hearts:

## 新的樣子 自己不錯滿意 :smile::smile::smile: 
## 就是抓的速度慢了一點 XDD 要多抓不少 css & js XDDD