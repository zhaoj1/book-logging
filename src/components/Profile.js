import React from 'react';
import Search from './Search';
import ProfileBookCard from './ProfileBookCard';

export default class Profile extends React.Component{
 
  componentDidMount = () => {
    this.props.fetchBooks()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.booksList !== this.props.booksList){this.props.fetchBooks()}
  }

  render(){
    return(
      this.props.loggedIn ?
        this.props.currentUser ? 
          <div className='profile-page'>
            <h1>{this.props.currentUser.username}</h1>
            <div className='profile-analytics'>
              analytics
            </div>
            <div className='profile-lower'>
              <div className='library'>
                {this.props.booksList !== undefined && this.props.booksList !== null ? 
                  this.props.booksList.books.map(book => 
                    <ProfileBookCard
                      ele={book}
                      setSelectedBook={this.props.setSelectedBook}
                    />
                  )
                  :
                  null
                }
              </div>
              <div className='search-box'>
                <Search 
                  setResults={this.props.setResults}
                />
              </div> 
            </div>
          </div>
          :
          null
        :
        <>{this.props.history.push('/')}</>
    )
  }
}