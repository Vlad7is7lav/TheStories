export const USER_LOGIN = 'USER_LOGIN'
export const USER_AUTH = 'USER_AUTH'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_UPDATE = 'USER_UPDATE'
export const USER_REGISTER = 'USER_REGISTER'

//use in user_actions
export type UserActionType = {
  type: typeof USER_LOGIN | typeof USER_AUTH | typeof USER_LOGOUT | typeof USER_UPDATE | typeof USER_REGISTER
  payload: UserPayloadType
}

type UserPayloadType = Promise<LoginUserResponseType> | Promise<LogoutUserResponseType> | Promise<LoginUserResponseErrorType> | Promise<UpdateUserResponseType>

//use in action_reducers
export type UserReduceActionType = {
  type: typeof USER_LOGIN | typeof USER_AUTH | typeof USER_LOGOUT | typeof USER_UPDATE | typeof USER_REGISTER
  payload: LoginUserResponseType | LogoutUserResponseType
}

//use in user_reducers
export type UserReduceStateType = {
  auth: boolean | null
  success?: boolean
  userData: UD | false | null 
  registered?: boolean
}

type LoginUserResponseType = {
  auth: boolean
  userData: {
    id: string
    email: string
    name: string
    lastname: string
    age?: string
    country?: string
    city?: string
    favBooks?: string
  }
  success?: boolean
  registered?: boolean
}

type UpdateUserResponseType = {
  success: boolean
  doc: LoginUserResponseType
}

export type UD = {
  id: string
  email: string
  password?: string
  name: string
  lastname?: string
  age?: string
  country?: string
  city?: string
  favBooks?: string
}

type LoginUserResponseErrorType = {
  auth: boolean
  message?: string
  userData: any
}

type LogoutUserResponseType = {
  auth: boolean
  userData: null
  success?: boolean
  registered?: boolean
}

export interface IUserData {
  _id?: string
  id?: string
  name: string
  author: string
  content: number
  words: string
  rating: number
  ownerId: string
  createdAt: Date
  auth: boolean
  userData: []
}