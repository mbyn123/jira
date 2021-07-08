import { useState, useEffect } from "react"
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { cleanObject, useMount,useDebounce } from 'utils'
import {useHttp} from 'utils/http'
import styled from "@emotion/styled"

export const PanelList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const debounceParam = useDebounce(param,1000)
    const client = useHttp()

    useMount(()=>{
        client('users').then(setUsers)
    })

    useEffect(() => {
        client('projects',{data:cleanObject(debounceParam)}).then(setList)
    }, [debounceParam])


    return (
        <Container>
            <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
            <List list={list} users={users}></List>
        </Container>
    )
}

const Container = styled.div`
padding: 3.2rem;
`
