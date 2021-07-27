import React, { ReactNode, useContext, useEffect } from "react";
import * as auth from 'auth-provider'
import { User } from "types/user"
import { http } from "utils/http";
// import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageError, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";

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
    const queryClient = useQueryClient()
    // 第一种
    // const [user, setUser] = useState<User | null>(null)
    const {run,setData:setUser,data:user,isLoading,isIdle,isError,error} = useAsync<User | null>()
    const login = (form: authForm) => auth.login(form).then(setUser)
    const register = (form: authForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => {
        setUser(null)
        queryClient.clear()
    })
    // 页面刷新时，验证token是否失效
    useEffect(() => {
        run(bootStraspUser())
         // 第一种
        // bootStraspUser().then(setUser)
        
    },[run])
   
    if(isLoading || isIdle){
        return <FullPageLoading/>
    }

    if(isError){
        return <FullPageError error={error}></FullPageError>
    }
    
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('userAuth必须在AuthProvider中使用')
    }
    return context
}   