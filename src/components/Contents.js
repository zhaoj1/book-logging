import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Results from './Results';

export default class Contents extends React.Component{

  state = {
    currentUser: null,
    loggedIn: false,
    results: {}
  }

  setUser = (user) => {
    this.setState({currentUser: user, loggedIn: true})
  }

  setResults = (results) => {
    this.setState({results: results})
  }

  render(){
    return(
      <>
        <Router>
          <Switch>
            <Route exact path='/' render={(routerProps) => 
              <Landing 
                {...routerProps}
              />
            } />
            <Route exact path='/register' render={(routerProps) => 
              <Register 
                {...routerProps}
                setUser={this.setUser}
              />
            } />
            <Route exact path='/login' render={(routerProps) => 
              <Login 
                {...routerProps}
                setUser={this.setUser}
              />
            } />
            <Route exact path='/profile' render={(routerProps) => 
              <Profile
                {...routerProps}
                currentUser={this.state.currentUser}
                loggedIn={this.state.loggedIn}
                setResults={this.setResults}
              />
            } />
            <Route exact path='/results' render={(routerProps) => 
              <Results
                {...routerProps}
                currentUser={this.state.currentUser}
                loggedIn={this.state.loggedIn}
                setResults={this.setResults}
                results={this.state.results}
              />
            } />
          </Switch>
        </Router>
      </>
    )
  }
}