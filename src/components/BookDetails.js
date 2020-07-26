import React from 'react';

export default class BookDetails extends React.Component{

  saveBook = () => {
    var authors = this.props.selectedBook.volumeInfo.authors == undefined ? '' : this.props.selectedBook.volumeInfo.authors.toString()
    var isbn10 = this.props.selectedBook.volumeInfo.industryIdentifiers == undefined ? '' : this.props.selectedBook.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_10').identifier
    var isbn13 = this.props.selectedBook.volumeInfo.industryIdentifiers == undefined ? '' : this.props.selectedBook.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_13').identifier
    var mainCategory = this.props.selectedBook.volumeInfo.mainCategory == undefined ? 'N/A' : this.props.selectedBook.volumeInfo.mainCategory.toString()
    var categories = this.props.selectedBook.volumeInfo.categories == undefined ? '' : this.props.selectedBook.volumeInfo.categories.toString()

    fetch('http://127.0.0.1:8000/books/', {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        title: this.props.selectedBook.volumeInfo.title, 
        api_id: this.props.selectedBook.id, 
        authors: authors,
        imageLink: this.props.selectedBook.volumeInfo.imageLinks.thumbnail,
        isbn10: isbn10,
        isbn13: isbn13,
        owner: this.props.currentUser.id,
        username: this.props.currentUser.username,
        pagesRead: 0,
        totalPages: this.props.selectedBook.volumeInfo.pageCount
      })
    }).then(this.props.fetchBooks()).then(this.props.confirmationPopup())
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
              'N/A'
              : 
              this.props.selectedBook.volumeInfo.authors.map(auth => <label className='bookAuthor'>{auth}<br></br></label>)
            }
            {this.props.selectedBook.volumeInfo.industryIdentifiers == undefined ? 
              'N/A'
              :
              this.props.selectedBook.volumeInfo.industryIdentifiers.map(identifier =>
                identifier == undefined ? 
                  'N/A'
                  :
                  <>
                    <label className='bookISBN'>{identifier.type}: {identifier.identifier}</label><br></br>
                  </>
              )
            }
          </div>
        </div>
        <div className='bookDetails-right'>
          Rating: {
            this.props.selectedBook.volumeInfo.averageRating == undefined ? 
              0
              :
              this.props.selectedBook.volumeInfo.averageRating
          } ({
            this.props.selectedBook.volumeInfo.ratingsCount == undefined ?
              0
              :
              this.props.selectedBook.volumeInfo.ratingsCount
          } ratings)<br></br><br></br>
          Publisher: {
          this.props.selectedBook.volumeInfo.publisher == undefined ?
            'N/A'
            :
            this.props.selectedBook.volumeInfo.publisher
          }<br></br><br></br>
          Description:<br></br>{
            this.props.selectedBook.volumeInfo.description == undefined ? 
              'N/A'
              :
              this.props.selectedBook.volumeInfo.description
          }<br></br><br></br>
          Page Count: {this.props.selectedBook.volumeInfo.pageCount}<br></br>
          Category: {this.props.selectedBook.volumeInfo.mainCategory}
          {this.props.selectedBook.volumeInfo.categories.map(category => category).join(' ,')}<br></br>
          <a href={this.props.selectedBook.volumeInfo.infoLink} target='blank'>Google Play Store</a><br></br><br></br>
          <button onClick={this.saveBook}>Save Book</button>
        </div>
      </div>
    )
  }
}