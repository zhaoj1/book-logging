import React from 'react';
import moment from 'moment';

import Search from './Search';
import ProfileBookCard from './ProfileBookCard';
import OverallChart from './OverallChart';

import listBtn from '../imgs/listBtn.png'
import panelsBtn from '../imgs/panelsBtn.png'

export default class Profile extends React.Component{

  state = {
    analyticsData: [],
    dateLabels: [],
    selectedPointId: null,
    view: 'chart',
  }
 
  componentDidMount = () => {
    this.props.fetchBooks();
    this.props.fetchPages();
    window.scrollTo(0, 0);
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.modalIsOpen !== this.props.modalIsOpen){
      this.props.fetchBooks();
      this.props.fetchPages();
    }
    if(prevProps.pages !== this.props.pages){
      this.calculateAnalytics();
    }
  }

  calculateAnalytics = () => {
    let firstEle, lastEle
    let analyticsData = [];
    let today = new Date()
    let dateLabels = []

    if(this.props.pages.pages.length > 0){
      firstEle = new Date(this.props.pages.pages[0].dateRead)
      lastEle = new Date(this.props.pages.pages[this.props.pages.pages.length - 1].dateRead)
    }

    if(this.props.pages.pages.length == 0){
      let i = 1
      dateLabels.push(moment(today).format('MM/DD'))
      while(i <= 7){
        let nextDate = new Date()
        nextDate.setDate(nextDate.getDate() + 1)
        dateLabels.push(moment(nextDate).format('MM/DD'))
        i++
      }
    }else if((lastEle.getTime() - firstEle.getTime()) / (1000 * 60 * 60 * 24) <= 7){
      let i = 1
      dateLabels.push(moment(firstEle).format('MM/DD'))
      while(i <= 7){
        let nextDate = firstEle
        nextDate.setDate(nextDate.getDate() + 1)
        dateLabels.push(moment(nextDate).format('MM/DD'))
        i++
      }
    }else{
      let i = new Date(this.props.pages.pages[0].dateRead).getTime()
      let endDate = new Date(this.props.pages.pages[this.props.pages.pages.length - 1].dateRead).getTime()
      let labelDiff = Math.round((endDate - i) / (7 * 1000 * 60 * 60 * 24))
      while(i <= endDate){
        let nextDate = new Date(i)
        nextDate.setDate(new Date(i).getDate() + Math.round(labelDiff))
        dateLabels.push(moment(nextDate).format('MM/DD'))
        i = nextDate
      }
    }

    let dataSet = {}

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

    this.setState({
      dateLabels: dateLabels,
      analyticsData: analyticsData
    })

  }

  changeView = (view) => {this.setState({view: view})}

  setSelectedPoint = (data) => {this.setState({selectedPointId:data})}

  handleLogout = () => {
    this.props.logout()
    {this.props.history.push('/')}
  }

  render(){
    return(
      this.props.loggedIn ?
        this.props.currentUser ? 
          <div className='profile-page'>
            <h1 className='username'>{this.props.currentUser.username}</h1>
            <button className='logout-btn' onClick={this.props.logout}>Logout</button>
            <div className='profile-lower'>
              <Search 
                setResults={this.props.setResults}
                setDefaultSearch={this.props.setDefaultSearch}
                setDefaultAuthor={this.props.setDefaultAuthor}
              />
            </div>
            <div className='profile-analytics'>
              <div className='profile-analytics-left'>
                <div className='chart-container'>
                  <OverallChart 
                    data={this.state.analyticsData}
                    dateLabels={this.state.dateLabels}
                  />
                </div>
                <div className='profile-overall-analytics'>
                  <div className='profile-overall-analytics-left'>
                    <div className='profile-booklist-line-item'>Books Saved</div>
                    <div className='profile-booklist-line-item'>Books Completed</div>
                  </div>
                  <div className='profile-overall-analytics-right'>
                    <div className='profile-booklist-line-item'>
                      {this.props.booksList.books.length}
                    </div>
                      <div className='profile-booklist-line-item'>
                        {this.props.booksList ?  
                          this.props.booksList.books.filter(ele => ele.completed == true).length : 0
                        }
                      </div>
                    </div>
                </div>
              </div>
              <div className='profile-analytics-right'>
                <div className='library'>
                  <h2>Saved Books</h2>
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