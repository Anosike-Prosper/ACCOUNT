const express = require('express');

const { signupDto } = require('../validators/user');
const { signUp, resetPassword,  } = require('../controllers/auth');
const { resetDto } = require('../validators/resetPassword');
const authRouter = express.Router();

authRouter
 .route('/signup')
 .post(signupDto, signUp);

 authRouter
 .route('/reset/password')
 .post(resetDto, resetPassword);

//  authRouter
//  .route('/reset/password')
//  .post(resetDto, resetPassword);

module.exports= { authRouter };