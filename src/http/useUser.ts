import { useQuery } from 'react-query';
import { User } from "types/user"
import { useHttp } from '../http/http';
// import { useAsync } from './useAsync';
// import { useEffect } from "react"
import { cleanObject } from "utils"

// 获取用户列表 请求方法
// export const useUsers = (param?: Partial<User>) => {
//     const { run, ...result } = useAsync<User[]>()
//     const client = useHttp()
//     useEffect(() => {
//         run(client('users', { data: cleanObject(param || {}) }))
//     }, [param, run, client])
//     return result
// }

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    return useQuery<User[]>(['users', param], () => client('users', { data: cleanObject(param || {}) }))
}