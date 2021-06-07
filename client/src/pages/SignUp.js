import React, { Component } from 'react';
import TextInput from '../components/inputs/TextInput';
import {becomeUser} from '../api/Auth';
import LoadingIndicator from '../components/LoadingIndicator';
import {
  Link
} from 'react-router-dom';
import './SignUp.css';

class SignUp extends Component {

  state = {
    email: '',
    username:'',
  };


  handleSubmit = async (e) => {
    e.preventDefault();
    var {data,status} = await becomeUser(this.state.email,this.state.username);
  
    if(!status||!data){
      alert('access denied')
    }
    else{

      this.props.history.push(`/auth/${data}`);
    }
    
    
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="signUp-container">
        <form onSubmit={this.handleSubmit}>
            <TextInput 
            label="Email"
            name="email" 
            value={this.state.email || ''}
            onChange={this.handleTextChange}
            className="emailInput"
            />
            <TextInput 
            label="Username"
            name="username" 
            value={this.state.username || ''}
            onChange={this.handleTextChange}
            className="emailInput"
            />

            <button className="signUp-button">Submit</button>
      </form>
      
      </div>
        
    );
  }
}


export default SignUp;

