import axios from 'axios';
import {
    IStoryData, 
    STORY_ADD, 
    STORY_CLEAR, 
    STORY_GET, 
    STORY_UPDATE,
    STORIES_GET
} from '../reducers/TypesForStory';

  
// type loginUserType = {type: typeof USER_LOGIN, payload: loginUserData | Promise<any>}

// type GetStoriesType = {
//     type: typeof STORIES_GET
//     payload: Promise<Array<IStoryData>>
// }

export function getStories(
    limit: number,
    start: number = 0,
    order: string = 'asc',
    list?: Array<Object>
) {
    const request = axios.get(`/api/stories/all_stories?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => { 
        return list ? [...list,...response.data] : response.data
    })

    return {
        type: STORIES_GET,
        payload: request
    }
}

type Server = {
    post: boolean, 
    bookId: string,
    success?: string
  }

export function wax(type:string, response:Server) {
    return {
        type: STORY_ADD,
        payload: response
    }
}

export function addStory(story:IStoryData) {
    
    const request = axios.post('/api/stories/story', story)
    .then((response) => response.data)
    .catch((err)=> {
        return false
    })

    return {
        type: STORY_ADD,
        payload: request
    }
}

export function updateStory(story:IStoryData) {

    const request = axios.patch('/api/stories/story', story)
    .then((response) => response.data )
    .catch((err)=> {
        return false
    })
    
    return {
        type: STORY_UPDATE,
        payload: request
    }
}

// export function getStory(storyId:string):AddStoryType {
export function getStory(storyId:string) {
    const request = axios.get(`/api/stories/story?id=${storyId}`)
    .then((response) => response.data)
    .catch((err)=> {
        return false
    })
    
    return {
        type: STORY_GET,
        payload: request
    }
}

// export function clearStory():AddStoryType | {type: typeof STORY_CLEAR, payload: null } {
export function clearStory() {
    return {
        type: STORY_CLEAR,
        payload: null
    }
}
const Q = {
    getStories
    // wax
}

export type ActionSuper = Action2<typeof Q>

type Action2<T extends {[key: string]: (...args: any) => any}> = ReturnType<proptypes<T>>
type proptypes<T> = T extends {[key: string]: infer U} ? U : never;



/*
    const Q = {
        clearStory: clearStory,
        getStory: getStory
    }

    type Action =  inferAction<typeof Q>
    type inferAction<T> = ReturnType <PropTypes<T>>
    type PropTypes = T extends {[key: string] : infer U} : never


*/