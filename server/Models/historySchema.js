const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    user_id : {
        type: mongoose.ObjectId,
        ref: 'USERS',
        required: true
    },
    input : {
        type: String
    }, 
    output_img1 : {
        type: String
    },
    output_img2 : {
        type: String
    },
    output_img3 : {
        type: String
    } 
}, {
    timestamps: true,
})

const History = mongoose.model('HISTORY', historySchema)
module.exports = History