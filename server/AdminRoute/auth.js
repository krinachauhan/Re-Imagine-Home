const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')

const User = require('../Models/userSchema')

// admin login
router.post('/admin/login', async (req, res) => {

    const { emailID, password } = req.body

    if (!emailID, !password) {
        return res.status(422).json({ error: "Plz filled the field properly" })
    }

    try {

        const user = await User.findOne({ emailID, userType: 'A' })

        if (user) {

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.status(422).json({ message: "invalid password" })
            } else {
                user.loggedIn.push(new Date())
                await user.save()

                return res.status(201).json({ message: "successfully login", user })
            }

        } else {
            return res.status(422).json({ message: "not register" })
        }

    } catch (e) {
        console.log(e)
    }

})

// all user
router.get('/admin/allusers', async (req, res) => {

    try {

        const user = await User.find({ userType: 'U' })
        if (user) {
            return res.status(201).json({user})
        } else {
            return res.status(422).json({ message: 'user not found' })
        }

    } catch (err) {
        console.log(err)
    }

})

router.post('/admin/user/loginhistory', async (req, res) => {

    const { id } = req.body

    if (!id) {
        return res.status(422).json({ error: "something want wrong" })
    }

    const _id = new ObjectId(id)

    try {

        const user = await User.findOne({ _id })
        if (user) {
            return res.status(201).json({ userLoginHistory: user.loggedIn})
        } else {
            return res.status(422).json({ message: 'user not found' })
        }

    } catch (err) {
        console.log(err)
    }

})

module.exports = router

