import React from "react";
import { Link } from "react-router-dom";

const FinishRide=(props)=>{
    return(
        <div>
                    <h5 onClick={() =>{props.setFinsihRidePopupPannel(false)} } className="absolute text-center w-[93%] p-1 top-0">  <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
            <div className="flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg">
                <div  className="flex items-center gap-3 ">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://media.istockphoto.com/id/1618846975/photo/smile-black-woman-and-hand-pointing-in-studio-for-news-deal-or-coming-soon-announcement-on.jpg?s=612x612&w=0&k=20&c=LUvvJu4sGaIry5WLXmfQV7RStbGG5hEQNo8hEFxZSGY=" alt="" />
                    <h2 className="text-lg font-medium">Rahul tilwani</h2>
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
                                Kankariya Talab,Ahemedabad</p>     </div>
                    </div>
                    <div className="flex items-center  gap-5 p-3" >
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


                <div className="mt-10 w-full">
                  <Link to={'/captain-home'} className="w-full text-lg flex justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg ">
                    Finish Ride
                </Link>
                <p className=" mt-10 text-xs">Click on finish ride button if you have completed the payment</p>
               
               
                </div>
            </div>
        </div>
    )
}

export default FinishRide