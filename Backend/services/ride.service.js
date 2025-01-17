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

exports.getFare=getFare
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

exports.confirmRideService=async({rideId,captain})=>{
    console.log('siddhu')
    if(!rideId ){
        throw new Error('Ride Id is required')
    }

    await rideModel.findOneAndUpdate({_id:rideId},{
        status:'accepted',
        captain:captain._id
    })
    const ride=await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+OTP')
    if(!ride){
        throw new Error('Ride not found')
        }

    

        return ride
    
}

exports.startRideService=async({rideId,OTP,captain})=>{
    if(!rideId || !OTP ){
        throw new Error('Ride Id and OTP are required')
        }
        

        const ride=await rideModel.findOne({_id:rideId}).populate('captain').populate('user').select('OTP').select('status').select('fare')
        console.log(ride)
        if(ride.status!=='accepted'){
            throw new Error('Ride not accepted')
        }
        if(ride.OTP!==OTP){
            throw new Error('Invalid OTP')
        }

        await rideModel.findOneAndUpdate({_id:rideId},{
            status:'ongoing'
        })
        return ride;
}

exports.endRideService=async({rideId,captain})=>{
    try{
        if (!rideId) {
            throw new Error('Ride Id is required')
        }
        const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('captain').populate('user')
        if (!ride) {
            throw new Error('Ride not found')
        }
        if (ride.status !== 'ongoing') {
            throw new Error('Ride not ongoing')
        }

        await rideModel.findOneAndUpdate({ _id: rideId }, {
            status: 'completed',
        })
        return ride;
    }
    catch(err){
        console.log(err)
    }
}