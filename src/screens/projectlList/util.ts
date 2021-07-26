import { useMemo } from 'react';
import { useUrlQueryParam } from "utils/url"
import { useProjectDetail } from 'utils/useProject';

// 搜索组件需要使用的请求参数
export const useProjrctParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const
}

// 管理弹窗组件中数据状态
export const useProjectModal = () => {
    // 获取url中的参数判断是否打开弹窗
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

    // 获取url中的参数 项目id
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])

    // 通过项目id去请求项目详情接口
    const { data: editingProject, isLoading } = useProjectDetail(Number(editingProjectId))

    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => {

        setProjectCreate({ projectCreate: undefined })
        setEditingProjectId({ editingProjectId: undefined })
    }

    // 修改url状态栏中的项目id参数
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}