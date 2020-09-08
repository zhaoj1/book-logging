import React from 'react';
import Register from './Register';

function Landing(props){

  return(
    <div className='landing' >
      <div className='app-features' >
        <div className='landing-contents' >
          BookLogging is a book tracking application that tracks and provide analytics on reading progress. 
          <div className='app-features'>
            img - Lookup books with details with the power of Google Books API.  
          </div>
          <div className='app-features'>
            img - Save books to profile to keep track of reading progress.
          </div>
          <div className='app-features'>
            img - Make decisions with help from analytics and charts.
          </div>
        </div>
      </div>
      <div className='landing-right'>
        <Register 
          history={props.history}
          setUser={props.setUser}
          toggleLoading={props.toggleLoading}
          loading={props.loading}
          fetchBooks={props.fetchBooks}
          fetchPages={props.fetchPages}
        />
      </div>
    </div>
  )
  
}

export default Landing;