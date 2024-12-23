const captainModel=require('../models/captain.model')
const captainService=require('../services/captain.services')
const {validationResult}=require('express-validator')
exports.createCaptain=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password,veichle}=req.body
    const iscaptainalreadt=await captainModel.findOne({email})
    if(iscaptainalreadt){
        return res.status(400).json({message:'captain already exists'})
    }
    const hashedpassword=await captainModel.hashPassword(password)
    const captain=await captainService.createCaptain({firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashedpassword,color:veichle.color,number:veichle.number,capacity:veichle.capacity,veichleType:veichle.veichleType})
    const token=captain.generateToken()
    res.status(201).json({captain,token})
}