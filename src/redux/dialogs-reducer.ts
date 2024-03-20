import {DialogType, MessageType} from "../types/types";
import {InferActionsTypes} from "./store-redux";

const SEND_MESSAGE = 'social-network/dialogs/SEND-MESSAGE' as const


let initialState = {
    dialogs: [
        {id: 1, name: 'Maks'},
        {id: 2, name: 'Dmitriy'},
        {id: 3, name: 'Sofya'},
        {id: 4, name: 'Vlad'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi honey, how are you doing???? Long time no see. Where have you been?'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'What are you doing'}
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.newMessageBody,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody})
}


export default dialogsReducer;