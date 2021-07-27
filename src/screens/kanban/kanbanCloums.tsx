import { Kanban } from "types/kanban"
import { useTask } from "utils/useTask"
import { useProjectIdInUrl } from "./util"


export const KanbanCloums = ({ kanban }: { kanban: Partial<Kanban> }) => {
    const { data: allTasks } = useTask()
    const tasks = allTasks?.filter(item => item.id === kanban.id)
    return (
        <div>
            <h2>{kanban.name}</h2>
            {
                tasks?.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))
            }
        </div>
    )
}