import React from 'react';
import { Link } from "react-router-dom";

export default class Login extends React.Component{

  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    fetch('http://127.0.0.1:8000/token-auth/',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state)
    })
    .then(data => data.json())
    .then(resp => {
      localStorage.setItem('token', resp.token)
      this.props.setUser(resp.user)
    })
  }
 
  render(){
    return(
      <div className='login-page'>
        <form onSubmit={this.handleLogin} >
          <input 
            type='text' 
            name='username' 
            placeholder='Username' 
            className='input'
            value={this.state.username} 
            onChange={this.handleChange}
            required
          ></input>
          <input 
            type='password' 
            name='password' 
            placeholder='Password' 
            className='input'
            value={this.state.password} 
            onChange={this.handleChange}
            required
          ></input><br></br>
          <input 
            className='submitBtn' 
            type='submit' 
            value="Login"
          ></input>
        </form>
        <label>
          Don't have an account? <Link to='/register'>Register</Link>
        </label>
      </div>
    )
  }
}