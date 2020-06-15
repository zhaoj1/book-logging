import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Modal from 'react-modal'

import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Results from './Results';

const modalStyle = {
  overlay : {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  }
}

Modal.setAppElement('#root');

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
        <Modal
          //  isOpen={this.state.modalIsOpen}
          //  onRequestClose={this.closeModal}
           style={modalStyle}
        ></Modal>
      </>
    )
  }
}