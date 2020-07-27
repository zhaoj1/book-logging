import React from 'react';
import { Link } from "react-router-dom";

export default class Confirmation extends React.Component{

  render(){
    return(
      <>
        <h1>Book has been saved.</h1>
        <Link
          to='/profile'
        ><button>Profile</button></Link>
        <button
          onClick={this.props.closeModal}
        >Continue Searching</button>
      </>
    )
  }
}