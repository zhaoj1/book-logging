import React from 'react';

function BookCard(props){

  return(
    <div className='resultsLineItem'>
      <img className='bookCover' src={props.ele.volumeInfo.imageLinks.thumbnail} />
      <div className='bookInfo'>
        <label className='bookTitle'>
          {
            props.ele.volumeInfo.title.length >= 25 ? 
              props.ele.volumeInfo.title.slice(0, 22) + '...'
              :
              props.ele.volumeInfo.title
          }
        </label><br></br>
        {props.ele.volumeInfo.authors.map(auth => <label className='bookAuthor'>{auth}<br></br></label>)}
      </div>
    </div>
  )
}

export default BookCard