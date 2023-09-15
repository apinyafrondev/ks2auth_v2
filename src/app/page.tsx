"use client"
import Image from 'next/image'
import {Login} from './components/Login'
import Navbar from './components/Navbar' 
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <>
   <Navbar/>
    <Login/>
    </>


  )
}
