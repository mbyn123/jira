import React, { useState, useEffect } from "react"
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { cleanObject, useMount,useDebounce } from 'utils'
import qs from 'qs'



const api = process.env.REACT_APP_API_URL

export const PanelList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const debounceParam = useDebounce(param,1000)

    useMount(()=>{
        fetch(`${api}/user`).then(async res => {
            if (res.ok) {
                setUsers(await res.json())
            }
        })
    })

    useEffect(() => {
        fetch(`${api}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
            if (res.ok) {
                setList(await res.json())
            }
        })
    }, [debounceParam])

    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
            <List list={list} users={users}></List>
        </div>
    )
}

