import { Input, Select } from "antd"

export interface User{
    id:number,
    name:string,
    token:string
}

interface searchPanelProps {
   users: User[],
   param:{
       name:string,
       personId:string
   },
   setParam:(param:searchPanelProps['param'])=>void
}

export const SearchPanel = ({param,setParam,users}:searchPanelProps) => {
 
    return (
        <div>
            <Input type="text" value={param.name} onChange={(e) => setParam({
                ...param, name: e.target.value
            })} />
            <Select value={param.personId} onChange={(value) => setParam({
                ...param, personId:value
            })}>
                <Select.Option value={''} >负责人</Select.Option>
                {users.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
            </Select>
        </div>
    )



}

