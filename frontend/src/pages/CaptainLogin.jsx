import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setcaptain } from '../reducers/CaptainReducer';
const CaptainLogin = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [captainData,setcaptainData]=useState({})
    const navigate=useNavigate()
    const {captain,setcaptain}=useContext(CaptainDataContext)
    
const [capdata,setcapdata]=useState(null)
const dispatch=useDispatch()
// const captain=useSelector(state=>state.captain.captain)
useEffect(() => {
    if (captain) {
        console.log("Captain data updated:", captain);
        navigate('/captain-home');
    }
}, [captain,navigate]);

    const submhitHandler=async(e)=>{
        e.preventDefault()
        const captainData={email:email,password:password}
       const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData)
        if(response.status===200){
            console.log(response.data.captain)
            await setcaptain(response.data.captain)
    //    dispatch(setcaptain(response.data.captain))
            console.log(captain)

            localStorage.setItem('token',response.data.token)
            
        }
        console.log(response)
        setemail('')
        setpassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-20 mb-3 ' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
         <form onSubmit={(e)=>{submhitHandler(e)}} className='bg-white px-7 py-7 rounded'>

            <h3 className='text-lg font-medium mb-2'>
                What's your email
            </h3>
            <input 
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className='border px-4 py-2 bg-[#eeeeee] mb-7 w-full rounded text-lg placeholder:text-base' 
             placeholder='email@example.com'
             required />
            <h3 className='text-lg font-medium mb-2'>
                What's your password
            </h3>
            <input 
            type="password" 
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            className='border px-4 py-2 bg-[#eeeeee] mb-7 w-full rounded text-lg placeholder:text-base' 
            placeholder='password'
            required />
            <button className=' px-4 py-2 bg-[#111] text-white font-semibold mb-3 w-full rounded text-lg placeholder:text-base' > 
                Login
            </button>
         
            
         </form>
         <p className='text-center'>Join a fleet? <Link  to={'/captain-signup'} className='text-blue-600'>Register as a Captain</Link></p>
            </div>
            <div>
              <Link to={'/login'} className='flex items-center justify-center px-4 py-2 bg-[#d5622d] text-white font-semibold mb-5 w-full rounded text-lg placeholder:text-base' >
                Sign in as User
            </Link>
            </div>

        </div>);
};

export default CaptainLogin;