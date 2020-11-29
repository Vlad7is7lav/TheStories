import StoreState from './index';
// import { ChatActionTypes } from './types';
import {
  storyAction,
  storyState
} from './types'

interface Message {
    user: string
    message: string
    timestamp: number
  }

interface Story {
    messages: Message[]
}





const initialState: Story = {
    messages: []
  };

  export default function(state:storyState, action:storyAction): storyState{
    switch(action.type){
        default:
            return {langName: 'asdassdad', storyAct: 4};
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