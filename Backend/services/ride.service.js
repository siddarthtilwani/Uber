const rideModel=require('../models/ride.model')
const {getDistanceTime}=require('../services/maps.service')
const crypto=require('crypto')
async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('Pickup and Destination are required')
    }
    const distanceTime=await getDistanceTime(pickup,destination)
    const baseFare={
        auto:30,
        car:50,
        moto:20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };
    const perMeterRate = {
        auto: perKmRate.auto / 1000,
        car: perKmRate.car / 1000,
        moto: perKmRate.moto / 1000
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
  
    const perSecondRate = {
        auto: perMinuteRate.auto / 60,
        car: perMinuteRate.car / 60,
        moto: perMinuteRate.moto / 60
    };


    const fare={
        auto:Math.round(baseFare.auto+(distanceTime.distance*perMeterRate.auto)+(distanceTime.time *perSecondRate.auto )),
        car:Math.round(baseFare.car+(distanceTime.distance*perMeterRate.car)+(distanceTime.time *perSecondRate.car )),
        moto:Math.round(baseFare.moto+(distanceTime.distance*perMeterRate.moto)+(distanceTime.time *perSecondRate.moto )),
    }
    return fare;
}

function getOTP(num){
    const OTP=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString()
    return OTP;
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
        OTP:getOTP(6),
        fare:fare[vehicleType]
    })
    return ride;

}

