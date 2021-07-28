import { useCallback } from 'react';
import { useTaskDetail } from './../../utils/useTask';
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

export const queryUrlKey = ['name', 'typeId', 'processorId', 'tagId']

// 事务列表的请求参数
export const useTaskSearchParams = () => {
    // 从url地址中获取当前页面的搜索参数
    const [param] = useUrlQueryParam(queryUrlKey)
    const projectId = useProjectIdInUrl()
    return useMemo(() => ({
        projectId,
        name: param.name,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,

    }), [projectId, param])

}


// 当前点击事务获取详情数据
export const useTaskModal = () => {
    // 从url地址中获取当前点击事务的id
    const [{ editingTakId }, setEditingTakId] = useUrlQueryParam(['editingTakId'])
    // 发送请求获取详情数据
    const { data: editingTask, isLoading } = useTaskDetail(Number(editingTakId))
    // 修改url中事务id
    const startEdit = useCallback((id: number) => {
        setEditingTakId({ editingTakId: id })
    }, [setEditingTakId])
    // 清除url中的事务id
    const close = useCallback(()=>{
        setEditingTakId({ editingTakId: '' })
    },[setEditingTakId])

    return {
        editingTakId,
        editingTask,
        isLoading,
        startEdit,
        close
    }
}
