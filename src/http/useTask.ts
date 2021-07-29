import { useHttp } from '../http/http';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from 'types/task';

// 获取事务 请求方法
export const useTask = (param?: Partial<Task>) => {
    const client = useHttp()
    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

// 新增事务
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

// 删除事务
export const useDeleteTask = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(({id}:{id:number}) => client(`tasks/${id}`, {
        method: 'DELETE'
    }), {
        onSuccess: () => queryClient.invalidateQueries('tasks')
    })
}

// 获取事务详情
export const useTaskDetail = (id?:number) => {
    const client = useHttp()
    return useQuery(['tasks', { id }], () => client(`tasks/${id}`), { enabled: Boolean(id) }) // enabled: true/false表示 id存在才发送请求
}

// 编辑事务
export const useEditTask = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Task>) => client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH'
    }), {
        onSuccess: () => queryClient.invalidateQueries('tasks')
    })
}