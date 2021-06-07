import axios from './axios';
import getAuthHeader from './getAuthHeader';

export const getCurrentUser = async () => {
    try {
        const { data } = await axios.post(
            '/v1/auth',
            {},
            { headers: await getAuthHeader() },
            { auth: "bnVsbDpudWxs" }
        );
        return data;
    } catch(error) {
        console.error(error);
    }
};

export const becomeUser = async (email,username) => {
    try {
        const { data ,status} = await axios.post(
            '/v1/login',
            {email,username},
             { auth: "bnVsbDpudWxs" }
        );
       
        return {data,status};
    } catch(error) {
        console.error(error,'bwhdcnskxa');
        return {error};
    }
}
