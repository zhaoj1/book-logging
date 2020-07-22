import React from 'react';
import { Link } from "react-router-dom";
import Zoom from 'react-reveal/Zoom';

import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

function Landing(){

  return(
    <div className='landing' >
      <div className='logo' >LOGO</div>
      {/* ---------- */}
      <XYPlot 
        width={300} 
        height={300}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          data={[
            {x: 0, y: 0},
            {x: 1, y: 10},
            {x: 2, y: 5},
            {x: 3, y: 15}
          ]}
        />
      </XYPlot>
      {/* ---------- */}
      <div className='app-description' >
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>
      <Link to='/register'>
        <button className='startBtn' >
          Get Started
        </button>
      </Link>
      <div className='app-features' >
        <Zoom>
          <div className='features-line-item' >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </div>
          <div className='features-line-item' >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </div>
          <div className='features-line-item' >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </div>
          <div className='features-line-item' >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </div>
          <div className='features-line-item' >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </div>
          <Link to='/register'>
            <button className='startBtn' >
              Get Started
            </button>
          </Link>
        </Zoom>
      </div>
    </div>
  )
  
}

export default Landing;