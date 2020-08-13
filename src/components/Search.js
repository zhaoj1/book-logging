import React from 'react';
import { Redirect } from "react-router-dom";

export default class Search extends React.Component{

  state = {
    queryParams: '',
    authorQuery: '',
    searched: false
  }

  componentDidMount = () => {
    this.setState({
      queryParams: '',
      searched: false
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  searchAPI = async (event) => {
    event.preventDefault();
    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.queryParams}+author:${this.state.authorQuery}&key=` + process.env.REACT_APP_GOOGLE_BOOKS_API_KEY)
    const json = await resp.json()
    this.props.setResults(json)
    this.setState({searched: true})
  }

  render(){
    return(
      <div className='search'>
        <form onSubmit={this.searchAPI}>
          <input 
            type='text' 
            name='queryParams' 
            className='search-input'
            placeholder='Search'
            value={this.state.queryParams} 
            onChange={this.handleChange}
          ></input><br></br>
          <input 
            type='text' 
            name='authorQuery' 
            className='search-input'
            placeholder='Author'
            value={this.state.authorQuery} 
            onChange={this.handleChange}
          ></input><br></br>
          <input 
            className='submitBtn' 
            type='submit' 
            value="Search"
          ></input><br></br>
          <img src='https://books.google.com/googlebooks/images/poweredby.png' />
        </form>
        {this.state.searched ? 
          <Redirect to='/results' />
          :
          null
        }
      </div>
    )
  }
}