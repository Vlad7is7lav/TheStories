import { combineReducers } from "redux"
import storyReduce from "./storyReducers"
import userReduce from "./userReducers"

const rootReducer = combineReducers({
    storyReduce,
    userReduce,
})

export default rootReducer
export type RootStoryReduce = ReturnType<typeof storyReduce>
export type RootUserReduce = ReturnType<typeof userReduce>
