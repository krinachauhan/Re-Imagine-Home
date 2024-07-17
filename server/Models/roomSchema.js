const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true
    }
})

const Rooms = mongoose.model('ROOMS', roomSchema)
module.exports = Rooms