import {StoreState} from './index';
// import { ChatActionTypes } from './types';

// interface IAppState {
//     toDoList: any[];
//   }

interface Message {
    user: string
    message: string
    timestamp: number
  }

interface Story {
    messages: Message[]
}

import {
    ChatState,
    ChatActionTypes,
    SEND_MESSAGE,
    DELETE_MESSAGE
  } from './types'

const initialState: Story = {
    messages: []
  };

export default function(state = initialState, action: ChatActionTypes): Story{
    switch (action.type) {
              case SEND_MESSAGE:
                return {
                  messages: [...state.messages, action.payload]
                }
              case DELETE_MESSAGE:
                return {
                  messages: state.messages.filter(
                    message => message.timestamp !== action.meta.timestamp
                  )
                }
              default:
                return state
            }
}

// import {
//     ChatState,
//     ChatActionTypes,
//     SEND_MESSAGE,
//     DELETE_MESSAGE
//   } from './types'
  
//   const initialState: ChatState = {
//     messages: []
//   }
  
//   export function chatReducer(
//     state = initialState,
//     action: ChatActionTypes
//   ): ChatState {
//     switch (action.type) {
//       case SEND_MESSAGE:
//         return {
//           messages: [...state.messages, action.payload]
//         }
//       case DELETE_MESSAGE:
//         return {
//           messages: state.messages.filter(
//             message => message.timestamp !== action.meta.timestamp
//           )
//         }
//       default:
//         return state
//     }
//   }