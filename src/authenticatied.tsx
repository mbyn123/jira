import { PanelList } from "screens/panelList"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import { Row } from "components/lib"


export const Authenticatied = () => {
    const { logout,user } = useAuth()
    return (
        <Container>
            <Header between>
                <HeaderLeft gap>
                    <h2>Logo</h2>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={<Menu>
                        <Menu.Item>
                            <a onClick={() => logout()}>退出</a>
                        </Menu.Item>
                    </Menu>}>
                        <a onClick={e=>e.preventDefault}>{user?.name}</a>  
                    </Dropdown>
                  
                </HeaderRight>
            </Header>
            <Main> <PanelList /></Main>
        </Container>
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