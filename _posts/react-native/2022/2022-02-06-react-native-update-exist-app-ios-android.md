---
layout: "single"
title: "React Native: 更新你的 APP 到 Apple (ios) & Google (android) 上"
permalink: 'react-native/react-native-update-your-app-to-android-ios'
tags: react react-native npm expo eas app-store iOS
---

## Apple (ios)

1. 到 [apple store connect](https://appstoreconnect.apple.com/login){:target="_back"}
2. 找到你要更新的 APP 
3. 左邊點 + 號
   - ![Imgur](https://i.imgur.com/zPbfNnZ.png)
   - 打上你這次要更新的版本號
4. 用 [transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12){:target="_back"} 上傳 已經包好的 
   - 各種上傳法 看[筆記](https://yuting3656.github.io/yutingblog/react-native/react-native-release-iOS){:target="_back"}
5. 上傳成功後 要到 TestFlight 等! 
   - ![Imgur](https://i.imgur.com/RrPGkWK.png)
   - 等你的程式 跑過 要點使用條款? 選 YES 就對了XD
   - 可以測試了 
6. 到 APP Store 
   - 選你上傳的 Build 好的 .ipa
   - 寫上 這次更新的細目
7. Go Review ! 

## Google (android)

1. 到 [google play console](https://play.google.com/console/about/){:target="_back"}
2. 找到你要更新的 APP 
3. 左邊直接選 Production
   - [Imgur](https://i.imgur.com/hFIFIPu.png) 
4. 右邊大大的 Create new release 
   - ![Imgur](https://i.imgur.com/yeQdZDx.png)
   - 用力按下去
5. 上傳 aab & 寫更新的項目
   - 直接無痛丟 build 好的 .aab
   -  寫更新的項
6. Go Review !!!
