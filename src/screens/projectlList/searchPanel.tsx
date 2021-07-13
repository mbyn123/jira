import styled from "@emotion/styled"
import { Form, Input, Select } from "antd"

export interface User {
    id: number,
    name: string,
    token: string
}

interface searchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: searchPanelProps['param']) => void
}

export const SearchPanel = ({ param, setParam, users }: searchPanelProps) => {
    return (
        <Container>
            <h2>项目列表</h2>
            <Form layout={'inline'}>
                <Form.Item>
                    <Input type="text" placeholder={'项目名称'} value={param.name} onChange={(e) => setParam({
                        ...param, name: e.target.value
                    })} />
                </Form.Item>
                <Form.Item>
                    <Select value={param.personId} onChange={(value) => setParam({
                        ...param, personId: value
                    })}>
                        <Select.Option value={''} >负责人</Select.Option>
                        {users.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>

        </Container>
    )
}

const Container = styled.div`
margin-bottom: 3rem;
`

