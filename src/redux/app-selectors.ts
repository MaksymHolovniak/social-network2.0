import {AppStateType} from "./store-redux";

export const getInitialized = (state: AppStateType) => {
    return state.app.initialized;
}
