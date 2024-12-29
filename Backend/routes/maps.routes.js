const express=require('express')
const { auth } = require('../middlewares/auth')
const {query}=require("express-validator")
const router=express.Router()
const {getCoordinates}=require('../controllers/map.controllers')
const {getDistanceTime}=require('../controllers/map.controllers')
const { getAutoCompleteSuggestions}=require('../controllers/map.controllers')
router.get('/get-coordinates',query('address').isString().isLength({min:3}),auth,getCoordinates)
// location name for refernce
// Prestige Falcon City, Vasanthpura, Bommanahalli , Bangalore, Bangalore, Karnataka, India
// Phoenix Mall of Asia, GKVK Road, Rajiv Gandhi Nagar, Sahakaranagara, Yelahanka taluku, Bengaluru Urban, Karnataka, 560092, India



router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    auth,
    getDistanceTime
)


router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    auth,
    getAutoCompleteSuggestions
)
module.exports=router