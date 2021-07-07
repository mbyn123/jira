import { Table } from "antd"
import { User } from './searchPanel'

interface list {
    id: number,
    personId: number,
    name: string
}

interface listProps {
    list: list[],
    users: User[]
}

export const List = ({ list, users }: listProps) => {
    return (
        <Table pagination={false} rowKey='id' dataSource={list} columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                width: 200
                // align: 'center'
            },
            {
                title: '负责人',
                // align: 'center',
                render: (value) => {
                    return users.find(user => user.id === value.personId)?.name
                }
            }
        ]}></Table>
    )
}

