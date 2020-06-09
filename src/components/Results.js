import React from 'react';
import { Redirect } from "react-router-dom";
import ResultsLineItem from './ResultsLineItem';

export default class Search extends React.Component{

  render(){
    return(
      <div className='results'>
        {this.props.loggedIn ? 
          <>
            {this.props.results.items.map(ele => 
              <ResultsLineItem ele={ele} />
            )}
          </>
          :
          <Redirect to='/' />
        }
      </div>
    )
  }
}