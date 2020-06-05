import React from 'react';
import { Link } from "react-router-dom";
import CSRFToken from './csrftoken'; 

export default class Register extends React.Component{

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
    fetch('http://127.0.0.1:8000/users/login/',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36',
        'X-CSRFTOKEN': document.getElementsByName('csrfmiddlewaretoken')[0].value,
      },
      body: JSON.stringify(this.state)
    })
    // .then(data => data.json())
    .then(res => console.log(res))
  }
 
  render(){

    const centeredStyle = {
      margin: 'auto',
      marginBottom: '10px',
      width: '50%',
      fontSize: '20px',
    }
  
    const btnStyle = {
      margin: 'auto',
      marginBottom: '10px',
      fontSize: '20px',
    }
  
    const pageStyle = {
      display:'flex',
      flexDirection: 'column',
      textAlign: 'center',
      justifyContents: 'center',
      height: '100%',
    }

    return(
      <div style={pageStyle}>
        <form onSubmit={this.handleLogin} >
          <CSRFToken />
          <input 
            type='text' 
            name='username' 
            placeholder='Username' 
            className='input'
            style={centeredStyle}
            value={this.state.username} 
            onChange={this.handleChange}
            required
          ></input>
          <input 
            type='password' 
            name='password' 
            placeholder='Password' 
            className='input'
            style={centeredStyle}
            value={this.state.password} 
            onChange={this.handleChange}
            required
          ></input><br></br>
          <input 
            className='submitBtn' 
            type='submit' 
            value="Login"
            style={btnStyle}
          ></input>
        </form>
        <label>
          Need to create an account? <Link to='/register'>Register here.</Link>
        </label>
      </div>
    )
  }
}