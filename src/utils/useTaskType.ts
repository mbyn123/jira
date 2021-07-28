import { useQuery } from "react-query"
import { TaskType } from "types/taskType"
import { useHttp } from "./http"

// 获取任务状态
export const useTaskType = () => {
    const client = useHttp()
    return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}