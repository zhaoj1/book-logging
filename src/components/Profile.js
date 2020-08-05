import React from 'react';
import Search from './Search';
import ProfileBookCard from './ProfileBookCard';
import OverallChart from './OverallChart';

export default class Profile extends React.Component{

  state = {
    analyticsData: [],
    dateRange: [],
    yRange: [],
    dateLabels: [],
    chartView: true,
    selectedPointId: null
  }
 
  componentDidMount = async () => {
    this.props.fetchBooks();
    this.props.fetchPages();
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.modalIsOpen !== this.props.modalIsOpen){
      this.props.fetchBooks();
      this.props.fetchPages();
    }
    if(prevProps.pages !== this.props.pages){
      this.updateData();
    }
  }

  updateData = () => {
    let begDate = new Date()
    let endDate = new Date()
    endDate.setDate(endDate.getDate() + 7)
    this.props.pages.pages.length == 0 ?
      this.setState({ 
        dateRange : [
          begDate,
          endDate
        ],
        dateLabels: [
          begDate,
          endDate
        ]
      })
      :
      this.calculateAnalytics()
  }

  calculateAnalytics = () => {
    let dataSet = {};
    let analyticsData = [];
    let beginDate = new Date(this.props.pages.pages[0].dateRead + ' 00:00')
    let origin = new Date(beginDate)
    let originDate = origin.setDate(origin.getDate() - 1)
    let dateLabels = []
    let dateRange = [
      new Date(originDate),
      new Date(beginDate.setDate(beginDate.getDate() + 7))
    ]

    this.props.pages.pages.map(ele => {
      dataSet[ele.dateRead] ?
        dataSet[ele.dateRead] = dataSet[ele.dateRead] + ele.pagesRead
        :
        dataSet[ele.dateRead] = ele.pagesRead
    })

    Object.keys(dataSet).map(key => {
      let data = {}
      data['x'] = new Date(key + ' 00:00')
      data['y'] = dataSet[key]
      analyticsData.push(data)
    })
    
    analyticsData.unshift({
      x : new Date(originDate),
      y : 0
    })

    if(analyticsData[analyticsData.length-1].x.getTime() < dateRange[0].getTime() || analyticsData[analyticsData.length-1].x.getTime() > dateRange[1].getTime()){
      var i = new Date(originDate).getTime()
      dateRange = [
        new Date(originDate),
        new Date(analyticsData[analyticsData.length-1].x)
      ]

      dateLabels.push(dateRange[0])
      let labelDiff = Math.round((dateRange[1] - dateRange[0]) / (7 * 1000 * 60 * 60 * 24))
      while(i < dateRange[1].getTime()){
        let nextDate = new Date(i)
        nextDate.setDate(new Date(i).getDate() + Math.round(labelDiff))
        dateLabels.push(nextDate)
        i = nextDate
      }
    }

    this.setState({
      analyticsData : analyticsData,
      dateRange: dateRange,
      yRange: [0, Math.max(...analyticsData.map(ele => ele.y)) + 1],
      dateLabels: dateLabels
    })
  }

  toggleChart = () => {this.setState({chartView: !this.state.chartView})}

  setSelectedPoint = (data) => {this.setState({selectedPointId:data})}

  render(){
    return(
      this.props.loggedIn ?
        this.props.currentUser ? 
          <div className='profile-page'>
            <h1>{this.props.currentUser.username}</h1>
            <div className='profile-analytics'>
              <OverallChart 
                analyticsData={this.state.analyticsData}
                dateRange={this.state.dateRange}
                yRange={this.state.yRange}
                dateLabels={this.state.dateLabels}
                chartView={this.state.chartView}
                selectedPointId={this.state.selectedPointId}
                toggleChart={this.toggleChart}
                setSelectedPoint={this.setSelectedPoint}
              />
              <div className='profile-overall-analytics'>

              </div>
            </div>
            <div className='profile-lower'>
              <div className='library'>
                {this.props.booksList !== undefined && this.props.booksList !== null && this.props.booksList.books !== undefined? 
                  this.props.booksList.books.map(book => 
                    <ProfileBookCard
                      ele={book}
                      setSelectedBook={this.props.setSelectedBook}
                    />
                  )
                  :
                  null
                }
              </div>
              <div className='search-box'>
                <Search 
                  setResults={this.props.setResults}
                />
              </div> 
            </div>
          </div>
          :
          null
        :
        <>{this.props.history.push('/')}</>
    )
  }
}