import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { useCallback, useEffect } from "react"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "../http/http"
// import { useAsync } from "./useAsync"


// 使用react-query代替useAsync管理异步请求
// 获取项目列表
export const useProject = (params?: Partial<Project>) => {
    const client = useHttp()
    return useQuery<Project[]>(['projects', params], () => client('projects', { data: cleanObject(params || {}) }))
    // <Project[],Error> 指定返回值得数据类型和错误类型
    // return useQuery<Project[],Error>(['projects',params],()=>client('projects', { data: cleanObject(params || {}) })) 
}

// 编辑项目
export const useEditProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
    }), {
        onSuccess: () => queryClient.invalidateQueries('projects')
    })
}

// 新增项目
export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation((params: Partial<Project>) => client(`projects`, {
        data: params,
        method: 'POST'
    }), {
        onSuccess: () => queryClient.invalidateQueries('projects')
    })
}

// 获取项目详情
export const useProjectDetail = (id?:number) => {
    const client = useHttp()
    return useQuery(['project', { id }], () => client(`projects/${id}`), { enabled: Boolean(id) }) // enabled: true/false表示 id存在才发送请求
}



// 使用useAsync管理异步请求
// export const useProject = (params?:Partial<Project>) => {
//     const client = useHttp()
//     const {run,...result} = useAsync<Project[]>()
//     const fetchProject = useCallback(()=>client('projects', { data: cleanObject(params || {}) }),[client,params])
//     useEffect(() => {
//         run(fetchProject(),{
//             retry: fetchProject  
//         })
//     },[params,fetchProject,run])

//     return result
// }


// export const useEditProject = ()=>{
//     const client = useHttp()
//     const {run,...result} = useAsync()
//     const mutate = (params:Partial<Project>)=>{
//         return run(client(`projects/${params.id}`,{
//             data:params,
//             method:'PATCH'
//         }))
//     }
//     return {
//         mutate,
//         ...result
//     }
// }