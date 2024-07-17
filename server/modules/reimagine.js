async function reimagine(buffer) {
    // configs 
    // ============================================================================================
        const apiKey = "3dea97d61a6cb066b9939d2c8e23bee16eaa762be87810253bed58034af0ce83f2b197eea04d551cf45479fc55c1343a";
    // ============================================================================================
    
        // Log the type of buffer to diagnose the issue
        console.log("Type of buffer in reimagine:", typeof buffer);
    
        // Convert Buffer to Blob
        const blob = new Blob([buffer], {
            type: "application/octet-stream",
        });
    
        const formData = new FormData();
        formData.append("image_file", blob);
    
        try {
            const response = await fetch(
                "https://clipdrop-api.co/reimagine/v1/reimagine",
                {
                    method: "POST",
                    headers: {
                        "x-api-key": apiKey,
                    },
                    body: formData,
                }
            );
    
            if (!response.ok) {
                let json = await response.json();
                throw new Error(`Reimagine failed: ${json.message}`);
            }
    
            const remainingCredits = response.headers.get("x-remaining-credits");
            const consumedCredits = response.headers.get("x-credits-consumed");
            console.log(`Remaining Credits: ${remainingCredits}`);
            console.log(`Consumed Credits: ${consumedCredits}`);
    
            const resultBuffer = await response.arrayBuffer();
            return resultBuffer;
    
        } catch (error) {
            return {status: 400, message: error.message, module: "reimagine"};
        }
    }
    
    module.exports = reimagine;