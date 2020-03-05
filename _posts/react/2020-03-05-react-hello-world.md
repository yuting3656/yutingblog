---
layout: 'post'
title: 'React: Hello World XD'
permalink: 'react/hello-world'
tags: react
---

> 看了自己資料夾的紀錄，ㄟ~~靠　我竟然有一個 React 資料夾! 
>
> 裡面還有兩個學到一半的專案。。。。
>
> __重點是__  我完全沒印象　:sunglasses::sunglasses::sunglasses:
>
> 連怎麼用 react cli 都忘了　ＸＤＤＤ

##  [create-react-app](https://create-react-app.dev/){:target="_back"}

- [GitHub](https://github.com/facebook/create-react-app){:target="_back"}

- 光速啟動
  
  ~~~
   npx create-react-app <app-name>
   cd <app-name>
   npm start
  ~~~


### 跟著老師學！

<iframe src="https://www.youtube.com/embed/sBws8MSXN7A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### What is react?

- React is a JavaScript library created by Facebook and is used for building user interfaces (UIs) and front-end applications

- React is often called a framework of it's behavior and capabilities

- React is the most popular framework in the industry (for now)　`我鍾愛的 Angular　哭哭～～～`

### Why use it?

- Makes front-end JavaScript much easier
- Uses self contained, independent components with their own state
- Much more intercative UIs 
- Virtual DOM
- JSX - Easily incorporate JS in markup
   - [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html){:target="_back"}
   - [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html){:target="_back"}
- Easy to work with teams

### React State 

- Compoents can have state which is an object that determines how that compponent renders and behaves
- We can also have "application level" state by using a state manager like [Redux](https://redux.js.org/){:target="_back"} 企鵝！？　ＸＤＤ　and [Context API](https://reactjs.org/docs/context.html){:target="_back"}


## Create-react-app

- CLI Tool for creating React applicatios
- Uses Webpack but needs no configuration from you
- Comes bundled with a dev server with hot reload
- `npm run build` will compile all your code to somthing that the browser can read

> 恩！ 跟 Angular __87__ 分很像 XDD

## 恩很好一安裝就採雷　ＸＤＤ

總而言之言而總之就是[這句話：](https://create-react-app.dev/docs/getting-started){:target="_back"}

> If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we 
>
> recommend you uninstall the package using `npm uninstall -g create-react-app` to ensure that 
>
> `npx` always uses the latest version.


### [查看 globally installed packages](https://medium.com/@alberto.schiabel/npm-tricks-part-1-get-list-of-globally-installed-packages-39a240347ef0){:target="_back"}

- `npm list -g --depth 0`

- 我的樣子

   ~~~
   PS E:\React> npm list -g --depth 0
   C:\Users\tim23\AppData\Roaming\npm
   +-- @angular-devkit/schematics-cli@0.803.2
   +-- @angular/cli@8.3.4
   +-- @angular/core@8.2.6
   +-- @loopback/cli@1.29.0
   +-- create-react-app@3.0.1
   +-- loopback-cli@5.0.3
   +-- ngrok@3.2.5
   +-- node@10.16.0
   +-- nodemon@1.18.10
   +-- UNMET PEER DEPENDENCY rxjs@^6.4.0
   +-- rxjs-tslint@0.1.7
   +-- UNMET PEER DEPENDENCY tslint@^5.0.0
   +-- UNMET PEER DEPENDENCY typescript@>=2.1.0 || >=2.1.0-dev || >=2.2.0-dev || >=2.3.0-dev || >=2.4.0-dev || >=2.5.0-dev || >=2.6.0-dev || >=2.7.0-dev || >=2.8.0-dev || >=2.9.0-dev
   `-- UNMET PEER DEPENDENCY zone.js@~0.9.1
  
   npm ERR! peer dep missing: rxjs@^6.4.0, required by @angular/core@8.2.6
   npm ERR! peer dep missing: zone.js@~0.9.1, required by @angular/core@8.2.6
   npm ERR! peer dep missing: tslint@^5.0.0, required by rxjs-tslint@0.1.7
   npm ERR! peer dep missing: typescript@>=2.1.0 || >=2.1.0-dev || >=2.2.0-dev || >=2.3.0-dev || >=2.4.0-dev || >=2.5.0-dev || >=2.6.0-dev || >=2.7.0-dev || >=2.8.0-dev || >=2.9.0-dev, required by rxjs-tslint@0.1.7
   ~~~

- `npm uninstall -g create-react-app`

> 這　__雷__　完美解釋我為什麼對之前自學　react 完全 zero 印象　ＸＤ

### react project 和 package.json 終於跟老師一樣了　ＸＤ

- [Create-react-app creating App.js without Component after update](https://stackoverflow.com/questions/55841962/create-react-app-creating-app-js-without-component-after-update){:target="_back"}


- 我的

~~~ jsx
function App() {
  return (
    <div className="App">
    </div>
  );
}
~~~

- 老師的

~~~ jsx
class App extends Component {
  render() {
    return <div />;
  }
}
~~~

## JSX

- 要用 `className` 取代　`class` 

---

> 邊學邊打筆記　累累
>
> 只記錄覺得比較容易忘記的ＸＤ


### 25:17 passing props

- props

   - `<XXX 自己隨意命名={要傳.的參數}>`
   - xxx.js 抓別人傳進來的 `props`
      - console.log(this.props.自己隨意命名)

- App.js

~~~jsx
import React from 'react';
import './App.css';
import Tods from './components/Todos';

class  App extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with wife',
        completed: false
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false
      },
    ]
  }
  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <Tods todos={this.state.todos} />
      </div>
    );
  }
}
export default App;
~~~

- Todos.js

~~~ jsx
import React, { Component } from 'react';

export class Todos extends Component{
    render () {
        console.log('From Todos:', this.props.todos);
        return (
            <div>
                <h1>Todos</h1>
            </div>
        );
    }
}
export default Todos;
~~~

### 27:03 render() return 的寫法 `()` 注意！！

- Todos.js
   - [`render(): ReactNode`](https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement){:target="_back"}
     - `type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;`

   - 吐回來的都是 ReactNode
      - 阿我寫習慣看到 array functions 就直接
      - `.map((data) => {})` ---> __{}__ 叉燒包！！！
      - 出現 __error__ `no-unused-expressions`


~~~jsx
class Todos extends Component{
    render() {
        return (
            this.props.todos.map((todo) => (
                <h3>{ todo.title }</h3>
            ))
        )}
}
~~~

## 29:12 靠夭!! 無敵快捷鍵

- 安裝 [VSC-extension: ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets){:target="_back"}

- 光速 generate class component
   - `rce + tab`


## 31:52 [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html){:target="_back"}

- Todos.js

~~~jsx
import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component{
    render() {
        return (
            this.props.todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
          ))
        )}
}

// PropTypes
// class的名字.propTupes = {}
Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
export default Todos;
~~~

- TodoItem.js

~~~jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    render() {
        return (
            <div>
                <p>{ this.props.todo.title }</p>
            </div>
        )
    }
}

// PropTypes
// class的名字.propTupes = {}
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

export default TodoItem
~~~