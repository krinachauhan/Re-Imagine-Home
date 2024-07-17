const tinify = require("tinify");
tinify.key = "vJylW5DgmwQmSLtb7dlygj6TxJl3zzp9";

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
                    // console.log("resize result:", bufferData);
                    resolve(bufferData);
                }
            });
        });

    } catch (error) {
        throw error;
    }
}

module.exports = resize;