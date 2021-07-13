import { useState } from "react"
import { SearchPanel } from './searchPanel'
// import { List, Project } from './list'
// import { cleanObject, useMount, useDebounce } from 'utils'
import { List } from './list'
import {useDebounce} from 'utils'
// 第一二种
// import { useHttp } from 'utils/http'
import styled from "@emotion/styled"
import { Typography } from "antd"
// 第二种
// import { useAsync } from "utils/useAsync"
import { useProject } from "utils/useProject"
import { useUsers } from "utils/useUsers"

export const PanelList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 1000)
    const { data: list, error, isLoading } = useProject(debounceParam)
    const { data: users } = useUsers()

    // 第一种
    // const [users, setUsers] = useState([])
    // const [list, setList] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState<null | Error>(null)
    // const client = useHttp() 

    // 第二种
    // const {run,data:list,error,isLoading} = useAsync<Project[]>()

    // useEffect(() => {
    // 第二种
    // run(client('projects', { data: cleanObject(debounceParam) }))

    // 第一种
    // setIsLoading(true)
    // client('projects', { data: cleanObject(debounceParam) })
    //     .then(setList)
    //     .catch(error => { 
    //         setError(error) 
    //         setList([]) 
    //     })
    //     .finally(() => setIsLoading(false))
    // }, [debounceParam])

    // 第一种
    // useMount(()=>{
    //     client('users',{data:cleanObject(param)}).then(setUsers)
    // })



    return (
        <Container>
            <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <List dataSource={list || []} loading={isLoading} users={users || []}></List>
        </Container>
    )
}

const Container = styled.div`
padding: 3.2rem;
`
