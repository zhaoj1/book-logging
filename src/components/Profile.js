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
    list: false
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

  toggleList = () => {this.setState({list: !this.state.list})}

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
            <div className='profile-analytics'>
              <div className='chart-container'>
                <OverallChart 
                  data={this.state.analyticsData}
                  dateLabels={this.state.dateLabels}
                />
              </div>
              <div className='profile-analytics-right'>
                <div className='profile-buttons-container'>
                  <button 
                    className='booklist-toggle-btn-left'
                    onClick={this.toggleList}
                    disabled={this.state.list?false:true}
                    style={{'background-image':`url(${panelsBtn})`}} 
                  ></button>
                  <button 
                    className='booklist-toggle-btn-right'
                    onClick={this.toggleList}
                    disabled={this.state.list?true:false}
                    style={{'background-image':`url(${listBtn})`}} 
                  ></button>
                </div>
                <div className='library'>
                  {this.props.booksList !== undefined && this.props.booksList !== null && this.props.booksList.books !== undefined? 
                    this.state.list ? 
                      <div className='list-view'>
                        <h2
                          style={{
                            'color':'whitesmoke',
                          }}
                        >ANALYTICS</h2>
                        <div className='profile-booklist'>
                          <div className='profile-booklist-left'>
                            <div className='profile-booklist-line-item'>Books Saved</div>
                            <div className='profile-booklist-line-item'>Books Completed</div><br></br>
                            <div 
                              className='profile-booklist-line-item'
                              style={{
                                'color':'whitesmoke',
                                'background-color':'rgb(50,50,100)'
                              }}
                            >Title</div>
                            {this.props.booksList.books.map(book => 
                              <div 
                                className='profile-booklist-book-title'
                                onClick={() => this.props.setSelectedBook(book, 'profile')}
                              >
                                {book.title.length >= 25 ?
                                  book.title.slice(0, 22) + '...'
                                  :
                                  book.title
                                }
                              </div>
                            )}
                          </div>
                          <div className='profile-booklist-right'>
                            <div className='profile-booklist-line-item'>
                              {this.props.booksList.books.length}
                            </div>
                            <div className='profile-booklist-line-item'>
                              {this.props.booksList ?  
                                this.props.booksList.books.filter(ele => ele.completed == true).length : 0
                              }
                            </div><br></br>
                            <div 
                              className='profile-booklist-line-item'
                              style={{
                                'color':'whitesmoke',
                                'background-color':'rgb(50,50,100)'
                              }}
                            >Pages Read</div>
                            {this.props.booksList.books.map(book =>
                              <div className='profile-booklist-line-item'>
                                {this.props.pages.pages.filter(page => page.book == book.id).reduce((acc, obj) => {return acc + obj.pagesRead}, 0)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      :
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
            <div className='profile-lower'>
              <Search 
                setResults={this.props.setResults}
                setDefaultSearch={this.props.setDefaultSearch}
                setDefaultAuthor={this.props.setDefaultAuthor}
              />
            </div>
          </div>
          :
          null
        :
        <>{this.props.history.push('/')}</>
    )
  }
}