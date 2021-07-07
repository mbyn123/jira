import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const baseApi = process.env.REACT_APP_API_URL

// 继承
interface Config extends RequestInit {
    data?: object,
    token?: string
}

export const http = (endpoint: string, { data, token, headers, ...Config }: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...Config
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return fetch(`${baseApi}/${endpoint}`, config).then(async res => {
        if (res.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({ message: '请重新登录' })
        }
        const data = await res.json()
        if (res.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const { user } = useAuth()
    // Parameters 联合类型
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}

// type 类型别名 在很多情况下可以和interface呼唤
// type person = {
//     name:string,
//     age:number,
//     sex:string
// }

// // Partial 让当前对象中的属性属于某个对象中的类型
// const xm:Partial<person> = {}
// // Omit 让当前对象中的属性属于某个对象中的类型,并且可以去除某些类型
// const smi:Omit<person,'name' | 'sex'> ={age:12}