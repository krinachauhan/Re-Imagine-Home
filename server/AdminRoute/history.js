const express = require("express")
const router = express.Router()
const { ObjectId } = require('mongodb')

const History = require('../Models/historySchema')

router.get('/admin/userhistory', async (req, res) => {
    try {

        const history = await History.find()
        if (history) {
            return res.status(201).json({history})
        } else {
            return res.status(422).json({ message: 'history not found' })
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/admin/user/history', async (req, res) => {

    const { id } = req.body

    if (!id) {
        return res.status(422).json({ error: "something want wrong" })
    }

    const _id = new ObjectId(id)

    try {

        const history = await History.find({ user_id: _id })
        if (history) {
            return res.status(201).json({ history })
        } else {
            return res.status(422).json({ message: 'history not found' })
        }

    } catch (err) {
        console.log(err)
    }

})

module.exports = router