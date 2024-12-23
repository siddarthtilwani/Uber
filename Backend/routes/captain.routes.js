const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const { createCaptain } = require('../controllers/captain.controllers');
const {body}=require("express-validator")
router.post('/register',[
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:8}).withMessage('Password must be at least   8 characters long'),
    body('veichle.color').isLength({min:3}).withMessage('Veichle color must be at least 3 characters long'),
    body('veichle.number').isLength({min:3}).withMessage('Veichle number must be at least 3 characters long'),
    body('veichle.capacity').isLength({min:1}).withMessage('Capacity must be at least 1'),
    body('veichle.veichleType').isIn(['car','motorcycle','auto']).withMessage('Veichle type must be car, motorcycle or auto')

],createCaptain)

module.exports = router;