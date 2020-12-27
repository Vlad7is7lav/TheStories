export const USER_LOGIN = 'USER_LOGIN'
export const USER_AUTH = 'USER_AUTH'
export const USER_LOGOUT = 'USER_LOGOUT'

//use in user_actions
export type UserActionType = {
  type: typeof USER_LOGIN | typeof USER_AUTH | typeof USER_LOGOUT
  payload: UserPayloadType
}

type UserPayloadType = Promise<LoginUserResponseType> | Promise<LogoutUserResponseType> | Promise<LoginUserResponseErrorType>

//use in action_reducers
export type UserReduceActionType = {
  type: typeof USER_LOGIN | typeof USER_AUTH | typeof USER_LOGOUT
  payload: LoginUserResponseType | LogoutUserResponseType
}

//use in user_reducers
export type UserReduceStateType = {
  auth: boolean | null
  userData: UD | false | null 
}

type LoginUserResponseType = {
  auth: boolean
  userData: {
    id: string
    email: string
    name: string
    lastname: string
  }
}

type UD = {
  id: string
  email: string
  name: string
  lastname: string
  message?: string
}

type LoginUserResponseErrorType = {
  auth: boolean
  message?: string
  userData: any
}

type LogoutUserResponseType = {
  auth: boolean
  userData: null
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