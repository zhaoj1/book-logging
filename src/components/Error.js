import React from 'react';

export default class Error extends React.Component{

  render(){
    return(
      <div className='error'>
        <h1>{this.props.error}</h1>
        <button onClick={this.props.closeModal}></button>
      </div>
    )
  }
}