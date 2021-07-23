import { RootState } from 'store/index';
import { createSlice } from "@reduxjs/toolkit"

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name:'projectListSlice',
    initialState,
    reducers:{
        openProjectModal(state){
            state.projectModalOpen = true
        },
        closeProjectModal(state){
            state.projectModalOpen = false
        }
    }
})

// 导出当前reduex中的定义的方法
export const projectListActions = projectListSlice.actions

// 导出当前state中的数据
export const selectProjctModalOpen = (state:RootState)=> state.projectList.projectModalOpen