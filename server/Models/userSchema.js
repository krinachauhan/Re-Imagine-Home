const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: "U",
        required: true
    },
    profileImage: {
        type: String,
        default: "None",
        required: true
    },
    emailID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    registeredAT: {
        type: Date,
        default: Date.now
    },
    updatedAT: {
        type: Date,
        default: Date.now
    },
    loggedIn: [
        String
    ]
})

userSchema.pre('save', async function(next) {
    this.updatedAT = Date.now
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

const Users = mongoose.model('USERS', userSchema)
module.exports = Users