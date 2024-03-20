import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store-redux";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS' as const;

type initialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false
}


const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>


export const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS})
}
type ThunkType = ThunkAction<void , AppStateType, unknown, ActionsTypes>
export const initializeApp = () : ThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess())
            })
    }
}

export default appReducer;