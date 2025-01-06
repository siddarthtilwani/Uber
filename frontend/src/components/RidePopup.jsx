import React from "react";

const RidePopup=(props)=>{
    return(
        <div>
              <h5 onClick={() =>{props.setRidePopupPannel(false)} } className="absolute text-center w-[93%] p-1 top-0">  <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>
            <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
                <div  className="flex items-center gap-3 ">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://media.istockphoto.com/id/1618846975/photo/smile-black-woman-and-hand-pointing-in-studio-for-news-deal-or-coming-soon-announcement-on.jpg?s=612x612&w=0&k=20&c=LUvvJu4sGaIry5WLXmfQV7RStbGG5hEQNo8hEFxZSGY=" alt="" />
                    <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className="text-lg font-semibold">2.2 KM</h5>
            </div>
            <div className="flex gap-2 flex-col justify-between items-center">

              


                <div className="w-full mt-5">
                    <div className="flex items-center  gap-5 p-3 border-b-2">
                        <i className="text-xl ri-map-pin-user-fill"></i>
                        <div >
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">
                                {props.ride?.pickup}</p>     </div>
                    </div>
                    <div className="flex items-center  gap-5 p-3" >
                        <i className="text-xl ri-map-pin-2-fill"></i>
                        <div >
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">
                                {props.ride?.destination}</p>     </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2" >   
                    <i className="text-xl ri-currency-line"></i>
                <div >  
                    <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                    <p className="text-sm -mt-1 text-gray-600">
                       Cash cash</p>     </div>
                            </div>
                </div>


              <div className="flex mt-5 w-full items-center justify-between">
              <button onClick={()=>{
                  props.setRidePopupPannel(false)
                }} className=" mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg ">
                    Ignore
                </button>
              <button onClick={()=>{
                    props.setConfirmRidePopupPannel(true)
                    props.confirmRide()
                }} className="  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg ">
                    Accept
                </button>
                
              </div>
            </div>
        </div>
    )
}
export default RidePopup  