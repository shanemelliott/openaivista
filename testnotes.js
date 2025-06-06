const { vistaClient } = require('./vistaClient');
const { openaiClient, initializeClient } = require('./openaiClient.js');
const { processPatientData } = require('./processPatientData');
const { preprocess } = require('./preprocessor.js');
const dotenv = require('dotenv');
const path = require('path');
const { encoding_for_model } = require("@dqbd/tiktoken");
const { prompt } = require('./prompt.js')
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '.env') });

// This script is designed to interact with a VISTA RPC server to retrieve patient data,
// process it, and then send it to an OpenAI model for further analysis or response generation.
// It uses environment variables for configuration and expects certain parameters to be set in the .env file.
// this is a test processing just the notes for efficiencies. .

// Main function to test the vistaClient
async function main() {
  try {

    // Define parameters for the RPC call
    const context = 'LHS RPC CONTEXT';
    const stationNo = process.env.STN;
    const duz = process.env.DUZ;
    const rpc = 'VPR GET PATIENT DATA JSON';
    const params = [{
      "namedArray": {
        "patientId": process.env.DFN,
        "start": "3250105",
        "stop": "3250605"
      }
    }
    ]

    // Call the vistaClient function
    console.time('VISTA RPC Call');
    console.log('Calling VISTA RPC...');
    if (params[0].namedArray.start) {
      console.log('Using date range:', params[0].namedArray.start, 'to', params[0].namedArray.stop);
    }
    const response = await vistaClient(stationNo, duz, context, rpc, params);
    console.timeEnd('VISTA RPC Call');

    const patientData = await processPatientData(JSON.parse(response).data.items);

    console.log('\n################################# Patient Data: ############################');
    // Log the patient data types and counts
    console.log('Patient Data Types and Counts:');


    //get initial tokencount for patietData
    var enc = encoding_for_model("gpt-4o"); // or your model
    const initialMessage = JSON.stringify(patientData);
    const initialTokens = enc.encode(initialMessage);
    console.log("Initial Token count:", initialTokens.length);
    //use preprocessor to preprocess each type

    console.log('processing only notes')
    Object.keys(patientData).forEach(key => {
      if (key !== 'document') {
        delete patientData[key];
      }
    });
    Object.keys(patientData).forEach(type => {
      if (patientData[type].length === 0) return; // Skip empty types
      console.log(`Patient Data: ${patientData[type].length} ${type}s found`);
    });
    console.log('\n################################# Processed Patient Data: ############################');
    console.time('openaiClient Call');

    console.log('Calling OpenAI client...');
    // Try to call the OpenAI client with the patient data
    //const prompt = 'Analyze the following patient data and provide insights:'
    console.log('Using prompt:');

    console.log(prompt[9])

    //check for token size
    enc = encoding_for_model("gpt-4o"); // or your model
    const message = prompt[9] + JSON.stringify(patientData);

    const tokens = enc.encode(message);
    console.log("Token count:", tokens.length);

    if (tokens.length < 128000) {
      const client = initializeClient('gpt-4o');
      const llmResponse = await openaiClient(client, message);
      console.timeEnd('openaiClient Call');
      console.log('\n################################# Response from LLM: ############################');
      console.log(llmResponse);

      const outputPath = path.resolve(__dirname, 'output', 'llm_response.txt');
      if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      }
      fs.writeFileSync(outputPath, llmResponse, 'utf8');
      console.log('LLM response written to', outputPath);


    } else {
      console.log('token size is too large for the model, please reduce the input size, please decrease to less than 128000 tokens');
    }

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();