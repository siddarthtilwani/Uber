import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
const UserLogin = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [userData,setUserData]=useState({})
    const {user,setUser}=useContext(UserDataContext)
    const navigate=useNavigate()

    const submhitHandler=async(e)=>{
        e.preventDefault()
        const userData={email:email,password:password}
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
        if(response.status===200){
            setUser(response.data)
            localStorage.setItem('token',response.data.token)
            navigate('/home')
        }
        console.log(response)
        setemail('')
        setpassword('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
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
         <p className='text-center'>New here? <Link  to={'/signup'} className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div>
              <Link to={'/captain-login'} className='flex items-center justify-center px-4 py-2 bg-[#10b461] text-white font-semibold mb-5 w-full rounded text-lg placeholder:text-base' >
                Sign in as Captain
            </Link>
            </div>

        </div>
    );
};

export default UserLogin;