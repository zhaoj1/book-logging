import React, { Component } from 'react'
import Chart from "chart.js";

let myChart 
let chartData

export default class LineChart extends Component {

  setData(props){
    chartData = 
      this.props.data.length > 0 ?
        this.props.data
        :
        null
  }

  makeChart(props){         
    const ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.props.dateLabels, 
        datasets: [{
          label: 'Pages Read',
          lineTension: 0,
          data: chartData,
          borderColor: [
            'rgb(0,0,0)'
          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              fontStyle: 'bold',
              precision: 0,
              suggestedMax: 5
            }
          }]
        },
      }
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      if(myChart){myChart.destroy()};
      this.setData(this.props);
      this.makeChart(chartData);
    }
  }

  render() {
    return (
      <canvas id="myChart" width="500" height="300"></canvas>
    )
  }

}