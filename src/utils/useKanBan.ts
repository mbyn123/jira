import { useHttp } from './http';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "types/kanban";

// 获取看板列表 请求方法
export const useKanban = (param?: Partial<Kanban>) => {
    const client = useHttp()
    return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}   

// 新增看板
export const useAddKanban = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Kanban>) => client(`kanbans`, {
        data: params,
        method: 'POST'
    }), {
        onSuccess: () => queryClient.invalidateQueries('kanbans')
    })
}

