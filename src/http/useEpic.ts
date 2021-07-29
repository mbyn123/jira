import { useHttp } from '../http/http';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Epic } from 'types/epic';

// 获取任务列表 请求方法
export const useEpic = (param?: Partial<Epic>) => {
    const client = useHttp()
    return useQuery<Epic[]>(['epics', param], () => client('epics', { data: param }))
}   

// 新增任务
export const useAddEpic = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Epic>) => client(`epics`, {
        data: params,
        method: 'POST'
    }), {
        onSuccess: () => queryClient.invalidateQueries('epics')
    })
}

// 删除任务
export const useDeleteEpic = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(({id}:{id:number}) => client(`epics/${id}`, {
        method: 'DELETE'
    }), {
        onSuccess: () => queryClient.invalidateQueries('epics')
    })
}