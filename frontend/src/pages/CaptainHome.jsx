import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";

import axios from "axios";
import LiveTracking from "../components/LiveTracking";
const CaptainHome = () => {
    const [RidePopupPannel, setRidePopupPannel] = useState(false)
    const RidePopupPannelRef = useRef(null)
    const [ConfirmRidePopupPannel, setConfirmRidePopupPannel] = useState(false)
    const ConfirmRidePopupPannelRef = useRef(null)
    const [ride, setride] = useState(null)
    const { captain } = useContext(CaptainDataContext)
    // const {recieveMessage}=useContext(SocketContext)
    // const captain=useSelector(state=>state)

    const { sendMessage, recieveMessage } = useContext(SocketContext)

    recieveMessage('new-ride', (data) => {
        console.log(data)
        setride(data)
        setRidePopupPannel(true)
    })

    useEffect(() => {
        console.log(captain)
        sendMessage('join', { userId: captain._id, userType: 'captain' })
        const updateLocation = () => {

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(position => {
                    console.log('h')
                    const { latitude, longitude } = position.coords;
                    // console.log('update-location-captain', {
                    //     userId: captain._id, location: {
                    //         latitude,
                    //         longitude
                    //     }
                    // })
                    sendMessage('update-location-captain', {
                        captainId: captain._id, location: {
                            lat: latitude,
                            lng: longitude
                        }
                    })

                },
                    err => console.log(err)
                )
            }
        }
        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
        return () => clearInterval(locationInterval);
    }, [captain])
    useEffect(() => {

        console.log(captain)
    }, [captain])


    useGSAP(() => {
        if (RidePopupPannel) {
            gsap.to(RidePopupPannelRef.current, {
                transform: "translateY(0%)"
            })
        }
        else {
            gsap.to(RidePopupPannelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [RidePopupPannel])
    useGSAP(() => {
        if (ConfirmRidePopupPannel) {
            gsap.to(ConfirmRidePopupPannelRef.current, {
                transform: "translateY(0%)"
            })
        }
        else {
            gsap.to(ConfirmRidePopupPannelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [ConfirmRidePopupPannel])

    async function confirmRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm/ride`, {
                rideId: ride._id,
                captainId: captain._id,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response)

            setRidePopupPannel(true)
            setConfirmRidePopupPannel(true)
        } catch (error) {
            console.error("Error confirming the ride", error);
            // Handle error (optional: show an error message to the user)
        }

    }
    return (
        <div className="h-screen">
            <div className="fixed p-6 left-5 top-0 flex items-center justify-between w-screen">
                <img className="w-16 left-11" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to={'/captain-login'} className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5 pointer-events-none z-0">
                {/* <img src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif" alt="" className="h-full w-full object-cover" /> */}
                <LiveTracking />
            </div>
            <div className="p-6 h-2/5 bg-white">
                <CaptainDetails />
            </div>
            <div ref={RidePopupPannelRef} className="fixed z-10 w-full translate-y-full  bottom-0 px-3 py-10 bg-white pt-12">
                <RidePopup confirmRide={confirmRide} ride={ride} setConfirmRidePopupPannel={setConfirmRidePopupPannel} setRidePopupPannel={setRidePopupPannel} />
            </div>
            <div ref={ConfirmRidePopupPannelRef} className="fixed h-screen z-10 w-full translate-y-full  bottom-0 px-3 py-10 bg-white pt-12">
                <ConfirmRidePopup ride={ride} setConfirmRidePopupPannel={setConfirmRidePopupPannel} setRidePopupPannel={setRidePopupPannel} />
            </div>

        </div>
    );
}
export default CaptainHome;