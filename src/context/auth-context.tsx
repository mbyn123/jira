import React, { ReactNode, useCallback, useEffect } from "react";
import * as auth from 'auth-provider'
import { User } from 'screens/projectlList/searchPanel'
import { http } from "utils/http";
import { useAsync } from "utils/useAsync";
import { FullPageError, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from 'store/authSlice'
import { bootStrasp, selectUser } from "store/authSlice";

export interface authForm {
    username: string,
    password: string
}

// 验证token是否失效
export const bootStraspUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { run, isLoading, isIdle, isError, error } = useAsync<User | null>()
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    // 页面刷新时，验证token是否失效
    useEffect(() => {
        run(dispatch(bootStrasp()))
    }, [run, dispatch])

    if (isLoading || isIdle) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageError error={error}></FullPageError>
    }

    return (
        <div>{children}</div>
    )
}


export const useAuth = () => {
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    // 获取store中auth的数据
    const user = useSelector(selectUser)
    const login = useCallback((form: authForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: authForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

    return {
        user,
        login,
        register,
        logout
    }
}