import axios from 'axios'
import {PhotosType, ProfileType, UserType} from "../types/types";

const baseURL = 'https://social-network.samuraijs.com/api/1.0/';

const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
        'api-key': 'dd008388-c9a9-4592-b969-32790b1741ca'
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
}

type GetUserResponce = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

type FollowResponce = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}

}

type UnfollowResponce = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend:  null | boolean = null) {
        return instance.get<GetUserResponce>(`users?page=${currentPage}&count=${pageSize}` + (term.length>0 ? `&term=${term}` : '' ) + (friend === null ? '' : `&friend=${friend}`)).then(response => {
            return response.data
        })
    },
    follow(userId: number) {
        return instance.post<FollowResponce>(`follow/${userId}`).then(responce => {
            return responce.data
        })
    },
    unfollow(userId: number) {
        return instance.delete<UnfollowResponce>(`follow/${userId}`).then(responce => {
            return responce.data
        })
    },
}

type UpdateStatusResponce = {
    resultCode: ResultCodes
    messages: Array<String>
    data: {}
}

type SavePhotosResponce = {
    data: {photos: PhotosType}
    resultCode: ResultCodes
    messages: Array<string>
}

type SaveProfileResponce = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => {
            return response.data
        })
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(responce => {
            return responce.data
        })
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponce>('profile/status', {status: status}).then(responce => {
            return responce.data
        });
    },
    savePhotos(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<SavePhotosResponce>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileResponce>('profile', profile).then(responce => {
            return responce.data
        })
    }
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponce = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodes
    messages: Array<string>
}

type LoginResponce = {
    data: { userId: number }
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: Array<String>
}

type LogoutResponce = {
    data: {}
    resultCode: ResultCodes
    messages: Array<String>
}

export const authAPI = {
    me() {
        return instance.get<MeResponce>('auth/me').then(responce => {
            return responce.data
        })
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponce>('auth/login', {email, password, rememberMe, captcha}).then(responce => {
            return responce.data
        })
    },
    logout() {
        return instance.delete<LogoutResponce>('auth/login').then(responce => {
            return responce.data
        })
    }
}


type GetCaptchaUrlResponce = { url: string }
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponce>('security/get-captcha-url')
    }
}

