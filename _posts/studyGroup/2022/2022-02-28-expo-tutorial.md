---
layout: "single"
title: "Study Group: React Native Expo 土魠魚 01"
permalink: "stydeGroup/react-native-expo-tutorial-01"
tags: 讀書會 expo react-native
---

## [Expo](https://docs.expo.dev/){:target="_back"}

> Expo is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on `iOS`, `Android`, and `web apps` from the same `JavaScript/TypeScript` codebase.

# 前置作業
   - 安裝 expo 到你的電腦
   - 手機下載 [EXPO GO](https://expo.dev/client) (方便開發模擬)
     - [ios](https://apps.apple.com/us/app/expo-go/id982107779){:target-="_back"}
     - [android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US){:target-="_back"}

### 安裝

~~~bash
# Install the command line tools
npm install --global expo-cli
~~~


### 速度開始 新專案!

~~~bash
expo init my-project
~~~

![Imgur](https://i.imgur.com/x6IKPs0.png)

- Managed workflow 
   - blank                 a minimal app as clean as an empty canvas
   - blank (TypeScript)    same as blank but with TypeScript configuration
   - tabs (TypeScript)     several example screens and tabs using react-navigation and TypeScript

   ~~~py
    # - yarn start # you can open iOS, Android, or web from here, or run them directly with the commands below.
    # - yarn android
    # - yarn ios # requires an iOS device or macOS for access to an iOS simulator
    # - yarn web
   ~~~

- Bare workflow
   - minimal               bare and minimal, just the essentials to get you started
   - minimal (TypeScript)  same as minimal but with TypeScript configuration


   ~~~py
    # - yarn android
    # - yarn ios # you need to use macOS to build the iOS project - use managed workflow if you need to do iOS development without a Mac
    # - yarn web

    # 💡 You can also open up the projects in the ios and android directories with their respective IDEs.
    # 🚀 expo-updates (​https://github.com/expo/expo/blob/master/packages/expo-updates/README.md​) has been installed in your project. Before you do a release build, you'll need to configure a few values in Expo.plist and AndroidManifest.xml in order for updates to work.
   ~~~

||Managed Workflow| Bare Workflow |
|:--:|:--:|:--:|
| blank |![Imgur](https://i.imgur.com/W6m8T01.png)||
| blank (TS) |![Imgur](https://i.imgur.com/0Xpj5Ci.png)||
| tabs (TS) |![Imgur](https://i.imgur.com/c5m71vd.png)||
| minimal ||![Imgur](https://i.imgur.com/vljxDPO.png)|
| minimal (TS) ||![Imgur](https://i.imgur.com/UOYMPuw.png)|



## [Workflows](https://docs.expo.dev/introduction/managed-vs-bare/){:target="_back"}

 - With the managed workflow you only write JavaScript / TypeScript and Expo tools and services take care of everything else for you.
 - In the bare workflow you have full control over every aspect of the native project, and Expo tools and services are a little more limited.


## 直接 run 起來 (manged workflow: blank)

~~~
cd dir
npm start
~~~

- 你 cmd 的視窗 會出現相關訊息 & QRcode
   - ![Imgur](https://i.imgur.com/sZShMDg.png)
   - 會出現網址 or 直接幫你跳一個網頁
      - ![Imgur](https://i.imgur.com/8L10KQS.png)

- 拿起你的手機 掃 QRCode  __(請確認手機已經下載 [EXPO GO](https://expo.dev/client))__
   - Apple 直接開相機掃描
   - 安卓小夥伴 可以直接開 EXPO GO 點 Scan QR Code
     - |![Imgur](https://i.imgur.com/zrKbGdI.jpg)|

- 看到 Building 的畫面
  - ![Imgur](https://i.imgur.com/3OtVZan.jpg)

- build 成功

   - ![Imgur](https://i.imgur.com/MV3pmrI.jpg)

### 恭喜你 生第一個 APP 出來了 可以丟 Google & Apple 了 XDDD

### 溫馨小提醒

- 開發電腦 & 手機要同吃一個網段唷!
- Expo reload
  - ios 
    - 三隻手指頭 常壓螢幕 會有重新整理的選項
  - android 
    - 自己找 icon 會有 reload icon 
  - 小呆瓜方式 QRCode 重新掃

## [app.json](https://docs.expo.dev/versions/latest/config/app/){:target="_back"}

- 改 App loading 的圖
   - [splash](https://docs.expo.dev/versions/latest/config/app/#splash){:target="_back"}
      - image
      - resizeMode
      - backgroundColor

- To Be Continue...


### 塞一個 [WebView](https://github.com/react-native-webview/react-native-webview){:target-"_back"} 完成你的 APP ! XD

- React Native WebView

   - 安裝 
      - __所有相關 react native的套件都用 expo 幫你 裝避免版本衝突地獄__
     - `expo install react-native-webview`

   ~~~js

      import React, { Component } from 'react';
       import { StyleSheet, Text, View } from 'react-native';
       import { WebView } from 'react-native-webview';
       
       // ...
       class MyWebComponent extends Component {
         render() {
           return <WebView source=\{\{ uri: 'https://reactnative.dev/' \}\} />;
         }
       }
   ~~~
   


- your-react-native-expo-project/App.js

   ~~~js
      import { WebView } from 'react-native-webview';
      export default function App() {
        // 換上你 Blog 的 url!
        return (<WebView 
          source=\{\{ uri: 'https://yuting3656.github.io/yutingblog/' \}\} />
        );
      }
   ~~~


## 啊我想看看各位小夥伴開發的樣子~

- 打開 expo build 出來的網頁
- 左下角 選 __Tunnel__
  - ![Imgur](https://i.imgur.com/BMqYXoA.png)
  - 會幫你開愛情的通道 讓你不用同網段也可以 快速看開發的情況唷唷~~


# Reference

- [Expo](https://docs.expo.dev/introduction/managed-vs-bare/){:target="_back"}