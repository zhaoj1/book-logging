import React from 'react';
import moment from 'moment';
import LineChart from './LineChart'

export default class ProfileBookDetails extends React.Component{

  state = {
    pagesRead: 0,
    dateRead: null,
    analyticsData: [],
    dateLabels: [],
    chartView: true,
    selectedPointId: null,
  }

  componentDidMount = () => {
    this.calculateAnalytics();
  }
  
  calculateAnalytics = () => {
    let firstEle, lastEle
    let analyticsData = [];
    let today = new Date()
    let bookPages = this.props.pages.pages.filter(page => page.book == this.props.selectedBook.id)
    let dateLabels = []

    if(bookPages.length > 0){
      firstEle = new Date(bookPages[0].dateRead)
      lastEle = new Date(bookPages[bookPages.length - 1].dateRead)
    }

    if(bookPages.length == 0){
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
      let i = new Date(bookPages[0].dateRead).getTime()
      let endDate = new Date(bookPages[bookPages.length - 1].dateRead).getTime()
      let labelDiff = Math.round((endDate - i) / (7 * 1000 * 60 * 60 * 24))
      while(i <= endDate){
        let nextDate = new Date(i)
        nextDate.setDate(new Date(i).getDate() + Math.round(labelDiff))
        dateLabels.push(moment(nextDate).format('MM/DD'))
        i = nextDate
      }
    }

    let dataSet = {}

    bookPages.map(ele => {
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

  toggleChart = () => {this.setState({chartView: !this.state.chartView})}

  setSelectedPoint = (data) => {this.setState({selectedPointId:data})}

  handleChange = (event) => {this.setState({[event.target.name]: event.target.value})}

  createPages = async (event) => {
    event.preventDefault()

    const resp = await 
    fetch(`http://127.0.0.1:8000/pages/`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        pagesRead: parseInt(this.state.pagesRead),
        dateRead: this.state.dateRead,
        book: this.props.selectedBook.id,
        owner: this.props.currentUser.id,
        username: this.props.currentUser.username,
      })
    })
    if(resp.ok){
      this.props.fetchPages();
      this.calculateAnalytics();
    }
  }

  deleteBook = async () => {
    const bookDeleted = await fetch(`http://127.0.0.1:8000/books/${this.props.selectedBook.id}`, {
      method: 'DELETE',
      headers: {'Authorization': `JWT ${sessionStorage.getItem('token')}`}
    })
    if(bookDeleted){
      this.props.closeModal();
      this.props.fetchBooks();
    }
  }

  render(){
    return(
      <div className='bookDetails'>
        <div className='bookDetails-left'>
          <img className='bookCover' src={this.props.selectedBook.imageLink} />
          <div className='bookInfo'>
            <label className='bookTitle'>
              {
                this.props.selectedBook.title.length >= 25 ? 
                  this.props.selectedBook.title.slice(0, 22) + '...'
                  :
                  this.props.selectedBook.title
              }
            </label><br></br>
            {this.props.selectedBook.authors}<br></br>
            <label className='bookISBN'>
              ISBN10: {this.props.selectedBook.isbn10}
            </label><br></br>
            <label className='bookISBN'>
              ISBN13: {this.props.selectedBook.isbn13}
            </label>
          </div>
        </div>
        <div className='bookDetails-right'>
          <div className='chart-container'>
            <LineChart 
              data={this.state.analyticsData}
              dateLabels={this.state.dateLabels}
            />
          </div>
          <div className='profileDetails-pages'>
            <h2 className='pages_read'>Pages Read: {this.props.pages.pages !== null || this.props.pages.pages !== undefined ?
                this.props.pages.pages.filter(page => page.book == this.props.selectedBook.id).reduce((acc, obj) => {return acc + obj.pagesRead}, 0)
                :
                null} / {this.props.selectedBook.totalPages}</h2>
            <form
              onSubmit={this.createPages}
            >
              <input
                type='text' 
                name='pagesRead' 
                onChange={this.handleChange}
                placeholder='Pages Read' 
                className='input'
                required
              >
              </input>
              <input
                type='date' 
                name='dateRead' 
                onChange={this.handleChange}
                className='input'
                required
              >
              </input><br></br>
              <input
                type='submit'
                className='submitBtn'
                value='Update'
              >
              </input>
            </form>
            <button onClick={this.deleteBook} className='submitBtn' >Delete</button>
          </div>
        </div>
      </div>
    )
  }
}