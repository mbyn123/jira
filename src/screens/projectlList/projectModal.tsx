import { Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListActions, selectProjctModalOpen } from "../../store/projectListSlice"

export const ProjectModal = ()=>{
    const projectModalOpen = useSelector(selectProjctModalOpen)
    const dispatch = useDispatch()
    return (
        <Drawer width={'100%'} visible={projectModalOpen} onClose={()=>dispatch(projectListActions.closeProjectModal())}>
            <h1>11</h1>
        </Drawer>
    )
}