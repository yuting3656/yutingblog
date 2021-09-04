---
layout: "post"
title: "daily Programming:  忌妒 !忌妒 ! 忌妒 ! 我也想要!! npm install ! XD"
permalink: "daily-programming/i-want-npm-instal-2"
tags: daily-programming npm react
---

# 爽! :heart:

> 直接看成果 :) :notes::notes::notes:

- [https://www.npmjs.com/package/react-taiwan-no1-spin](https://www.npmjs.com/package/react-taiwan-no1-spin){:target="\_back"}

> 跑步去！ :sunglasses:
>
> 運動完　再把細節完成　～～～ :star:

> 回來惹 :)

:sunglasses::sunglasses::sunglasses:

> 故事 是這樣的
>
> 星期五 下班前心情突然 很不美麗 :panda_face:
>
> 看到 優秀同事把 之前一直想玩的 實作出來
>
> 啊我的工作就只能玩屎尿 :shit: !? (誤 XDD)
>
> 瞬間 忌妒心報表到宇宙無敵世界高的境界! :punch:

> 我也想玩
>
> 工作完不了的話
>
> 那我就運動完 心情好 姿勢舒服的時候
>
> 自己來玩!
>
> 這不就當初 create J 個 blog 的初心之一! :heart::heart::heart:

# 自己寫一個 react 的 component 丟到 npm !

- [npm](https://www.npmjs.com/){:target="\_back"}
  - 創一個 [npm Organization 帳號](https://docs.npmjs.com/creating-an-organization){:target="\_back"}
    - 用自己私人帳號去綁 (我是這樣啦)
    - 在 自己電腦 npm login 看看有沒有成功
      - 失敗的話 在有請 股哥大神幫忙解決 XDDD
- 自己 create react component [看好心的大哥哥大姊姊的文章](https://dev.to/jimjunior/how-to-create-an-npm-library-from-react-components-2m2){:target="\_back"}

  - 自己 `npx create-react-app`開一個 寫一個 react component :) 順便 在 APP.js 側看畫面有無成功!
  - 把 寫一個 component 的相關資源 整理好資料夾結構(等你熟了可以自己亂玩) 我就先依照類似 [好心的大哥哥大姊姊的文章](https://dev.to/jimjunior/how-to-create-an-npm-library-from-react-components-2m2){:target="\_back"} 來 show
    - ![Imgur](https://i.imgur.com/4mofqLe.png)
    - 整包長這樣
      - ![Imgur](https://i.imgur.com/yIErQFF.png)
        > 我自己看到這邊有點卡卡的原因是 nested 的 資料夾 下可以有多個 `package.json`!
        >
        > [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces){:target="\_back"}

- [rollup](https://rollupjs.org/guide/en/){:target="\_back"}

  - `Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It uses the new standardized format for code modules included in the ES6 revision of JavaScript, instead of previous idiosyncratic solutions such as CommonJS and AMD. ES modules let you freely and seamlessly combine the most useful individual functions from your favorite libraries. This will eventually be possible natively everywhere, but Rollup lets you do it today.`

    - rollup.config.js **我是真的跟他不熟 XD 都剪貼來的**

      ```js
      import styles from "rollup-plugin-styles";
      import babel from "@rollup/plugin-babel";
      import sourcemaps from "rollup-plugin-sourcemaps";
      const autoprefixer = require("autoprefixer");

      // the entry point for the library
      const input = "src/index.js";

      //
      var MODE = [
        {
          fomart: "cjs",
        },
        {
          fomart: "esm",
        },
        {
          fomart: "umd",
        },
      ];

      var config = [];

      MODE.map((m) => {
        var conf = {
          input: input,
          output: {
            // then name of your package
            name: "tim5433-react-taiwanNo1-spin",
            file: `dist/index.${m.fomart}.js`,
            format: m.fomart,
            exports: "auto",
          },
          // this externelizes react to prevent rollup from compiling it
          external: ["react", /@babel\/runtime/],
          plugins: [
            // these are babel comfigurations
            babel({
              exclude: "node_modules/**",
              plugins: ["@babel/transform-runtime"],
              babelHelpers: "runtime",
            }),
            // this adds sourcemaps
            sourcemaps(),
            // this adds support for styles
            styles({
              postcss: {
                plugins: [autoprefixer()],
              },
            }),
          ],
        };
        config.push(conf);
      });

      /* eslint import/no-anonymous-default-export: [2, {"allowArray": true}] */
      export default [...config];
      ```

- package.json

```json
{
  // 你 npm 上專案的名稱
  "name": "react-taiwan-no1-spin",
  "description": "taiwan-no1",
  "author": "yuting, Tim",
  "keywords": ["react", "components"],
  "version": "0.1.1",
  // 起始點
  // rooup build 完成後 可以開自料夾看一下
  // 都是 js 應該多少看得懂
  // 不然你自己 npm instll 下來玩玩看 XDD
  "main": "dist/index.cjs.js",
  "scripts": {
    "build": "rollup -c"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yuting3656/tim5433-react-taiwan-no1-spin.git"
  },
  "peerDependencies": {
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  },
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.15.4",
    "@babel/core": "^7.15.4",
    "@babel/plugin-transform-runtime": "^7.15.0",
    "@babel/preset-env": "^7.15.4",
    "@babel/preset-react": "^7.14.5",
    "@rollup/plugin-babel": "^5.3.0",
    "autoprefixer": "^10.3.4",
    "rollup": "^2.56.3",
    "rollup-plugin-sourcemaps": "^0.6.3",
    "rollup-plugin-styles": "^3.14.1"
  },
  "dependencies": {
    "@babel/runtime": "^7.15.4"
  }
}
```

- npm publish
  - 現在好像要強制 OTP 唷唷!

> 滿足!!!! :) :heart::heart::heart:
>
> 很多地方還沒到融會貫通!
>
> 等著未來漫漫的進步唷唷唷!!
>
> 看到這邊 還不快去 **npm install react-taiwan-no1-spin** !!!!

## 參考

- [https://dev.to/jimjunior/how-to-create-an-npm-library-from-react-components-2m2](https://dev.to/jimjunior/how-to-create-an-npm-library-from-react-components-2m2){:target="\_back"}
- [https://levelup.gitconnected.com/publish-react-components-as-an-npm-package-7a671a2fb7f](https://levelup.gitconnected.com/publish-react-components-as-an-npm-package-7a671a2fb7f){:target="\_back"}
- [rollup](https://rollupjs.org/guide/en/){:target="\_back"}
