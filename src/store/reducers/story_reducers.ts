import {
  IStoryAction,
  IStoryData,
  IResponseData,
  STORY_ADD,
  STORY_CLEAR,
  STORY_GET,
  STORY_UPDATE
} from './types'




  export default function(state={}, action:IStoryAction): {add?: IResponseData, update?: any}{
    switch(action.type){
      case STORY_ADD:
        return {
          ...state,
          add: action.payload
        }
        break;

      case STORY_CLEAR: 
        return { 
          ...state,
            add: action.payload, update: action.payload
        }
        break;
      
      case STORY_GET: 
        return { 
          ...state,
            add: action.payload
        }
        break;
        
      case STORY_UPDATE: 
        return { 
          ...state,
            update: action.payload
        }
        break;
        
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