// interface NavbarProps {
//     userdata: any; // You can replace 'any' with the actual type of userdata
//   }
import React, { useEffect, useState,useContext } from 'react';
import { DataUserContext } from './dataUser';
// export default function Navbar(props: any) {
    export default function Navbar() {
        const {ctx_username,ctx_firstname,ctx_lastname} = useContext(DataUserContext);
    const [hide, Sethide] = useState<number>(0);
    useEffect(() => {
        if (!ctx_username) {
            Sethide(1);
        } else if (ctx_username) {
            Sethide(0);
        }
    }, [])
    if (hide == 1) {
        return (
            <>
                <div className="navbar bg-base-300">
                    <a className="btn btn-ghost normal-case text-xl">Login System</a>

                </div>
            </>
        )
    }
    else if (hide == 0) {
        return (
            <>
                <div className="navbar bg-base-300">
                    <a className="btn btn-ghost normal-case text-xl">Login System</a>
                </div>
            </>
        )
    }
}
