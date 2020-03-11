---
layout: 'post'
title: 'React: Hello World III XDDD'
permalink: 'react/hello-world-III'
tags: react react-router axios
---

> 今日來收尾~ :heart:
>
> 上一次的 [Hello World II XDD](https://yuting3656.github.io/yutingblog/react/hello-world-II){:target="_back"}
> 
> 上上一次的 [Hello World XDD](https://yuting3656.github.io/yutingblog/react/hello-world){:target="_back"}

### 跟著老師繼續學！

<iframe src="https://www.youtube.com/embed/sBws8MSXN7A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<hr/>

## 1:06:30 You provided a `value` prop to a form field without an `onChange` handler.

- AddTodo.js

~~~jsx
import React, { Component } from 'react'

export class AddTodo extends Component {

    state={
        title: ''
    }

    onChange = (e) => this.setState({ title: e.target.value});

    render() {
        return (
            <form style={ { display: 'flex'  } }>
                <input 
                  type="text"
                  name="title"
                  style={ { flex: '10' , padding: '5px'} }
                  placeholder="Add Todo ..."
                  value={this.state.title}
                  onChange={this.onChange}
                  />
                <input 
                   type="submit"
                   value="Submit"
                   className="btn"
                   style={ { flex: '1' } } 
                   />
            </form>
        )
    }
}

export default AddTodo
~~~

- 從 [React Developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en){:target="_back"} 看相在的狀態

   ![Imgur](https://i.imgur.com/LekUV69.jpg)


## 1:09:57 form submit

> 有FU
>
> AddTodo.js(input tag)  ---> App.js(addTodo())


- AddTodo.js

~~~jsx
import React, { Component } from 'react'

export class AddTodo extends Component {

    state={
        title: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value});

    onSubmit = (e) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        // 為了教學，沒有要送到後端
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: ''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={ { display: 'flex'  } }>
                <input 
                  type="text"
                  name="title"
                  style={ { flex: '10' , padding: '5px'} }
                  placeholder="Add Todo ..."
                  value={this.state.title}
                  onChange={this.onChange}
                  />
                <input 
                   type="submit"
                   value="Submit"
                   className="btn"
                   style={ { flex: '1' } } 
                   />
            </form>
        )
    }
}

export default AddTodo
~~~

- App.js

~~~jsx
import React from 'react';
import './App.css';
import Tods from './components/Todos';
import AddTodo from './components/AddTodo';
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
  // Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: 4,
      title, // === title: title  [es6] 
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }
  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <div className="container">
        <Header />
        <AddTodo addTodo={this.addTodo} />
        <Tods todos={this.state.todos} 
              markComplete={this.markComplete}
              delTodo={this.delTodo}
              />
        </div>
      </div>
    );
  }
}

export default App;
~~~


## 1:13:50 npm install `uuid`

> 跟之前用的一樣 XDD

-  App.js

~~~ jsx
import React from 'react';
import './App.css';
import Tods from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import * as   uuid from 'uuid';

class  App extends React.Component {

  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Dinner with wife',
        completed: true
      },
      {
        id: uuid.v4(),
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
  // Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title, // === title: title  [es6] 
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }

  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <div className="container">
        <Header />
        <AddTodo addTodo={this.addTodo} />
        <Tods todos={this.state.todos} 
              markComplete={this.markComplete}
              delTodo={this.delTodo}
              />
        </div>
      </div>
    );
  }
}

export default App;
~~~



## 1:15:40 [React Router](https://reacttraining.com/react-router/web/guides/quick-start){:target="_back"}

- `npm install react-router-dom`

- `rcf` generate functional component ~

- 要使用 __React Router__
   - 要把 element 都包進去~
   - 
   ~~~jsx 
      render() {
       return (
         <Router>
           <div className="App">
             <div className="container">
             <Header />
             <AddTodo addTodo={this.addTodo} />
             <Tods todos={this.state.todos} 
                   markComplete={this.markComplete}
                   delTodo={this.delTodo}
                   />
             </div>
           </div>
         </Router>
       );}
   ~~~

- [React.Fragment](https://reactjs.org/docs/fragments.html){:target="_back"}
   - 跟 __Angular__ [ng-container](https://alligator.io/angular/ng-container-element/){:target="_back"} 幾乎一樣!?


- App.js
  - 有Fu 多練習幾次就穩了 :smile:
  - [React Router: exact](https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path){:target="_back"}

~~~jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './App.css';
import Tods from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import * as   uuid from 'uuid';

class  App extends React.Component {

  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Dinner with wife',
        completed: true
      },
      {
        id: uuid.v4(),
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
  // Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title, // === title: title  [es6] 
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Tods todos={this.state.todos} 
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                      />
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
~~~

## 1:24:00 React Router: Link

- Header.js

~~~jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>TodoList</h1>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
        </header>
    )
}

const headerStyle = {
    background:'#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
   color: '#fff',
   textDecoration: 'none'
}

export default Header;
~~~


## 1:26:00 React: Http request

- [jsonplaceholder](https://jsonplaceholder.typicode.com/){:target="_back"}
   - [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos){:target="_back"}
   - __limt:__ `?_limit=10`

- `npm install axios`

- [__componentDidMount()__](https://reactjs.org/docs/react-component.html#componentdidmount){:target="_back"}
   - componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.


- App.js

~~~jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
// components
import Tods from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
// uuid
// import * as   uuid from 'uuid';
// axios
import axios from 'axios';

import './App.css';

class  App extends React.Component {
  state = {
    // todos: [
    //   {
    //     id: uuid.v4(),
    //     title: 'Take out the trash',
    //     completed: false
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Dinner with wife',
    //     completed: true
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Meeting with boss',
    //     completed: false
    //   },
    // ]

    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
       .then(res => this.setState({todos: res.data}))
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
  // Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title, // === title: title  [es6] 
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Tods todos={this.state.todos} 
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                      />
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
~~~

## 1:31:00 post, delete(1:32:50)

- [jsonplaceholder](https://jsonplaceholder.typicode.com/){:target="_back"}
   - [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos){:target="_back"}

- App.js

~~~jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
// components
import Tods from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
// uuid
import * as   uuid from 'uuid';
// axios
import axios from 'axios';

import './App.css';

class  App extends React.Component {
  state = {
    // todos: [
    //   {
    //     id: uuid.v4(),
    //     title: 'Take out the trash',
    //     completed: false
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Dinner with wife',
    //     completed: true
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Meeting with boss',
    //     completed: false
    //   },
    // ]

    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
       .then(res => this.setState({todos: res.data}))
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
     axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then( res => this.setState({ todos: 
          [...this.state.todos.filter(todo => todo.id !== id)]
        }));
  }
  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then( res => this.setState({ todos:
        [...this.state.todos, res.data]}));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Tods todos={this.state.todos} 
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                      />
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
~~~

## 1:35:00 Add PropTypes to components

- `import PropTyes from 'prop-types'`


- App.js

~~~jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
// components
import Tods from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
// uuid
import * as   uuid from 'uuid';
// axios
import axios from 'axios';

import './App.css';

class  App extends React.Component {
  state = {
    // todos: [
    //   {
    //     id: uuid.v4(),
    //     title: 'Take out the trash',
    //     completed: false
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Dinner with wife',
    //     completed: true
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Meeting with boss',
    //     completed: false
    //   },
    // ]

    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
       .then(res => this.setState({todos: res.data}))
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
     axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then( res => this.setState({ todos: 
          [...this.state.todos.filter(todo => todo.id !== id)]
        }));
  }
  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then( res => this.setState({ todos:
        [...this.state.todos, res.data]}));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Tods todos={this.state.todos} 
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                      />
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
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
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    deltodo: PropTypes.func.isRequired
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
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    deltodo: PropTypes.func.isRequired
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


- AddTodo.js

~~~jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class AddTodo extends Component {

    state={
        title: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value});

    onSubmit = (e) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        // 為了教學，沒有要送到後端
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: ''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={ { display: 'flex'  } }>
                <input 
                  type="text"
                  name="title"
                  style={ { flex: '10' , padding: '5px'} }
                  placeholder="Add Todo ..."
                  value={this.state.title}
                  onChange={this.onChange}
                  />
                <input 
                   type="submit"
                   value="Submit"
                   className="btn"
                   style= { { flex: '1' } } 
                   />
            </form>
        )
    }
}

// PropTypes
AddTodo.propTypes = {
    addtodo: PropTypes.func.isRequired,
}

export default AddTodo
~~~

## 1:36:50 deploy react app

- `npm run build`

- 在 build folder 下會有build好後所有的資源：）
   - 長這樣：
   ![Imgur](https://i.imgur.com/AzCMUql.jpg)


> 棒棒～　實作完成
>
> 是時候好好想　__React Side Project 了ＸＤＤ__