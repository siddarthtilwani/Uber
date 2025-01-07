import react, { useState } from 'react';

const LocationSearchPanel = ({ suggestions,
    setpickup,
    activeField,
    setdestination,
    setpannelOpen, setvehiclePannelOpen,}) => {
        const handleSuggestionClick=(suggestion)=>{
            if(activeField==='pickup'){
                setpickup(suggestion.display_name);
            }
            else if(activeField==='destination'){
                setdestination(suggestion.display_name);
                }
            // setvehiclePannelOpen(true)
            //                 setpannelOpen(false)
        }
      

    return(
        <div className="location-search-panel">
         
            {
                suggestions.map((elem,index)=>{
                    return(
                        <div  key={index} onClick={()=>{
                            handleSuggestionClick(elem)}}  className='flex gap-4 my-2 border-2 border-gray-50 active:border-black p-3 rounded-xl items-center justify-start '>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full '><i className="ri-map-pin-fill "></i></h2>
                            <h4 className='font-medium'>{elem.display_name}</h4>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default LocationSearchPanel;