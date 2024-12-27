import react, { useState } from 'react';

const LocationSearchPanel = (props) => {
        const locations=[
            'B66, Shubhum Apartment,vijay nagar Bhopal',
            'C67, sai baba Apartment,vijay nagar Bhopal',
            'E68, ram krishan Apartment,vijay nagar Bhopal',
            'D69, harinarayan Apartment,vijay nagar Bhopal',
        ]

    return(
        <div className="location-search-panel">
            {/* {*this is a sample data*} */}
            {
                locations.map((elem,index)=>{
                    return(
                        <div key={index} onClick={()=>{
                            props.setvehiclePannelOpen(true)
                            props.setpannelOpen(false)}}  className='flex gap-4 my-2 border-2 border-gray-50 active:border-black p-3 rounded-xl items-center justify-start'>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full '><i className="ri-map-pin-fill "></i></h2>
                            <h4 className='font-medium'>{elem}</h4>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default LocationSearchPanel;