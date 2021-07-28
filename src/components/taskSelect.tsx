import React from "react"
import { useTaskType } from "utils/useTaskType"
import { IdSelect } from "./idSelect"

export const TaskSelect = (props:React.ComponentProps<typeof IdSelect>)=>{
    const {data:taskTypes} = useTaskType()
    return (
        <IdSelect options={taskTypes || []} {...props}></IdSelect>
    )
}