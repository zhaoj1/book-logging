import React from 'react';
import moment from 'moment';
import LineChart from './LineChart'
import ProfileBookDetails from './ProfileBookDetails'

// let pagesRead

export default class ProfileBookAnalytics extends React.Component{

  state = {
    pagesRead: null,
    dateRead: null,
    analyticsData: [],
    dateLabels: [],
    chartView: true,
    selectedPointId: null,
    error: null,
    bookDetails: {},
    pages: 0
  }

  componentDidMount = () => {
    this.calculateAnalytics();
    this.searchBook()
    
    {this.props.pages.pages !== null || this.props.pages.pages !== undefined ?
      // pagesRead = this.props.pages.pages.filter(page => page.book == this.props.selectedBook.id).reduce((acc, obj) => {return acc + obj.pagesRead}, 0)
      this.setState({pages: this.props.pages.pages.filter(page => page.book == this.props.selectedBook.id).reduce((acc, obj) => {return acc + obj.pagesRead}, 0)})
      :
      // pagesRead = 0
      this.setState({pages: 0})
    }
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props){this.calculateAnalytics();}
  }

  searchBook = async () => {
    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.props.selectedBook.api_id}&key=` + process.env.REACT_APP_GOOGLE_BOOKS_API_KEY)
    const json = await resp.json()
    this.setState({bookDetails:json.items[0].volumeInfo})
  }

  completeBook = async () => {
    const postBook = await fetch(`https://book-logging.herokuapp.com/books/${this.props.selectedBook.id}/patch/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `JWT ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        completed: true
      })
    })
    if(postBook){this.props.fetchBooks()}
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

    if(this.state.pages + parseInt(this.state.pagesRead) > this.props.selectedBook.totalPages){
      this.setState({error: 'Please enter a valid number of pages.'})
    }else{
      const resp = await fetch(`https://book-logging.herokuapp.com/pages/`, {
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
        this.props.fetchPages(()=>{this.calculateAnalytics()});
        this.setState({
          error: null,
          pages: parseInt(this.state.pages) + parseInt(this.state.pagesRead)
        })
      }
      if(this.state.pages + this.state.pagesRead == this.props.selectedBook.totalPages){
        this.completeBook(() => {this.setState({error:null})})
      } 
    }
  }


  render(){
    return(
      <div className='bookDetails'>
        <div className='bookDetails-left'>
          <img className='bookCover' src={this.props.selectedBook.imageLink} />
          <div className='bookInfo'>
            <label className='bookTitle'>{this.props.selectedBook.title}</label><br></br>
            {this.props.selectedBook.authors.split(',').length <= 2 ? 
                this.props.selectedBook.authors.split(',').map(auth => <label className='bookAuthor'>{auth}<br></br></label>)
                :
                <>
                  <label className='bookAuthor'>{this.props.selectedBook.authors.split(',')[0]}</label><br></br>
                  <label className='bookAuthor'>{this.props.selectedBook.authors.split(',')[1]}</label><br></br>
                  <label className='bookAuthor'>+ {this.props.selectedBook.authors.split(',').length - 2} other(s)</label><br></br>
                </>}
            <label className='bookISBN'>
              ISBN10: {this.props.selectedBook.isbn10}
            </label><br></br>
            <label className='bookISBN'>
              ISBN13: {this.props.selectedBook.isbn13}
            </label>
          </div>
        </div>
        <div className='bookDetails-right'>
          {this.state.chartView?
            <div className='details-chart-container' >
              <LineChart 
                data={this.state.analyticsData}
                dateLabels={this.state.dateLabels}
              />
            </div>
            :
            <div className='profile-details'>
              <ProfileBookDetails
                bookDetails={this.state.bookDetails}
              />
            </div>
          }
          <button className='details-btn' onClick={this.toggleChart}>
            {this.state.chartView ?
              'Book Details'
              :
              'Chart'
            }
          </button>
          <div className='profileDetails-pages'>
            <h2 className='pages_read'>Pages Read: {this.state.pages} / {this.props.selectedBook.totalPages}</h2>
            {this.props.selectedBook.completed == false ?
              <form
                onSubmit={this.createPages}
              >
                <input
                  type='text' 
                  name='pagesRead' 
                  onChange={this.handleChange}
                  value={this.state.pagesRead}
                  placeholder='Pages Read' 
                  className='input'
                  required
                >
                </input>
                <input
                  type='date' 
                  name='dateRead' 
                  onChange={this.handleChange}
                  value={this.state.dateRead}
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
              :
              <h1>Book Completed</h1>
            }
            <button onClick={() => this.props.confirmationPopup('delete')} className='submitBtn' >Delete</button><br></br>
            {this.state.error == null ?
              null
              :
              <label className='errorMsg'>{this.state.error}</label>
            }
          </div>
        </div>
      </div>
    )
  }
}