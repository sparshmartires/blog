import React from 'react';
import './PostView.css'; 
import ReactHtmlParser from 'react-html-parser';       
import { convertNodeToElement } from 'react-html-parser';
import {approvePost} from '../api/Posts.js';
import {deletePosts} from '../api/Posts.js';

import {fetchposts} from '../services/userlogin/action';
import { connect } from "react-redux";
function transform(node, index) {
    let acc = ''
    
    if(node.children) {
        node.children.forEach((currNode) => {
            const result = transform(currNode, currNode.index);
            if(result)  {
                acc += result;
            }
        })
    }
    if(node.data) {
        acc += node.data;
    }
   
    if(acc) {
        return acc;
    }

    return null;
}

 class PostView extends React.Component {
     state = {
    isChecked:false,
  };
  handlecheck = async (id,isapproved) => {
      let body={
id:id,
isapproved:!isapproved,
      }
    // e.preventDefault();
    //console.log(this.state);
    const { success } = await approvePost(body);
    if(success){
this.props.fetchposts((error) => {
      if (!error) {
        console.log("here");
      
      } else {
        console.log(error);
      }
    });
    }
   
  }
  handledelete = async (id) => {
      let body={
id:id,
isactive:false,
      }
    // e.preventDefault();
    //console.log(this.state);
    const { success } = await deletePosts(body);
    if(success){
this.props.fetchposts((error) => {
      if (!error) {
        console.log("here");
      
      } else {
        console.log(error);
      }
    });
    }
   
  }
  
    render() {
        
        const { id, title, author, createdAt, body, images ,superadmin,isapproved,admin} = this.props;
        const [ weekday, month, day, year ] = createdAt.split(' ').slice(0,4);
        const displayDate = `${weekday} ${month} ${day}, ${year}`;
        const parsedBody  = ReactHtmlParser(body, {
            transform
        }).join(' ');
        //parsedBody = parsedBody.join(' ');

        return (
            <div className="postView-box">

                <div className="postView-createdAt" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <span className="postView-createdAt-val">{displayDate}</span>
                  {superadmin&&<input  type="checkbox" 
            // id={id}
            // name={name} 
            // value={label} 
            checked={isapproved} 
            // disabled={disabled}					
            onChange={()=>{this.handlecheck(id,isapproved)}}/>}  
            {admin&&isapproved&&<input style={{width:'25px'}}type="image" src="https://user-images.githubusercontent.com/62637513/121002193-b54c2980-c7a9-11eb-984c-49925ed724a1.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"
            
            />}
             {admin&&!isapproved&&<input style={{width:'25px'}}type="image" src="https://user-images.githubusercontent.com/62637513/121002436-f6443e00-c7a9-11eb-9441-cea7af792cda.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"
            
            />}
            {superadmin&&<input style={{width:'25px'}}type="image" src="https://user-images.githubusercontent.com/62637513/120989882-a3648980-c79d-11eb-9537-00748087c109.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"
            onClick={()=>{this.handledelete(id)}}
            />}
                </div>

                <div >
                    {/* {
                        images.length > 0 && <img className="postView-image" src={images[0]} />
                    } */}
                    
                </div>

                <div className="postView-title">
                    {title}
                </div>

                <div className="postView-author">
                    {author ? `By, ${author}` : ''}
                </div>
                
                <div className="postView-body">
                    { 
                        parsedBody.split(' ').length > 100 ? 
                        parsedBody.split(' ').slice(0,100).join(' ') + ' ...' : 
                        parsedBody
                    }
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
// function transform(node, index) {
//     let textContent = '';
//     if(node.children) {
//         node.children.forEach((currNode, subIndex) => {
//             const result = transform(currNode, subIndex);
//             console.log('result', result)
//             if(result) {
//                 textContent += result;
//             }
            
//         })
//     }
//     if(node.data) {
//         textContent += node.data;
//     }
    
//     return textContent;
// }