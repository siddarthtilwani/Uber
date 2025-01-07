import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding=()=>{
    const location=useLocation()
    const {ridedata}=location.state
    const {sendMessage,recieveMessage}=useContext(SocketContext)
    console.log(ridedata)
    const navigate=useNavigate()
    recieveMessage('ride-ended',(ridedata)=>{
        console.log('ride-ended',ridedata)
        navigate('/home')
    })
    return(
        <div className="h-screen z-20">
            <Link to={'/home'} className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className="h-1/2 pointer-events-none">
            {/* <img src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif" alt="" className="h-full w-full object-cover" /> */}
           <LiveTracking/>
            </div>
            <div className="p-4 h-1/2 bg-white">
            <div className="flex justify-between items-center">
       <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />
        <div className="text-right">
                        <h2 className="text-lg font-medium capitalize">{ridedata?.captain.fullname.firstname + " " + ridedata?.captain.fullname.lastname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ridedata?.captain.vehicle.number}</h4>
            <p className="text-sm text-gray-600">Honda Amaze</p>
        </div>
       </div>
        <div className="flex gap-2 flex-col justify-between items-center">
    
           
    
            <div className="w-full mt-5">
                
                <div className="flex items-center gap-5 p-3"  >
                    <i className="text-xl ri-map-pin-2-fill"></i>
                    <div >
                        <h3 className="text-lg font-medium">562/11-A</h3>
                        <p className="text-sm -mt-1 text-gray-600">
                            {ridedata?.destination}</p>     </div>
                </div>
                <div className="flex items-center gap-5 p-3 border-b-2" >   
                <i className="text-xl ri-currency-line"></i>
            <div >  
                <h3 className="text-lg font-medium">₹{ridedata?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">
                   Cash cash</p>     </div>
                        </div>
            </div>
    
    
          
        </div>
        
                <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg ">
                    Make a payment
                </button>
            </div>

        </div>
    )
}

export default Riding