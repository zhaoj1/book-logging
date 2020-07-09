import React from 'react';

export default class ProfileBookDetails extends React.Component{

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
          
        </div>
      </div>
    )
  }
}