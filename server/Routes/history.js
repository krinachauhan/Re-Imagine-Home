const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')

const History = require('../Models/historySchema')

// get history
router.post('/history', async (req, res) => {

    const { id } = req.body

    try {
        
        if (!id) {
            return res.status(422).json({ error : "Please login first" })
        }

        const user_id = new ObjectId(id)

        const historyData = await History.find({ user_id })

        if (historyData) {
            return res.status(201).json({ historyData })
        } else {
            return res.status(422).json({ message : "history not found" })
        }

    } catch (err) {
        console.log(err)
    }

})

router.post('/addHistory', async (req, res) => {
    try {
        const { id, input, output_img1, output_img2, output_img3 } = req.body;

        if (!id || !input) {
            return res.status(400).json({ message: "data not found" })
        }

        const user_id = new ObjectId(id)

        const add = new History({ user_id, input, output_img1, output_img2, output_img3 })
        await add.save()
        return res.status(201).json({ message: "history added" })

    } catch (err) {
        console.log(err)
    }
})

module.exports = router