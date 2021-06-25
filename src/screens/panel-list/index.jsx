import React,{useState,useEffect} from "react"
import {SearchPanel} from './searchPanel'
import {List} from './list'

const api = process.env.REACT_APP_API_URL
console.log(1111,api)
export const PanelList = ()=>{
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list,setList] = useState([])

    useEffect(() => {
      fetch(`${api}/user?name=${param.name}`).then(async res=>{
          if(res.ok){
            setUsers(await res.json())
          }
      })
    }, [param])
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
            <List list={list} users={users}></List>
        </div>
    )
}

