const express=require('express')
const router=express.Router()

const {body}=require('express-validator')
const { createRideController } = require('../controllers/ride.controller')
const {auth}=require('../middlewares/auth')

router.post('/create',auth,
  
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address')
    ,
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicle type'),
    createRideController
)

module.exports=router