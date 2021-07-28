import { useProjectDetail } from './../../utils/useProject';
import { useLocation } from "react-router"
import { useUrlQueryParam } from 'utils/url';
import { useMemo } from 'react';

// 获取当前项目id
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

// 获取当前项目的详情数据
export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl())

export const queryUrlKey = [ 'name', 'typeId', 'processorId', 'tagId']

export const useTaskSearchParams = () => {
    const [param] = useUrlQueryParam(queryUrlKey)
    const projectId = useProjectIdInUrl()
    return useMemo(() => ({
            projectId,
            name: param.name || undefined,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,

        }), [projectId,param])
        
}

