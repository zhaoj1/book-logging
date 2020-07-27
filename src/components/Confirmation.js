import React from 'react';

export default class Confirmation extends React.Component{

  render(){
    return(
      <>
        <h1>Book has been saved.</h1>
        <button onClick={this.props.closeModal}>OK</button>
      </>
    )
  }
}