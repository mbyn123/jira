import { PanelList } from "screens/panelList"
import { useAuth } from "context/auth-context"

export const Authenticatied = () => {
    const { logout } = useAuth()
    return (
        <div>
            <button onClick={() => logout}>退出</button>
            <PanelList />
        </div>
    )
}