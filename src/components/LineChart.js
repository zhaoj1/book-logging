import React, { Component } from 'react'
import Chart from "chart.js";
import moment from 'moment';

let myChart

export default class LineChart extends Component {

  state = {
    chartData: [],
    dateLabels: [],
  }

  setData(){
    this.setState({
      chartData: this.props.data,
      dateLabels: this.props.data.map(ele => moment(ele.x).format('MM/DD'))
    }, () => this.makeChart())
  }

  componentDidMount = () => {
    this.setData()
  }

  makeChart(){         
    const ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.dateLabels,
        datasets: [{
          label: 'Pages Read',
          lineTension: 0,
          data: this.state.chartData,
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
          }],
          xAxes: [{
            ticks: {
              minRotation: 45
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
    }
  }

  render() {
    return (
    <canvas id="myChart" ></canvas>
    )
  }

}