import React from 'react';

function ProfileBookCard(props){

  return(
    <>
      {props.ele ?
        <div className='profileLineItem' >
          <img className='bookCover' src={props.ele.imageLinks} />
          <div className='bookInfo'>
            <label className='bookTitle'>
              {
                props.ele.title.length >= 25 ? 
                  props.ele.title.slice(0, 22) + '...'
                  :
                  props.ele.title
              }
            </label><br></br>
            {props.ele.authors}<br></br>
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