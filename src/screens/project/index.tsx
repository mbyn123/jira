import { Link, } from "react-router-dom"
import { Navigate, Routes, Route } from 'react-router'
import { Epic } from "screens/epic"
import { Kanban } from "screens/kanban"


export const Project = () => {
    return (
        <div>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path='/kanban' element={<Kanban />} />
                <Route path='/epic' element={<Epic />} />
                <Navigate to={window.location.pathname + '/kanban'} replace></Navigate>
            </Routes>

        </div>
    )
}