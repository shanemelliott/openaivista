const { vistaClient } = require('./vistaClient');
const { openaiClient, initializeClient } = require('./openaiClient.js');
const { processPatientData } = require('./processPatientData');
const { preprocess } = require('./preprocessor.js');
const dotenv = require('dotenv');
const path = require('path');
const { encoding_for_model } = require("@dqbd/tiktoken");
const { prompt } = require('./prompt.js')

dotenv.config({ path: path.resolve(__dirname, '.env') });
// This script is designed to interact with a VISTA RPC server to retrieve patient data,
// process it, and then send it to an OpenAI model for further analysis or response generation.
// It uses environment variables for configuration and expects certain parameters to be set in the .env file.
// 
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
        "start": "3240105",
        "stop": "3250605"
      }
    }
    ]
    // Call the vistaClient function
    //track time for the RPC call
    console.log('################################# VISTA RPC Call: ############################');
    console.time('VISTA RPC Call');
    console.log('Calling VISTA RPC...');
    //if date range defined, log it
    if (params[0].namedArray.start) {
      console.log('Using date range:', params[0].namedArray.start, 'to', params[0].namedArray.stop);
    }
    const response = await vistaClient(stationNo, duz, context, rpc, params);
    console.timeEnd('VISTA RPC Call');
    //process the RPC response. 
    //VPR GET PATIENT DATA JSON returns a JSON object with patient data.  This has alot of text that needs to be processed to decrease the amount of tokens sent to the LLM.
    //The processPatientData function will extract the relevant data from the response and return an object with the patient data types and counts. 
    // Todo: Review the relevant data I am pulling from the resposne with clinical stakehoders to ensure we are not missing any important data.
    const patientData = await processPatientData(JSON.parse(response).data.items);
    console.log('\n################################# Patient Data: ############################');
    // Log the patient data types and counts
    console.log('Patient Data Types and Counts:');
    Object.keys(patientData).forEach(type => {
      if (patientData[type].length === 0) return; // Skip empty types
      console.log(`Patient Data: ${patientData[type].length} ${type}s found`);
    });
    //get initial tokencount for patietData.  This where we are starting from before we preprocess the data.
    var enc = encoding_for_model("gpt-4o"); // or your model 
    const initialMessage = JSON.stringify(patientData);
    const initialTokens = enc.encode(initialMessage);
    console.log("Initial Token count:", initialTokens.length);
    //use preprocessor to preprocess each type
    //This will reduce the amount of text sent to the LLM and help with token limits. I am sending each 'Type' to the LLM one at a time with a prompt that asks the LLM to summarize the data.(see preprocess for prompt)
    var processedData = await preprocess(patientData);
    console.log('\n################################# Processed Patient Data with LLM: ############################');
    console.time('openaiClient Call');
    console.log('Calling OpenAI client...');
    // Try to call the OpenAI client with the patient data
    console.log('Using prompt:');
    //use the promt from prompt.js
    console.log(prompt[7])
    //check for token size
    enc = encoding_for_model("gpt-4o"); // or your model
    const message = prompt[7] + JSON.stringify(processedData);
    const tokens = enc.encode(message);
    console.log("Token count:", tokens.length);
    //check if token size is less than 128000, if so, call the LLM.
    //Note: GPT-4o has a token limit of 128000 tokens, so we need to check if the token size is less than that before calling the LLM.
    //If the token size is too large, we will log a message and not call the LLM.
    if (tokens.length < 128000) {
      const client = initializeClient('gpt-4o'); //note: today, the apiversion has to bemanually changed in the openaiClient.js file if you change the model
      const llmResponse = await openaiClient(client, message);
      console.timeEnd('openaiClient Call');
      console.log('\n################################# Response from LLM: ############################');
      console.log(llmResponse);
    } else {
      console.log('token size is too large for the model, please reduce the input size, please decrease to less than 128000 tokens');
    }

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();