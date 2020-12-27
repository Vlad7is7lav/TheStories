import {combineReducers} from 'redux';
import storyReduce from './story_reducers';
import userReduce from './user_reducers';

const rootReducer = combineReducers({
    storyReduce,
    userReduce
});

export default rootReducer;
export type RootStoryReduce = ReturnType<typeof storyReduce>; 
export type RootUserReduce = ReturnType<typeof userReduce>