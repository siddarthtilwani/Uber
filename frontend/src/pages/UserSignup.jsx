import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
const UserSignup = () => {
    
        const [email,setemail]=useState('')
        const [password,setpassword]=useState('')
        const [firstname,setFirstname]=useState('')
        const [lastname,setLastname]=useState('')

        const [userData,setUserData]=useState({})
        const {user,setUser}=useContext(UserDataContext)
    const navigate=useNavigate()
        const submhitHandler=async(e)=>{
            e.preventDefault()
            const newUser={
                fullname:{
                    firstname:firstname,
                    lastname:lastname,
                },
                email:email,password:password}
                const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
                if(response.status===201){
                    setUser(response.data)
                    
            localStorage.setItem('token',response.data.token)
                    navigate('/home')
                }
            console.log(response.data)
            setemail('')
            setFirstname('')
            setLastname('')

            setpassword('')
        }
        return (
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
             <form onSubmit={(e)=>{submhitHandler(e)}} className='bg-white px-7 py-7 rounded'>
    <h3 className='text-lg font-medium mb-2'>What's your name</h3>
    <div className='flex gap-4 mb-6'>
    <input 
                type="text"
                
                className='border px-4 py-2 w-1/2 bg-[#eeeeee]   rounded text-lg placeholder:text-base' 
                 placeholder='Firstname'
                 value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                 required />
                  <input 
                type="text"
                
                className='border px-4 py-2 w-1/2 bg-[#eeeeee]   rounded text-lg placeholder:text-base' 
                 placeholder='Lastname'
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                 required />
    </div>
                <h3 className='text-lg font-medium mb-2'>
                    What's your email
                </h3>
                <input 
                type="email"
                
                className='border px-4 py-2 bg-[#eeeeee] mb-6 w-full rounded text-lg placeholder:text-base' 
                 placeholder='email@example.com'
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                 required />
                <h3 className='text-lg font-medium mb-2'>
                    What's your password
                </h3>
                <input 
                type="password" 
               
                className='border px-4 py-2 bg-[#eeeeee] mb-6 w-full rounded text-lg placeholder:text-base' 
                placeholder='password'
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                required />
                <button className=' px-4 py-2 bg-[#111] text-white font-semibold mb-3 w-full rounded text-lg placeholder:text-base' > 
                    Create Account
                </button>
             
                
             </form>
             <p className='text-center'>Already have a account? <Link  to={'/login'} className='text-blue-600'>Login here</Link></p>
                </div>
                <div>
                  <p className='text-[10px] leading-tight'>
                
                  This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>     </p>
                </div>
    
            </div>
    );
};

export default UserSignup;