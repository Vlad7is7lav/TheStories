import {IloginUser,IStoryData, IStoryAction, 
    USER_LOGIN, STORY_ADD, STORY_CLEAR, STORY_GET, STORY_UPDATE } from '../reducers/types';
import axios, { AxiosResponse } from 'axios';



export function loginUser2({email, password}:IloginUser) {
    const request = axios.post('http://localhost:3000/login', {email, password})
    .then((request) => request.data)

    return {
        type: USER_LOGIN,
        payload: request
    }
}

export function addStory(story:IStoryData) {
    const request = axios.post('/api/stories/story', story)
    .then((response) => {return response.data})
    
    return {
        type: STORY_ADD,
        payload: request
    }
}

export function updateStory(story:IStoryData) {
    const request = axios.patch('/api/stories/story', story)
    .then((response) => {return response.data})
    .catch((err)=> {
        return false
    })
    
    return {
        type: STORY_UPDATE,
        payload: request
    }
}

export function getStory(storyId:string) {
    const request = axios.get(`/api/stories/story?id=${storyId}`)
    .then((response) => {return response.data})
    .catch((err)=> {
        return false
    })
    
    return {
        type: STORY_GET,
        payload: request
    }
}

export function clearStory() {
    return {
        type: STORY_CLEAR,
        payload: null
    }
}