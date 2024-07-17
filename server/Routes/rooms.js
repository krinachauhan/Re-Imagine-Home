const express = require('express')
const router = express.Router()

const Room = require('../Models/roomSchema')

// get all room
router.get('/room', async (req, res) => {

    try {
       
        const room = await Room.find({})
        return res.send(room)

    } catch (err) {
        console.log(err)
    }

}) 

// add themes
router.post('/room/addroom', async (req, res) => {

    const { roomType } = req.body

    if (!roomType) {
        return res.status(422).json({ message : "Plz filled the field properly" })
    }

    try {
       
        const room = new Room({ roomType })   
        await room.save()
        return res.status(201).json({ message: "room added successfully" })

    } catch (err) {
        console.log(err)
    }

}) 

module.exports = router