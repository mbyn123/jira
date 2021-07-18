import { User } from 'screens/projectlList/searchPanel';
import { useHttp } from './http';
import { useAsync } from './useAsync';
import { useEffect } from "react"
import { cleanObject } from "utils"

// 获取用户列表 请求方法
export const useUsers = (param?:Partial<User>)=>{
    const {run,...result} = useAsync<User[]>()
    const client = useHttp()
    useEffect(()=>{
        run(client('users',{data:cleanObject(param || {})}))
    },[param,run,client])
    return result
}