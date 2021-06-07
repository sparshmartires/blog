import React, { Component } from 'react';
import TextInput from '../components/inputs/TextInput';
import { addPost } from '../api/Posts';
import { addUser } from '../api/Posts';

import Post from '../models/Post';
import './CreatePost.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';    
var validator = require("email-validator");
 


class CreateUser extends Component {

  state = {
    title: '',
    author: '',
    createdAt: Date.now(),
    body: '',
    images: [],
    postID: undefined,
    error: false
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, createdAt, body, images } = this.state;
    if(validator.validate(author)){
var { status, data, error } = await addUser(title, author);
    }else{
      alert('wrong email format');
    }
    
   
    
   if(status==200){
       alert('added')
   }
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: false
    });
  }

  handleBodyChange = (event, editor) => {
    const data = editor.getData();
    this.setState({
      body: data,
      error: false
    });
  }

  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit} className="createPost-form">
          <TextInput 
            label="Username"
            name="title"
            value={this.state.title}
            onChange={this.handleTextChange}
          />

          <TextInput
            label="Email"
            name="author"
            value={this.state.author}
            onChange={this.handleTextChange}
          />

         

          <div className="createPost-submitButton-Box">
            <button>Submit</button>
          </div>
          
          {
            this.state.error ?
            <span>❌ Changes Not Saved</span> :
            null
          }
        </form>
      </div>
    );
  }
}


export default CreateUser;

