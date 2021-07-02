import { FormEvent } from "react";
import { useAuth } from 'context/auth-context'

export const LoginScreen = () => {
    const { login,register } = useAuth()
    const handSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let username = (event.currentTarget.elements[0] as HTMLInputElement).value
        let password = (event.currentTarget.elements[1] as HTMLInputElement).value
        console.log(username, password)
        login({ username, password })
        // register({ username, password })
    }
    return (
        <form onSubmit={handSubmit}>
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id={'username'} />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id={'password'} />
            </div>
            <button type={'submit'}>登录</button>
        </form>
    )
}