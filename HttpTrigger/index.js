const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const endpoint = "https://chat-gpt-a1.openai.azure.com/";  // Replace with your Azure OpenAI endpoint
const azureApiKey = "c09f91126e51468d88f57cb83a63ee36";  // Replace with your Azure API key

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
const deploymentName = "Dalle3";  // Replace with your deployment name

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Enable CORS for all origins (* for demonstration purposes)
    context.res = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    };

    if (req.method === "OPTIONS") {
        context.res.status = 200;
        context.done();
        return;
    }

    const { prompt, size, style, quality } = req.body;

    if (!prompt || !size || !style || !quality) {
        context.res = {
            status: 400,
            body: "Please provide prompt, size, style, and quality in the request body."
        };
        return;
    }

    // Assuming 'style' and 'quality' can be incorporated in the prompt for image generation
    const modifiedPrompt = `${prompt}, style: ${style}, quality: ${quality}`;

    try {
        const results = await client.getImages(deploymentName, {
            prompt: modifiedPrompt,
            n: 1,
            size
        });
        context.res = {
            status: 200,
            body: { imageUrls: results.data.map(image => image.url) }
        };
    } catch (err) {
        context.log.error("Error generating image:", err);
        context.res = {
            status: 500,
            body: `Failed to generate image. Error: ${err.message}`
        };
    }
};
