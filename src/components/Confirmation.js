import React from 'react';

export default class Confirmation extends React.Component{

  render(){
    return(
      <div className='confirmation'>
        <h1>Book has been saved.</h1>
        <button className='details-btn' onClick={this.props.closeModal}>OK</button>
      </div>
    )
  }
}