import { PanelList } from "screens/panelList"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Button } from "antd"


export const Authenticatied = () => {
    const { logout } = useAuth()
    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <h3>Logo</h3>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                    <Button onClick={() => logout()}>退出</Button>
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

const Header = styled.header`
grid-area: header;
display: flex;
align-items: center;
justify-content: space-between;
border:1px solid red;
`
const Main = styled.main`
grid-area: main;
`

const HeaderLeft = styled.div`
display: flex;
align-items: center;
`
const HeaderRight = styled.div`

`


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