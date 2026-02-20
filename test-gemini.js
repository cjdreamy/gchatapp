require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    try {
        const key = process.env.GEMINI_API_KEY;
        console.log("Testing API Key:", key ? key.substring(0, 10) + "..." : "undefined");

        if (!key) {
            console.error("Error: GEMINI_API_KEY is missing in .env");
            return;
        }

        const genAI = new GoogleGenerativeAI(key);

        const modelsToTry = ["gemini-1.5-flash", "gemini-pro"];

        for (const modelName of modelsToTry) {
            try {
                console.log(`\nTesting model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const prompt = "Hello";
                const result = await model.generateContent(prompt);
                const response = await result.response;
                console.log(`Success with ${modelName}:`, response.text());
                return; // Exit on first success
            } catch (err) {
                console.error(`Failed with ${modelName}: ${err.status} ${err.statusText}`);
                if (err.message) console.error("Message:", err.message);
            }
        }
    } catch (err) {
        console.error("API Test Failed!");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        if (err.status) console.error("Status:", err.status);
        if (err.statusText) console.error("Status Text:", err.statusText);
    }
}

testGemini();
