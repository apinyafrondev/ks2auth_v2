'use client'
import React from 'react';
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useState, Fragment, useEffect, useContext } from "react";
import axios from 'axios';
import { DataUserContext } from '../components/dataUser';
import EditprofileDialog from '../components/EditProfile';
import { Dialog, Transition } from '@headlessui/react'
export default function Dashboard() {
    const [username, Setusername] = useState('');
    const [firstname, Setfirstname] = useState('');
    const [lastname, Setlastname] = useState('');
    const [stateloadcomponents, Setstateloadcomponents] = useState<String>('');
    const router = useRouter();
    const UserContextData = useContext(DataUserContext);
    // modal ele

    const Loadcomponents = (state: any) => {

        if (stateloadcomponents == 'load') {
            return (

                <DataUserContext.Provider value={{ ctx_username: username, ctx_firstname: firstname, ctx_lastname: lastname }}>

                    <Navbar />
                    <br />
                    <div style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
                        Welcome to Dashbaord
                    </div>
                    <br /><br />
                    <button className='btn btn-error' onClick={LogoutBtn}>Logout</button>&nbsp;
                    <EditprofileDialog />&nbsp;
                    {/* <button className="btn btn-error">deactivate account</button>&nbsp; */}
                    {/* <button className="btn btn-info" onClick={GetAuthkey}>Key info</button> */}

                    <div className="overflow-x-auto">
                        <table className="table" style={{ maxWidth: "1200px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
                            {/* head */}
                            <thead>
                                <tr style={{ fontSize: "15px" }}>
                                    <th>Username</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    {/* <th>Option</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <td>{username}</td>
                                    <td>{firstname}</td>
                                    <td>{lastname}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    {/* <EditProfile /> */}
                </DataUserContext.Provider>
            )
        }
        else {
            return (
                <>
                </>
            )
        }

    }
    useEffect(() => {
        axios.get("http://localhost:5000/checktoken/" + localStorage.getItem("authkey")).then(function (response) {
            // console.log(response.data)
            Setusername(response.data['username'])
            Setfirstname(response.data['firstname'])
            Setlastname(response.data['lastname'])
            if (response.data["msg"] == "404") {
                Setstateloadcomponents('unload');
                router.push('/')
            }
            else {
                // console.log("welcome to ")
                Setstateloadcomponents('load');
            }

        })
    })
    const LogoutBtn = () => {
        localStorage.removeItem("authkey");
        router.push('/')
    }
    const GotoEditProfile = () => {
        router.push('/editprofile');
    }
    return (
        <Loadcomponents state={stateloadcomponents} />
    )
}
