import { Kanban } from "types/kanban"
import { useTask } from "utils/useTask"
import { useTaskType } from "utils/useTaskType"
import { useTaskSearchParams } from "./util"
import {
    CheckSquareTwoTone,
    CloseCircleTwoTone
} from '@ant-design/icons';
import styled from "@emotion/styled";
import { Card } from "antd";
import { useDebounce } from "utils";
import { CreateTask } from "./createTask";

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskType()
    
    const name = taskTypes?.find(item => item.id === id)?.name
    if (!name) { return null }
    return name === 'task' ? <CheckSquareTwoTone /> : <CloseCircleTwoTone />
}

export const KanbanCloums = ({ kanban }: { kanban: Partial<Kanban> }) => {
    const { data: allTasks } = useTask(useDebounce(useTaskSearchParams(),1000))
    const tasks = allTasks?.filter(item => item.kanbanId === kanban.id)
  
    return (
        <Container>
            <h3>{kanban.name}</h3>
            <TaskWrapper>
                {
                    tasks?.map(item => (
                        <Card style={{ marginBottom: '0.5rem' }} key={item.id}>
                            <div>{item.name}</div>
                            <TaskTypeIcon id={item.typeId} />
                        </Card>
                    ))
                }
                <CreateTask kanbanId={kanban.id}/>
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