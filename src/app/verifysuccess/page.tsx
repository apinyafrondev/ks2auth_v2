'use client'
import Navbar from "../components/Navbar"
import { useRouter } from "next/navigation"
const VerifySuccess = () =>{
    const router = useRouter();
    const redirectToSignIn = () =>{
        router.push('/');
    }
    return(
        <>
        <Navbar/>
        <div className="text-center font-bold"style={{fontSize:"45px",color:"green"}}>Sign Up Complete</div>
        <div className="text-center">
            <button type="button" className="btn btn-success"onClick={redirectToSignIn}>Sign In Now</button>
        </div>
        </>
    )

}
export default VerifySuccess