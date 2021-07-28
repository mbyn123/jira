import { Button, Input } from "antd"
import { Row } from "components/lib"
import { TaskSelect } from "components/taskSelect"
import { UserSelect } from "components/userSelect"
import { useUrlQueryParam } from "utils/url"
import { queryUrlKey, useTaskSearchParams } from "./util"


export const SearchPanel = () => {
    const searchParams = useTaskSearchParams()
    const [, setSearchParams] = useUrlQueryParam(queryUrlKey)
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            name: undefined,
            processorId: undefined,
            tagId: undefined
        })
    }

    return <Row marginBottom={2} gap={true}>
        <Input style={{ width: '20rem' }} placeholder={'任务名'} value={searchParams.name} onChange={e => setSearchParams({ name: e.target.value })}></Input>
        <UserSelect defaultOptionName={'经办人'} value={searchParams.processorId} onChange={value => setSearchParams({ processorId: value })}></UserSelect>
        <TaskSelect defaultOptionName={'类型'} value={searchParams.typeId} onChange={value => setSearchParams({ typeId: value })}></TaskSelect>
        <Button  onClick={()=>reset()}>清除筛选器</Button>
    </Row>
}