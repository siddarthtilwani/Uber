const {createRide, getFare}=require('../services/ride.service')
const {validationResult}=require('express-validator')

exports.createRideController=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    const {pickup,destination,vehicleType}=req.body
    try{
        const ride=await createRide({user:req.user._id,pickup,destination,vehicleType})
    return res.status(201).json(ride)
    }
    catch(err){
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