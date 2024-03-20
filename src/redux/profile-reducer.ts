import {profileAPI, ResultCodes} from "../api/api"
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store-redux";

const ADD_POST = 'social-network/profile/ADD_POST' as const
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE' as const
const SET_STATUS = 'social-network/profile/SET_STATUS' as const
const DELETE_POST = 'social-network/profile/DELETE_POST' as const
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS' as const


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'Where are you from?', likesCount: 20}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText}),
    deletePost: (postId: number) => ({type: DELETE_POST, postId}),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}),
    setStatus: (status: string) => ({type: SET_STATUS, status}),
    savePhotoSuccess: (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos})
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: any): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
}


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string) : ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)

    if (data.resultCode === ResultCodes.Success ) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: any) : ThunkType => async (dispatch) => {
    const responce = await profileAPI.savePhotos(file)
    if (responce.data.resultCode === ResultCodes.Success) {
        dispatch(actions.savePhotoSuccess(responce.data.data.photos))
    }
}


export const saveProfile = (profile: ProfileType) : ThunkType => async (dispatch, getState) => {
    const userId  = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === ResultCodes.Success) {
        dispatch(getUserProfile(userId))
    } else {
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;