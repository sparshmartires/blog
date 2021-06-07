import React from 'react';       
import PostView from './PostView';
import './PostList.css';
import { Link } from 'react-router-dom';

export default class PostList extends React.Component {
    render() {
        //const { id, title, author, createdAt, body, images } = this.props;
        const { posts,superadmin,admin } = this.props;

        return (
            <div className="postList-box">
                {
                    posts.map((post, index) => (
                     
                        // <Link
                        //     key={post.getId()}
                        //     to={`/post/${post.getId()}`}
                        // >
                        <PostView 
                        id={post._id}
                                title={post.title}
                                author={post.author}
                                createdAt={ Date(post.createdAt)}
                                body={post.body}
                                images={post.images}
                                superadmin={superadmin}
                                isapproved={post.isapproved}
                                isactive={post.isactive}
                                admin={admin}
                            /> 
                             
                        // </Link>
                    ))
                }
            </div>
        );
    }
}
