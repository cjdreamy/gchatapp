const fs = require('fs');
require('dotenv').config();

async function listModels() {
    try {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
            console.error("GEMINI_API_KEY is missing");
            return;
        }
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.models) {
            const modelNames = data.models.map(m => m.name).join('\n');
            fs.writeFileSync('models_list_clean.txt', modelNames);
            console.log("Model names written to models_list_clean.txt");
        } else {
            fs.writeFileSync('models_list_clean.txt', "No models found or error: " + JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error("Error listing models:", err);
    }
}

listModels();
