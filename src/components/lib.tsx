import styled from "@emotion/styled"
import { Spin, Typography } from "antd"


export const Row = styled.div<{
    between?: boolean,
    gap?: number | boolean,
    marginBottom?: number
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom: ${props => props.marginBottom + 'rem'};
>*{
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`

export const FullPage = styled.div`
width: 100%;
height: 100vh;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
`

export const FullPageLoading = () => <FullPage>
    <Spin size={'large'}></Spin>
</FullPage>

export const FullPageError=({error}:{error:Error | null})=><FullPage>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>