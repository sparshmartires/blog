import React, { Component } from 'react';
import PostList from '../components/PostList';
import {posts} from '../data/posts';
import {getPostsforAdmin} from '../api/Posts';
import LoadingIndicator from '../components/LoadingIndicator';
import {fetchposts} from '../services/userlogin/action';
import { connect } from "react-redux";
class Superposts extends Component {

  state = {
    posts: [],
    loading: true
  };

  componentDidMount = async () => {
    const posts = await getPostsforAdmin() || [];
    this.props.fetchposts((error) => {
      if (!error) {
        console.log("here");
      
      } else {
        console.log(error);
      }
    });
    this.setState({
      posts,
      loading: false
    });

  }
  render() {
    return (
      <div className="home-page">
        {
          this.state.loading ?
          <LoadingIndicator /> : 
          this.state.posts.length > 0 ?
          <PostList posts={this.props.userlogin.posts.posts} superadmin={true}/> :
          <p>Add Posts To Get Started</p>
        }
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  
  userlogin:state.userlogin,
});
const mapDispatchToProps = (dispatch) => ({
  fetchposts: ( callback) => dispatch(fetchposts( callback)),


});

export default connect(mapStateToProps, mapDispatchToProps)(Superposts);



