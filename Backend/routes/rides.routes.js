const express=require('express')
const router=express.Router()

const {body, query}=require('express-validator')
const { createRideController, getFare, confirmRide, startRide } = require('../controllers/ride.controller')
const {auth, authCaptain}=require('../middlewares/auth')

router.post('/create',auth,
  
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address')
    ,
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicle type'),
    createRideController
)
router.get('/get-fare',auth,query('pickup').isString().isLength({min:3}).withMessage('invalid pickup location'),
query('destination').isString().isLength({min:3}).withMessage('invalid destination location'),getFare)

router.post('/confirm/ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRide
)

router.get('/start-ride',authCaptain,
    query('rideId').isMongoId().withMessage('ride id is required'),
    query('OTP').isNumeric().isLength({ min: 6, max: 6 }).withMessage('otp is required'),
    startRide
)

module.exports = router
