import styled from "@emotion/styled"
import { Spin } from "antd"
import { useDocumentTitle } from "utils"
import { useKanban } from "utils/useKanBan"
import { useTask } from "utils/useTask"
import { CreateColums } from "./createCloums"
import { KanbanCloums } from "./kanbanCloums"
import { SearchPanel } from "./searchPanel"
import { useProjectIdInUrl, useProjectInUrl } from "./util"

export const Kanban = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans, isLoading: kanbanLoading } = useKanban({projectId:useProjectIdInUrl()})
    const { isLoading: taskLoading } = useTask()
    const isLoading = kanbanLoading || taskLoading
    return (
        <Container>
            <h2>{currentProject?.name}看板</h2>
            <SearchPanel />
            {
                isLoading ? <Spin size={'large'} /> : <CloumsWrapper>
                    {
                        kanbans?.map(item => <KanbanCloums kanban={item} key={item.id}></KanbanCloums>)
                    }
                    <CreateColums />
                </CloumsWrapper>
            }
        </Container>
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

const CloumsWrapper = styled.div`
display: flex;
overflow: scroll;
margin-right: 2rem;
flex: 1;
::-webkit-scrollbar{
    display: none;
}
`

