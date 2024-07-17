const express = require('express')
const { ObjectId } = require('mongodb')
const router = express.Router()

const Activity = require('../Models/activitySchema')

// add rating
router.post('/sendfeedback', async (req, res) => {

    const { id, img, rating, feedback } = req.body

    if (!id, !img, !rating, !feedback) {
        return res.status(422).json({ message : "Plz filled the field properly" })
    }

    try {

        const user_id = new ObjectId(id)
       
        const SingleActivity = new Activity({ user_id, img, rating, feedback })   
        await SingleActivity.save()
        return res.status(201).json({ message: "rating added successfully" })

    } catch (err) {
        console.log(err)
    }

}) 

module.exports = router