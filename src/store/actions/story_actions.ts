import {IloginUser, USER_LOGIN } from '../reducers/types';
import axios, { AxiosResponse } from 'axios';


export function loginUser2({email, password}:IloginUser) {
    const request = axios.post('http://localhost:3000/login', {email, password})
    .then((request) => request.data)

    return {
        type: USER_LOGIN,
        payload: request
    }
}