import axios from './axios';
import Post from '../models/Post';
import getAuthHeader from './getAuthHeader';

export const getPosts = async (categories) => {
    try {
        const { data } = await axios.get(
            `/v1/posts`,
             { headers: await getAuthHeader() },
              { auth: "bnVsbDpudWxs" }
        );
        return data;
    } catch(error) {
        console.error(error);
    }
};
export const getPostsforAdmin = async (categories) => {
    try {
        const { data } = await axios.get(
            `/v1/adminposts`,
             { headers: await getAuthHeader() },
              { auth: "bnVsbDpudWxs" }
        );
        return data.map((rawPost) => new Post(rawPost));
    } catch(error) {
        console.error(error);
    }
};

export const getPost = async (id) => {
    try {
        const { data } = await axios.get(
            `/v1/posts/${id}`,
             { auth: "bnVsbDpudWxs" }
        );
        return new Post(data);
    } catch(error) {
        console.error(error);
    }
}

export const addPost = async (body) => {
    
    try {
        const { status, data } = await axios.post(
            `/v1/posts`,
            body,
            { headers: await getAuthHeader() },
             { auth: "bnVsbDpudWxs" }
        );
        return { 
            status, 
            data: new Post(data)
        };
    } catch(error) {
        return {
            error: 'an unknown error occurred'
        };
    }
}
export const addUser = async (username,email) => {
    let body={
        username:username,
        email:email,
    }
    try {
        const { status, data } = await axios.post(
            `/v1/adduser`,
            body,
            { headers: await getAuthHeader() },
             { auth: "bnVsbDpudWxs" }
        );
        return { 
            status, 
            data: new Post(data)
        };
    } catch(error) {
        return {
            error: 'an unknown error occurred'
        };
    }
}
    
export const updatePost = async (id, body) => {
    try {
        
        const { data, status } = await axios.put(
            `/v1/posts/${id}`,
            body,
            { headers: await getAuthHeader() },
             { auth: "bnVsbDpudWxs" }
        );
        
        if((data && data._id) || status === 200) {
            return {
                success: true,
                data: new Post(data)
            };
        } else {
            return {
                success: false,
                error: 'An unknown error occurred. Please, retry again later.'
            };
        }
    } catch(error) {
        console.error(error);
    }
};
export const approvePost = async ( body) => {
    try {
        
        const { data, status } = await axios.put(
            `/v1/approveposts`,
            body,
            { headers: await getAuthHeader() },
             { auth: "bnVsbDpudWxs" }
        );
        
        if((data && data._id) || status === 200) {
            return {
                success: true,
                data: new Post(data)
            };
        } else {
            return {
                success: false,
                error: 'An unknown error occurred. Please, retry again later.'
            };
        }
    } catch(error) {
        console.error(error);
    }
};
export const deletePosts = async ( body) => {
    try {
        
        const { data, status } = await axios.put(
            `/v1/deleteposts`,
            body,
            { headers: await getAuthHeader() },
             { auth: "bnVsbDpudWxs" }
        );
        
        if((data && data._id) || status === 200) {
            return {
                success: true,
                data: new Post(data)
            };
        } else {
            return {
                success: false,
                error: 'An unknown error occurred. Please, retry again later.'
            };
        }
    } catch(error) {
        console.error(error);
    }
};

export const deletePost = async (id) => {
    try {
        const response = await axios.delete(
            `/v1/posts/${id}`,
            { headers: await getAuthHeader() },
             { auth: "bnVsbDpudWxs" }
        );
        console.log(response);
        return response.status;
    } catch(error) {
        console.error(error);
    }
    
};

