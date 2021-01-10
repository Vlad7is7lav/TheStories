import {USER_LOGIN, USER_AUTH, USER_LOGOUT, UserReduceStateType, UserReduceActionType, USER_UPDATE} from './TypesForUser';

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
                ...state
            }
    }
}



