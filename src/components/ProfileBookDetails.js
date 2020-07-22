import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

export default class ProfileBookDetails extends React.Component{

  state = {
    pagesRead: 0,
    dateRead: null
  }

  handleChange = (event) => {this.setState({[event.target.name]: event.target.value})}

  createPages = (event) => {
    event.preventDefault()

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
  }

  deleteBook = () => {
    fetch(`http://127.0.0.1:8000/books/${this.props.selectedBook.id}`, {
      method: 'DELETE',
      headers: {'Authorization': `JWT ${sessionStorage.getItem('token')}`}
    }).then(this.props.closeModal()).then(this.props.fetchBooks())
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
          <div className='profileDetails-analytics'>
            <XYPlot width={300} height={300}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <LineSeries
                data={[
                  {x: 1, y: 10},
                  {x: 2, y: 5},
                  {x: 3, y: 15}
                ]}/>
              <XAxis />
              <YAxis />
            </XYPlot>
          </div>
          <div className='profileDetails-pages'>
            <h1>Progress</h1>
            <p>Pages Read: {this.props.pages.pages !== null ?
                this.props.pages.pages.filter(page => page.book == this.props.selectedBook.id).reduce((acc, obj) => {return acc + obj.pagesRead}, 0)
                :
                null} / {this.props.selectedBook.totalPages}</p>
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
            <button onClick={this.deleteBook}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}