import { Menu, Dropdown , Table, TableProps } from "antd"
import { User } from './searchPanel'
import dayjs from 'dayjs'
import { Link } from "react-router-dom"
import { Pin } from "components/pin"
import { useEditProject } from "utils/useProject"
import { ButtonNoPadding } from "components/lib"

export interface Project {
    id: number,
    personId: number,
    name: string,
    created: number,
    pin: boolean
}

interface listProps extends TableProps<Project> {
    users: User[],
    refresh?: () => void
}

export const List = ({ users, ...props }: listProps) => {
    const { mutate } = useEditProject()
    // 函数柯里化
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
    return (
        <Table pagination={false} rowKey='id' columns={[
            {
                title: <Pin checked disabled />,
                width: 80,
                align: 'center',
                render: (value) => { return <Pin checked={value.pin} onCheckChange={pinProject(value.id)} /> }
            },
            {
                title: '名称',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: (value) => {
                    return <Link to={String(value.id)}>{value.name}</Link>
                }
            },
            {
                title: '部门',
                dataIndex: 'organization',

            },
            {
                title: '负责人',
                // align: 'center',
                render: (value) => {
                    return users.find(user => user.id === value.personId)?.name
                }
            },
            {
                title: '创建时间',
                render: (value) => {
                    return value.created ? dayjs(value.created).format('YYYY-MM-DD') : ''
                }
            },
            {
                render: () => {
                    return (
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key={'edit'}>
                                    <ButtonNoPadding type={'link'}>编辑</ButtonNoPadding>
                                </Menu.Item>
                            </Menu>
                        }>
                            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
                        </Dropdown >
                    )
                }
            }
        ]}
            {...props}
        ></Table>
    )
}

