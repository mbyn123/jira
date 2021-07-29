import { useTaskType } from "http/useTaskType"
import React from "react"
import { IdSelect } from "./idSelect"

export const TaskSelect = (props:React.ComponentProps<typeof IdSelect>)=>{
    const {data:taskTypes} = useTaskType()
    return (
        <IdSelect options={taskTypes || []} {...props}></IdSelect>
    )
}