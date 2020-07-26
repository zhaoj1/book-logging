import React from 'react';
import { useHistory } from "react-router-dom";

export default class Confirmation extends React.Component{

  redirectToProfile = () => {
    let history = useHistory()
    function handleClick() {
      history.push('/profile')
    }

  }

  render(){
    return(
      <>
        <h1>Book has been saved.</h1>
        <button
          onClick={this.handleClick}
        >Profile</button>
        <button
          onClick={this.props.closeModal}
        >Continue Searching</button>
      </>
    )
  }
}