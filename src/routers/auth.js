const express = require('express');

const { signupDto } = require('../validators/user');
const { signUp, resetPassword,  } = require('../controllers/auth');
const { resetDto } = require('../validators/resetPassword');
const{verifyUser} = require('../middlewares/auth')
const authRouter = express.Router();

authRouter
 .route('/signup')
 .post(signupDto, signUp);

//  authRouter
//  .route('/login')
//  .post(verifyUser, login);

 authRouter
 .route('/reset/password')
 .post(verifyUser,resetDto, resetPassword);

//  authRouter
//  .route('/reset/password')
//  .post(resetDto, resetPassword);

module.exports= { authRouter };