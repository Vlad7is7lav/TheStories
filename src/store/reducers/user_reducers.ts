import {USER_LOGIN, IActionLogin, IUserData} from '../reducers/types';


export interface IState {
    langName: string,
    storyAct: Number
}


export default function(state={}, action:IActionLogin): {} {
    switch(action.type){
        case USER_LOGIN:
            return {...state, auth: action.payload.auth, userData: action.payload.userData}
        default:
            return state
    }
}

//меняем стейт



