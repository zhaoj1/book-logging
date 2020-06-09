import React from 'react';
import { Link } from "react-router-dom";

export default class Register extends React.Component{

  state = {
    username: '',
    password: '',
    passwordConfirm: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRegister = (event) => {
    event.preventDefault()
    fetch('http://127.0.0.1:8000/core/users/',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    })
    .then(data => data.json())
    .then(resp => {
      localStorage.setItem('token', resp.token)
      this.props.setUser(resp.username)
      this.props.history.push('/profile')
    })
  }
 
  render(){
    return(
      <div className='register-page'>
        <form onSubmit={this.handleRegister} >
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
          ></input>
          <input 
            type='password' 
            name='passwordConfirm' 
            placeholder='Confirm Password' 
            className='input'
            value={this.state.passwordConfirm} 
            onChange={this.handleChange}
            required
          ></input><br></br>
          <input 
            className='submitBtn' 
            type='submit' 
            value="Create Account"
          ></input>
        </form>
        <label>
          Already have an account? <Link to='/login'>Login</Link>
        </label>
      </div>
    )
  }
}