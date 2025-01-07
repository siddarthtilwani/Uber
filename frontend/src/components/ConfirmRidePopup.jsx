import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ConfirmRidePopup = (props) => {
    const [OTP, setOTP] = useState(null)
    const navigate=useNavigate()
    const submitHandler = async(e) => {
        e.preventDefault();
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
            
              params:{
                OTP: OTP,
                rideId: props.ride._id
              },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            
        })

        if(response.status===200){
            props.setConfirmRidePopupPannel(false)
            props.setRidePopupPannel(false)
            navigate('/captain-riding',{state:{rideData:props.ride}})
        }

    }
    return (
        <div>
            <h5 onClick={() => { props.setRidePopupPannel(false) }} className="absolute text-center w-[93%] p-1 top-0">  <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm this ride to start</h3>
            <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
                <div className="flex items-center gap-3 ">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://media.istockphoto.com/id/1618846975/photo/smile-black-woman-and-hand-pointing-in-studio-for-news-deal-or-coming-soon-announcement-on.jpg?s=612x612&w=0&k=20&c=LUvvJu4sGaIry5WLXmfQV7RStbGG5hEQNo8hEFxZSGY=" alt="" />
                    <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname + " "+props.ride?.user.fullname.lastname}</h2>
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


                <div className="mt-6 w-full">
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <input value={OTP} required onChange={(e) => setOTP(e.target.value)} type="number" placeholder="Enter OTP" className="border px-6 py-4 font-mono bg-[#eeeeee] mb-7 w-full rounded text-lg placeholder:text-base" />
                        <button className="w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg text-lg ">
                            Confirm
                        </button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPannel(false)
                            props.setRidePopupPannel(false)
                        }} className="w-full mt-1 text-lg bg-red-600 text-white font-semibold p-3 rounded-lg ">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup;