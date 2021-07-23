import styled from "@emotion/styled"
import { List, Popover, Typography } from "antd"
import { useDispatch } from "react-redux"
import { projectListActions } from "store/projectListSlice"
import { useProject } from "utils/useProject"
import { ButtonNoPadding } from "./lib"

export const ProjectPopover = () => {
    const { data } = useProject()
    const pinnedProject = data?.filter(item => item.pin)
    const dispatch = useDispatch()
   

    const content = (
        <Contation>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                {
                    pinnedProject?.map(item => (
                        <List.Item.Meta title={item.name} key={item.id}></List.Item.Meta>
                    ))
                }
            </List>
            <ButtonNoPadding type={'link'} onClick={()=>dispatch(projectListActions.openProjectModal())}>创建项目</ButtonNoPadding>
        </Contation>
    )
    return (
        <Popover placement={'bottom'} content={content}>
           <ButtonNoPadding type={'link'}>项目</ButtonNoPadding>
        </Popover>
    )
}

const Contation = styled.div`
min-width: 20rem;
`