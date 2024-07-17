const mongoose = require('mongoose')

const themeSchema = new mongoose.Schema({
    themeType: {
        type: String,
        required: true
    }
})

const Themes = mongoose.model('THEMES', themeSchema)
module.exports = Themes