const { openaiClient, initializeClient } = require('./openaiClient.js');
const dotenv = require('dotenv');
const { encoding_for_model } = require("@dqbd/tiktoken");

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let tokenUsage = 0; // Tracks tokens used in the current minute
let requestCount = 0; // Tracks requests made in the current minute

// Reset token usage and request count every minute
setInterval(() => {
    tokenUsage = 0;
    requestCount = 0;
    console.log('Token usage and request count reset.');
}, 60000); // 60 seconds
async function callOpenAI(type, data) {
    try {

        // Prepare the prompt
            /*const prompt = `
            Preprocess the following ${type} section of the medical record data. Perform the following tasks:
            1. Remove duplicate entries.
            2. Categorize each entry into the appropriate sub-category.
            3. Format the data so it is ready for integration with the entire medical record.
            4. Ensure the data is concise and relevant to the ${type} section.
            5. For notes, summarize the key points and remove any irrelevant and repetitive information.

            Here is the data: ${JSON.stringify(data)}
            `;*/
        const prompt = `
            Preprocess the following ${type} section of the medical record data:
            - Remove duplicate entries.
            - Categorize each entry into the appropriate sub-category.
            - Format the data for integration with the medical record.
            - Ensure data is concise and relevant to the ${type} section.
            - Summarize key points for notes, remove irrelevant or repetitive information.

            Return only the processed data. Do not include any text like "Here is the data" or "Data follows."
            
            Here is the data: ${JSON.stringify(data)}
        `;

        console.log('Calling OpenAI client...' + type);
        const enc = encoding_for_model("gpt-4o"); // or your model
        const tokens = enc.encode(prompt);
        console.log("Token count:", tokens.length);

        // Check token and request limits
        if (tokenUsage + tokens.length > 250000) {
            console.log('Token limit reached. Waiting for reset...');
            await delay(60000); // Wait for 1 minute
        }
        if (requestCount >= 30) {
            console.log('Request limit reached. Waiting for reset...');
            await delay(60000); // Wait for 1 minute
        }

        // Update token usage and request count
        tokenUsage += tokens.length;
        requestCount++;

        const client = initializeClient('gpt-4o');
        const llmResponse = await openaiClient(client, prompt);
        return llmResponse;
    } catch (error) {
        console.error('Error in OpenAI call:', error);
        throw error;
    }
}
async function preprocessType(type, data) {
    try {
        console.time('openaiClient preprocess Call ' + type);
        // Initialize OpenAI client
        // This function preprocesses a specific type of medical record data using OpenAI's API.

        
        const prompt = `
            Preprocess the following ${type} section of the medical record data:
            - Remove duplicate entries.
            - Categorize each entry into the appropriate sub-category.
            - Format the data for integration with the medical record.
            - Ensure data is concise and relevant to the ${type} section.
            - Summarize key points for notes, remove irrelevant or repetitive information.

            Return only the processed data. Do not include any text like "Here is the data" or "Data follows."
            
            Here is the data: ${JSON.stringify(data)}
            `;
        //check for token size
        const enc = encoding_for_model("gpt-4o"); // or your model
        const message = prompt
        const tokens = enc.encode(message);
        console.log("Token count:", tokens.length);

        if (tokens.length < 128000) {
            const llmResponse = await callOpenAI(type, data);
            console.timeEnd('openaiClient preprocess Call ' + type);
            // Return the processed data
            return llmResponse;
        } else {
            console.log('token size is too large for the model, splitting data...');
            console.log("Token count:", tokens.length);

            // Chunking by TokenSize property
            const MAX_TOKENS = 120000;
            const chunks = [];
            let currentChunk = [];
            let currentTokenSum = 0;
            let chunkIndex = 1;

            for (const item of data) {
                const itemTokenSize = item.tokenSize || 0;
              
                if (currentTokenSum + itemTokenSize > MAX_TOKENS && currentChunk.length > 0) {
                    console.log('creating New Chunk')
                    chunks.push(currentChunk);
                    currentChunk = [];
                    currentTokenSum = 0;
                    chunkIndex++;
                }
                currentChunk.push(item);
                currentTokenSum += itemTokenSize;
               
            }
            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
            }

            console.log(`Number of chunks created: ${chunks.length}`);

            // Process each chunk sequentially with a unique type name
            const chunkResults = [];
            for (let i = 0; i < chunks.length; i++) {
                console.log(`Processing chunk ${i + 1} of ${chunks.length}...`);
                const chunkResult = await callOpenAI(`${type}_chunk${i + 1}`, chunks[i]);
                chunkResults.push(chunkResult);
                if (i < chunks.length - 1) {
                    await delay(10000); // Add a 10-second delay between calls
                }
            }
            // Combine all results into a single array
            const result = chunkResults.flat();
            return result;
        }
    } catch (error) {
        console.error('Error in preprocessing:', error);
        throw error;
    }

}



async function preprocess(data) {

    try {
        const types = Object.keys(data).filter(type => data[type].length > 0);
        const results = await Promise.all(
            types.map(type => {
                console.log(`Processing ${type} data...`);
                return preprocessType(type, data[type]).then(result => [type, result]);
            })
        );
        // Convert array of [type, result] to an object
        const returnData = Object.fromEntries(results);
        return returnData;
    } catch (error) {
        console.error('Error in preprocessing:', error);
        throw error;
    }
}

module.exports = { preprocess };