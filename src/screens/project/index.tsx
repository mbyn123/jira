import { Link, } from "react-router-dom"
import { Navigate, Routes, Route, useLocation } from 'react-router'
import { Epic } from "screens/epic"
import { Kanban } from "screens/kanban"
import styled from "@emotion/styled"
import { Menu } from "antd"


export const Project = () => {
    const useRouteType = () => {
        const units = useLocation().pathname.split('/')
        return units[units.length - 1]
    }
    const selectedKeys = useRouteType()
    return (
        <Container>
            <Aside>
                <Menu selectedKeys={[selectedKeys]}>
                    <Menu.Item key={'kanban'}>
                        <Link to={'kanban'}>看板</Link>
                    </Menu.Item>
                    <Menu.Item key={'epic'}>
                        <Link to={'epic'}>任务组</Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    <Route path='/kanban' element={<Kanban />} />
                    <Route path='/epic' element={<Epic />} />
                    <Navigate to={window.location.pathname + '/kanban'} replace></Navigate>
                </Routes>
            </Main>
        </Container>
    )
}

const Container = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-columns: 16rem 1fr;
overflow: hidden;
`

const Aside = styled.aside`
/* background-color: rgb(244,245,247); */
`
const Main = styled.div`
box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
overflow: hidden;
`
