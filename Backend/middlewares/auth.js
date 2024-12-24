const bcryp=require('bcrypt')
const jwt=require('jsonwebtoken')
const userModel=require('../models/user.model')
const blocklistTokenModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model')
// single auth h user wla or auth captain h captain wla
exports.auth=async(req,res,next)=>{
    
        const token=req.headers.authorization?.split(' ')[1] || req.cookies.token
        if(!token){

            return res.status(401).json({message:'Unauthorized'})
        }
        const blocklistToken=await blocklistTokenModel.findOne({token})
        if(blocklistToken){
            return res.status(401).json({message:'Unauthorized'})
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const user=await userModel.findById(decoded._id)
            req.user=user
          return  next()

    }
    catch(err){
        res.status(401).json({message:'Unauthorized'})
    }
}


exports.authCaptain=async(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1] || req.cookies.token

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isblocklistToken=await blocklistTokenModel.findOne({token})
    if(isblocklistToken){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const captain=await captainModel.findById(decoded._id)
        req.captain=captain
        return next()
    }
    catch(err){
        res.status(401).json({message:'Unauthorized'})
    }
}