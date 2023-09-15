'use client'
import { createContext, useContext, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { DataUserContext } from './dataUser';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function EditprofileDialog() {
    const { ctx_username, ctx_firstname, ctx_lastname } = useContext(DataUserContext);
    const [UpdateFirstname, SetUpdateFirstname] = useState();
    const [UpdateLastname, SetUpdateLastname] = useState();
    const [VerifiyPassword, SetVerifyPassword] = useState();
    let [isOpen, setIsOpen] = useState(false)
    // console.log(firstname);
    // console.log(lastname);
    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }
    const valueFirstname = (event: any) => {
        SetUpdateFirstname(event.target.value)
    }
    const valueLastname = (event: any) => {
        SetUpdateLastname(event.target.value)
    }
    const NeedPassword = (event: any) => {
        SetVerifyPassword(event.target.value)
    }

    const changeData = async () => {
        if (UpdateFirstname == null || UpdateLastname == null) {
            toast('please enter firstname or lastname')
        }
        else if(VerifiyPassword == null){
            toast('please enter you password')
        }
        if (UpdateFirstname && UpdateLastname && VerifiyPassword != null) {
            try {
                // console.log(ctx_username);
                // console.log(UpdateFirstname);
                // console.log(UpdateLastname);
                // console.log(VerifiyPassword);
                await axios.put('http://localhost:5000/update2/' + ctx_username + "/" + UpdateFirstname + "/" + UpdateLastname + "/" + VerifiyPassword).then((response) => {
                //console.log(response)
                if(response.data['msg'] == "404")
                {
                    toast('password incurrent')
                }
             })
                toast("Save data successful");
            } catch (error) {
                toast("Can't save data")
            }
        }

    }

    return (
        <>
            <button className="btn btn-warning" onClick={openModal}>Edit Profile</button> &nbsp;&nbsp;
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="text-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Edit Profile
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">

                                            <input type="text" placeholder={ctx_firstname} className="input input-bordered w-full max-w-xs" onChange={valueFirstname} /> <br /><br />
                                            <input type="text" placeholder={ctx_lastname} className="input input-bordered w-full max-w-xs" onChange={valueLastname} /> <br /><br />
                                            <input type="password" placeholder="Enter you password" className="input input-bordered w-full max-w-xs" onChange={NeedPassword} /> <br /><br />


                                            {/* <input type="text" placeholder="password" className="input input-bordered w-full max-w-xs" /> <br /><br /> */}
                                            <button className="btn btn-warning w-full max-w-xs" onClick={changeData}>Save</button>

                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button className="btn btn-error w-full max-w-xs" onClick={closeModal}>Close</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
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