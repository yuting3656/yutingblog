---
layout: 'post'
title: 'React: Hello World II XDD'
permalink: 'react/hello-world-II'
tags: react
---

> 學習要靠堅持，不要一直強灌啦 ~
> 
> 上一次的 [Hello World XDD](https://yuting3656.github.io/yutingblog/react/hello-world){:target="_back"}
>
> [好文章 REACT VS ANGULAR: THEIR BIGGEST DIFFERENCES](https://x-team.com/blog/react-vs-angular/){:target="_back"}看一下

### 跟著老師繼續學！

<iframe src="https://www.youtube.com/embed/sBws8MSXN7A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<hr/>


## 34:42 Inline Style

- 在 JSX 裡用 inline style: 
   - ` <div style= { { backgroundColor: '#f4f4f4' } } >  ... </div> `
   - camel case
      - ex: background-color ---> backgroundColor
   
~~~ jsx
export class TodoItem extends Component {
    render() {
        return (
            <div style={ { backgroundColor: '#f4f4f4' } } >
                <p>{ this.props.todo.title }</p>
            </div>
        )
    }
}
~~~

- 用 variables 只要用 __single `{}`__

~~~ jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    render() {
        return (
            <div style={itemStyle}>
                <p>{ this.props.todo.title }</p>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const itemStyle = {
    backgroundColor: '#f4f4f4'
}

export default TodoItem
~~~

## 35:50 style inside a function

~~~ jsx
export class TodoItem extends Component {
   getStyle = () => {
       return {
           background: '#f4f4f4',
           padding: '10px',
           borderBottom: '1px #ccc dotted',
           textDecoration: this.props.todo.completed ? 'line-through' : 'none'
       }
   }

    render() {
        return (
            <div style={this.getStyle()}>
                <p>{ this.props.todo.title }</p>
            </div>
        )
    }
}
~~~

## 41:00 加入 function 互動 `onChange` and __this__ 雷包!!

- 解一: [凡哥](https://josephjsf2.github.io/){:target="_back"}最愛 `.bind(this)`
   
   ~~~jsx
   export class TodoItem extends Component {
      getStyle = () => {
          return {
              background: '#f4f4f4',
              padding: '10px',
              borderBottom: '1px #ccc dotted',
              textDecoration: this.props.todo.completed ? 'line-through' : 'none'
          }
      }
      
      markComplete() {
        console.log(this.props)
      }
   
       render() {
           return (
               <div style={this.getStyle()}>
                   <p>
                   <input type="checkbox" onChange={this.markComplete.bind(this)}/> {' '}
                   { this.props.todo.title }
                   </p>
               </div>
           )
       }
   }
   ~~~

- 解二 : using fat arrow function

   ~~~ jsx
   export class TodoItem extends Component {
      getStyle = () => {
          return {
              background: '#f4f4f4',
              padding: '10px',
              borderBottom: '1px #ccc dotted',
              textDecoration: this.props.todo.completed ? 'line-through' : 'none'
          }
      }
      
      // using arrow funciton 去避免 this 雷
      markComplete = () => {
        console.log(this.props)
      }
   
       render() {
           return (
               <div style={this.getStyle()}>
                   <p>
                   <input type="checkbox" onChange={this.markComplete}/> {' '}
                   { this.props.todo.title }
                   </p>
               </div>
           )
       }
   }
   ~~~

## 43:25 [component or porps driling](https://patrickroza.com/blog/component-vs-prop-drilling-in-react/){:target="_back"}

> 感覺就是　一層傳一層～　ＸＤＤ
>
> App.js --> Tods.js --> TodoItem.js

- App.js

~~~ jsx
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
        completed: true
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false
      },
    ]
  }

  markComplete = () => {
    console.log('From app.js')
  }
  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <Tods todos={this.state.todos} markComplete={this.markComplete}/>
      </div>
    );
  }
}

export default App;
~~~


- Tods.js

~~~ jsx
import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component{

    render() {
        return (
            this.props.todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete}/>
          ))
        )}
}

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired
}

export default Todos;
~~~

- TodoItem.js

~~~ jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
   getStyle = () => {
       return {
           background: '#f4f4f4',
           padding: '10px',
           borderBottom: '1px #ccc dotted',
           textDecoration: this.props.todo.completed ? 'line-through' : 'none'
       }
   }

    render() {
        return (
            <div style={this.getStyle()}>
                <p>
                <input type="checkbox" onChange={this.props.markComplete}/> {' '}
                { this.props.todo.title }
                </p>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const itemStyle = {
    backgroundColor: '#f4f4f4'
}

export default TodoItem
~~~


## 46:05 把參數拿出來 減少使用 `this.props.` and 把參數往上傳:  __.bind(this, id)__ 

- TodoItem.js

~~~ jsx
export class TodoItem extends Component {
   getStyle = () => {
       return {
           background: '#f4f4f4',
           padding: '10px',
           borderBottom: '1px #ccc dotted',
           textDecoration: this.props.todo.completed ? 'line-through' : 'none'
       }
   }

    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                <input type="checkbox" 
                       onChange={this.props.markComplete.bind(this, id)}/>
                {' '}
                { title }
                </p>
            </div>
        )
    }
}
~~~


## 48:00 [setState()](https://reactjs.org/docs/state-and-lifecycle.html){:target="_back"}

- App.js

~~~ jsx
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
        completed: true
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false
      },
    ]
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
         todo.completed = !todo.completed // toggle
      }
      return todo;
    }) });
  }
  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <Tods todos={this.state.todos} markComplete={this.markComplete}/>
      </div>
    );
  }
}

export default App;
~~~

## 55:20　加入 deleTod 把 props drilling 再一次練熟悉

- App.js

~~~ jsx
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
        completed: true
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false
      },
    ]
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
         todo.completed = !todo.completed // toggle
      }
      return todo;
    }) });
  }
  // Delete Todo
  delTodo = (id) => {
     this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]
     });
  }
  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <Tods todos={this.state.todos} 
              markComplete={this.markComplete}
              delTodo={this.delTodo}
              />
      </div>
    );
  }
}

export default App;
~~~

- Todos.js

~~~jsx
import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component{

    render() {
        return (
            this.props.todos.map((todo) => (
                <TodoItem key={todo.id}
                          todo={todo}
                          markComplete={this.props.markComplete}
                          delTodo={this.props.delTodo}
                          />
          ))
        )}
}

// PropTypes
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
   getStyle = () => {
       return {
           background: '#f4f4f4',
           padding: '10px',
           borderBottom: '1px #ccc dotted',
           textDecoration: this.props.todo.completed ? 'line-through' : 'none'
       }
   }

    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                <input type="checkbox" 
                       onChange={this.props.markComplete.bind(this, id)}/>
                {' '}
                { title }
                <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                </p>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const btnStyle = {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem
~~~

## 57:40 function base component [(functional component)](https://reactjs.org/docs/components-and-props.html){:target="_back"}

- just having rander~


- Header.js

~~~ jsx
import React from 'react';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>TodoList</h1>
        </header>
    )
}

const headerStyle = {
    background:'#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

export default Header;
~~~

- App.js

~~~ jsx
import React from 'react';
import './App.css';
import Tods from './components/Todos';
import Header from './components/layout/Header';

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
        completed: true
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false
      },
    ]
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
         todo.completed = !todo.completed // toggle
      }
      return todo;
    }) });
  }
  // Delete Todo
  delTodo = (id) => {
     this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]
     });
  }
  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <Header />
        <Tods todos={this.state.todos} 
              markComplete={this.markComplete}
              delTodo={this.delTodo}
              />
      </div>
    );
  }
}

export default App;
~~~

> 越來越有　 FU 了！！　哈哈哈　好今天先到這　掰掰　ＸＤＤ