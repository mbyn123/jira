import { User } from "types/user"
import {http} from 'http/http'

// const api = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

// 登录
export const login = (data: { username: string, password: string }) => {
    return http('login',{data,method:'post'}).then(user=>handleUserResponse(user))
    // return fetch(`${api}/login`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // }).then(async res => {
    //     if (res.ok) {
    //         return handleUserResponse(await res.json())
    //     }else{
    //         return Promise.reject(data)
    //     }
    // })
}

// 注册
export const register = (data: { username: string, password: string }) => {
    return http('register',{data,method:'post'}).then(user=>handleUserResponse(user))
    // return fetch(`${api}/register`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // }).then(async res => {
    //     if (res.ok) {
    //         return handleUserResponse(await res.json())
    //     }else{
    //         return Promise.reject(data)
    //     }
    // })
}

// 退出
export const logout = async ()=> window.localStorage.removeItem(localStorageKey)