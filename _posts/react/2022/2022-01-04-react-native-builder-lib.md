---
layout: "single"
title: 'React Native: 自己 build 基於 Expo 的 react native lib'
permalink: 'react-native/react-native-builder'
tags: react react-native react-native-builder-bob npm expo
excerpt: "堅持住 撐過就是你的 :)"
header:
  overlay_image: https://i.imgur.com/T1Fz79v.jpg
---

> 眼皮是重的 視線是模糊的
>
> But 心是火燙的
>
> 速度紀錄下
>
> 反正就工作 再多的情緒都是多餘的
>
> 目標 把事做好 當責 態度正確 觀念正確 GOGOGO!


>> 阿你這樣不行!@#$%^$#@!$%^

> 好我就來 try 自 build react native lib

- [隨意寫的](https://www.npmjs.com/package/react-native-tim-img) XDD 

   ~~~cmd
      npm install react-native-tim-img
   ~~~

   ~~~jsx
      import { YutingPhoto } from 'react-native-tim-img/src'

      <YutingPhoto />
   ~~~

> 好類速寫筆記 然後睡覺
>
> 未來再補 也可能部會補

## 完美工具 [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob)

1. 自己用 `expo init` 的專案  (我是用 [expo](https://expo.dev/))
   - 寫你想要實作的給別人用 library
2. 在你的專案 安裝 [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob)
   - `npm install react-native-builder-bob`
3. 打包前置作業 **configuration setup** (有兩招) 

  -  a. 透過 [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob) 自動幫你整理專案
      - `npx react-native-builder-bob init`
  -  b. 自己手動改各種設定
      - [Manual configuration: 愛情連結](https://github.com/callstack/react-native-builder-bob#manual-configuration)


4. 打包
  - `npm run prepare`
  - `npm publish`
     - [參考 上傳到 npm repo](https://yuting3656.github.io/yutingblog/daily-programming/i-want-npm-instal-2)


## 雷包區

- ts 打包有版本衝問題 我直接從 package.json 拿掉了 好累 XDD 等有空再解

   ~~~json

     ...
        "react-native-builder-bob": {
     "source": "src",
     "output": "lib",
     "targets": [
      "commonjs",
      "module",
      // "typescript"
      ]
    },
     ...
   ~~~

- bob 設定打包
   - 會把 package.json 的 main 改成
      - `"main": "lib/commonjs/index.js"`
   
   - 阿你要開發 本包的東西時你需要的 main 長這樣 TAT!!! 我原本可以早點睡的 ~~~ XDD
      - `"main": "node_modules/expo/AppEntry.js",`