export const USER_LOGIN = 'USER_LOGIN'
export const USER_AUTH = 'USER_AUTH'
export const USER_LOGOUT = 'USER_LOGOUT'

export const STORY_ADD = 'BOOK_ADD'
export const STORY_CLEAR = 'STORY_CLEAR'
export const STORY_GET = 'STORY_GET'
export const STORY_UPDATE = 'STORY_UPDATE'

// import { EditorState } from "draft-js";


export interface IloginUser {
  email: string,
  password: string
}

export interface IActionLogin {
  type: typeof USER_LOGIN | typeof USER_AUTH | typeof USER_LOGOUT
  payload: IUserData
}

export interface IUserData {
  _id?: string
  id?: string
  name: string
  author: string
  content: number
  pages: string
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
  pages: string,
  rating: string,
  content: string 
}

export interface added {
  add: IResponseData
  update?: any
}

export interface IResponseData {
  post: boolean,
  bookId: String
}

export interface IStoryAction {
  type: typeof STORY_ADD | typeof STORY_CLEAR | typeof STORY_GET | typeof STORY_UPDATE
  payload: IResponseData
}

// export interface IstoryState {
//   langName: string,
//   storyAct: Number
// }

export interface SendText {
  type: typeof USER_LOGIN
  payload: IUserData
}

// export type ChatActionTypes = SendMessageAction | DeleteMessageAction



// export interface ChatState {
//   messages: Message[]
// }