---
layout: 'post'
title: 'React: Udemy React The Complete 筆記'
permalink: 'react/udemy-react-the-complete'
tags: react 
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


