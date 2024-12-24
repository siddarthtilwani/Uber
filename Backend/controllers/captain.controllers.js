const blocklistTokenModel = require('../models/blacklistToken.model')
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



exports.login=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }
    const {email,password}=req.body
    const captain=await captainModel.findOne({email}).select('+password')
    if(!captain){
        return res.status(404).json({message:'invalid email or password'})
    }
    const isMatch=await captain.comparePassword(password)
    if(!isMatch){
        return res.status(404).json({message:'invalid email or password'})
    }
    const token=await captain.generateToken()
    res.cookie('token',token)
    res.status(200).json({captain,token})
}



exports.getCaptainProfile=async(req,res,next)=>{
    return res.status(200).json(req.captain)
}

exports.logout=async(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1] || req.cookies.token
    await blocklistTokenModel.create({token})
    res.clearCookie('token')
   

   
    res.status(200).json({message:'logged out successfully'})
}