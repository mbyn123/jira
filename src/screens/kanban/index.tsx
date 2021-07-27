import styled from "@emotion/styled"
import { useDocumentTitle } from "utils"
import { useKanban } from "utils/useKanBan"
import { KanbanCloums } from "./kanbanCloums"
import { useProjectIdInUrl, useProjectInUrl } from "./util"

export const Kanban = () => {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans } = useKanban()
    return (
        <div>
            <h1>{currentProject?.name}看板</h1>
            <CloumsWrapper>
            {
                kanbans?.map(item=>(
                    <KanbanCloums kanban={item}  key={item.id}></KanbanCloums>
                ))
            }
            </CloumsWrapper>
            
        </div>
    )
}

const CloumsWrapper = styled.div`
display: flex;
overflow: hidden;
margin-right: 2rem;
`