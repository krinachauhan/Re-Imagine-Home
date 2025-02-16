const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.set('strictQuery', true)
mongoose.connect(DB).then(() => {
    console.log("connection successfully")
}).catch((err) => {
    console.log(err)
})