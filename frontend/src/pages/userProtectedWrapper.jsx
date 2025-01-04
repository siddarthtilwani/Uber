import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
const token=localStorage.getItem('token')
const {user,setUser}=useContext(UserDataContext)
const [Loading,setLoading]=useState(true)
const navigate=useNavigate()
useEffect(()=>{
    if(!token){
        navigate('/login')
        return;
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res=>{
        setUser(res.data)
        setLoading(false)

    })
    .catch(err=>{
        console.log(err)
        localStorage.removeItem('token')
        navigate('/login')
        })

},[token,navigate])
if(Loading){
    return <h1>Loading...</h1>
}
return(
    <>
    {children}</>
)
}

export default UserProtectedWrapper;