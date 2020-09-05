import React, { useState, useEffect } from 'react'
import Contents from './components/Contents';
import Footer from './components/Footer';

import './App.css'
import Logo from './imgs/Logo v3.png'

export default class App extends React.Component{

  state = {
    loggedIn: false
  }

  toggleLoggedIn = () => {this.setState({loggedIn: !this.state.loggedIn})}

  render(){
    return (
      <div className="App">
        <div className='logo' >
          <img src={Logo} style={{'float':'left'}} />
          <div className='logo-btn-container'>
            {this.state.loggedIn?
              <>
                <button className='logo-btns' onClick={this.toggleLoggedIn}>PROFILE</button>
                <button className='logo-btns' onClick={this.toggleLoggedIn}>LOGOUT</button>
              </>
              :
              null
            }

          </div>
        </div>
        <Contents 
          loggedIn={this.state.loggedIn}
          toggleLoggedIn={this.toggleLoggedIn}
        />
        <Footer />
      </div>
    );
  }
}
