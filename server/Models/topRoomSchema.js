// demo

const mongoose = require('mongoose')

const topRoomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    userChoice: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    }
})

const topRoom = mongoose.model('toprooms', topRoomSchema)
module.exports = topRoom