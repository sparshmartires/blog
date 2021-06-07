import {
  
  REASON,
  
} from "./actionTypes";

let initialState = {
  posts: {
    posts: [],
    
  }
 
};

export default (state = initialState, action) => {
  switch (action.type) {
   
    case REASON: {
      return {
        ...state,

        posts: {
          ...state.posts,
          posts: action.payload,
        },
      };
    }
    

    default: {
      return state;
    }
  }
};
