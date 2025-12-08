---
layout: "single"
title: '有一點職業倦怠啊！'
permalink: 'diary/:year-:month-:day'
tags: 今日隨意 javascript
---

> 昨天不知道為什麼，一瞬間有一股莫想要逃離工作，
>
> 速度離開現在崗位的衝動！！！
>
> 後來自己認真的思考過後，我覺得是因為過去一年半，
>
> 我的一直使用 AI 快速開發，都沒有學到的知識和架構，
>
> 如此一來 `Herzberg's Two-Factor Theory` 的 Motivators 
>
> 變超低！！！ **自我成長** **自我學習** 都沒有進步的港覺！！！！
>
> 必須改變！！！ 
>
> 以後最少每週都要寫一點，跟 ＡＩ產出來的 code 學一點東西 or 複習一點概念！！！ 
>
> 改變從現在開始！！！ 


## 1. `_` 點線組合資料會遇到 edge case ！！！

- 前陣子工作有遇到一個 *BUG*，我用底線 `_` 去組合 Excel 上傳不同 tabs 的資料，但是遇到客戶真實資料真的有用 `_`，就會叉燒包，所以後來 gpt 推薦用 nested map 組合！！！ 學起來！

   - 舊版概念

      ```js
      const pNumberRouteName = `${current["product_number"]}_${current["route_name"]}`;
      const routeArr =
        state[pNumberRouteName] || (state[pNumberRouteName] = []);
      
      routeArr.push(current);
      ```

    - 新版 (重構) 
        
        ```js
        const opDataListObj = (operationTableData || []).reduce(
          (state, current) => {
            const productNumber = current["product_number"];
            const routeName = current["route_name"];
        
            if (!state[productNumber]) {
              state[productNumber] = {};
            }
            if (!state[productNumber][routeName]) {
              state[productNumber][routeName] = [];
            }
        
            // 這裡做 std_ts_in_min → std_ts 的轉換
            if (
              sfrConfig.operation_std_ts_in_min_count_flag === 1 &&
              current.op_std_ts_in_min
            ) {
              const stdTsInMin = parseFloat(current.op_std_ts_in_min);
              if (!Number.isNaN(stdTsInMin) && stdTsInMin !== 0) {
                current.op_std_ts = parseFloat(
                  parseFloat(1 / stdTsInMin).toFixed(3)
                );
              }
            }
        
            state[productNumber][routeName].push(current);
            return state;
          },
          {}
        );
        ```

    - 新的概念長這樣
    
        ```js
         opDataListObj = {
            "P001": {
              "標準途程A": [op1, op2, op3],
              "標準途程B": [op1, op2],
            },
            "P002": {
              "途程1": [op1],
            },
          };
        ```

## 2. 練習一下 canvas , 一個畫板讓你寫字


<canvas id="drawCanvas" width="500" height="300" style="border:1px solid #888;"> </canvas>

<script>
    const canvas2 = document.getElementById("drawCanvas");
    const ctx2 = canvas2.getContext("2d");
    let drawing = false;

    canvas2.addEventListener("mousedown", () => {drawing = true;});
    canvas2.addEventListener("mouseup", () => { drawing = false; ctx2.beginPath(); });
    canvas2.addEventListener("mouseleave", () => { drawing = false; ctx2.beginPath(); });
    canvas2.addEventListener("mousemove", (e) => {
        if (!drawing) return;

        const rect = canvas2.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx2.lineWidth = 3;
        ctx2.lineCap = "roud";
        ctx2.strokStyle = "#0077ff";

        ctx2.lineTo(x, y);
        ctx2.stroke();
        ctx2.beginPath();
        ctx2.moveTo(x, y);
    });
</script>

```html

<canvas id="drawCanvas" width="500" height="300" style="border:1px solid #888;"> </canvas>

<script>
    const canvas2 = document.getElementById("drawCanvas");
    const ctx2 = canvas2.getContext("2d");
    let drawing = false;

    canvas2.addEventListener("mousedown", () => {drawing = true;});
    canvas2.addEventListener("mouseup", () => { drawing = false; ctx2.beginPath(); });
    canvas2.addEventListener("mouseleave", () => { drawing = false; ctx2.beginPath(); });
    canvas2.addEventListener("mousemove", (e) => {
        if (!drawing) return;

        const rect = canvas2.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx2.lineWidth = 3;
        ctx2.lineCap = "roud";
        ctx2.strokStyle = "#0077ff";

        ctx2.lineTo(x, y);
        ctx2.stroke();
        ctx2.beginPath();
        ctx2.moveTo(x, y);
    });
</script>

```



#### Reference

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)