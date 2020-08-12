import React from 'react';
import { Redirect } from "react-router-dom";
import BookCard from './BookCard';

export default class Search extends React.Component{

  render(){
    return(
      <div className='results-page'>
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