import {
  IStoryAction,
  IStoryData,
  IResponseData,
  STORY_ADD,
  STORY_CLEAR,
  STORY_GET,
  STORY_UPDATE,
  STORIES_GET
} from './types'




  export default function(state={}, action:IStoryAction): {add?: IResponseData, update?: any, collection?: any}{
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
          return state;
      }
    }




  // export default function(state = initialState, action: ChatActionTypes): Story{
//     switch (action.type) {
//               case SEND_MESSAGE:
//                 return {
//                   messages: [...state.messages, action.payload]
//                 }
//               case DELETE_MESSAGE:
//                 return {
//                   messages: state.messages.filter(
//                     message => message.timestamp !== action.meta.timestamp
//                   )
//                 }
//               default:
//                 return state
//             }
// }