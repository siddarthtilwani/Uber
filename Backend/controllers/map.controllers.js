const { getAddressCoordinates, getDistanceTime, getAutoCompleteSuggestionsService } = require("../services/maps.service")
const {validationResult}=require('express-validator')
exports.getCoordinates=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()})
    }
    const {address}=req.query
    try{
        const coordinates=await getAddressCoordinates(address)
        return res.status(200).json(coordinates)
    }
    catch(error){
        res.status(404).json({message:'Coordinate not found'})
    }
}



exports.getDistanceTime=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()})
    }
    const {origin,destination}=req.query
    try{
        const distanceTime=await getDistanceTime(origin,destination)
        res.status(200).json(distanceTime)

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
    
}


exports.getAutoCompleteSuggestions=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()})
        }
        const {input}=req.query
        try{
            const response=await getAutoCompleteSuggestionsService(input)
            res.status(200).json(response)
        }
        catch(error){
            console.log(error)
            res.status(500).json({message:"internal server error"})
        }
}