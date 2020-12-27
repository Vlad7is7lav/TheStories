import {USER_LOGIN, USER_AUTH, USER_LOGOUT, UserReduceStateType, UserReduceActionType} from './TypesForUser';

// export interface IState {
//     langName: string,
//     storyAct: Number
// }

type UserDatatoNull = {
    auth: boolean | null
    userData: null
}


export default function(state={}, action:UserReduceActionType):UserReduceStateType {
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
        default:
            return {
                auth: null,
                userData: null
            }
    }
}



