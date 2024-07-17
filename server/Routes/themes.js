const express = require('express')
const router = express.Router()

const Theme = require('../Models/themeSchema')

// get all themes
router.get('/theme', async (req, res) => {

    try {
       
        const theme = await Theme.find({})
        return res.send(theme)

    } catch (err) {
        console.log(err)
    }

}) 

// add themes
router.post('/theme/addtheme', async (req, res) => {

    const { themeType } = req.body

    if (!themeType) {
        return res.status(422).json({ message : "Plz filled the field properly" })
    }

    try {
       
        const theme = new Theme({ themeType })   
        await theme.save()
        return res.status(201).json({ message: "theme added successfully" })

    } catch (err) {
        console.log(err)
    }

}) 

module.exports = router