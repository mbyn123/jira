import styled from "@emotion/styled"
import { Button, Spin, Typography } from "antd"



export const Row = styled.div<{
    between?: boolean,
    gap?: number | boolean,
    marginBottom?: number
}>`
display: flex;
align-items: center;
justify-content: ${(props: { between: unknown }) => props.between ? 'space-between' : undefined};
margin-bottom: ${(props: { marginBottom: string }) => props.marginBottom + 'rem'};
>*{
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props: { gap: string }) => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
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

export const FullPageError = ({ error }: { error: Error | null }) => <FullPage>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>

export const ButtonNoPadding = styled(Button)<{
    fontSize?:number
}>`
padding: 0;
font-size: ${(props:{fontSize:number})=> props.fontSize + 'rem'}
`
export const TH = ({ children,level }: {children:string, level?: 5 | 1 | 2 | 3 | 4 | undefined }) => <Typography.Title level={level}>{children}</Typography.Title>
