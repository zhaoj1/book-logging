import React, { Component } from 'react'
import Chart from "chart.js";
import moment from 'moment';

let myChart, chartData, dateLabels

export default class LineChart extends Component {

  setData(){
    chartData = 
      this.props.data.length > 0 ?
        this.props.data
        :
        null
    dateLabels = 
      this.props.data.length > 0 ?
        this.props.data.map(ele => moment(ele.x).format('MM/DD'))
        :
        null
  }

  makeChart(){         
    const ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateLabels,
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
      this.setData();
      this.makeChart();
    }
  }

  render() {
    return (
      <canvas id="myChart" ></canvas>
    )
  }

}