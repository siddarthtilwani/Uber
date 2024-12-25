import React, { Children, useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";


const CaptainProtectedWrapper=({children})=>{
    const token=localStorage.getItem('token')
    const {captain,setcaptain}=useContext(CaptainDataContext)
    const [isloading,setisloading]=useState(true)


    const navigate=useNavigate()
    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
            
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
         if(res.status===200) {  setcaptain(res.data.captain)
            setisloading(false)
          }
        })
        .catch(err=>{
            console.log(err)
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    },[token,navigate])

    
    if(isloading){
        return <h1>Loading...</h1>
    }

    return(
        <>
        {children}</>
    )
}

export default CaptainProtectedWrapper;