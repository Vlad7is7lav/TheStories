import {combineReducers} from 'redux';
import storyReduce from './story_reducers';
import userReduce from './user_reducers';

const rootReducer = combineReducers({
    storyReduce,
    userReduce
});

// const rootReducer = combineReducers({
//     chat: chatReducer
//   })
  


export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export type TuserReduce = ReturnType<typeof userReduce>