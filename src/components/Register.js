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
        <form>
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
          ></input>
          <input 
            type='password' 
            name='passwordConfirm' 
            placeholder='Confirm Password' 
            className='input'
            style={centeredStyle}
            value={this.state.passwordConfirm} 
            onChange={this.handleChange}
            required
          ></input><br></br>
          <input 
            className='submitBtn' 
            type='submit' 
            value="Create Account"
            style={btnStyle}
          ></input>
        </form>
        <label>
          Already have an account? <Link to='/login'>Login here.</Link>
        </label>
      </div>
    )
  }
}