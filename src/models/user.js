const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname field cannot be empty'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username field cannot be empty'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email field cannot be empty'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must not be less than 8 characters'],
        select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})

// //A DOCUMENT MIDDLEWARE THAT HASHES USER'S PASSWORD
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// // A MIDDLEWARE TO CHECK PASSWORD
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const userModel = mongoose.model('user', userSchema)
module.exports = { userModel }
