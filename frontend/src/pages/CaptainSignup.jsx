import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const CaptainSignup = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [Firstname,setFirstname]=useState('')
    const [Lastname,setLastname]=useState('')

    const [userData,setUserData]=useState({})

    const submhitHandler=(e)=>{
        e.preventDefault()
        setUserData({
            fullName:{
                Firstname:Firstname,
                Lastname:Lastname,
            },
            email:email,password:password})
        console.log(userData)
        setemail('')
        setFirstname('')
        setLastname('')

        setpassword('')
    }
    return (
        <div className='py-5 px-5  h-screen flex flex-col justify-between'>
            <div>
            <img className='w-20 mb-3 ' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
         <form onSubmit={(e)=>{submhitHandler(e)}} className='bg-white px-7 py-7 rounded'>
<h3 className='text-lg font-medium mb-2 w-full'>What's our Captain's name</h3>
<div className='flex gap-4 mb-6'>
<input 
            type="text"
            
            className='border px-4 py-2 w-1/2 bg-[#eeeeee]   rounded text-lg placeholder:text-base' 
             placeholder='Firstname'
             value={Firstname}
                onChange={(e)=>setFirstname(e.target.value)}
             required />
              <input 
            type="text"
            
            className='border px-4 py-2 w-1/2 bg-[#eeeeee]   rounded text-lg placeholder:text-base' 
             placeholder='Lastname'
                value={Lastname}
                onChange={(e)=>setLastname(e.target.value)}
             required />
</div>
            <h3 className='text-lg font-medium mb-2'>
                What's our Captain's email
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
                Login
            </button>
         
            
         </form>
         <p className='text-center'>Already have a account? <Link  to={'/captain-login'} className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
              <p className='text-[10px] leading-tight'>
               This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>  </p>
            </div>

        </div>
    );
};

export default CaptainSignup;