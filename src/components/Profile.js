import React from 'react';
import { Link } from "react-router-dom";

export default class Profile extends React.Component{

  state = {
    booksList: null
  }

  fetchBooks= () => {
    fetch('http://127.0.0.1:8000/books/', {headers: {Authorization: `jwt ${localStorage.token}`}})
    .then(data => data.json())
    .then(resp => {
      // let userBooksList = 
      // this.setState({booksList: {...resp}})
    })
  }
 
  componentDidMount = () => {
    this.fetchBooks()
  }

  render(){
    return(
      this.props.loggedIn ? 
        <div className='profile-page'>
          <div className='profile-analytics'>
            analytics
          </div>
          <div className='profile-lower'>
            <div className='library'>
              library
            </div>
            <div className='search'>
              search
            </div>
          </div>
        </div>
        :
        <>{this.props.history.push('/')}</>
    )
  }
}