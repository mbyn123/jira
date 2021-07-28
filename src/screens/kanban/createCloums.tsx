import { Input } from "antd"
import { useState } from "react"
import { useAddKanban } from "utils/useKanBan"
import { Container } from "./kanbanCloums"
import { useProjectIdInUrl } from "./util"

export const CreateColums = ()=>{
    const [name,setName] = useState('')
    const projectId = useProjectIdInUrl()
    const {mutateAsync} = useAddKanban()
    
    const submit = async ()=>{
        await mutateAsync({name,projectId})
        setName('')
    }
    
    return <Container>
        <Input value={name} onPressEnter={submit} onChange={e=>setName(e.target.value)}></Input>
    </Container>
}