import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store-redux";
import {chatAPI, ChatMessageType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid'

const MESSAGES_RECEIVED = 'social-network/chat/MESSAGES_RECEIVED' as const
const STATUS_CHANGED = 'social-network/chat/STATUS_CHANGED' as const
const MESSAGES_STOPPED = 'social-network/chat/MESSAGES_STOPPED' as const

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}
type initialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 48)
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status
            }
        case MESSAGES_STOPPED:
            return {
                ...state,
                messages: []
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>


export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: MESSAGES_RECEIVED,
        payload: {messages}
    }),
    statusChanged: (status: StatusType) => ({
        type: STATUS_CHANGED,
        payload: {status}
    }),
    messagesStopped: () => ({ type: MESSAGES_STOPPED })
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

let _newMessageHandler : ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler : ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('message-received',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('message-received',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    dispatch(actions.messagesStopped())
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;