---
layout: 'post'
title: 'React: Udemy React lists conditionally'
permalink: 'react/udemy-working-lists-conditionally'
tags: react udemy-react
---

## 53. Rending Content Condionally

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
      ],
      showPersons: false
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

  togglePersionsHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
  }

  render() {

    const style = {
        backgroundColor: 'pink',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer'
    };

      return (
          <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button 
            onClick={this.togglePersionsHandler}
            style={style}
            > Toggle Persons </button>
        { 
          
          this.state.showPersons 
          ?
             <div>
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
          : 
          null
        }
      </div>
      )
    }
}
    
export default App;
~~~


## 54. Handing Dynamic Content

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
      ],
      showPersons: false
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

  togglePersionsHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
  }

  render() {

    const style = {
        backgroundColor: 'pink',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
        persons = (
          <div>
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

      return (
          <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button 
            onClick={this.togglePersionsHandler}
            style={style}
            > Toggle Persons </button>
           {persons}
      </div>
      )
    }
}
    
export default App;
~~~

## 56. Outputting List

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
      ],
      showPersons: false
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

  togglePersionsHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
  }

  render() {

    const style = {
        backgroundColor: 'pink',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
        persons = (
          <div>
          {this.state.persons.map(person => {
              return <Person 
                    name={person.name} 
                    age={person.age} />
          })}
         </div>
        )
    }

      return (
          <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button 
            onClick={this.togglePersionsHandler}
            style={style}
            > Toggle Persons </button>
           {persons}
      </div>
      )
    }
}
    
export default App;

~~~

## 57. 58, 59, 60

- App.js

~~~js
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component  {

  state = {
    persons: [
        { id: '1', name: 'Max', age: 28 },
        { id: '2', name: 'Manu', age: 29 },
        { id: '3', name: 'Stephanie', age: 26 },
      ],
      showPersons: false
  }


  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
   
    // const person = Object.assign({}, this.state.persons[personIndex]); // 舊的方法

    person.name = event.target.value

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  togglePersionsHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
  }

  render() {

    const style = {
        backgroundColor: 'pink',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
        persons = (
          <div>
          {this.state.persons.map((person, index) => {
              return <Person 
                    click={() => this.deletePersonHandler(index)}
                    name={person.name} 
                    age={person.age} 
                    key ={person.id}
                    changed={(event) => this.nameChangedHandler(event, person.id)}
                    />
          })}
         </div>
        )
    }

      return (
          <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button 
            onClick={this.togglePersionsHandler}
            style={style}
            > Toggle Persons </button>
           {persons}
      </div>
      )
    }
}
    
export default App;
~~~

- Person.js

~~~js
import React from 'react';
import './Person.css'

const person = (props) => {
    return (
        <div className="Person"> 
         <p onClick={props.click} >I'm a {props.name} and I am  {props.age} years old! </p>
         <p>{props.children}</p>
         <input 
             type="text" 
             onChange={props.changed}
             value={props.name}/>         
        </div>
        )
    };
    
export default person;
~~~