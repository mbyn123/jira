import { useProjectDetail } from './../../utils/useProject';
import { useLocation } from "react-router"

// 获取当前查看的项目id
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

// 获取当前项目的详情数据
export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl())


// export const useKanbanQueryKey = () => ['kanbans', { projectId: useProjectIdInUrl() }]

// export const useTaskQueryKey = () => ['tasks', { projectId: useProjectIdInUrl() }]