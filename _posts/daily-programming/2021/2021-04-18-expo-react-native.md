---
layout: 'post'
title: 'daily Programming: react-native & expo'
permalink: 'daily-programming/react-native-and-expo'
tags: daily-programming react-native expo
---

> 原本 2021 計畫之一是 寫一個 Flutter 的 app
>
> 正所謂 計畫趕不上變化 變化趕不上我閃亮亮的情緒化! :satisfied:
>
> 改成用 expo (react-native 的 framework) 寫一個 app!
>
> 把 [網頁版本的](https://yuting-object-detection.herokuapp.com/){:target="_back"} 改成  app! :sparkles:
>
> 廢話不多說!
>
> 開工寫筆記! 
>
**本筆記會一直成長唷唷**


## [Expo](https://docs.expo.io/){:target="_back"}

- Start

   ~~~bash
       # Install 
       npm install --global expo-cli

       # Create a new project
       expo init my-porject
   ~~~

## 抓手機相機

- [expo-camera](https://docs.expo.io/versions/latest/sdk/camera/){:target="_back"} Installation

~~~bash
expo install expo-camera
~~~

- usage

~~~tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
~~~

- 確定畫面已經都 Focuse 才開相機

~~~tsx
import { useIsFocused } from '@react-navigation/native'
import { Camera } from 'expo-camera'
// ...

export default function xxx() {
  const isFocus = useIsFocused()
  // ...
  
  return ( <View> 
     { isFocus && <Camera></Camra>}
  
  </View>)
}
~~~