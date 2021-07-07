// import { FormEvent } from "react";
import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from "antd";
import styled from '@emotion/styled';

export const LoginScreen = () => {
    const { login } = useAuth()
    // const handSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     let username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     let password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     console.log(username, password)
    //     login({ username, password })
    // }
    const handSubmit = (value: { username: string, password: string }) => {
        login(value)
    }
    return (
        <Form onFinish={handSubmit}>
            <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
                <Input placeholder={'用户名'} type="text" />
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
                <Input placeholder={'密码'} type="password" />
            </Form.Item>
            <LoginButton htmlType={'submit'} type={'primary'}>登录</LoginButton>
        </Form>
    )
}


const LoginButton = styled(Button)`
width: 100%;
`