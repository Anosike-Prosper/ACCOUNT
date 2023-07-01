const { AuthService, getUserByEmail } = require('../services/auth')
const { StatusCodes } = require('http-status-codes')
//const { createToken } = require('../../utils/helper')
const { userModel } = require('../models/user')
const catchAsync = require('../errors/catchAsync')

const signUp = catchAsync(async (req, res) => {
    const user = await AuthService.createUser(req.body)
    user.password = undefined

    return res.status(StatusCodes.CREATED).json({ user })
});

const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            throw new AppError(
                'Please provide email and password',
                StatusCodes.BAD_REQUEST
            )
        }

        const user = await userModel.findOne({ email }).select('+password')
        console.log(user)

        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new AppError(
                'Incorrect Email or Password',
                StatusCodes.UNAUTHORIZED
            )
        }

        //const token = createToken(user.id)

        return res.status(StatusCodes.OK).json({
            message: 'Login Successful',
            status: true,
            //token: token,
        })
    } catch (err) {
        next(err)
    }
}

const resetPassword = catchAsync( async(req, res) => {
    await AuthService.changePassword(req.body)
    
    res.status(StatusCodes.OK).json({ status: true, message: 'Password changed succesfully!' })
})

module.exports = { signUp, login, resetPassword }