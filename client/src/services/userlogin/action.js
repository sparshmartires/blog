import {
 
  REASON,
 
} from "./actionTypes";
import axios from "axios";
import {getPosts} from '../../api/Posts';
// import { Authorization } from "../util";
import getAuthHeader from '../../api/getAuthHeader';
import { store } from "../store";
export const fetchposts= (callback) => async(dispatch) => {
  axios({
    method: "GET",
    baseURL: `http://localhost:8055/v1/adminposts`,
    // url: "customer/getrestaurantslist",

    headers: 
     await getAuthHeader()
    ,
  })
    .then((res) => {
      console.log(res);
      let items = res.data;
       if (items) {
        
        dispatch({
          type: REASON,
          payload:res.data,
        });
         
        // callback();
      } else {
        callback(items);
      }
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });
};
