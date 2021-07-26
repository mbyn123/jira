import React from "react"
import { useUsers } from "utils/useUsers"
import { IdSelect } from "./idSelect"

export const UserSelect = (props:React.ComponentProps<typeof IdSelect>)=>{
    const {data:user} = useUsers()
    return (
        <IdSelect options={user || []} {...props}></IdSelect>
    )
}