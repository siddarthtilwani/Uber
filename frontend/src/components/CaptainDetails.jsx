import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useSelector } from "react-redux";

const CaptainDetails=()=>{
    // const captain=useSelector(state=>state.captain.captain)
    const { captain }=useContext(CaptainDataContext)
    useEffect(() => {
        console.log("Captain Details - Current captain data:", captain);
    }, [captain]);
    if (!captain) {
        return <div>Loading...</div>
    }
    
    return(
        
        <div>
            
             <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-3">
                        <img className="h-10 w-10 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
                        <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname+" "+captain.fullname.lastname}</h4>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold">
                          ₹295.20
                        </h4>
                        <p className="text-sm text-gray-600">Earned</p>
                    </div>
                    </div>
                    <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
                    <div className="text-center"> 
                        <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>   
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>    
                   </div>
                    <div className="text-center"> 
                        <i className="text-3xl mb-2  font-thin ri-speed-up-fill"></i>   
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p  className="text-sm text-gray-600">Hours Online</p>     
                      </div>  

                    <div className="text-center">
                        <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>  
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>    
                         </div>  


                </div>
        </div>
    )
}

export default CaptainDetails