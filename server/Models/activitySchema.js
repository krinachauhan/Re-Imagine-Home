const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    user_id : {
        type: mongoose.ObjectId,
        ref: 'USERS',
        required: true
    }, img : {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    feedback: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true,
})

const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity