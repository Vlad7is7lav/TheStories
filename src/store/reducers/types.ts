export const USER_LOGIN = 'USER_LOGIN'
export const USER_AUTH = 'USER_AUTH'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

export interface IloginUser {
  email: string,
  password: string
}

export interface IActionLogin {
  type: typeof USER_LOGIN | typeof USER_AUTH
  payload: IUserData
}

export interface IUserData {
  name: string
  author: string
  content: number
  pages: string
  rating: number
  ownerId: string
  timestamp: number
  auth: boolean
  userData: []
}

export interface storyAction {
  type: typeof USER_LOGIN 
  payload: IUserData
}

export interface storyState {
  langName: string,
  storyAct: Number
}




export interface SendText {
  type: typeof USER_LOGIN
  payload: IUserData
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE
  meta: {
    timestamp: number
  }
}

// export type ChatActionTypes = SendMessageAction | DeleteMessageAction



// export interface ChatState {
//   messages: Message[]
// }