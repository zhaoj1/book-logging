import React from 'react';
import { Link } from "react-router-dom";

export default class Register extends React.Component{

  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    error: false,
    errorMsg: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRegister = (event) => {
    event.preventDefault()
    this.props.toggleLoading()
    this.state.password == this.state.passwordConfirm ?
      fetch('https://book-logging.herokuapp.com/core/users/',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      })
      .then(data => data.json())
      .then(resp => 
        resp.token?
          resp.id == null?
            this.setState({
              error: true,
              errorMsg: 'Password must be at least 7 characters long.'
            })
            :
            this.login(resp)
          :
          this.setState({
            error: true,
            errorMsg: 'Username is not available.'
          })
      )
      :
      this.setState({
        error: true,
        errorMsg: 'Passwords must match.'
      })
  }

  login = (input) => {
    sessionStorage.setItem('token', input.token)
    this.props.setUser({username: input.username, id: input.id})
    this.props.toggleLoading()
    this.props.history.push('/profile')
  }
 
  render(){
    return(
      <div className='register-page'>
        {this.props.loading ? 
          <>Loading...</>
          :
          <form className='login-form' onSubmit={this.handleRegister} >
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
        }     
        <label>
          Already have an account? <Link to='/login'>Login</Link>
        </label>
        {
          this.state.error ? 
            <p className='errorMsg'>{this.state.errorMsg}</p>
            :
            null
        }
      </div>
    )
  }
}