import { Task } from './../types/task';
import { useHttp } from './http';
import { useQuery } from "react-query";

// 获取任务 请求方法
export const useTask = (param?: Partial<Task>) => {
    const client = useHttp()
    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}