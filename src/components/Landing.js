import React from 'react';
import Register from './Register';

import bookIcon from '../imgs/bookIcon.png'
import bookcaseIcon from '../imgs/bookcaseIcon.png'
import chartIcon from '../imgs/chartIcon.png'

function Landing(props){

  return(
    <div className='landing' >
      <div className='landing-contents' >
        <div className='landing-left' >
          BookLogging is a book tracking application that tracks and provide analytics on reading progress. 
          <div className='app-features'>
            <div className='app-features-upper'>
              <img className='landing-icon' src={bookIcon} />
              <div className='app-features-text'>
                <div className='app-features-upper-right'>
                  Lookup books with details with the power of Google Books API.
                </div>
                <div className='app-features-lower'>
                  BookLogging utilizes the Google Books API to search and provide details on books.
                </div>
              </div>
            </div>
          </div>
          <div className='app-features'>
            <div className='app-features-upper'>
              <img className='landing-icon' src={bookcaseIcon} />
              <div className='app-features-text'>
                <div className='app-features-upper-right'>
                  Save books to profile to keep track of reading progress.
                </div>
                <div className='app-features-lower'>
                  Monitor reading progress to aid in decision making.
                </div>
              </div>
            </div>
          </div>
          <div className='app-features'>
            <div className='app-features-upper'>
              <img className='landing-icon' src={chartIcon} />
              <div className='app-features-text'>
                <div className='app-features-upper-right'>
                  Make decisions with help from analytics and charts.
                </div>
                <div className='app-features-lower'>
                  Utilize charts and analytics to adjust reading habits to fit your needs.
                </div>
              </div>
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
    </div>
  )
  
}

export default Landing;