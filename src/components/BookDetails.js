import React from 'react';

export default class BookCard extends React.Component{

  saveBook = () => {
    fetch('http://127.0.0.1:8000/books/', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: {
        book: this.props.selectedBook,
        owner: this.props.currentUser.id
      }
    }).then(resp => console.log(resp))
  }

  render(){
    return(
      <div className='bookDetails'>
        <div className='bookDetails-left'>
          <img className='bookCover' src={this.props.selectedBook.volumeInfo.imageLinks.thumbnail} />
          <div className='bookInfo'>
            <label className='bookTitle'>
              {
                this.props.selectedBook.volumeInfo.title.length >= 25 ? 
                  this.props.selectedBook.volumeInfo.title.slice(0, 22) + '...'
                  :
                  this.props.selectedBook.volumeInfo.title
              }
            </label><br></br>
            {this.props.selectedBook.volumeInfo.authors == undefined ?
              null
              : 
              this.props.selectedBook.volumeInfo.authors.map(auth => <label className='bookAuthor'>{auth}<br></br></label>)
            }
            {this.props.selectedBook.volumeInfo.industryIdentifiers.map(identifier =>
              <>
                <label className='bookISBN'>{identifier.type}: {identifier.identifier}</label><br></br>
              </>
            )}
          </div>
        </div>
        <div className='bookDetails-right'>
          Rating: {this.props.selectedBook.volumeInfo.averageRating} ({this.props.selectedBook.volumeInfo.ratingsCount} ratings)<br></br><br></br>
          Publisher: {this.props.selectedBook.volumeInfo.publisher}<br></br><br></br>
          Description:<br></br>{this.props.selectedBook.volumeInfo.description}<br></br><br></br>
          Page Count: {this.props.selectedBook.volumeInfo.pageCount}<br></br>
          Category: {this.props.selectedBook.volumeInfo.mainCategory}
          {this.props.selectedBook.volumeInfo.categories.map(category => category).join(' ,')}<br></br>
          <a href={this.props.selectedBook.volumeInfo.infoLink} target='blank'>Google Play Store</a>
        </div>
        <button onClick={this.saveBook}>Save Book</button>
      </div>
    )
  }
}