import {authAPI, profileAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from '../api/api';
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store-redux";
import profileReducer, {getUserProfile} from "./profile-reducer";
import {PhotosType, ProfileType} from "../types/types";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA' as const
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS' as const
const GET_ERROR_SUCCESS = 'social-network/auth/GET_ERROR_SUCCESS' as const



let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    photos: null as PhotosType | null,
    isAuth: false,
    captchaUrl: null as string | null,
    error: null as string | null
}

type initialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case GET_ERROR_SUCCESS:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>


export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, photos: PhotosType | null) => ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth, photos}
    }),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }),
    getErrorSuccess: (error: any) => ({type: GET_ERROR_SUCCESS, error}),
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me()
    if (data.resultCode === ResultCodes.Success) {
        let {id, email, login} = data.data
        const dataProfile = await profileAPI.getProfile(id)
        dispatch(actions.setAuthUserData(id, email, login, true, dataProfile.photos))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(actions.getErrorSuccess((message)))
        }
    }


export const logout = (): ThunkType =>
    async (dispatch) => {
        const data = await authAPI.logout()
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false, null))
        }
    }

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch) => {
        const responce = await securityAPI.getCaptchaUrl()
        const captchaUrl = responce.data.url
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }

export default authReducer;