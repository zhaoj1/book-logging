import React, { Component } from 'react'
import Chart from "chart.js";

let overallChart, chartData

export default class LineChart extends Component {

  setData(props){
    chartData = 
      this.props.data.length > 0 ?
        this.props.data
        :
        null
  }

  makeChart(props){         
    const ctx = document.getElementById("overallChart");
    overallChart = new Chart(ctx, {
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
        responsive: true,
        maintainAspectRatio: false,
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
      if(overallChart){overallChart.destroy()};
      this.setData(this.props);
      this.makeChart(chartData);
    }
  }

  render() {
    return (
      <canvas id="overallChart" ></canvas>
    )
  }

}