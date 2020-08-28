---
layout: 'post'
title: '工作筆記: 你今天甘蔗了嗎? '
permalink: 'work-note/gantt-charts-lol'
tags: 工作筆記 javascript 
---

> 你今天 甘蔗了嗎?



<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


## [Google Gantt Chart](https://developers.google.com/chart/interactive/docs/gallery/ganttchart){:target="_back"}

<div id="chart_div"></div>


 <script type="text/javascript">
    google.charts.load('current', {'packages':['gantt']});
    google.charts.setOnLoadCallback(drawChart);

    function daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
    }

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('string', 'Resource');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');

      data.addRows([
        ['Research', '平日有五天', 'Day',
         new Date(2020, 6, 26), new Date(2020, 7, 1), null,  100,  null],
        ['Work Out', '禮拜一 重訓', 'exercise',
         new Date(2020, 6, 27), new Date(2020, 6, 28), null, 100, null],
        ['Swimming', '禮拜二 游泳', 'exercise1',
         new Date(2020, 6, 28), new Date(2020, 6, 29), null, 100, null],
        ['Running', '禮拜三 跑步', 'exercise2',
         new Date(2020, 6, 29), new Date(2020, 6, 30), null, 100, null],
        ['StudyGroup', '禮拜四 讀書會', 'study',
         new Date(2020, 6, 30), new Date(2020, 6, 31), null, 20, null],
        ['TGIF', '禮拜五 小周末~~~ TGIF', 'happy',
         new Date(2020, 6, 31), new Date(2020, 7, 1), null, 0, null]
      ]);

      var options = {
              height: 300,
        gantt: {
          trackHeight: 30
        }
      };

      var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
  </script>


- See the below table for a list of how Gantt handles the presence of start, end, and duration in different circumstances.

| Start	  |  End	 | Duration	| Result  |
| Present |	Present	 | Present	| Check that duration is consistent with start/end times. Throws error if inconsistent. |
| Present |	Present	 | Null	    | Computes duration from start and end times. |
| Present |	Null	 | Present	| Computes end time. |
| Present |	Null	 | Null	    | Throws error as unable to compute duration or end time. |
| Null	   | Present | 	Present	| Computes start time. |
| Null	   | Null	 | Present	| Computes start time based on dependencies. In conjunction with defaultStartDate, enables chart to be drawn using only durations. |
| Null	   | Present | 	Null	| Throws error as unable to calculate start time or duration. |
| Null	   | Null	 | Null	    | Throws error as unable to calculate start time, end time, or duration. |


## React Google charts

   - `data array index 0 吃的是 columns 參數`
   - [https://react-google-charts.com/gantt-chart](https://react-google-charts.com/gantt-chart){:target="_back"}
   - [https://www.youtube.com/watch?v=oX7Wqavzoc0](https://www.youtube.com/watch?v=oX7Wqavzoc0){:target="_back"}
   - [https://www.npmjs.com/package/react-google-charts#gantt-chart](https://www.npmjs.com/package/react-google-charts#gantt-chart){:target="_back"}


~~~javascript 
  
import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}
const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" }
];

const rows = [
  [
    "Research",
    "Find sources",
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    100,
    null
  ],
  [
    "Write",
    "Write paper",
    null,
    new Date(2015, 0, 9),
    daysToMilliseconds(3),
    25,
    "Research,Outline"
  ],
  [
    "Cite",
    "Create bibliography",
    null,
    new Date(2015, 0, 7),
    daysToMilliseconds(1),
    20,
    "Research"
  ],
  [
    "Complete",
    "Hand in paper",
    null,
    new Date(2015, 0, 10),
    daysToMilliseconds(1),
    0,
    "Cite,Write"
  ],
  [
    "Outline",
    "Outline paper",
    null,
    new Date(2015, 0, 6),
    daysToMilliseconds(1),
    100,
    "Research"
  ]
];
class App extends React.Component {
  state = {
    chartImageURI: ""
  };
  render() {
    return (
      <div className="App">
        <Chart
          chartType="Gantt"
          data={[columns, ...rows]}
          width="100%"
          height="50%"
          legendToggle
        />
        <div>
          I'm a picture of the chart
          <img src={this.state.chartImageURI} />
        </div>
      </div>
    );
  }
}
  ~~~



  
### recharts

- [https://github.com/recharts/recharts](https://github.com/recharts/recharts){:target="_back"}

## Echarts

- [https://echarts.apache.org/en/index.html](https://echarts.apache.org/en/index.html){:target="_back"}

   - Echarts for react

      ~~~javascript
      npm install --save echarts-for-react
      
      # `echarts` is the peerDependence of `echarts-for-react`, you can install echarts with your own version.
      npm install --save echarts
      ~~~

## JSCharting

- [https://jscharting.com/editor/#name=GanttMarkers.htm](https://jscharting.com/editor/#name=GanttMarkers.htm){:target="_back"}

- [https://jscharting.com/editor/#name=GanttMilestones.htm](https://jscharting.com/editor/#name=GanttMilestones.htm){:target="_back"}

   - react jscharting
       - [https://github.com/jscharting/jscharting-react](https://github.com/jscharting/jscharting-react){:target="_back"}

## DHTMLX Gantt

- [https://dhtmlx.com/docs/products/dhtmlxGantt/](https://dhtmlx.com/docs/products/dhtmlxGantt/){:target="_back"}

## react-gantt-timeline

- [https://github.com/guiqui/react-timeline-gantt](https://github.com/guiqui/react-timeline-gantt){:target="_back"}