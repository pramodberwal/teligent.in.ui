import React from 'react';
//import * as plugin from 'chartjs-plugin-datalabels';
import {Doughnut, Bar,Pie,Chart } from 'react-chartjs-2';

export default class BarChart extends React.Component{

componentDidMount = ()=>{
 //  Chart.plugins.register(plugin);
 Chart.plugins.register({
  afterDatasetsDraw: function(chart) {
   var ctx = chart.ctx;
   chart.data.datasets.forEach(function(dataset, i) {
    var meta = chart.getDatasetMeta(i);
    if (!meta.hidden) {
     meta.data.forEach(function(element, index) {
      // Draw the text in black, with the specified font
      ctx.fillStyle = 'rgb(0, 0, 0)';
      var fontSize = 18;
      var fontStyle = 'normal';
      var fontFamily = 'Helvetica Neue';
      ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
      // Just naively convert to string for now
      var dataString = dataset.data[index].toString();
      // Make sure alignment settings are correct
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var padding = 5;
      var position = element.tooltipPosition();
      ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
     });
    }
   });
  }
 });
}

render(){
 return <Bar 
  data={this.props.data}   
  options={{
   maintainAspectRatio:true,
   responsive:true,
   plugins:{
    datalabels: {
     color: 'black',
     display: function(context) {
      return context.dataset.data[context.dataIndex] > 0;
     },
     font: {
      weight: 'bold'
     },
     formatter: Math.round,
     title: false
    }
   },
   title: {
    display: true,
    padding:20,
    position:'top',
    text: this.props.title
   },
   legend: {
    position: "bottom"
   },
   scales: {
    yAxes: [{
     ticks: {
      beginAtZero: true
     }
    }],
    xAxes: [{
     barPercentage: 0.2
    }]
   }
  }}
 />;
}
}