// demo

const mongoose = require('mongoose')

const topColorSchema = new mongoose.Schema({
    color: {
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

const topColor = mongoose.model('topcolours', topColorSchema)
module.exports = topColor