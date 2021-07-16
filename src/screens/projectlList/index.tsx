// import { useState } from "react"
import { SearchPanel } from './searchPanel'
// import { List, Project } from './list'
// import { cleanObject, useMount, useDebounce } from 'utils'
import { List } from './list'
import { useDebounce, useDocumentTitle } from 'utils'
// 第一二种
// import { useHttp } from 'utils/http'
import styled from "@emotion/styled"
import { Typography } from "antd"
// 第二种
// import { useAsync } from "utils/useAsync"
import { useProject } from "utils/useProject"
import { useUsers } from "utils/useUsers"
// import { useUrlQueryParam } from "utils/url"
import { useProjrctParams } from "./util"

export const PanelList = () => {
    // const [param,setParam] = useState({
    //     name: '',
    //     personId: ''
    // })
    // 基本数据类型(字符串 等),组件状态(useState)可以放在依赖里；非组件转态的对象，不可以放在对象中否则会引起无限循环渲染
    // const [param,setParam] = useUrlQueryParam(['name','personId'])
    // const peojrctParam = {...param,personId:Number(param.personId)}
    // const debounceParam = useDebounce(peojrctParam, 1000)
    const [param, setParam] = useProjrctParams()
    const { data: list, error, isLoading, retry } = useProject(useDebounce(param, 1000))
    const { data: users } = useUsers()
    useDocumentTitle('项目列表', false)
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
            <List refresh={retry} dataSource={list || []} loading={isLoading} users={users || []}></List>
        </Container>
    )
}

const Container = styled.div`
padding: 3.2rem;
`
