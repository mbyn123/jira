// import { FormEvent } from "react";
// import {useEffect} from 'react'
import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from "antd";
import styled from '@emotion/styled';
import { useAsync } from 'http/useAsync';
// import userEvent from '@testing-library/user-event';

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwError: true })
    // const handSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     let username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     let password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     console.log(username, password)
    //     register({ username, password })
    // }
    const handSubmit = ({ cpassword, ...value }: { username: string, password: string, cpassword: string }) => {
        if (cpassword !== value.password) {
            return onError(new Error("两次密码输入不一致！"));
        }
        run(register(value)).catch(onError)
    }
    return (
        <Form onFinish={handSubmit}>
            <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder={'用户名'} type="text" />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder={'密码'} type="password" />
            </Form.Item>
            <Form.Item name={'cpassword'} rules={[{ required: true, message: '请输入确认密码' }]}>
                <Input placeholder={'确认密码'} type="password" />
            </Form.Item>
            <LoginButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LoginButton>
        </Form>
    )
}

const LoginButton = styled(Button)`
width: 100%;
`