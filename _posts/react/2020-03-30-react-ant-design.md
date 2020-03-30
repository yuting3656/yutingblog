---
layout: 'post'
title: 'React: Ant Design '
permalink: 'react/react-ant-design'
tags: react 
---

## [Ant Design of React](https://ant.design/docs/react/introduce){:target="_back"}

> 祖國的愛心~ :heart:

## Hello Ant Design of React

> 跟著教學一步一步的打，耶~~~

> [YA~~](https://ant.design/docs/react/use-with-create-react-app#Install-and-Initialization){:target="_back"}

### Use in create-react-app

1. 先 install 一個基本的 react project

   - `npx create-react-app yuting-antd-demo`

   - `npm start`

      - 看可愛 react log 有沒有快樂轉圈圈~

         <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" width="30"/>

2. add antd

   - `npm add antd`


3. 改 src/App.js 


   ~~~jsx
   import React from 'react';
   import { Button } from 'antd'
   import './App.css';
   
   const App = () => {
     <div className="App">
        <Button type="primary">Button</Button>
     </div>
   }
   
   export default App;
   ~~~

4. 加 style 到 src/App.css

   ~~~css
      @import '~antd/dist/antd.css'; 
      
      .APP {
        text-align: center;     
      }

      ...
   ~~~

5. 可愛 ant Buttom 出現~~

![Imgur](https://i.imgur.com/cxLt6YE.jpg)


## Ant Theme

- [花樣還真多~](https://antdtheme.com/){:target="_back"}

## Ant Design pro

- [github](https://github.com/ant-design/ant-design-pro/){:target="_back"}

- Usage

   - npm create umi
   - 選 `ant-design-pro`
   - git init
   - npm install
   - npm start # 看 http://localhost:8000

> 整包用起來 好肥!!!