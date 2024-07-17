const express = require('express')
const router = express.Router()

const topRoom = require('../Models/topRoomSchema')

// add top room
router.post('/room/toproom', async (req, res) => {

    const { room, userChoice } = req.body

    if (!room, !userChoice) {
        return res.status(422).json({ message : "Plz filled the field properly" })
    }

    try {
       
        const topRooms = new topRoom({ room, userChoice })   
        await topRooms.save()
        return res.status(201).json({ message: "top room added successfully" })

    } catch (err) {
        console.log(err)
    }

}) 

// get all room
router.get('/allroom', async (req, res) => {

    try {
       
        const topRooms = await topRoom.find({})
        return res.send(topRooms)

    } catch (err) {
        console.log(err)
    }

}) 

module.exports = router