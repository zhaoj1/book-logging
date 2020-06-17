import React from 'react';

function BookCard(props){

  return(
    <>
      {props.ele ?
        <div 
          className='resultsLineItem'
          onClick={() => props.setSelectedBook(props.ele)}
        >
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
            {props.ele.volumeInfo.authors == undefined ?
              null
              :
              props.ele.volumeInfo.authors.map(auth => <label className='bookAuthor'>{auth}<br></br></label>)
            }
            {props.ele.volumeInfo.industryIdentifiers.map(identifier =>
              <>
                <label className='bookISBN'>{identifier.type}: {identifier.identifier}</label><br></br>
              </>
            )}
          </div>
        </div>
        :
        null}
      </>
  )
}

export default BookCard