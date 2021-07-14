import { useState } from "react"
import { LoginScreen } from './login'
import { RegisterScreen } from "./register"
import { Button, Card, Divider, Typography } from "antd"
import styled from '@emotion/styled'

export const Unauthenticatied = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const changeToggle = () => {
        setIsRegister(!isRegister)
        setError(null)
    }
    return (
        <Container>
            <ShowCard>
                <Title>{isRegister ? '请注册' : '请登录'}</Title>
                {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
                {
                    isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
                }
                <Divider />
                <Button type={'link'} onClick={changeToggle}>{isRegister ? '已有账号？直接登录' : '还没有账号，去注册'}</Button>
            </ShowCard>

        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 100vh;
`

const ShowCard = styled(Card)`
width: 40rem;
min-height: 56rem;
padding: 3.2rem 4rem;
border-radius: 0%.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
`

const Title = styled.h3`
margin-bottom: .24rem;
color: rgb(94,108,32);
`