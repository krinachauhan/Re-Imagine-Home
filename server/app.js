const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const dotenv = require('dotenv')
dotenv.config({ path: './config.env'})

require('./Database/conn')

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     )
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//     next()
// })

// for multiple origin 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})


app.use(bodyParser.json({limit: '100mb'}))
app.use(express.json())
app.use(require('./Routes/auth'))
app.use(require('./Routes/themes'))
app.use(require('./Routes/rooms'))
app.use(require('./Routes/activity'))
app.use(require('./Routes/history'))

// Admin route
app.use(require('./AdminRoute/auth'))
app.use(require('./AdminRoute/activity'))
app.use(require('./AdminRoute/history'))
// app.use(require('./Routes/redesign'))
// demo 
// app.use(require('./Routes/topRoom'))
// app.use(require('./Routes/topColor'))

app.get('/', (req, res) => {
    res.send("hello guys")
}) 

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})