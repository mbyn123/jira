import { useEffect } from "react"
import { Project } from "screens/projectlList/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"


export const useProject = (params:Partial<Project>) => {
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()
    useEffect(() => {
        run(client('projects', { data: cleanObject(params) }))
    },[params])

    return result
}


