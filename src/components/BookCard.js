import React from 'react';

function BookCard(props){

  return(
    <>
      {props.ele ?
        <div 
          className='resultsLineItem'
          onClick={() => props.setSelectedBook(props.ele, 'details')}
        >
          <img className='bookCover' src={
            props.ele.volumeInfo.imageLinks == undefined ?
              null
              :
              props.ele.volumeInfo.imageLinks.thumbnail
          } />
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
              props.ele.volumeInfo.authors.length <= 2 ? 
                props.ele.volumeInfo.authors.map(auth => <label className='bookAuthor'>{auth}<br></br></label>)
                :
                <>
                  <label className='bookAuthor'>{props.ele.volumeInfo.authors[0]},</label><br></br>
                  <label className='bookAuthor'>{props.ele.volumeInfo.authors[1]},</label><br></br>
                  <label className='bookAuthor'>+ {props.ele.volumeInfo.authors.length - 2} other(s)</label><br></br>
                </>
            }
            {props.ele.volumeInfo.industryIdentifiers == undefined ? 
              null
              :
              <>
                <label className='bookISBN'>
                  ISBN10: {
                    props.ele.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_10') == undefined ? 
                      'N/A'
                      :
                      props.ele.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_10').identifier
                  }
                </label><br></br>
                <label className='bookISBN'>
                  ISBN13: {
                    props.ele.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_13') == undefined ?
                      'N/A'
                      :
                      props.ele.volumeInfo.industryIdentifiers.find(ele => ele.type == 'ISBN_13').identifier
                  }
                </label>
              </>
            }
          </div>
        </div>
        :
        null}
      </>
  )
}

export default BookCard