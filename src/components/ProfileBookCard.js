import React from 'react';

function ProfileBookCard(props){

  return(
    <>
      {props.ele ?
        <div 
          className='profileLineItem' 
          onClick={() => props.setSelectedBook(props.ele, 'profile')}
        >
          <img className='bookCover' src={props.ele.imageLink} />
          <div className='bookInfo'>
            <label className='bookTitle'>
              {
                props.ele.title.length >= 25 ? 
                  props.ele.title.slice(0, 22) + '...'
                  :
                  props.ele.title
              }
            </label><br></br>
            {props.ele.authors.split(',').length <= 2 ? 
                props.ele.authors.split(',').map(auth => <label className='bookAuthor'>{auth}<br></br></label>)
                :
                <>
                  <label className='bookAuthor'>{props.ele.authors.split(',')[0]}</label><br></br>
                  <label className='bookAuthor'>{props.ele.authors.split(',')[1]}</label><br></br>
                  <label className='bookAuthor'>+ {props.ele.authors.split(',').length - 2} other(s)</label><br></br>
                </>}
            <label className='bookISBN'>
              ISBN10: {props.ele.isbn10}
            </label><br></br>
            <label className='bookISBN'>
              ISBN13: {props.ele.isbn13}
            </label>
          </div>
        </div>
        :
        null}
      </>
  )
}

export default ProfileBookCard