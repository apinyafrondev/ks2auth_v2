import { useRouter } from "next/navigation";
const Logout = () => {
    const LogoutBtn = () => {
        const router = useRouter();
        localStorage.removeItem("authkey");
        router.push('/')
    }
    return (

        <>
            <div>
                <button className="btn btn-secondary" onClick={LogoutBtn}>Logout</button>&nbsp;
            </div>
        </>
    )
}
export default Logout