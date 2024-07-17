import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../context/authSlice";
import { admin } from "../services/auth";

const Login = () => {

    const [emailID, setEmailID] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const AdminLogin = async () => {
        const user = await admin.login({emailID, password})
        dispatch(login(user))
    }

    return (
        <div>
            <form className="w-1/3 m-auto my-40 border-2 rounded">
                <div className="max-w-md m-auto my-2">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput 
                        id="email" 
                        type="email" 
                        icon={HiMail} 
                        placeholder="demo@demo.com" 
                        required 
                        value={emailID}
                        onChange={(e) => setEmailID(e.target.value)}
                    />
                </div>
                <div className="max-w-md m-auto my-2">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput 
                        id="password" 
                        type="password" 
                        icon={TbPasswordUser} 
                        placeholder="* * * * * *" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="max-w-md m-auto my-2">
                    <Button color="gray" pill className="my-4 w-full" onClick={AdminLogin}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
