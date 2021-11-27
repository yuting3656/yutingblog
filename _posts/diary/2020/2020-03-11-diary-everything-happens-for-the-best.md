---
layout: "single"
title: "所有的安排，都是最好的安排 :)"
permalink: 'diary/:year-:month-:day/everything-happens-for-the-bset'
tags: 今日隨意 axios
---

> EVERYTHING HAPPENS FOR THE BEST :smile:
>
> 寫了 快3個月 udemy docker `matery` 
>
> 今天終於被抓包了 XDDDDD
> 
> 謝謝 :) 
> 
> 就繼續變強吧!


## 阿夢在中間

   - [https://stackoverflow.com/questions/4687923/how-to-center-a-div-from-top-to-bottom](https://stackoverflow.com/questions/4687923/how-to-center-a-div-from-top-to-bottom){:target="_back"}

   - [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate){:target="_back"}

~~~html
<style>
.container{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%)
}

.square{
    height:50px;
    width: 50px;
    background-color: rgba(200, 0, 0, 0.5);
    background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png');
    background-position: center;
}
</style>

<div class="container">
   <div class="square"></div>
</div>
~~~


<style>
.container{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%)
}

.square{
    height:50px;
    width: 50px;
    background-color: rgba(200, 0, 0, 0.5);
    background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png');
    background-position: center;
}
</style>

<div class="container">
<div class="square"></div>
</div>


## axios 

- [axios](https://github.com/axios/axios){:target="_back"}
- 一筆一筆照順序回來 :)
   - [https://pokeapi.co/](https://pokeapi.co/){:target="_back"}
   - [evolution-chain API:](https://pokeapi.co/docs/v2.html#evolution-section){:target="_back"} `https://pokeapi.co/api/v2/evolution-chain/{chain-id}`
      - `{chain-id}: 1` 妙蛙種子(id: 1) --> 妙蛙草(id: 2)--> 妙蛙花(id: 3)
      - `{chain-id}: 2` 小火龍(id: 4) --> 火恐龍(id: 5) --> 噴火龍(id: 6) 
      - `{chain-id}: 3` 傑尼龜(id: 7) --> 卡咪龜(id: 8) --> 水箭龜(id: 7)
- Angualr 還真的沒踩過這個雷 XDD (還是有? 忘了? 問 [帆哥](https://josephjsf2.github.io/){:target="_back""} XDDD)
   - 說真的 我 await / async 還真的是在 [保哥的自動化測試](https://www.accupass.com/event/1901110945291586558310){:target="_back"} 第一次用到 XDDDDD 
   - 教超好~ 看來要把筆記寫起來 :heart: __TODO__
- 開 console 看:)


~~~html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>
const getEvolve_order = async () => {
   
const data_1 = await axios.get('https://pokeapi.co/api/v2/evolution-chain/1');
const data_2 = await axios.get('https://pokeapi.co/api/v2/evolution-chain/2');
const data_3 = await axios.get('https://pokeapi.co/api/v2/evolution-chain/3');

console.log('from order:', data_1.data['chain']['evolves_to'][0]['species']);
console.log('from order:', data_2.data['chain']['evolves_to'][0]['species']);
console.log('from order:', data_3.data['chain']['evolves_to'][0]['species']);
};


const getEvolve_no_order = () => {
axios.get('https://pokeapi.co/api/v2/evolution-chain/1')
    .then(res => console.log('from no order:', res.data['chain']['evolves_to'][0]['species']));
axios.get('https://pokeapi.co/api/v2/evolution-chain/2')
    .then(res => console.log('from no order:',res.data['chain']['evolves_to'][0]['species']));
axios.get('https://pokeapi.co/api/v2/evolution-chain/3')
    .then(res => console.log('from no order:',res.data['chain']['evolves_to'][0]['species']));
}

getEvolve_order();
getEvolve_no_order();

</script>
~~~

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>

<script>
const getEvolve_order = async () => {
   
const data_1 = await axios.get('https://pokeapi.co/api/v2/evolution-chain/1');
const data_2 = await axios.get('https://pokeapi.co/api/v2/evolution-chain/2');
const data_3 = await axios.get('https://pokeapi.co/api/v2/evolution-chain/3');

console.log('from order:', data_1.data['chain']['evolves_to'][0]['species']);
console.log('from order:', data_2.data['chain']['evolves_to'][0]['species']);
console.log('from order:', data_3.data['chain']['evolves_to'][0]['species']);
};


const getEvolve_no_order = () => {
axios.get('https://pokeapi.co/api/v2/evolution-chain/1')
    .then(res => console.log('from no order:', res.data['chain']['evolves_to'][0]['species']));
axios.get('https://pokeapi.co/api/v2/evolution-chain/2')
    .then(res => console.log('from no order:',res.data['chain']['evolves_to'][0]['species']));
axios.get('https://pokeapi.co/api/v2/evolution-chain/3')
    .then(res => console.log('from no order:',res.data['chain']['evolves_to'][0]['species']));
}

getEvolve_order();
getEvolve_no_order();

</script>


> 寫一寫 踏實多了 :)
>
> 正所謂準備 120% 才有可能 80%的表現 
>
> 哈哈哈~