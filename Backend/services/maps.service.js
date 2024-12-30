const axios = require('axios');

exports.getAddressCoordinates = async (address) => {

    try {
        const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
            params: {
                key: process.env.LOCATIONIQ_ACCESS_TOKEN,
                q: address,
                format: 'json',
                countrycodes: 'IN'
            }
        });

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: location.lat,
                lng: location.lon
            };
        } else {
            throw new Error('Unable to geocode address');
        }
    } catch (error) {
        console.error('Error getting address coordinates:', error);
        throw error;
    }
};

exports.getDistanceTime=async(origin,destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }try{
        const startCoordinates=await exports.getAddressCoordinates(origin)
        const endCoordinates=await exports.getAddressCoordinates(destination)
        const coordinates = `${startCoordinates.lng},${startCoordinates.lat};${endCoordinates.lng},${endCoordinates.lat}`;
        const response = await axios.get(`https://us1.locationiq.com/v1/directions/driving/${coordinates}`, {
            params: {
                key: process.env.LOCATIONIQ_ACCESS_TOKEN,
                steps: true,
                alternatives: true,
                geometries: 'polyline',
                overview: 'full'
            }
        });
        if(response.data.routes.length>0){
            console.log(response)
            const route=response.data.routes[0]
            return{
                distance:route.distance,
                time:route.duration
                }
        }
        else{
            throw new Error('Unable to get route')
        }
    }   
    catch(error){
        console.log(error)
        throw error
    }
}


exports.getAutoCompleteSuggestionsService=async(input)=>{
    if(!input){
        throw new Error('query is required')
        }
try{
    const response =await axios.get(`https://us1.locationiq.com/v1/autocomplete.php`,{
        params:{
            key:process.env.LOCATIONIQ_ACCESS_TOKEN,
            
            q:input,
            format:'json',
            countrycodes: 'IN'
            }
    })
    if(response.data.length>0){
        return response.data
    }
    else
    {
        throw new Error('Unable to get suggestions')
    }
}
catch(error){
    console.log(error)
    throw error
}
}