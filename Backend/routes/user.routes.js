const express=require('express')
const router=express.Router()
const {body}=require("express-validator")
const { registerUser, login, getUserProfile, logout } = require('../controllers/user.controllers')
const { auth } = require('../middlewares/auth')

router.post('/register',[
    body('email').isEmail().withMessage("invalid email"),
    body('fullname.firstname').isLength({min:3}).withMessage("first name must be 3 characters long"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 characters long")
],registerUser)


router.post('/login',[
    body('email').isEmail().withMessage('invalid email')
    ,body('password').isLength({min:6}).withMessage("password must be minimum 6 characters long")
],login)


router.get('/profile',auth,getUserProfile)

router.get('/logout',auth,logout)

module.exports = router;
