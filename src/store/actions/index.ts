import {storyData, SEND_MESSAGE, DELETE_MESSAGE, SendText} from '../reducers/types';

export default function sendMessage(text: storyData): SendText {
    return {
        type: SEND_MESSAGE,
        payload: text
    }
}

