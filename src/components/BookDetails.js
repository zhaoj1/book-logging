import React from 'react';

export default class BookDetails extends React.Component{

  saveBook = () => {
    var authors = this.props.selectedBook.volumeInfo.authors == undefined ? 'N/A' : this.props.selectedBook.volumeInfo.authors.toString()
    var isbn10 = this.props.selectedBook.volumeInfo.industryIdentifiers == undefined || !this.props.selectedBook.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_10') ? 'N/A' : this.props.selectedBook.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_10').identifier
    var isbn13 = this.props.selectedBook.volumeInfo.industryIdentifiers == undefined || !this.props.selectedBook.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_13') ? 'N/A' : this.props.selectedBook.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_13').identifier
    var title = this.props.selectedBook.volumeInfo.title == undefined ? 'N/A' : this.props.selectedBook.volumeInfo.title
    var api_id = this.props.selectedBook.volumeInfo.id == undefined ? 'N/A' : this.props.selectedBook.volumeInfo.id
    var imageLink = this.props.selectedBook.volumeInfo.imageLinks.thumbnail == undefined ? 'N/A' : this.props.selectedBook.volumeInfo.imageLinks.thumbnail
    var totalPages = this.props.selectedBook.volumeInfo.pageCount == undefined ? 'N/A' : this.props.selectedBook.volumeInfo.pageCount

    fetch('http://127.0.0.1:8000/books/', {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        title: title, 
        api_id: api_id, 
        authors: authors,
        imageLink: imageLink,
        isbn10: isbn10,
        isbn13: isbn13,
        owner: this.props.currentUser.id,
        username: this.props.currentUser.username,
        totalPages: totalPages,
        completed: false
      })
    }).then(this.props.fetchBooks()).then(this.props.confirmationPopup('confirmation'))
  }

  render(){
    return(
      <div className='bookDetails'>
        <div className='bookDetails-left'>
          <img className='bookCover' src={this.props.selectedBook.volumeInfo.imageLinks.thumbnail} />
          <div className='bookInfo'>
            <label className='bookTitle'>{this.props.selectedBook.volumeInfo.title}</label><br></br>
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
          Category: {
            this.props.selectedBook.volumeInfo.categories == undefined ?
            'N/A'
            :
            this.props.selectedBook.volumeInfo.categories.map(category => category).join(' ,')
          }<br></br>
          <a href={this.props.selectedBook.volumeInfo.infoLink} target='blank'>Google Play Store</a><br></br><br></br>
          <button className='details-btn' onClick={this.saveBook}>Save Book</button><br></br>
          <button className='details-btn' onClick={this.props.closeModal}>Back</button>
        </div>
      </div>
    )
  }
}