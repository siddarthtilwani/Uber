const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const { createCaptain, login, getCaptainProfile, logout } = require('../controllers/captain.controllers');
const {body}=require("express-validator");
const { authCaptain } = require('../middlewares/auth');
router.post('/register',[
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:8}).withMessage('Password must be at least   8 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('vehicle color must be at least 3 characters long'),
    body('vehicle.number').isLength({min:3}).withMessage('vehicle number must be at least 3 characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('vehicle type must be car, motorcycle or auto')

],createCaptain)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:8}).withMessage('Password must be at least   8 characters long')
],login)



router.get('/profile',authCaptain,getCaptainProfile)


router.get('/logout',authCaptain,logout)
module.exports = router;