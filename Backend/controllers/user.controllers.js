const userModel=require('../models/user.model')
const {validationResult}=require('express-validator')
const {createUser}=require('../services/user.services')
const blocklistTokenModel = require('../models/blacklistToken.model')
exports.registerUser=async(req,res,next)=>{
const err=validationResult(req)
if(!err.isEmpty()){
    return res.status(400).json({err:err.array()});
}
    const {fullname,email,password}=req.body
const isusersalready=await userModel.findOne({email})
if(isusersalready){
    return res.status(400).json({err:'user already exists'})
}
    const hashPassword=await userModel.hashPassword(password)
    const user=await createUser({firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashPassword})

    const token=await  user.generateToken()
    res.status(201).json({user,token})
}



exports.login=async(req,res,next)=>{
    const err=validationResult(req)

    if(!err.isEmpty()){
        return res.status(400).json({err:err.array()});
    }
    const {email,password}=req.body
    const user=await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(404).json({err:'invalid user or password'})
    }
    const isMatch=await user.comparePassword(password)

    if(!isMatch){
        return res.status(404).json({err:'invalid user or password'})
    }
    const token=await user.generateToken()
    res.cookie('token',token)
    res.status(200).json({user,token})
}

exports.getUserProfile=async(req,res,next)=>{
    return res.status(200).json(req.user)
}


exports.logout=async(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1] || req.cookies.token
    await blocklistTokenModel.create({token})
    res.clearCookie('token')
    
   
    res.status(200).json({message:'logged out successfully'})
}