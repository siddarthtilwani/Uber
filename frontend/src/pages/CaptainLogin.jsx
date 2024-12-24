import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const CaptainLogin = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [captainData,setcaptainData]=useState({})

    const submhitHandler=(e)=>{
        e.preventDefault()
        setcaptainData({email:email,password:password})
        console.log(userData)
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