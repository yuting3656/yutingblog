---
layout: "single"
title: 'React Native: Expo 專案打包 + 發佈到 Google Play 上'
permalink: 'react-native/react-native-release-android'
tags: react react-native npm expo eas google-play
excerpt: "工作 能夠玩到自己想玩的技術 是一件很幸福的事情 :)"
header:
  overlay_image: https://i.imgur.com/L5aG843.jpg
---


## Expo 專案 Build Android  

1. 請先申請 Expo 帳號
   - [Sing up](https://expo.dev/signup){:target="_back"}

2. **[eas](https://github.com/expo/eas-cli){:target="_back"}** (2022-01-05) 我是直接無腦使用
    - cd 到你專案根目錄
        - `npm install -g eas-cli`
        - `eas build -p android`
            - [快樂文件](https://docs.expo.dev/build/setup/){:target="_back"}
    - 根者指令走 絮絮絮 build 好後 
    - 上 [expo](https://expo.dev/) 網站 
    - 下載 build 好的  [.aab (Android App Bundles)](https://developer.android.com/guide/app-bundle){:target="_back"} 檔案

## 丟到 [Google Play Console](https://play.google.com/console/about/){:target="_back"} 上       
   - [愛情手把手文件](https://github.com/expo/fyi/blob/master/first-android-submission.md){:target="_back"}

   - 發佈到 Google 上需要提供 Privacy Policies 
      - [超棒棒工具](https://app.privacypolicies.com/) **感謝同事的強大😎😎😎**