---
layout: "post"
title: "智慧工廠&製造: PDCA 之 要不要一起生牛寶寶 😎 "
permalink: "diary/:year-:month-:day/smart-manufacturing-industry4-pdca"
tags: 今日隨意 智慧工廠&製造 PDCA 阿葛之聲 chartjs
---

<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
  crossorigin="anonymous"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.min.js" integrity="sha512-VCHVc5miKoln972iJPvkQrUYYq7XpxXzvqNfiul1H4aZDwGBGC0lq373KNleaB2LpnC2a/iNfE5zoRYmB4TRDQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

## PDCA: `Plan` `Do` `Check` `Action`

|![Imgur](https://i.imgur.com/8SONBLw.png)|

> [資料來源](https://meet.bnext.com.tw/articles/view/44408){:target="\_back"}

## Plan (計畫): 針對 [QCD](https://yuting3656.github.io/yutingblog/diary/2021-05-23/backlog-to-smart-manufacturing-industry4){:target="\_back"} 的改善制定可行的計畫

```bash
一個月內 要生產 1000 隻符合規格的 手機
```

> `QCD`就是單純一個目標 (在這邊 : **讓工廠可以變得好棒棒** :heart:)
>
> 所以在 [呼吸之間: 日常之中](https://yuting3656.github.io/yutingblog/diary/2019-10-03){:target="\_back"} `QCD` 可以替換成生活中任呵一個目標 :sunglasses:
>
> 可以是:
>
> > 減肥計畫 :sunny:
> >
> > 學樂器 :musical_keyboard:
> >
> > 投資理財 :moneybag:
> >
> > 把妹子 :bikini: &nbsp; 生牛寶寶!? :baby:
> >
> > 各式有趣的生活一切~~~~ :bowtie:
>
> 各種生活的日常!

## Do (執行) : 執行了啦!

```bash
工廠開始生產搂
```

> 出發 跑步拉! :runner:
>
> 拿起吉他 開彈拉! :guitar:
>
> [樹精靈](https://www.cathaysec.com.tw/exclude_al/screen_trading/screen_trading.aspx){:target="\_back"}打開 財富自由了阿!!! :rowboat:
>
> 河濱公園看到跑步的漂亮大姊姊 :cupid::sunglasses: 就直爽劈頭的問 ㄟ~ 要不要一起生牛寶寶!? :kiss:

## Check (評估): 計畫成果的檢查評估

```bash
一個月到 只有 978 隻合規格的手機出來!
```

- 我自己認為就是 [AAR](https://en.wikipedia.org/wiki/After-action_review){:target="\_back"}

> 哈! 跑了 J 麼久~ 體重已經從 (**84** ---> **77**) :star::star::star:
>
> 耶~ C 和弦會按了拉~~~ :sparkles::sparkles::sparkles:
>
> Wow 帳面上多了一個 0 阿~~~ :heart_eyes::heart_eyes::heart_eyes:
>
> OMG~~~ 被河濱大姊姊 瞬間打槍ㄚㄚㄚㄚㄚㄚㄚㄚㄚㄚ~~~~ :scream::scream::scream:

## Action (改善)

```bash
阿幹! 我可以在生產過程當中就即時追蹤 等 bla bla bla~~~`
J 個請長官出來可以跟你說的三天三夜 唷唷唷唷~~~
```

> 喔唷! 可以配合重訓讓線條更棒棒唷! 繼續堅持! :sunny::sunny::sunny:
>
> 不錯唷~~~ 下次試試彈一首歌看看! GOGO!! :sparkles::sparkles::sparkles:
>
> 挖~~ 這次不當韭菜! 不過還是要小心投資唷唷! 能力範圍內的投資最踏實! :relaxed::relaxed:
>
> 再接再勵!!! :triumph::triumph: 下次要有對到眼的 :eyes: 再去問要不要一起生牛寶寶! :sunglasses::sunglasses:

# 一起來畫話話~~~

> 上面的圖 就是一個 PDCA 就是 一個 Cycle 一直輪轉
>
> 不間斷地 計畫 -> 執行 -> 檢視 -> 修正 -> 再一次新的計畫 :corn::corn::corn:

<div class="container" >
   <div class="row ">
    <div class="col col-sm-12 col-lg-6 mb-3">      
       <canvas id="myChart1" width="400" height="400"></canvas>
    </div>
    <div class="col col-sm-12 col-lg-6 mb-3">      
       <canvas id="myChart2" width="400" height="400"></canvas>
    </div>
    <div class="col col-sm-12 col-lg-6 mb-3">      
       <canvas id="myChart3" width="400" height="400"></canvas>
    </div>
    <div class="col col-sm-12 col-lg-6 mb-3">      
       <canvas id="myChart4" width="400" height="400"></canvas>
    </div>
    </div>
 </div>

<script>
var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');

var myChart1 = new Chart(ctx1, {
    type: 'polarArea',
    data: {
        labels: [
       'Plan: 減肥計畫',
       'DO: 跑步阿',
       'Check: 瘦了!! 84 --> 77',
       'Action: 方向棒棒! 繼續加油 配合重訓!',
       ],
       datasets: [{
         label: 'PDCA',
         data: [10, 8, 10, 8],
         backgroundColor: [
           'rgb(255, 99, 132)',
           'rgb(75, 192, 192)',
           'rgb(255, 205, 86)',
           'rgb(54, 162, 235)'
         ]
       }]
    },
      options:{
      plugins: {
      legend: {
        title: {
          display: true,
          text: '減肥計畫',
        }
      }
    }
  },
});
var myChart2 = new Chart(ctx2, {
    type: 'polarArea',
    data: {
        labels: [
       'Plan: 學樂器',
       'DO: 彈起來!',
       'Check: 會C和弦了唷!',
       'Action: 下次試試彈一首歌看看!',
       ],
       datasets: [{
         label: 'PDCA',
         data: [10, 6, 6, 9],
         backgroundColor: [
           'rgb(255, 99, 132)',
           'rgb(75, 192, 192)',
           'rgb(255, 205, 86)',
           'rgb(54, 162, 235)'
         ]
       }]
    },
      options:{
      plugins: {
      legend: {
        title: {
          display: true,
          text: '學樂器',
        }
      }
    }
  },
});
var myChart3 = new Chart(ctx3, {
    type: 'polarArea',
    data: {
        labels: [
       'Plan: 投資理財',
       'DO: 丟第一筆錢!',
       'Check: 帳戶多了一個0!',
       'Action: 繼續做功課 不做能力範圍外的投資!!',
       ],
       datasets: [{
         label: 'PDCA',
         data: [10, 7, 8, 7],
         backgroundColor: [
           'rgb(255, 99, 132)',
           'rgb(75, 192, 192)',
           'rgb(255, 205, 86)',
           'rgb(54, 162, 235)'
         ]
       }]
    },
      options:{
      plugins: {
      legend: {
        title: {
          display: true,
          text: '投資理財',
        }
      }
    }
  },
});
var myChart4 = new Chart(ctx4, {
    type: 'polarArea',
    data: {
        labels: [
       'Plan: 生牛寶寶',
       'DO: 要不要一起生牛寶寶~',
       'Check: 被打槍!',
       'Action: 下次對到眼再問!',
       ],
       datasets: [{
         label: 'PDCA',
         data: [10, 10, 1, 8],
         backgroundColor: [
           'rgb(255, 99, 132)',
           'rgb(75, 192, 192)',
           'rgb(255, 205, 86)',
           'rgb(54, 162, 235)'
         ]
       }]
    },
      options:{
      plugins: {
      legend: {
        title: {
          display: true,
          text: '生牛寶寶',
        }
      }
    }
  },
});

</script>

## 怎麼寫的

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
  crossorigin="anonymous"
/>
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.min.js"
  integrity="sha512-VCHVc5miKoln972iJPvkQrUYYq7XpxXzvqNfiul1H4aZDwGBGC0lq373KNleaB2LpnC2a/iNfE5zoRYmB4TRDQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>

<div class="container">
  <div class="row ">
    <div class="col col-sm-12 col-lg-6 mb-3">
      <canvas id="myChart1" width="400" height="400"></canvas>
    </div>
    <div class="col col-sm-12 col-lg-6 mb-3">
      <canvas id="myChart2" width="400" height="400"></canvas>
    </div>
    <div class="col col-sm-12 col-lg-6 mb-3">
      <canvas id="myChart3" width="400" height="400"></canvas>
    </div>
    <div class="col col-sm-12 col-lg-6 mb-3">
      <canvas id="myChart4" width="400" height="400"></canvas>
    </div>
  </div>
</div>

<script>
  var ctx1 = document.getElementById("myChart1");
  var ctx2 = document.getElementById("myChart2");
  var ctx3 = document.getElementById("myChart3");
  var ctx4 = document.getElementById("myChart4");

  var myChart1 = new Chart(ctx1, {
    type: "polarArea",
    data: {
      labels: [
        "Plan: 減肥計畫",
        "DO: 跑步阿",
        "Check: 瘦了!! 84 --> 77",
        "Action: 方向棒棒! 繼續加油 配合重訓!",
      ],
      datasets: [
        {
          label: "PDCA",
          data: [10, 8, 10, 8],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          title: {
            display: true,
            text: "減肥計畫",
          },
        },
      },
    },
  });
  var myChart2 = new Chart(ctx2, {
    type: "polarArea",
    data: {
      labels: [
        "Plan: 學樂器",
        "DO: 彈起來!",
        "Check: 會C和弦了唷!",
        "Action: 下次試試彈一首歌看看!",
      ],
      datasets: [
        {
          label: "PDCA",
          data: [10, 6, 6, 9],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          title: {
            display: true,
            text: "學樂器",
          },
        },
      },
    },
  });
  var myChart3 = new Chart(ctx3, {
    type: "polarArea",
    data: {
      labels: [
        "Plan: 投資理財",
        "DO: 丟第一筆錢!",
        "Check: 帳戶多了一個0!",
        "Action: 繼續做功課 不做能力範圍外的投資!!",
      ],
      datasets: [
        {
          label: "PDCA",
          data: [10, 7, 8, 7],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          title: {
            display: true,
            text: "投資理財",
          },
        },
      },
    },
  });
  var myChart4 = new Chart(ctx4, {
    type: "polarArea",
    data: {
      labels: [
        "Plan: 生牛寶寶",
        "DO: 要不要一起生牛寶寶~",
        "Check: 被打槍!",
        "Action: 下次對到眼再問!",
      ],
      datasets: [
        {
          label: "PDCA",
          data: [10, 10, 1, 8],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          title: {
            display: true,
            text: "生牛寶寶",
          },
        },
      },
    },
  });
</script>
```

## 參考資料

- [圖解智慧工廠：IoT、AI、RPA 如何改變製造業](https://www.books.com.tw/products/0010856797?gclid=CjwKCAjw-qeFBhAsEiwA2G7Nl6M33uR40GOoVfJvUItx3Lor_1tTqrZhS85AJmesheurIkTuWN9YhRoCufAQAvD_BwE){:target="\_back"}

- [chartjs](https://www.chartjs.org/docs/master/){:target="\_back"}
