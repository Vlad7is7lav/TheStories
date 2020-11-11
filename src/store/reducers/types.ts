export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'


export interface storyAction {
  type: typeof SEND_MESSAGE
  payload: storyData
}

export interface storyState {
  langName: string,
  storyAct: Number
}

export interface storyData {
  name: string
  author: string
  content: number
  pages: string
  rating: number
  ownerId: string
  timestamp: number
}


export interface SendText {
  type: typeof SEND_MESSAGE
  payload: storyData
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE
  meta: {
    timestamp: number
  }
}

// export type ChatActionTypes = SendMessageAction | DeleteMessageAction



// export interface ChatState {
//   messages: Message[]
// }