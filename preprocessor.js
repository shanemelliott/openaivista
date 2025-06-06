const { openaiClient, initializeClient } = require('./openaiClient.js');
const dotenv = require('dotenv');
const { encoding_for_model } = require("@dqbd/tiktoken");

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function preprocessType(type, data) {
    try {
        console.time('openaiClient preprocess Call ' + type);
        // Initialize OpenAI client
        // This function preprocesses a specific type of medical record data using OpenAI's API.

        // Prepare the prompt
        const prompt = `
            Preprocess the following ${type} section of the medical record data. Perform the following tasks:
            1. Remove duplicate entries.
            2. Categorize each entry into the appropriate sub-category.
            3. Format the data so it is ready for integration with the entire medical record.
            4. Ensure the data is concise and relevant to the ${type} section.
            5. For notes, summarize the key points and remove any irrelevant and repetitive information.

            Here is the data: ${JSON.stringify(data)}
            `;
        // Call OpenAI API
        console.log('Calling OpenAI client...' + type);
        //check for token size
        const enc = encoding_for_model("gpt-4o"); // or your model
        const message = prompt
        const tokens = enc.encode(message);
        console.log("Token count:", tokens.length);

        if (tokens.length < 128000) {
            const client = initializeClient('gpt-4o');
            const llmResponse = await openaiClient(client, message);
            console.timeEnd('openaiClient preprocess Call ' + type);

            // Return the processed data
            return llmResponse;
        } else {
            console.log('token size is too large for the model, tryiny to cut data in 2');
            const midIndex = Math.floor(data.length / 2);
            const firstHalf = data.slice(0, midIndex);
            const secondHalf = data.slice(midIndex);
            const firstHalfResult = await preprocessType(type, firstHalf);
            const secondHalfResult = await preprocessType(type + 's', secondHalf);
            return {
                firstHalf: firstHalfResult,
                secondHalf: secondHalfResult
            };
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