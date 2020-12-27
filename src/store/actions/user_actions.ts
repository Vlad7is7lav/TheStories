import {
    UserActionType,
    USER_LOGIN, 
    USER_AUTH, 
    USER_LOGOUT } from '../reducers/TypesForUser';
import axios from 'axios';

type ValuesType = {
    email: string
    password: string
}

export function loginUser({email, password}:ValuesType):UserActionType {
    const request = axios.post('/api/user/login', {email, password})
    .then((request) => {return request.data})
    
    return {
        type: USER_LOGIN,
        payload: request
    }
}

export function auth():UserActionType {
    const request = axios.get('/api/user/auth')
    .then(request => request.data)

    return {
        type: USER_AUTH,
        payload: request
    }
}

export function logoutUser():UserActionType {
    const request = axios.get('/api/user/logout')
    .then(() => {return {auth: false, userData: null}
    })
    
    return {
        type: USER_LOGOUT,
        payload: request
    }
}