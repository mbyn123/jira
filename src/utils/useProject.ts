import { useEffect } from "react"
import { Project } from "screens/projectlList/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"


export const useProject = (params:Partial<Project>) => {
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()
    const fetchProject = ()=>client('projects', { data: cleanObject(params) })
    useEffect(() => {
        run(fetchProject(),{
            retry: fetchProject  
        })
    },[params])

    return result
}


export const useEditProject = ()=>{
    const client = useHttp()
    const {run,...result} = useAsync()
    const mutate = (params:Partial<Project>)=>{
        return run(client(`projects/${params.id}`,{
            data:params,
            method:'PATCH'
        }))
    }
    return {
        mutate,
        ...result
    }
}