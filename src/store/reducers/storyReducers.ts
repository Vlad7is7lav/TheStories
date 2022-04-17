import {
    STORY_ADD,
    STORY_CLEAR,
    STORY_GET,
    STORY_UPDATE,
    STORIES_GET,
    IStoryData,
} from "./TypesForStory"

import { ActionSuper } from "../actions/storyActions"

export type top = {
    type:
        | typeof STORY_ADD
        | typeof STORY_CLEAR
        | typeof STORY_GET
        | typeof STORY_UPDATE
        | typeof STORIES_GET
    payload: Array<IStoryData>
}

export default function (
    state = { add: null, update: null, collection: [] },
    action: ActionSuper
) {
    switch (action.type) {
        case STORY_ADD:
            return {
                ...state,
                add: action.payload,
            }

        case STORY_CLEAR:
            return {
                ...state,
                add: action.payload,
                update: action.payload,
            }

        case STORY_GET:
            return {
                ...state,
                add: action.payload,
            }

        case STORY_UPDATE:
            return {
                ...state,
                update: action.payload,
            }

        case STORIES_GET:
            return {
                ...state,
                collection: action.payload,
            }

        default:
            return state
    }
}
