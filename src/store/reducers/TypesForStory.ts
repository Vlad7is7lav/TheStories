export const USER_LOGIN = 'USER_LOGIN'
export const USER_AUTH = 'USER_AUTH'
export const USER_LOGOUT = 'USER_LOGOUT'

export const STORY_ADD = 'BOOK_ADD'
export const STORY_CLEAR = 'STORY_CLEAR'
export const STORY_GET = 'STORY_GET'
export const STORY_UPDATE = 'STORY_UPDATE'
export const STORIES_GET = 'STORIES_GET'

export interface IloginUser {
  email: string,
  password: string
}

export interface IUserData {
  _id?: string
  id?: string
  name: string
  author: string
  content: number
  words: number
  rating: number
  ownerId: string
  createdAt: Date
  auth: boolean
  userData: []
}

export interface IStoryData {
  _id?: string
  name: string, 
  author: string,
  words: number,
  rating?: string,
  content: string,
  ownerId?: any
}

export type AddStoryResponseType = {
  post: boolean, 
  bookId: string,
  success?: string
}

type UpdateStoryResponseType = {
  success?: true, 
  // doc: IStoryData
  doc: {
    _id?: string
    name: string, 
    author: string,
    words: number,
    rating: string,
    content: string,
    ownerId?: string
  }
 
}

type GetStoryResponseType = { 
  _id?: string
  name: string, 
  author: string,
  words: number,
  rating: string,
  content: string,
  ownerId?: string
}

type GetStoriesResponseType = Array<IStoryData>

type ActionsType = AddStoryResponseType & UpdateStoryResponseType & GetStoryResponseType & Array<IStoryData>

type ActionsPromiseType = Promise<AddStoryResponseType> | 
                          Promise<UpdateStoryResponseType> | 
                          Promise<GetStoryResponseType> | 
                          Promise<GetStoriesResponseType> 

export type AddStoryType = {
  type: typeof STORY_ADD | typeof STORY_CLEAR | typeof STORY_GET | typeof STORY_UPDATE | typeof STORIES_GET 
  payload: ActionsPromiseType 
}

export type StoryReduceActionType = {
  type: typeof STORY_ADD | typeof STORY_CLEAR | typeof STORY_GET | typeof STORY_UPDATE | typeof STORIES_GET 
  payload: null | ActionsType
}

export type StoryReduceStateType = {
  add: ActionsType | null
  update: ActionsType | null
  collection: Array<IStoryData>
}


export type added = {
  add: ActionsType
  update: any
  // collection: ActionsType | never[]
}

export interface SendText {
  type: typeof USER_LOGIN
  payload: IUserData
}

