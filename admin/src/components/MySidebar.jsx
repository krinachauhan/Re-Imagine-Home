import { Sidebar } from "flowbite-react";
import { HiLogout, HiChartPie, HiUser } from "react-icons/hi";
import { TbHistory } from "react-icons/tb"
import { VscOpenPreview } from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../context/authSlice";

const MySidebar = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const Logout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <Sidebar aria-label="Sidebar with content separator example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item as={Link} to='/' icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="feedback" icon={VscOpenPreview}>
                        Feedback
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to="history" icon={TbHistory }>
                        History
                    </Sidebar.Item>
                    <Sidebar.Item as={Link} to='user' icon={HiUser}>
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item onClick={Logout} icon={HiLogout}>
                        Log Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default MySidebar
