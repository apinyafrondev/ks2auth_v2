import { useState } from "react"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { error } from "console";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
export function Login() {
    const router = useRouter();
    const [username, SetUsername] = useState(null);
    const [password, SetPassword] = useState(null);
    const [authtoken, Setauthtoken] = useState(null);
    const sendLoginData = () => {
        // console.log("send login data")
        // console.log(username)
        // console.log(password)
        AuthUser();
    }
    const AuthUser = async () => {
        try {
            await axios.get('http://localhost:5000/auth/' + username + "/" + password).then(function (response) {
                // console.log(response.data["msg"])
                if (username || password == null) {

                }
                if (response.data["msg"] == "404") {
                    console.log('data is incurrent')
                    toast('authentication failed please try again!')
                }
                else {
                    localStorage.setItem("authkey", response.data["msg"])
                    router.push('/dashboard');
                }

            }).catch(function (error) {
                // handle error
                console.log('error');
            })
        } catch (error) {
            console.log('server no response')
        }

    }
    const SignUpNow = () =>{
        router.push('/signup');
    }
    const GetUserData = (event: any) => {
        SetUsername(event.target.value);
        // console.log(username)
    }
    const GetPasswordData = (event: any) => {
        SetPassword(event.target.value);
        // console.log(password)
    }
    return (
        <>
        <br /><br /><br />
            <div className="shadow-xl base-200"style={{ textAlign: "center",padding:"20px",maxWidth:"550px",marginLeft:"auto",marginRight:"auto",borderRadius:"20px"}}>
                <br />
            <div style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
                        Login Page
                    </div>
                    <br />
                <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" onChange={GetUserData} /><br /><br />
                <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" onChange={GetPasswordData} /><br /><br />
                <button className="btn btn-success" onClick={AuthUser}>Sign In</button> &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-warning" onClick={SignUpNow}>Sign up</button>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}