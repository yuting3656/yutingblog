---
layout: "single"
title: 'React Native: Expo 專案打包 + 發佈到 App Store 上'
permalink: 'react-native/react-native-release-iOS'
tags: react react-native npm expo eas app-store iOS
excerpt: "工作 能夠玩到自己想玩的技術 是一件很幸福的事情 :)"
header:
  overlay_image: https://i.imgur.com/L5aG843.jpg
---


## Expo 專案 Build iOS

> 對 沒錯!
>
> 事先需要一台 愛如潮水的 MAC


1. 請先申請 Expo 帳號
   - [Sing up](https://expo.dev/signup){:target="_back"}

2. **[eas](https://github.com/expo/eas-cli){:target="_back"}** (2022-01-05) 我是直接無腦使用
    - cd 到你專案根目錄
        - `npm install -g eas-cli`
        - `eas build -p ios`
            - [快樂文件](https://docs.expo.dev/build/setup/){:target="_back"}
    - 根者指令走 絮絮絮 build 好後 
    - 上 [expo](https://expo.dev/) 網站 
    - 下載 build 好的  .ipa [(**i**OS **A**pp Store **P**ackage)](https://en.wikipedia.org/wiki/.ipa){:target="_back"} 檔案

## 丟到 [Apple Developer](https://developer.apple.com/){:target="_back"}

   * [愛情官方土魠魚](https://help.apple.com/app-store-connect/en.lproj/static.html){:target="_back"}

   - [Apple Upload tools](https://help.apple.com/app-store-connect/#/devb1c185036){:target="_back"}
      - Xcode
      - altool
      - [Transporter app](https://apps.apple.com/us/app/transporter/id1450874784?mt=12){:target="_back"} **我是用個**

   -  Privacy Policies 
      - [超棒棒工具](https://app.privacypolicies.com/) **感謝小雞老師的強大😎😎😎**

   - 各版型的截圖
      - 小雞老師介紹 用 expo 的模擬器 開相關裝置截圖 超級無痛的拉！！！
      　　　- [Imgur](https://i.imgur.com/Y0IQDH9.png)