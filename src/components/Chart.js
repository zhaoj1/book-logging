import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Hint, MarkSeries} from 'react-vis';
import moment from 'moment';
import ListLineItem from './ListLineItem'

export default class Chart extends React.Component{

  render(){
    return(
      <div className='profileDetails-analytics' onClick={this.props.toggleChart}>
        <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css"></link>
          {
            this.props.chartView ?
              <>
                <XYPlot 
                  width={500} 
                  height={250}
                  xType="time"
                  xDomain={this.props.dateRange}
                  yDomain={this.props.yRange}
                  margin={{right:20}}
                  onMouseLeave={() => this.props.setSelectedPoint(null)}
                >
                  <HorizontalGridLines />
                  <VerticalGridLines />
                  <XAxis 
                    tickFormat={value => moment(value).format('MM/DD')}
                    tickValues={
                      this.props.dateLabels.length == 0 ?
                        null
                        :
                        this.props.dateLabels
                    }
                  />
                  <YAxis />
                  <LineSeries
                    animation
                    data={this.props.analyticsData}
                    onNearestX={(value)=> this.props.setSelectedPoint(value)}
                  />
                  {this.props.selectedPointId == null ? 
                    null
                    :
                    <Hint 
                      value={this.props.selectedPointId}
                    >
                      <div className='chartHint'>
                        <p>
                          {moment(this.props.selectedPointId.x).format('MM/DD/YYYY')}<br></br>
                          {this.props.selectedPointId.y} page(s)
                        </p>
                      </div>
                    </Hint>
                  }
                  {this.props.selectedPointId == null ? 
                    null
                    :
                    <MarkSeries 
                      data={[this.props.selectedPointId]}
                    />
                  }
                </XYPlot>
              </>
              :
              <div className='listView'>
                {this.props.analyticsData.map(ele => 
                  <ListLineItem 
                    data={ele}
                  />
                )}
              </div>
        }
      </div>
    )
  }
}