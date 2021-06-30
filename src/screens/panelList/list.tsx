import React from "react"
import {User} from './searchPanel'

interface list{
    id:number,
    personId:number,
    name:string
}

interface listProps{
    list:list[],
    users:User[]
}

export const List = ({ list,users }:listProps) => {
    return (
        <table style={{margin:'0 auto'}}>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>

                {
                    list.map(item => <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{users.find(user=>user.id === item.personId)?.name}</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

