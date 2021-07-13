import { Table, TableProps } from "antd"
import { User } from './searchPanel'
import dayjs from 'dayjs'

export interface Project {
    id: number,
    personId: string,
    name: string,
    created: number
}

interface listProps extends TableProps<Project> {
    users: User[]
}

export const List = ({users,...props }: listProps) => {
    return (
        <Table pagination={false} rowKey='id'    columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                // width: 400
                // align: 'center'
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
            }
        ]}
        {...props}
        ></Table>
    )
}

