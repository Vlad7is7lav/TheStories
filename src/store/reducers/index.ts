import {combineReducers} from 'redux';
import storyRed from './story_reducers';
import userRed from './user_reducers';
import * as user from './user_reducers';

const rootReducer = combineReducers({
    storyReduce: storyRed,
    userReduce: userRed
});

// const rootReducer = combineReducers({
//     chat: chatReducer
//   })
  


export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>