const express = require("express")
const router = express.Router()
const { ObjectId } = require('mongodb')

const Activity = require('../Models/activitySchema')

router.get('/admin/userfeedback', async (req, res) => {
    try {

        const feedback = await Activity.find()
        if (feedback) {
            return res.status(201).json({feedback})
        } else {
            return res.status(422).json({ message: 'activity not found' })
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/admin/user/feedback', async (req, res) => {

    const { id } = req.body

    if (!id) {
        return res.status(422).json({ error: "something want wrong" })
    }

    const _id = new ObjectId(id)

    try {

        const activity = await Activity.findOne({ user_id: _id })
        if (activity) {
            return res.status(201).json({ activity })
        } else {
            return res.status(422).json({ message: 'activity not found' })
        }

    } catch (err) {
        console.log(err)
    }

})

module.exports = router