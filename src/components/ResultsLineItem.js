import React from 'react';

function ResultsLineItem(props){

  return(
    <>
      <p>{props.ele.volumeInfo.title}</p>
      <p>{props.ele.volumeInfo.authors}</p>
    </>
  )
}

export default ResultsLineItem