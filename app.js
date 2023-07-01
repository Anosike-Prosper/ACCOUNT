const express = require('express')

const CONFIG = require('./config/env')
const { authRouter } = require('./src/routers/auth')
const unknownEndpoint = require('./src/middlewares/unknownEndpoint')
const globalErrorhandler = require('./src/errors/Errorhandler')
const passport= require('passport')
require('./config/db')( CONFIG.DBURL )
require('./src/middlewares/auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());

app.use('/auth', authRouter)

/* Error handler Middlewares */
app.use('*', unknownEndpoint)
app.use(globalErrorhandler)

module.exports={ app }