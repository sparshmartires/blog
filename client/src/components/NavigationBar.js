import React, { Component, Fragment } from 'react';
import PostList from '../components/PostList';
import {posts} from '../data/posts';
import {
    Link
  } from 'react-router-dom';
import './NavigationBar.css';

class NavigationBar extends Component {
  render() {
    const { isLoggedIn, isAdmin ,isSuperAdmin} = this.props;
    
    return (
        <div className="navigationBar">
            <Link to="/">Home</Link> 
            {
              isLoggedIn && isAdmin && <Link to="/create">Add Post</Link>
            }
            {
              isLoggedIn && isSuperAdmin && <Link to="/approvepost">Approve post</Link>
            }
             {
              isLoggedIn && isSuperAdmin && <Link to="/addusers">Add Users</Link>
            }
            {
              isLoggedIn ?
              <Link to="/logout">Logout</Link> :
              <Link to="/login">Login / Register</Link>
            }
            
        </div>
    );
  }
}

export default NavigationBar;

// {
//   !isLoggedIn && <Link to="/login">Login or Register</Link>
// }