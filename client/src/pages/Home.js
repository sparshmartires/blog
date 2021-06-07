import React, { Component } from 'react';
import PostList from '../components/PostList';
import {posts} from '../data/posts';
import {getPosts} from '../api/Posts';

import { connect } from "react-redux";
import LoadingIndicator from '../components/LoadingIndicator';

class Home extends Component {

  state = {
    posts: [],
    loading: true
  };

  componentDidMount = async () => {
    const posts = await getPosts() || [];
   
    this.setState({
      posts,
      loading: false
    });

  }
  render() {
    console.log(this.state.posts);
    return (
      <div className="home-page">
        {
          this.state.loading ?
          <LoadingIndicator /> : 
          this.state.posts.length > 0 ?
          <PostList posts={this.state.posts} superadmin={false} admin={true}/> :
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
  


});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;


