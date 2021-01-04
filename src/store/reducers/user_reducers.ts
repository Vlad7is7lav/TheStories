import {USER_LOGIN, USER_AUTH, USER_LOGOUT, UserReduceStateType, UserReduceActionType, USER_UPDATE} from './TypesForUser';

// export interface IState {
//     langName: string,
//     storyAct: Number
// }

type UserDatatoNull = {
    auth: boolean | null
    userData: null
}

type UD = {
    id: string
    _id?: string
    email: string
    name: string
    lastname: string
    age?: string
    country?: string
    city?: string
    favBooks?: any
    message?: string
  }
  

//UserReduceStateType
// export default function(state={}, action:UserReduceActionType):{auth: boolean | null, userData: UD | false | null} {
export default function(state:any, action:UserReduceActionType):UserReduceStateType {
    switch(action.type){
        case USER_LOGIN:
            
            return {...state, auth: action.payload.auth, userData: action.payload.userData};
        
        case USER_AUTH: 
            return {
                ...state,
                auth: action.payload.auth ? action.payload.auth : false,
                userData: action.payload.userData ? action.payload.userData : false
            };
        case USER_LOGOUT: 
        
        return {
            ...state,
            auth: action.payload.auth,
            userData: null
        }
        case USER_UPDATE: 
        
            return {
                ...state,
                auth: action.payload.auth ? action.payload.auth : false,
                userData: action.payload.userData ? action.payload.userData : false,
                success: action.payload.success
            };
        default:
            
            return {
                
                
                auth: null,
                userData: null
            }
    }
}



