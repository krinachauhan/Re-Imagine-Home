const express = require('express')
const router = express.Router()

const topColor = require('../Models/topColorSchema')

// add top colours
router.post('/color/topcolor', async (req, res) => {

    const { color, userChoice } = req.body

    if (!color, !userChoice) {
        return res.status(422).json({ message : "Plz filled the field properly" })
    }

    try {
       
        const topColors = new topColor({ color, userChoice })   
        await topColors.save()
        return res.status(201).json({ message: "top color added successfully" })

    } catch (err) {
        console.log(err)
    }

}) 

// get all color
router.get('/allcolor', async (req, res) => {

    try {
       
        const topColors = await topColor.find({})
        return res.send(topColors)

    } catch (err) {
        console.log(err)
    }

}) 

module.exports = router