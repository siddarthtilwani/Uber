import React, { useContext, useRef, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import  gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";

const CaptainHome = () => {
    const [RidePopupPannel,setRidePopupPannel]=useState(true)
    const RidePopupPannelRef=useRef(null)
    const [ConfirmRidePopupPannel,setConfirmRidePopupPannel]=useState(false)
    const ConfirmRidePopupPannelRef=useRef(null)
const { captain }=useContext(CaptainDataContext)
// const captain=useSelector(state=>state)

const {sendMessage,recieveMessage}=useContext(SocketContext)
useEffect(()=>{
    console.log(captain)
    sendMessage('join',{userId:captain._id,userType:'captain'})

},[])
useEffect(()=>{
    
    console.log(captain)
},[captain])
    useGSAP(()=>{
        if(RidePopupPannel){
            gsap.to(RidePopupPannelRef.current,{
                transform:"translateY(0%)"
            })
        }
        else{
            gsap.to(RidePopupPannelRef.current,{
                transform:"translateY(100%)"
            })
        }
    },[RidePopupPannel])
    useGSAP(()=>{
        if(ConfirmRidePopupPannel){
            gsap.to(ConfirmRidePopupPannelRef.current,{
                transform:"translateY(0%)"
            })
        }
        else{
            gsap.to(ConfirmRidePopupPannelRef.current,{
                transform:"translateY(100%)"
            })
        }
    },[ConfirmRidePopupPannel])
    return (
        <div className="h-screen">
            <div className="fixed p-6  top-0 flex items-center justify-between w-screen">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to={'/captain-login'} className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
            </div>
            <div className="h-3/5">
            <img src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="p-6 h-2/5">
               <CaptainDetails/>
            </div>
            <div ref={RidePopupPannelRef} className="fixed z-10 w-full translate-y-full  bottom-0 px-3 py-10 bg-white pt-12">
                <RidePopup setConfirmRidePopupPannel={setConfirmRidePopupPannel} setRidePopupPannel={setRidePopupPannel}/>
            </div>
            <div ref={ConfirmRidePopupPannelRef} className="fixed h-screen z-10 w-full translate-y-full  bottom-0 px-3 py-10 bg-white pt-12">
                <ConfirmRidePopup setConfirmRidePopupPannel={setConfirmRidePopupPannel} setRidePopupPannel={setRidePopupPannel}/>
            </div>

        </div>
    );
}
export default CaptainHome;