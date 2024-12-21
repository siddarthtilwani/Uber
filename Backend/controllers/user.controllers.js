const userModel=require('../models/user.model')
const {validationResult}=require('express-validator')
const {createUser}=require('../services/user.services')
exports.registerUser=async(req,res,next)=>{
const err=validationResult(req)
if(!err.isEmpty()){
    return res.status(400).json({err:err.array()});
}
    const {fullname,email,password}=req.body

    const hashPassword=await userModel.hashPassword(password)
    const user=await createUser({firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashPassword})

    const token=  user.generateToken()
    res.status(201).json({user,token})
}