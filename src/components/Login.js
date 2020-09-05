import React from 'react';
import { Link } from "react-router-dom";

export default class Login extends React.Component{

  state = {
    username: '',
    password: '',
    error: false,
    errorMsg: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    fetch('https://book-logging.herokuapp.com/token-auth/',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state)
    })
    .then(data => data.json())
    .then(resp => 
      resp.non_field_errors?
        this.setState({
          error: true,
          errorMsg: 'Username or password is incorrect.'
        })
        :
        this.login(resp),
        this.props.toggleLoading()
    )
  }

  login = async (input) => {
    sessionStorage.setItem('token', input.token)
    this.props.setUser(input.user)
    const fetch = await Promise.all([
      this.props.fetchBooks(),
      this.props.fetchPages()
    ])
    if(fetch){
      this.setState({error: false})
      this.props.toggleLoading()
      this.props.history.push('/profile')
    }
  }
 
  render(){
    return(
      <div className='wrapper'>
        <div className='login-page'>
          {this.props.loading?
            <h1 className='loading'>Loading...</h1>
            :
            <>
              <form className='login-form' onSubmit={this.handleLogin} >
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
            </>
          }
          {
            this.state.error ? 
              <p className='errorMsg'>{this.state.errorMsg}</p>
              :
              null
          }
        </div>
      </div>
    )
  }
}