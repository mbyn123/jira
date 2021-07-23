import styled from "@emotion/styled"
import { Button, Form, Input } from "antd"
import { UseSelect } from "components/useSelect"
import { Project } from "./list"

export interface User {
    id: number,
    name: string,
    token: string
}

interface searchPanelProps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,
    // param: {
    //     name: string,
    //     personId: string
    // },
    setParam: (param: searchPanelProps['param']) => void
}

export const SearchPanel = ({ param, setParam, users }: searchPanelProps) => {
    return (
        <Container>
           <Header>
           <h2>项目列表</h2>
           <Button>创建项目</Button>
           </Header>            
            <Form layout={'inline'}>
                <Form.Item>
                    <Input type="text" placeholder={'项目名称'} value={param.name} onChange={(e) => setParam({
                        ...param, name: e.target.value
                    })} />
                </Form.Item>
                <Form.Item>
                    <UseSelect defaultOptionName={'负责人'} value={param.personId} onChange={(value?:number) => setParam({
                        ...param, personId: value
                    })} />
                    {/* <Select value={param.personId} onChange={(value) => setParam({
                        ...param, personId: value
                    })}>
                        <Select.Option value={''} >负责人</Select.Option>
                        {users.map(item => <Select.Option value={String(item.id)} key={item.id}>{item.name}</Select.Option>)}
                    </Select> */}
                </Form.Item>
            </Form>

        </Container>
    )
}

const Container = styled.div`
margin-bottom: 3rem;
`

const Header = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`