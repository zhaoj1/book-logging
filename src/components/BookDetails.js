import React from 'react';

function BookCard(props){

  return(
    <div className='bookDetails'>
      <div className='bookDetails-left'>
        <img className='bookCover' src={props.selectedBook.volumeInfo.imageLinks.thumbnail} />
        <div className='bookInfo'>
          <label className='bookTitle'>
            {
              props.selectedBook.volumeInfo.title.length >= 25 ? 
                props.selectedBook.volumeInfo.title.slice(0, 22) + '...'
                :
                props.selectedBook.volumeInfo.title
            }
          </label><br></br>
          {props.selectedBook.volumeInfo.authors.map(auth => <label className='bookAuthor'>{auth}<br></br></label>)}
        </div>
      </div>
      <div className='bookDetails-right'>
        {props.selectedBook.volumeInfo.publisher}<br></br>
        {props.selectedBook.volumeInfo.description}<br></br>
        {props.selectedBook.volumeInfo.pageCount}<br></br>
        {props.selectedBook.volumeInfo.mainCategory}<br></br>
        {props.selectedBook.volumeInfo.categories.map(category => category)}<br></br>
        {props.selectedBook.volumeInfo.infoLink}
      </div>
    </div>
  )
}

export default BookCard