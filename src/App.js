import React, { useState, useEffect } from 'react'
import Contents from './components/Contents';
import Footer from './components/Footer';

import './App.css'
import Logo from './imgs/Logo v3.png'

export default class App extends React.Component{

  state = {
    currentUser: null,
    loggedIn: false
  }

  setUser = (user) => {
    this.setState({currentUser: user}, () => {
      this.setState({loggedIn: true})
    })
  }

  logout = () => {
    this.setState({
      currentUser: null,
      loggedIn: false
    })
    alert('Successfully logged out.')
  }

  render(){
    return (
      <div className="App">
        <div className='logo' >
          <img src={Logo} style={{'float':'left'}} />
          <div className='logo-btn-container'>
            {this.state.loggedIn ?
              <>
                <label className='username'>Logged in as: {this.state.currentUser.username}</label>
                <button className='logo-btns' onClick={this.logout}>LOGOUT</button>
              </>
              :
              null
            }
          </div>
        </div>
        <Contents 
          currentUser={this.state.currentUser}
          loggedIn={this.state.loggedIn}
          setUser={this.setUser}
        />
        <Footer />
      </div>
    );
  }
}
