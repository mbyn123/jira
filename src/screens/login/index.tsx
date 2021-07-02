import React, { FormEvent } from "react";
const api = process.env.REACT_APP_API_URL
export const LoginScreen = () => {
    const handSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let username = (event.currentTarget.elements[0] as HTMLInputElement).value
        let password =  (event.currentTarget.elements[1] as HTMLInputElement).value
        console.log(username,password)
        login({username,password})
    }
    const login = (param:{username:string,password:string})=>{
        fetch(`${api}/login`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(param)
        }).then(async res => {
            if (res.ok) {
               
            }
        })
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