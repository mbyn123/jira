import { Input } from "antd"
import { useAddTask } from "http/useTask"
import { useEffect, useState } from "react"
import { useProjectIdInUrl } from "./util"

export const CreateTask = ({ kanbanId }: { kanbanId?: number }) => {
    const [name, setName] = useState('')
    const projectId = useProjectIdInUrl()
    const { mutateAsync } = useAddTask()
    const [inputMode, setInputMode] = useState(false)

    const submit = async () => {
        await mutateAsync({ name, projectId, kanbanId })
        setName('')
        setInputMode(false)
    }

    const toggle = () => setInputMode(!inputMode)

    useEffect(() => {
        if (!inputMode) {
            setName('')
        }
    }, [inputMode]);

    if (!inputMode) {
        return <div onClick={toggle} style={{cursor:'pointer'}}>+创建事务</div>
    }

    return <Input onBlur={toggle} autoFocus={true} onPressEnter={submit} value={name} onChange={e => setName(e.target.value)}></Input>

}