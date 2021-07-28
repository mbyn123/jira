import { Task } from './../types/task';
import { useHttp } from './http';
import { useMutation, useQuery, useQueryClient } from "react-query";

// 获取任务 请求方法
export const useTask = (param?: Partial<Task>) => {
    const client = useHttp()
    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

// 新增任务
export const useAddTask = ()=>{
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Task>) => client(`tasks`, {
        data: params,
        method: 'POST'
    }), {
        onSuccess: () => queryClient.invalidateQueries('tasks')
    })
}