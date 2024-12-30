const rideModel=require('../models/ride.model')
const {getDistanceTime}=require('../services/maps.service')
async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('Pickup and Destination are required')
    }
    const distanceTime=await getDistanceTime(pickup,destination)
    const baseFare={
        auto:30,
        car:50,
        motorcycle:20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };
    const perMeterRate = {
        auto: perKmRate.auto / 1000,
        car: perKmRate.car / 1000,
        motorcycle: perKmRate.motorcycle / 1000
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };
  
    const perSecondRate = {
        auto: perMinuteRate.auto / 60,
        car: perMinuteRate.car / 60,
        motorcycle: perMinuteRate.motorcycle / 60
    };


    const fare={
        auto:Math.round(baseFare.auto+(distanceTime.distance*perMeterRate.auto)+(distanceTime.time *perSecondRate.auto )),
        car:Math.round(baseFare.car+(distanceTime.distance*perMeterRate.car)+(distanceTime.time *perSecondRate.car )),
        motorcycle:Math.round(baseFare.motorcycle+(distanceTime.distance*perMeterRate.motorcycle)+(distanceTime.time *perSecondRate.motorcycle )),
    }
    return fare;
}


exports.createRide=async({
    user,pickup,destination,vehicleType
})=>{
    if(!user || !destination ||!pickup || !vehicleType ){
        throw new Error('All fields are required')
    }
    const fare=await getFare(pickup,destination)
    const ride=rideModel.create({
        user,
        pickup,
        destination,
        fare:fare[vehicleType]
    })
    return ride;

}

