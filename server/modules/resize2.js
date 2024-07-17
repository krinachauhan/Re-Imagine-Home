const util = require('util');
const tinify = require('tinify');
const toBufferAsync = util.promisify(tinify.Result.prototype.toBuffer);

async function resize(buffer) {
    tinify.key = 'vJylW5DgmwQmSLtb7dlygj6TxJl3zzp9';
    const resizeWidth = 1024;
    const resizeMethod = 'scale';

    try {
        const source = await tinify.fromBuffer(buffer);
        console.log('source', source);

        const resized = await source.resize({
            method: resizeMethod,
            width: resizeWidth,
        });
        console.log('resized', resized);

        // Directly call toBufferAsync on resized
        const resultData = await toBufferAsync(resized);
        console.log('resultData', resultData);

        // Return the result data
        return {
            status: 200,
            message: 'Resize compression successful',
            data: resultData,
        };
    } catch (error) {
        return {
            status: 400,
            message: error.message,
            module: 'resize',
        };
    }
}

module.exports = resize;