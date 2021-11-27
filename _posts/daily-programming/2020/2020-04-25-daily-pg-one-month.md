---
layout: "single"
title: 'daily Programming: 滿月'
permalink: 'daily-programming/dz-one-month'
tags: daily-programming javascript react go postgres gorm
---

> 樹不修，長不直;人不學，沒知識  :yum: 
>
> 滿月了 :notes: 
>
> 踩了一堆的雷點也增加了一囉拉G的腦細胞節點
>
> 靠的是學習和自我重整
> 
> 最重要的是團隊的包容和文化 謝謝 :heart::heart::heart:


> 工程師 怎麼可以不能玩 __賽__ PROJECT! 
>
> 當初用這部落格主要是當 AI學習筆記
>
> 現在有點轉變成 `各式`學習筆記 XD
>
> 漸漸變成一種習慣和依賴 
>
> 沒寫一點東西出來 感覺沒學起來
>
> 而且幾個月以後沒碰會忘光光 XDD
>
> 留些足跡 未來可以來檢麵包屑~   :sunny::sunny::sunny:


## 大概是這樣

- 用 go 開 api
- react 當前端
- 用 docker 啟 pg 當 DB
   - ![Imgur](https://i.imgur.com/MSNMMbv.jpg)
   > 精美設計的表格 XDD

> 喔~ 就是 可以新增自己的 pokemon 戰鬥小隊 然後
![pokemon](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png)
>
> 可以拖拉更換順序 XDDD 
>
>就這樣 XDDDD :heart:
![pokemon](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/400.png)


## 快樂進度表

|DATE| api 進度| 前端 進度 |說說話|
|2020/04/26| __[API] Team:__  `POST` & `GET` 完成 | ![XD](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/202.png) |水唷! ![bird](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/441.png)|

## Github

- [https://github.com/yuting3656/dz-one-month](https://github.com/yuting3656/dz-one-month){:target="_back"}

## GO

- api framework Gin:
   - `go get -u github.com/gin-gonic/gin`
- orm gorm:
   - `go get -u github.com/jinzhu/gorm`

   - model tags:
      - [https://gorm.io/docs/models.html](https://gorm.io/docs/models.html){:target="_back"}


- auto loading .env 
    
   - 加了這個 `_ "github.com/joho/godotenv/autoload"`

      - 在 .env file 加 port = __要用的port__ 會自動吃  
