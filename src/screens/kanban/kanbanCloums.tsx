import { Kanban } from "types/kanban"
import { useTaskModal, useTaskSearchParams } from "./util"
import {
    CheckSquareTwoTone,
    CloseCircleTwoTone
} from '@ant-design/icons';
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { useDebounce } from "utils";
import { CreateTask } from "./createTask";
import { Mark } from "components/mask";
import { Row } from "components/lib";
import { useTaskType } from "http/useTaskType";
import { useDeleteKanban } from "http/useKanBan";
import { useTask } from "http/useTask";

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskType()

    const name = taskTypes?.find(item => item.id === id)?.name
    if (!name) { return null }
    return name === 'task' ? <CheckSquareTwoTone twoToneColor="#52c41a"/> : <CloseCircleTwoTone twoToneColor="#eb2f96"/>
}

const Moda = ({ id }: { id: number }) => {
    const { mutateAsync } = useDeleteKanban()
    const overlay = (
        <Menu>
            <Menu.Item key={'delete'} onClick={() => {
                Modal.confirm({
                    okText: '确定',
                    cancelText: '取消',
                    title: '确定删除看板吗',
                    onOk: () => {
                        mutateAsync({ id })
                    }
                })
            }}>删除</Menu.Item>
        </Menu>
    )
    return (
        <Dropdown overlay={overlay}>
            <Button type={'link'}>...</Button>
        </Dropdown>
    )
}

export const KanbanCloums = ({ kanban }: { kanban: Partial<Kanban> }) => {
    const { data: allTasks } = useTask(useDebounce(useTaskSearchParams(), 200))
    const tasks = allTasks?.filter(item => item.kanbanId === kanban.id)
    const { name: keyword } = useTaskSearchParams()
    const {startEdit} = useTaskModal()
    return (
        <Container>
            <Row between>
                <h3>{kanban.name}</h3>
                <Moda id={kanban.id || 0} />
            </Row>

            <TaskWrapper>
                {
                    tasks?.map(item => (
                        <CardWrapper onClick={()=>startEdit(item.id)} key={item.id}>
                            <Mark name={item.name} keyword={keyword}></Mark>
                            <p>
                                <TaskTypeIcon id={item.typeId} />
                            </p>
                        </CardWrapper>
                    ))
                }
                <CreateTask kanbanId={kanban.id} />
            </TaskWrapper>
        </Container>
    )
}

export const Container = styled.div`
min-width: 27rem;
border-radius: 6px;
background-color: rgb(244,245,247);
display: flex;
flex-direction: column;
padding: 0.7rem 0.7rem 1rem;
margin-right: 1.5rem;
`
const TaskWrapper = styled.div`
flex:1;
overflow: scroll;

::-webkit-scrollbar{
    display: none;
}
`

const CardWrapper = styled(Card)`
margin-bottom: 0%.5rem;
cursor: pointer;
`