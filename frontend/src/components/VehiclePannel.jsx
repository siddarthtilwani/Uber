import React from "react";

const  VehiclePannel=({setConfirmedRidePannel, setvehiclePannelOpen,fare,selectVehicle})=>{
    return(
        <div>
        <h5 onClick={()=>setvehiclePannelOpen(false)} className="absolute text-center w-[93%] p-1 top-0">  <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
             <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
             <div onClick={()=>{
              
                setConfirmedRidePannel(true)
                setvehiclePannelOpen(false)
                selectVehicle('car')
                
             }} className="flex w-full px-3 py-8 mb-2 justify-between items-center border-2  active:border-black  rounded-xl">
                 <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />
                 <div className="ml-2 w-1/2">
                 <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                 <h5 className="font-normal text-xs text-gray-600">2 mins away</h5>
                 <p>Affordable,compact rides</p>
                 </div>
                 <h2 className="text-lg font-semibold">₹{fare.car}</h2>
             </div>
             <div onClick={()=>{
                setConfirmedRidePannel(true)
                setvehiclePannelOpen(false)
                selectVehicle('moto')

             }} className="flex w-full px-3 py-6 mb-2 justify-between items-center border-2  active:border-black  rounded-xl">
                 <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                 <div className="ml-2 w-1/2">
                 <h4 className="font-medium text-base">Moto<span><i className="ri-user-3-fill"></i>1</span></h4>
                 <h5 className="font-normal text-xs text-gray-600">3 mins away</h5>
                 <p>Affordable mototcycle rides</p>
                 </div>
                 <h2 className="text-lg font-semibold">₹{fare.moto}</h2>
             </div>
             <div onClick={()=>{
                setConfirmedRidePannel(true)
                setvehiclePannelOpen(false)
                selectVehicle('auto')
             }} className="flex w-full px-3 py-6 mb-2 justify-between items-center border-2  active:border-black rounded-xl">
                 <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                 <div className="ml-2 w-1/2">
                 <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                 <h5 className="font-normal text-xs text-gray-600">2 mins away</h5>
                 <p>Affordable Auto rides</p>
                 </div>
                 <h2 className="text-lg font-semibold">₹{fare.auto}</h2>
             </div>
         </div>
        
    )
}

export default VehiclePannel