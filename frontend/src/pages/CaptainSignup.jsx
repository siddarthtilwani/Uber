import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
const CaptainSignup = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [Firstname,setFirstname]=useState('')
    const [Lastname,setLastname]=useState('')
    const [vehicleColor,setvehicleColor]=useState('')
    const [vehicleNumber,setvehicleNumber]=useState('')
    const [vehicleCapacity,setvehicleCapacity]=useState('')
    const [vehicleType,setvehicleType]=useState('')

    const [userData,setUserData]=useState({})

    const {captain,setcaptain}=useContext(CaptainDataContext)
    const navigate=useNavigate()
    const submhitHandler=async(e)=>{
        e.preventDefault()
        const captainData={
            fullname:{
                firstname:Firstname,
                lastname:Lastname,
            },
            email:email,password:password,
        vehicle:{
            color:vehicleColor,
            number:vehicleNumber,
            capacity:vehicleCapacity,
            vehicleType:vehicleType

        }}
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
        if(response.status===201){
            setcaptain(response.data.captain)
            localStorage.setItem('token',response.data.token)
            navigate('/captain-home')
        }
        console.log(response.data)
        setemail('')
        setFirstname('')
        setLastname('')

        setpassword('')
        setvehicleColor('')
        setvehicleNumber('')
        setvehicleCapacity('')
        setvehicleType('')
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
             <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setvehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehicleNumber}
              onChange={(e) => {
                setvehicleNumber(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setvehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setvehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">car</option>
              <option value="auto">auto</option>
              <option value="motorcycle">motorcycle</option>
            </select>
          </div>
            <button className=' px-4 py-2 bg-[#111] text-white font-semibold mb-3 w-full rounded text-lg placeholder:text-base' > 
                Create Captain Account
            </button>
         
            
         </form>
         <p className='text-center'>Already have a account? <Link  to={'/captain-login'} className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
              <p className='text-[10px] leading-tight mt-8' >
               This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>  </p>
            </div>

        </div>
    );
};

export default CaptainSignup;