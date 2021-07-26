import { useMemo } from 'react';
import { useUrlQueryParam } from "utils/url"

// 搜索组件需要使用的url地址参数
export const useProjrctParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const
}

// 编辑弹窗中需要使用的url地址参数
export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => setProjectCreate({ projectCreate: undefined })

    return { projectModalOpen: projectCreate === 'true', open, close }
}