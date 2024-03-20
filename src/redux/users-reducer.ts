import {ResultCodes, usersAPI} from "../api/api"
import {UserType} from "../types/types"
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store-redux";

const FOLLOW = 'social-network/users/FOLLOW' as const
const UNFOLLOW = 'social-network/users/UNFOLLOW' as const
const SET_USERS = 'social-network/users/SET_USERS' as const
const SET_FILTER = 'social-network/users/SET_FILTER' as const
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE' as const
const SET_NEXT_PAGE = 'social-network/users/SET_NEXT_PAGE' as const
const SET_BOTTOM_PAGE = 'social-network/users/SET_BOTTOM_PAGE' as const
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT' as const
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING' as const
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS' as const



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_FILTER: {
            return  {...state, filter: action.payload}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }

        case SET_NEXT_PAGE: {
            return {...state, currentPage: action.nextPage}
        }

        case SET_BOTTOM_PAGE: {
            return {...state, currentPage: action.bottomPage}
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: FOLLOW, userId}),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId}),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users}),
    setFilter: (filter: FilterType) => ({ type: SET_FILTER, payload: filter}),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}),
    setNextPage: (nextPage: number) => ({type: SET_NEXT_PAGE, nextPage}),
    setBottomPage: (bottomPage: number) => ({type: SET_BOTTOM_PAGE, bottomPage}),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    })
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter))
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }

export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    const data = await usersAPI.follow(userId)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.followSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    const data = await usersAPI.unfollow(userId)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.unfollowSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export default usersReducer;