const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const { ObjectId } = require('mongodb')

const User = require('../Models/userSchema')

// email

let transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
})

// send otp
router.post("/sendOTP", async (req, res) => {

    try {

        const otp = Math.floor(Math.random() * 900000) + 100000;

        const { verifyEmail } = req.body

        let mailOptions = {
            from: process.env.EMAIL, 
            to: verifyEmail, 
            subject: "Reimagine OTP", 
            text: `This Otp valid for 2 minute ${otp}`,
            message: "Re Imagine"
        }

        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
            } 
        })

        res.status(200).json({ Myotp : otp })

    } catch (err) {
        console.log(err)
    }

})

// register route 
router.post('/register', async (req, res) => {

    const { userType, profileImage, emailID, password, firstName, lastName } = req.body

    if (!userType, !profileImage, !emailID, !password, !firstName, !lastName) {
        return res.status(422).json({ message : "Plz filled the field properly" })
    }

    try {

        const userExist = await User.findOne({ emailID })

        if (userExist) {
            return res.status(422).json({ message: "Email already Exist" })
        } else {
            const user = new User({ userType, profileImage, emailID, password, firstName, lastName })
            await user.save()
            return res.status(201).json({ message: "user registered successfully" })
        }

    } catch (err) {
        console.log(err)
    }

})

// login route 
router.post('/login', async (req, res) => {

    const { emailID, password } = req.body

    if (!emailID, !password) {
        return res.status(422).json({ error : "Plz filled the field properly" })
    }

    try {

        const userLogin = await User.findOne({ emailID })

        if (userLogin) {

            const isMatch = await bcrypt.compare(password, userLogin.password)

            if (!isMatch) {
                res.status(422).json({ message: "invalid password" })
            } else {
                userLogin.loggedIn.push(new Date())
                await userLogin.save()
                
                const { firstName, lastName, profileImage, _id: userId } = userLogin
                return res.status(201).json({ message : "successfully login", firstName, lastName, profileImage, userId})
            }

        } else {
            return res.status(422).json({ message : "user not register" })
        }

    } catch (err) {
        console.log(err)
    }

})

// check password
router.post('/checkpassword', async (req, res) => {

    try {
        const { id, password } = req.body

        const _id = new ObjectId(id)

        const userExist = await User.findOne({ _id })
        if(userExist) {
            bcrypt.compare(password, userExist.password, function(err, result) {
                if (err) {
                  return res.status(422).json({ message: 'Error comparing passwords' })
                } else if (result) {
                  return res.status(201).json({ message: 'Passwords match' })
                } else {
                  return res.status(422).json({ message: 'Passwords do not match' })
                }
              });
            
        } else {
            res.status(422).json({ message: 'user not found' })
        }

    } catch (err) {
        console.log(err)
    }

})

// change password
router.post('/changepassword', async (req, res) => {

    try {
        const { id, newpassword } = req.body

        const _id = new ObjectId(id)

        const userExist = await User.findOne({ _id })
        if(userExist) {
            const Mypassword = await bcrypt.hash(newpassword, 12)
            const cpassword = await bcrypt.hash(newpassword, 12)
            await User.updateOne({ _id },{ password: Mypassword, cpassword })
            res.status(201).json({ message: 'password changed successfully' })            
        } else {
            res.status(422).json({ message: 'user not found' })
        }

    } catch (err) {
        console.log(err)
    }

})

module.exports = router