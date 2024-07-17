async function upscale(arrayBuffer) {

    // configs 
    // ============================================================================================
        const apiKey = "3dea97d61a6cb066b9939d2c8e23bee16eaa762be87810253bed58034af0ce83f2b197eea04d551cf45479fc55c1343a";
        // width and height set as per 16:9 ratio
        const targetWidth = 2048;
        const targetHeight = 3640;
        // the upscaling strategy that should be used. Possible values are "smooth" & "detailed".
        const strategy = "detailed"
    // ============================================================================================
    
        // Log the type of arrayBuffer to diagnose the issue
        console.log("Type of arrayBuffer in upscale:", typeof arrayBuffer);
    
        // Convert ArrayBuffer to Buffer
        const buffer = Buffer.from(arrayBuffer);
        
        // Convert Buffer to Blob
        const blob = new Blob([buffer], { type: "image/jpeg" });
    
        const form = new FormData();
        form.append("image_file", blob);
        form.append("target_width", targetWidth);
        form.append("target_height", targetHeight);
        form.append("strategy", strategy);
    
        try {
            const response = await fetch(
                "https://clipdrop-api.co/image-upscaling/v1/upscale",
                {
                    method: "POST",
                    headers: {
                        "x-api-key": apiKey,
                    },
                    body: form,
                }
            );
    
            if (!response.ok) {
                let json = await response.json();
                throw new Error(`Upscale failed: ${json.message}`);
            }
    
            const resultBuffer = await response.arrayBuffer();
            return resultBuffer;
        } 
        catch (error) {
            throw error;
        }
    }
    
    module.exports = upscale;