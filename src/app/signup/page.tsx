'use client'
import { useState } from "react"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { error } from "console";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import Navbar from "../components/Navbar";
const dotenv = require('dotenv');
dotenv.config();
const Signup = () => {
    const router = useRouter();
    const [username, SetUsername] = useState(null);
    const [password, SetPassword] = useState(null);
    const [firstname,Setfirstname] = useState(null);
    const [lastname,Setlastname] = useState(null);
    const [email,Setemail] = useState(null);
    const SignUpNow = async () => {
        try {
            // console.log(username)
            // console.log(password)
            // console.log(firstname)
            // console.log(lastname)
            await axios.post('http://localhost:5000/register/' + username + "/" + firstname + "/" + lastname + "/" + password+"/"+email).then((response)=> {
                // console.log(response.data["msg"])
                if (username == null || firstname == null || lastname == null || password == null || email == null) {
                    toast('registation failed please enter all information!')
                }
                if(response.data["msg"] == "404") {
                    console.log('data is incurrent')
                    toast('registation failed please try again!')
                }
                if(response.data["msg"] == "200") {
                    
                    toast('registation successful, please verify email in your mailbox')
                }

            }).catch((error:any)=> {
                // handle error
                // console.log('error');
            })
        } catch (error:any) {
            // console.log('server no response')
        }

    }
    const LoginNow = () => {
        router.push('/');
    }
    const GetUserData = (event: any) => {
        SetUsername(event.target.value);
        // console.log(username)
    }
    const GetPasswordData = (event: any) => {
        SetPassword(event.target.value);
        // console.log(password)
    }
    const GetFirstname = (event:any) =>
    {
        Setfirstname(event.target.value);
    }
    const GetLastname = (event:any) =>{
        Setlastname(event.target.value);
    }
    const GetEmail = (event:any) =>{
        Setemail(event.target.value);
    }
    console.log(process.env.PGSQL_URL)
    return (
        <>
        <Navbar/>
        <br /><br /><br />
            <div className="shadow-xl base-200"style={{ textAlign: "center",padding:"20px",maxWidth:"550px",marginLeft:"auto",marginRight:"auto",borderRadius:"20px"}}>
                <br />
            <div style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
                        Sign Up
                     
                    </div>
                    <br />
                <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" onChange={GetUserData} /><br /><br />
                <input type="text" placeholder="Firstname" className="input input-bordered w-full max-w-xs" onChange={GetFirstname} /><br /><br />
                <input type="text" placeholder="Lastname" className="input input-bordered w-full max-w-xs" onChange={GetLastname} /><br /><br />
                <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" onChange={GetEmail} /><br /><br />
                <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" onChange={GetPasswordData} /><br /><br />
                <button className="btn btn-warning" onClick={SignUpNow}>Sign Up</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-success" onClick={LoginNow}>Sign In</button>
            </div>
            <br />
            <br /><br />
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
export default Signup