import { PanelList } from "screens/projectlList"
import { Project } from 'screens/project'
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import { ButtonNoPadding, Row } from "components/lib"
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from "react-router-dom"
import { resetRoute } from "utils"
import { ProjectModal } from "screens/projectlList/projectModal"
import { ProjectPopover } from "components/projectPopover"

export const Authenticatied = () => {
    return (
        <Container>
            <Router>
                <PageHeader />
                <Main>
                    <Routes>
                        <Route path={'/projects'} element={<PanelList />} />
                        <Route path={'/projects/:projectId/*'} element={<Project />} />
                        {/* 默认路由 */}
                        <Navigate to={'/projects'}></Navigate>
                    </Routes>

                </Main>
                <ProjectModal></ProjectModal>
            </Router>
        </Container>
    )
}

const PageHeader = () => {
    const { logout, user } = useAuth()
    return (
        <Header between>
            <HeaderLeft gap>
                <ButtonNoPadding type={'link'} fontSize={2} onClick={resetRoute}>Jira</ButtonNoPadding>
                <ProjectPopover></ProjectPopover>
                <ButtonNoPadding type={'link'}>用户</ButtonNoPadding>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'} onClick={() => logout()}>退出</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button type={'link'}>{user?.name}</Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr; // 行高
grid-template-columns: auto; // 列高
grid-template-areas: 
'header header header'
'main  main  main';
height: 100vh;
`

const Header = styled(Row)`
grid-area: header;
padding: 3.2rem;
box-shadow: 0 0 5px rgba(0,0,0,0.1);
`
const Main = styled.main`
grid-area: main;
`

const HeaderLeft = styled(Row)`

`
const HeaderRight = styled.div`

`


// grid布局
// export const Authenticatied = () => {
//     const { logout } = useAuth()
//     return (
//         <Container>
//             <Header>
//                 <button onClick={() => logout()}>退出</button>
//             </Header>
//             <Aside>aside</Aside>
//             <Main> <PanelList /></Main>
//             <Nav>nav</Nav>
//             <Footer>footer</Footer>
//         </Container>
//     )
// }

// const Container = styled.div`
// display: grid;
// grid-template-rows: 6rem 1fr 6rem;
// grid-template-columns: 20rem 1fr 20rem;
// grid-template-areas: 
// 'header header header'
// 'aside  main  nav'
// 'footer footer footer';
// height: 100vh;
// border:1px solid red;
// `

// const Header = styled.header`
// grid-area: header;
// border:1px solid red;
// `
// const Main = styled.main`
// grid-area: main;
// `

// const Aside = styled.aside`
// grid-area: aside;
// border:1px solid red;
// `

// const Nav = styled.nav`
// grid-area: nav;
// border:1px solid red;
// `

// const Footer = styled.footer`
// grid-area: footer;
// border:1px solid red;
// `