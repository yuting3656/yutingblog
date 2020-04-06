---
layout: 'post'
title: 'React: Udemy React The Complete 筆記'
permalink: 'react/udemy-react-the-complete'
tags: react udemy-react
---

> 又是他!!! [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/){:target="_back"}
>
> Angular 跟他學 React 也準備要 XDD
>
> 真的是包山包海 XDDD
>
> 只記錄新的、直覺覺得會忘記的 XDDD


## 37. Children Props: Component 傳 open tag & close tag 內的文字

- `{props.children}`

~~~jsx
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <Person name="Max" age="20" />
        <Person name="Tim" age="30" >My Hobbies:  I have dream! </Person>
        <Person name="Tina" age="60" />
      </div>
      )
  };
}

export default App;
~~~

~~~ jsx
import React from 'react';

const person = (props) => {
    return (
        <div> 
         <p>I'm a {props.name} and I am  {props.age} years old! </p>
         <p>{props.children}</p>         
        </div>
        )
    };
    
export default person;
~~~

## 41. Events

- [list of events](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8124210#overview){:target="_back"}

~~~
In the last lecture, we saw that you can react to the onClick event - but to which other events can you listen? You can find a list of supported events here: https://reactjs.org/docs/events.html#supported-events

Clipboard Events
Event names:

onCopy onCut onPaste
Properties:

DOMDataTransfer clipboardData
Composition Events

Event names:

onCompositionEnd onCompositionStart onCompositionUpdate
Properties:

string data
Keyboard Events

Event names:

onKeyDown onKeyPress onKeyUp
Properties:

boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
Focus Events

Event names:

onFocus onBlur
These focus events work on all elements in the React DOM, not just form elements.

Properties:

DOMEventTarget relatedTarget
Form Events

Event names:

onChange onInput onInvalid onSubmit
For more information about the onChange event, see Forms.

Mouse Events

Event names:

onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
The onMouseEnter and onMouseLeave events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

Properties:

boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
Selection Events

Event names:

onSelect
Touch Events

Event names:

onTouchCancel onTouchEnd onTouchMove onTouchStart
Properties:

boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
UI Events

Event names:

onScroll
Properties:

number detail
DOMAbstractView view
Wheel Events

Event names:

onWheel
Properties:

number deltaMode
number deltaX
number deltaY
number deltaZ
Media Events

Event names:

onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
Image Events

Event names:

onLoad onError
Animation Events

Event names:

onAnimationStart onAnimationEnd onAnimationIteration
Properties:

string animationName
string pseudoElement
float elapsedTime
Transition Events

Event names:

onTransitionEnd
Properties:

string propertyName
string pseudoElement
float elapsedTime
Other Events

Event names:

onToggle
~~~


## 42. Manipulating the State

- `setState()` 來自 Component~
 
   ~~~js
   import React, { Component } from 'react'
   ~~~


   - `setState()` takes Object


## 44. useState() React Hooks


> React 16.8+

- [Hooks](https://reactjs.org/docs/hooks-intro.html){:target="_back"}

> 舊的 code class base 的 `state` 是唯一的一招
>
> 16.8+ Hooks 可以在 functional components 快樂的傳 `state`


- useState():
      - 裡面一開始可塞起始狀態 
      - 回傳第一個`element`: 現在的狀態
      - 回傳第二的`element`: 可改變狀態的 Function 

   ~~~js
     const [ currentState, setNewState  ] = useState({});
                                                  // {} 可塞起始狀態
                                                  // 起始狀態可塞各種： array bool , string , {}, number ... etc. 
   ~~~

> 重點！！！　
>
> 在 React Hooks 中：不會自動幫你 merge 舊的資料！
> 
> 可以用很多很多很多很多的 `useState` :heart: 
>
> 所以　Best Practice: 用多個 useState 來管理各式資料～
>
> 不用 一包肥肥的 state Object !! 
> 

- ex:

~~~js
import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person'

const App = () =>  {
  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 },
    ]
  });

  
  const switchNameHandler = () => {
    setPersonsState({
      persons: [
      { name: 'Tim', age: 30 },
      { name: 'Manu', age: 29 },
      { name: 'Tom', age: 18 },
    ]
  });
  }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button onClick={switchNameHandler}> Switch Name </button>
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age} />
        <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
      </div>
      )
}

export default App;
~~~

## 45. Staleless vs Stateful

- [https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541](https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541){:target="_back"}


## 46. Passing Method References Between Components


- 在 class components 傳參數到下一個 components 有兩招

   - { func.bind(this, "params") } __老師建議用這招__
   - { () => func("params") }

~~~js
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component  {

  state = {
    persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 26 },
      ]
  }

  
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
      { name: newName, age: 30 },
      { name: 'Manu', age: 29 },
      { name: 'Tom', age: 18 },
    ]
  });
  }

  render() {
      return (
          <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button onClick={() => this.switchNameHandler("Yuting")}> Switch Name </button>
        <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />
        <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age} />
        <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age} 
            click={this.switchNameHandler.bind(this, "Yuting: Click From <P>")}
            />
      </div>
      )
    };
}
    
export default App;
~~~


## 47. Two Way Binding

- App.js

~~~js
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component  {

  state = {
    persons: [
        { name: 'Max', age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 26 },
      ]
  }

  
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
      { name: newName, age: 30 },
      { name: 'Manu', age: 29 },
      { name: 'Tom', age: 18 },
    ]
  });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Joe', age: 30 },
        { name: event.target.value, age: 29 },
        { name: 'Tom', age: 18 },
      ]
    })
  }

  render() {
      return (
          <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button onClick={() => this.switchNameHandler('Yuting')}> Switch Name </button>
        <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />
        <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age}
            changed={this.nameChangedHandler}
            />
        <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age} 
            click={this.switchNameHandler.bind(this, "Yuting: Click From <P>")}
            />
      </div>
      )
    }
}
    
export default App;
~~~


- Persions.js

~~~js
import React from 'react';

const person = (props) => {
    return (
        <div> 
         <p onClick={props.click} >I'm a {props.name} and I am  {props.age} years old! </p>
         <p>{props.children}</p>
         <input type="text" onChange={props.changed} value={props.name}/>         
        </div>
        )
    };
    
export default person;
~~~

## Style: 獨立寫出來的 css file 會被吃成 global

