import {AppStateType} from "./store-redux";

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl;
}

export const getError = (state: AppStateType) => {
    return state.auth.error;
}


