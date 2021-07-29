import { Input } from "antd"
import { useAddKanban } from "http/useKanBan"
import { useState } from "react"
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
        <Input placeholder={'请输入看板名称'} value={name} onPressEnter={submit} onChange={e=>setName(e.target.value)}></Input>
    </Container>
}