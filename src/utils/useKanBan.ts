import { useHttp } from './http';
import { useQuery } from "react-query";
import { Kanban } from "types/kanban";

// 获取看板列表 请求方法
export const useKanban = (param?: Partial<Kanban>) => {
    const client = useHttp()
    return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}   