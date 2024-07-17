
const express = require("express")
const router = express.Router();
const fs = require("fs");
const multer = require("multer"); // For handling file uploads
const resize = require("../modules/resize");
const reimagine = require("../modules/reimagine");
const upscale = require("../modules/upscale");

// Set up Multer for handling file uploads
const upload = multer({ dest: "./uploads/" }); // Specify the directory to store uploaded files

// get reimagined image
router.post("/redesign", upload.single("image"), async (req, res) => {
    try {
        // Access the uploaded file via req.file
        const uploadedFile = req.file;
        console.log("uploadedFile", uploadedFile);

        // Read the file asynchronously
        fs.readFile(uploadedFile.path, async (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return res
                    .status(500)
                    .json({ status: 500, message: "Internal server error" });
            }
            console.log("data", data);

            // resize returns a Buffer
            const resizeResult = await resize(data);
            console.log("resizeResult", resizeResult)
            
            // reimagine returns ArrayBuffer
            const reimagineResult = await reimagine(resizeResult);
            console.log("reimagineResult", reimagineResult);

            // upscale returns ArrayBuffer
            const upscaleResult = await upscale(reimagineResult);
            console.log("upscaleResult", upscaleResult);

            // Send the ArrayBuffer directly as the response
            res.setHeader("Content-Type", "application/octet-stream");
            res.send(Buffer.from(upscaleResult));
        });
        
    } catch (error) {
        console.error("Error during redesign:", error);
    }
});

module.exports = router;