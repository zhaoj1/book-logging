import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './Landing';

export default class Contents extends React.Component{

  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route exact path='/' render={(routerProps) => 
              <Landing 
                {...routerProps}
              />
            } />
          </Switch>
        </Router>
      </div>
    )
  }
}