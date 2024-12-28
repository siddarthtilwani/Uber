import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding=()=>{
    const [FinsihRidePopupPannel,setFinsihRidePopupPannel]=useState(false)
    const FinsihRidePopupPannelRef=useRef(null)

    useGSAP(()=>{
        if(FinsihRidePopupPannel){
            gsap.to(FinsihRidePopupPannelRef.current,{
                transform:"translateY(0%)"
            })
        }
        else{
            gsap.to(FinsihRidePopupPannelRef.current,{
                transform:"translateY(100%)"
                })
        }
    },[FinsihRidePopupPannel])
return(
    <div className="h-screen">
          
    <div className="fixed p-6  top-0 flex items-center justify-between w-screen">
        <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link   to={'/captain-login'} className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
    </div>
    <div className="h-4/5">
    <img src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif" alt="" className="h-full w-full object-cover" />
    </div>
    
    <div className="h-1/5 p-6 flex relative items-center justify-between bg-yellow-400" onClick={()=>{
        setFinsihRidePopupPannel(true)
    }}>
    <h5 onClick={() =>{} } className="absolute text-center w-[90%] p-1 top-0">  <i className="text-3xl text-gray-200 ri-arrow-up-wide-line"></i></h5>
    <h4 className="text-xl font-semibold">4Km Away</h4>
    <button className="w-full mt-1 bg-green-600 text-white font-semibold p-3 rounded-lg">
        Complete Ride

    </button>

    </div>
    <div ref={FinsihRidePopupPannelRef} className="fixed  z-10 w-full translate-y-full  bottom-0 px-3 py-10 bg-white pt-12">
               <FinishRide setFinsihRidePopupPannel={setFinsihRidePopupPannel}/>
            </div>

</div>
)
}

export default CaptainRiding;