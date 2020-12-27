import {
  StoryReduceStateType,
  AddStoryType,
  STORY_ADD,
  STORY_CLEAR,
  STORY_GET,
  STORY_UPDATE,
  STORIES_GET,
  StoryReduceActionType,
  added,
  IStoryData
} from './TypesForStory'

export type top = {
  type: typeof STORY_ADD | typeof STORY_CLEAR | typeof STORY_GET | typeof STORY_UPDATE | typeof STORIES_GET
  payload: Array<IStoryData>
}

  export default function(state={add: null, update: null, collection: []}, action:top & StoryReduceActionType):StoryReduceStateType {
    switch(action.type){
      case STORY_ADD:
        return {
          ...state,
          add: action.payload
        }

      case STORY_CLEAR: 
        return { 
          ...state,
            add: action.payload, update: action.payload
        }
      
      case STORY_GET: 
        return { 
          ...state,
            add: action.payload
        }
        
      case STORY_UPDATE: 
        return { 
          ...state,
            update: action.payload
        }

      case STORIES_GET: 
        return { 
          ...state,
            collection: action.payload
        }
        
      default:
          return state
      }
    }

    // {
    //   add: null,
    //   update: null,
    //   collection: []
    // }