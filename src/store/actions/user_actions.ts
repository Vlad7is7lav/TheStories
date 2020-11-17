import {IloginUser, USER_LOGIN } from '../reducers/types';
import axios, { AxiosResponse } from 'axios';

// export default function sendMessage(text: storyData): SendText {
//     return {
//         type: SEND_MESSAGE,
//         payload: text
//     }
// }

//FOR AXIOS
// type Results = {
//     results: Array<{}>;
//   };
// type AxiosResponseData = {
//     data: Results;
//   };

export function loginUser({email, password}:IloginUser) {
    const request = axios.post('/api/user/login', {email, password})
    .then((request) => request.data)

    return {
        type: USER_LOGIN,
        payload: request
    }
}
