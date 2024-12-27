import React from "react";

const LookingForDriver=(props)=>{
return(
    <div>
    <h5 onClick={() => props.setVehicleFoundPannel(false)} className="absolute text-center w-[93%] p-1 top-0">  <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
    <h3 className="text-2xl font-semibold mb-5">Looking for driver</h3>
    <div className="flex gap-2 flex-col justify-between items-center">

        <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />


        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2" >
                <i className="text-xl ri-map-pin-user-fill"></i>
                <div >
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">
                        Kankariya Talab,Ahemedabad</p>     </div>
            </div>
            <div className="flex items-center gap-5 p-3"  >
                <i className="text-xl ri-map-pin-2-fill"></i>
                <div >
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">
                        Kankariya Talab,Ahemedabad</p>     </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2" >   
            <i className="text-xl ri-currency-line"></i>
        <div >  
            <h3 className="text-lg font-medium">₹193.20</h3>
            <p className="text-sm -mt-1 text-gray-600">
               Cash cash</p>     </div>
                    </div>
        </div>


      
    </div>
</div>
)
}

export default LookingForDriver