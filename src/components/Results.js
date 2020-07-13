import React from 'react';
import { Redirect } from "react-router-dom";
import BookCard from './BookCard';

export default class Search extends React.Component{

  render(){
    return(
      <div className='results'>
        {this.props.loggedIn ? 
          <>
            {this.props.results.items.map(ele => 
              <BookCard 
                ele={ele} 
                setSelectedBook={this.props.setSelectedBook}
              />
            )}
          </>
          :
          <Redirect to='/' />
        }
        <button onClick={() => this.props.history.push('/profile')}>Back</button>
      </div>
    )
  }
}