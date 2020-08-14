import React from 'react';
import { Redirect } from "react-router-dom";
import BookCard from './BookCard';
import Search from './Search';

export default class Results extends React.Component{

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  render(){
    return(
      <div className='results-page'>
        <div className='search-box'>
          <Search 
            setResults={this.props.setResults}
          />
        </div>
        {this.props.loggedIn ? 
          <div className='results'>
            {this.props.results.items.map(ele => 
              <BookCard 
                ele={ele} 
                setSelectedBook={this.props.setSelectedBook}
              />
            )}
          </div>
          :
          <Redirect to='/' />
        }
        <button onClick={() => this.props.history.push('/profile')} className='back-btn'>Back</button>
      </div>
    )
  }
}