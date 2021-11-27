---
layout: "single"
title: 'Herzberg: Two-Factor Theory'
permalink: 'diary/:year-:month-:day/herzverg-two-factor-theory'
tags: 今日隨意 react 
---


<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<div id="root"></div>


<script type="text/babel">
const twoFactors = {
    "motivators": ["challenging work", "achievement", "responsibility", "growth", "recognition", "advancement"],
    "hygieneFactors": ["company policies", "job security", "relationships", "salary", "work conditions", "supervision"]
};
const inlineStyle = {
    display: 'inline-block'
};
const Factors = (props) => {
    console.log(props)
    return (
        <div style={inlineStyle}>
          <h3>
            {props.title}
            </h3>
          {props.data.map( (m, i) =>
            <ul  key={i} >
              <li>
                { m }
                </li>    
            </ul>
            )}
           </div> 
    )
};
const TestBtn = () => <button type="button">click</button>;
class TwoFactorTheory extends React.Component {
   render() {
       return (
         <div style={ { backgroundColor: "#b3d4e5", display: "inline-block" } }>
           <Factors data={twoFactors.motivators}  title="Motivators"/>
           <Factors data={twoFactors.hygieneFactors} title="Hygiene Factors"/>
         </div>
       )
   }
};
ReactDOM.render(
    <TwoFactorTheory />,
    document.getElementById("root")
);
</script>

> 上面 藍綠 background 是用 React 寫的 哈哈哈!
>
> 用我最愛的理論 [Herzberg: Two-Factor Theory](https://en.wikipedia.org/wiki/Two-factor_theory){:target="_back"}
>
> 明天再來玩動畫的 把想像中的用得更好 :)
>
> :heart: :heart: :heart:

## React code 

~~~html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<h1> Two Factor Theory</h1>
<div id="root"></div>
~~~

~~~jsx
<script type="text/babel">
const twoFactors = {
    "motivators": ["challenging work", "achievement", "responsibility", "growth", "recognition", "advancement"],
    "hygieneFactors": ["company policies", "job security", "relationships", "salary", "work conditions", "supervision"]
};
const inlineStyle = {
    display: 'inline-block'
};

// function component
const Factors = (props) => {
    console.log(props)
    return (
        <div style={inlineStyle}>
          <h3>
            {props.title}
            </h3>
          {props.data.map( (m, i) =>
            <ul  key={i} >
              <li>
                { m }
                </li>    
            </ul>
            )}
           </div> 
    )
};
// function component 另一種寫法
const TestBtn = () => <button type="button">click</button>;

// Class components
class TwoFactorTheory extends React.Component {
   render() {
       return (
         <div style={ { backgroundColor: "#b3d4e5", display: "inline-block" } }>
           <Factors data={twoFactors.motivators}  title="Motivators"/>
           <Factors data={twoFactors.hygieneFactors} title="Hygiene Factors"/>
         </div>
       )
   }
};
ReactDOM.render(
    <TwoFactorTheory />,
    document.getElementById("root")
);
</script>
~~~