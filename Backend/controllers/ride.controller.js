const { getCaptainsInTheRadius, getAddressCoordinates } = require('../services/maps.service');
const {createRide, getFare, confirmRideService, startRideService}=require('../services/ride.service')
const {validationResult}=require('express-validator');
const { sendMessageToSocketId } = require('../socket');
const userModel = require('../models/user.model');
const rideModel = require('../models/ride.model');

exports.createRideController=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    const {pickup,destination,vehicleType}=req.body
    try{
        const ride=await createRide({user:req.user._id,pickup,destination,vehicleType})
        res.status(201).json(ride)
        const pickupCoordinates = await getAddressCoordinates(pickup)
        console.log("hii",pickupCoordinates)
   const captainInRadius=await  getCaptainsInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng,3)
   ride.OTP='';
   const ridewithUser=await rideModel.findOne({_id:ride._id}).populate('user');
//    console.log(ridewithUser)
console.log(captainInRadius)
      {  captainInRadius.map((captain)=>{
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
               data: ridewithUser
            });
        })
    }
        
//    console.log(captainInRadius)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:err.message})
        }
}


exports.getFare=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
        }
        const {pickup,destination}=req.query
        try{
            const fare=await getFare(pickup,destination)
            return res.status(200).json(fare)
        }
        catch(error){
            return res.status(500).json({message:error.message})
        }
}

exports.confirmRide=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
        }
        const {rideId}=req.body
        try{
            const ride=await confirmRideService({rideId,captain:req.captain})
            sendMessageToSocketId(ride.user.socketId,{
                event:'ride-confirmed',
                data:ride
            })
            return res.status(200).json(ride)

        }
        catch(err){
            console.log(err)
            return res.status(500).json({message:err.message})
        }

}

exports.startRide=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
        }
        const {OTP,rideId}=req.query
        try{
            const ride=await startRideService({rideId,OTP,captain:req.captain})
            sendMessageToSocketId(ride.user.socketId,{
                event:'ride-started',
                data:ride
            })
            return res.status(200).json(ride)
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:err.message})
        }
}