import styled from "@emotion/styled"
import { Button, List, Modal, Spin } from "antd"
import { Row } from "components/lib"
import dayjs from "dayjs"
import { useDeleteEpic, useEpic } from "http/useEpic"
import { useTask } from "http/useTask"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useProjectIdInUrl, useProjectInUrl } from "screens/kanban/util"
import { Epic as epicType } from "types/epic"
import { CreateEpic } from "./createEpic"

export const Epic = () => {
    const { data: currentProject } = useProjectInUrl()
    const { data: epics, isLoading } = useEpic({ projectId: useProjectIdInUrl() })
    const { data: allTask } = useTask({ projectId: useProjectIdInUrl() })
    const { mutate } = useDeleteEpic()
    const [visible, setVisible] = useState(false)

    const onDelete = async (item: epicType) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: `确定删除任务组：${item.name}吗`,
            onOk: () => {
                mutate({ id: item.id })
            }
        })
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <Spin size={'large'} spinning={isLoading}>
            <Container>
                <Row between>
                    <h2>{currentProject?.name}任务组</h2> 
                    <Button type={'link'} onClick={() => setVisible(true)}>创建任务组</Button>
                </Row>
                <List dataSource={epics} itemLayout={'vertical'} renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <Row between>
                                    <span>{item.name}</span>
                                    <Button type={'link'} onClick={() => onDelete(item)}>删除</Button>
                                </Row>
                            }
                            description={
                                <div>
                                    <div>开始时间：{dayjs(item.start).format('YYYY-MM-DD')}</div>
                                    <div>结束时间：{dayjs(item.end).format('YYYY-MM-DD')}</div>
                                </div>

                            }
                        ></List.Item.Meta>
                        <div>
                            {
                                allTask?.filter(task => task.projectId === item.id).map(task => (
                                    <div>
                                        <Link to={`/projects/${currentProject.id}/kanban?editingTakId=${task.id}`} key={task.id}>{task.name}</Link>
                                    </div>

                                ))
                            }
                        </div>
                    </List.Item>
                )}></List>
            </Container>
            <CreateEpic visible={visible} onClose={onClose}></CreateEpic>
        </Spin>

    )
}

const Container = styled.div`
width: 100%;
height: calc(100vh - 6rem);
padding: 3.2rem;
display: flex;
flex-direction: column;
/* border:1px solid red; */
`
