import React, { useState, ReactNode } from "react";
import * as auth from 'auth-provider'
import { User } from 'screens/panelList/searchPanel'
import { http } from "utils/http";
import { useMount } from "utils";

interface authForm {
    username: string,
    password: string
}

// 验证token是否失效
const bootStraspUser = async ()=>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me',{token})
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: authForm) => Promise<void>,
    login: (form: authForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const login = (form: authForm) => auth.login(form).then(setUser)
    const register = (form: authForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    
    useMount(()=>{
        bootStraspUser().then(setUser)
    })

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('userAuth必须在AuthProvider中使用')
    }
    return context
}