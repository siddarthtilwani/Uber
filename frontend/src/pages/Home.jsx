import React, { useRef, useState } from "react";
import {useGSAP} from "@gsap/react";
import  gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LooingForDriver";
import WaitForDrive from "../components/WaitForDrive";
import axios from 'axios'
const Home = () => {
    const [pickup,setpickup]=useState('')
    const [destination,setdestination]=useState('')
    const [pannelOpen,setpannelOpen]=useState(false)
    const [vehiclePannelOpen,setvehiclePannelOpen]=useState(false)
    const [ConfirmedRidePannel,setConfirmedRidePannel]=useState(false)
    const [VehicleFoundPannel,setVehicleFoundPannel]=useState(false)
    const [WaitForDrivePannel,setWaitForDrivePannel]=useState(false)
    const [fare,setfare]=useState({})
    const pannelRef=useRef(null)
    const pannelcloseref=useRef(null)
    const vehiclePannelRef=useRef(null)
    const ConfirmedRidePannelRef=useRef(null)
    const VehicleFoundPannelRef=useRef(null)
    const WaitForDriveRef=useRef(null)
    const [pickupsuggestions,setpickupsuggestions]=useState([])
    const [destinationsuggestions,setdestinationsuggestions]=useState([])
    const [activeField,setactiveField]=useState(null)
    const [vehicleType,setvehicleType]=useState(null)
    const submitHandler=(e)=>{
        e.preventDefault();
    }
    const handlePickupChange=async(e)=>{
        console.log(pickupsuggestions)
        setpickup(e.target.value)
        try{
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
                params:{
                    input:e.target.value
                    },
              
            
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response,'ji')
            setpickupsuggestions(response.data)
            console.log(pickupsuggestions)
        }
        catch(err){
            console.log(err)

        }
    }
    const handleDestinationChange=async(e)=>{
        setdestination(e.target.value)
        console.log(e.target.value)
        try{
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
                params:{
                    input:e.target.value,

                },
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            setdestinationsuggestions(response.data)
        }
        catch(err){console.log(err)

        }
    }

    useGSAP(()=>{
        if(pannelOpen){
            gsap.to(pannelRef.current,{
                height:"70%",
                padding:"24px"
            })
            gsap.to(pannelcloseref.current,{
                opacity:1
            })
        }
        else{
            gsap.to(pannelRef.current,{
                height:"0%",
                padding:"0px"
            })
            gsap.to(pannelcloseref.current,{
                opacity:0
            })
        }
    },[pannelOpen])
    useGSAP(()=>{
        if(vehiclePannelOpen){
        gsap.to(
            vehiclePannelRef.current,{
                transform:'translateY(0%)',
            }
        )
        
    }
else{
    gsap.to(
        vehiclePannelRef.current,{
            transform:'translateY(100%)',
        }

    )
}}
    ,[vehiclePannelOpen])


    useGSAP(()=>{
        if(ConfirmedRidePannel){
        gsap.to(
            ConfirmedRidePannelRef.current,{
                transform:'translateY(0%)',
            }
        )
        
    }
else{
    gsap.to(
        ConfirmedRidePannelRef.current,{
            transform:'translateY(100%)',
        }

    )
}}
    ,[ConfirmedRidePannel])


    useGSAP(()=>{
        if(VehicleFoundPannel){
        gsap.to(
            VehicleFoundPannelRef.current,{
                transform:'translateY(0%)',
            }
        )
        
    }
else{
    gsap.to(
        VehicleFoundPannelRef.current,{
            transform:'translateY(100%)',
        }

    )
}}
    ,[VehicleFoundPannel])


    useGSAP(()=>{
        if(WaitForDrivePannel){
            gsap.to(WaitForDriveRef.current,{
                transform:'translateY(0%)',
            })
        }
        else{
            gsap.to(WaitForDriveRef.current,{
                transform:'translateY(100%)',
                })
        }
    },[WaitForDrivePannel])
   async function findATrip (){    
        
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
            params:{
                pickup:pickup,
                destination:destination
            }
            ,
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    setfare(response.data)
        
        
        setvehiclePannelOpen(true)
                        setpannelOpen(false)
    }

    async function createRide() {
        console.log(localStorage.getItem('token'))
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`, 
                { 
                    pickup: pickup, 
                    destination: destination, 
                    vehicleType: vehicleType 
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        
    }
    return (
        <div  className="h-screen  relative overflow-hidden">
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className="h-screen w-screen">
                <img src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-end h-screen top-0 absolute w-full ">
               <div className="h-[32%] p-6 bg-white relative">
             <h5 ref={pannelcloseref} onClick={()=>{setpannelOpen(false)
            
            }
             } className="absolute  opacity-0 right-6 top-6 text-2xl">
             <i className="ri-arrow-down-wide-line"></i>
             </h5>
               <h4 className="font-semibold text-2xl">Find a trip</h4>

                <form onSubmit={(e)=>submitHandler(e)}>
                    <div className="line absolute  h-16 left-10  w-1 top-[45%] bg-gray-700 rounded-full"></div>
                    <input onClick={()=>{setpannelOpen(true);setactiveField('pickup')}} className="bg-[#eee] border px-12 py-2 text-base rounded-lg w-full mt-5" type="text" name="" id="" value={pickup} onChange={handlePickupChange} placeholder="Add a pickup location" />
                    <input onClick={()=>{setpannelOpen(true);setactiveField('destination')}} className="bg-[#eee] border px-12 py-2 text-base rounded-lg w-full mt-5" type="text" name="" id="" value={destination} onChange={handleDestinationChange} placeholder="Enter your Destination" />
                </form>
               <div className="bg-white">
               <button 
                onClick={findATrip}
                className="bg-black text-white w-full px-4 py-2 rounded-lg mt-3  ">
                    Find Trip
                </button>
               </div>
               </div>
               <div ref={pannelRef} className="h-[70%] bg-white mt-5">
                <LocationSearchPanel
                suggestions={activeField==='pickup'?pickupsuggestions:destinationsuggestions}
                setpickup={setpickup}
                activeField={activeField}
                setdestination={setdestination}
                setpannelOpen={setpannelOpen} setvehiclePannelOpen={setvehiclePannelOpen}/>
               </div>
            </div>
            <div ref={vehiclePannelRef} className="fixed z-10 w-full translate-y-full  bottom-0 px-3 py-10 bg-white pt-12">
                <VehiclePannel selectVehicle={setvehicleType} setConfirmedRidePannel={setConfirmedRidePannel} setvehiclePannelOpen={setvehiclePannelOpen} fare={fare}/>
           </div>
           <div ref={ConfirmedRidePannelRef} className="fixed z-10 w-full translate-y-full  bottom-0 px-3 py-2 bg-white pt-12">
               <ConfirmedRide createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFoundPannel={setVehicleFoundPannel} setConfirmedRidePannel={setConfirmedRidePannel}/>
           </div>
           <div ref={VehicleFoundPannelRef}  className="fixed z-10 w-full translate-y-full  bottom-0 px-3 py-6 bg-white pt-12">
               <LookingForDriver createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFoundPannel={setVehicleFoundPannel}/>
           </div>
           <div ref={WaitForDriveRef} className="fixed z-10 w-full  bottom-0 px-3 py-6 bg-white pt-12">
               <WaitForDrive setWaitForDrivePannel={setWaitForDrivePannel}/>
           </div>
        </div>
    );
}

export default Home;