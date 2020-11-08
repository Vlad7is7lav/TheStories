import {combineReducers} from 'redux';
import storyRed from './story_reducers';
import * as user from './user_reducers';

// import {chatReducer} from './story_reducers'

// export namespace StoreState {
//     export type IState = {
//         langName: string,
//         storyAct: Number
//     }
    
//     export interface All {
//         storyReduce: IState
//     }
// }

const rootReducer = combineReducers({
    storyReduce: storyRed

});

// const rootReducer = combineReducers({
//     chat: chatReducer
//   })
  
  export type RootState = ReturnType<typeof rootReducer>

// export default rootReducer;