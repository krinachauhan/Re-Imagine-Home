const resize = require("./resize");
const reimagine = require("./reimagine");
const upscale = require("./upscale");
const fs = require("fs");

async function magic(fileBuffer) {
    const resizeResult = await resize(fileBuffer);
    console.log("resizeResult", resizeResult);

    if (resizeResult.status == 200) {
        const compressedBuffer = resizeResult.data;

        const reimagineResult = await reimagine(compressedBuffer);
        console.log("reimagineResult", reimagineResult);

        if (reimagineResult.status == 200) {
            const reimagineArrayBuffer = reimagineResult.data;

            const upscaleResult = await upscale(reimagineArrayBuffer);
            console.log("upscaleResult", upscaleResult);

            if (upscaleResult.status == 200) {

                const imageArrayBuffer = await upscaleResult.data;

                // Convert ArrayBuffer to Buffer
                const imageBuffer = Buffer.from(imageArrayBuffer);

                return { status: 200, message: "Image Reimagined Successfully", data: imageBuffer };
            } 
            else {
                console.log(upscaleResult.message);
                return upscaleResult;
            }
        } else {
            console.log(reimagineResult.message);
            return reimagineResult;
        }
    } else {
        console.log(resizeResult.message);
        return resizeResult;
    }
}

module.exports = magic;