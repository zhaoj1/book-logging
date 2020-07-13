import React from 'react';

export default class ProfileBookDetails extends React.Component{

  // updatePages = () => {
  //   fetch('http://127.0.0.1:8000/books/', {
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `JWT ${sessionStorage.getItem('token')}`,
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: {

  //     }
  //   })
  // }

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
              analytics
          </div>
          <div className='profileDetails-pages'>
            <h1>Progress</h1>
            <p>Pages Read: {this.props.selectedBook.pagesRead} / {this.props.selectedBook.totalPages}</p>
            <form>
              <input
                type='text' 
                name='page' 
                placeholder='Pages Read' 
                className='input'
                required
              >
              </input>
              <input
                type='date' 
                name='dateRead' 
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