const express = require('express')
const fs = require('fs')
const router = express.Router()
const express = require('express');
const tinify = require('tinify');
const multer = require("multer"); // For handling file uploads

async function resize(buffer) {
    const resizeWidth = 1024;
    const resizeHeight = 1024;
    const resizeMethod = "scale";

    try {
        const source = await tinify.fromBuffer(buffer);

        return new Promise((resolve, reject) => {
            source.resize({
                method: resizeMethod,
                width: resizeWidth,
            }).toBuffer((err, bufferData) => {
                if (err) {
                    reject({
                        status: 500,
                        message: err.message,
                        module: "resize",
                    });
                } else {
                    resolve(bufferData);
                }
            });
        });

    } catch (error) {
        throw error;
    }
}

// Endpoint for resizing images
app.post('/resize', async (req, res) => {
    // Set up Multer for handling file uploads
    const upload = multer({ dest: "./uploads/" }); // Specify the directory to store uploaded files

    try {
        // Assuming you're sending the image data in the request body
        const image = req.file;

        fs.readFile(image, (err, data) => {
    
        });

        // Resize the image
        const resizedImage = await resize(buffer);

        // Send the resized image as response
        res.send(resizedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router