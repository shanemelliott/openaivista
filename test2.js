const {vistaClient} = require('./vistaClient.js');
const { openaiClient,initializeClient } = require('./openaiClient.js');
const { processPatientData } = require('./processPatientData.js');
const { preprocess } = require('./preprocessor.js');
const dotenv = require('dotenv');
const path = require('path');
const { encoding_for_model } = require("@dqbd/tiktoken");
const {prompt} = require('./prompt.js')

dotenv.config({ path: path.resolve(__dirname, '.env') });

//this is a test using the o3-mini model to process patient data from VISTA RPC and send it to OpenAI for analysis.

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
        "start": "3250501",
        "stop":"3250605"
            }
        }
    ]

    // Call the vistaClient function
   console.time('VISTA RPC Call');
   console.log('Calling VISTA RPC...');
   if(params[0].namedArray.start){
      console.log('Using date range:', params[0].namedArray.start, 'to', params[0].namedArray.stop);
   }
    const response = await vistaClient(stationNo, duz, context,rpc, params);
   console.timeEnd('VISTA RPC Call');

  const patientData = await processPatientData(JSON.parse(response).data.items);
  
  console.log('\n################################# Patient Data: ############################');
  // Log the patient data types and counts
  console.log('Patient Data Types and Counts:');

  Object.keys(patientData).forEach(type => {
    if(patientData[type].length === 0) return; // Skip empty types
    console.log(`Patient Data: ${patientData[type].length} ${type}s found`);
  });
  
    
  
  console.time('openaiClient Call');

  console.log('Calling OpenAI client...');
  // Try to call the OpenAI client with the patient data
  //const prompt = 'Analyze the following patient data and provide insights:'
  console.log('Using prompt:');

  console.log(prompt[3])

  //check for token size
   enc = encoding_for_model("o3-mini"); // or your model

    
  const message = [
            {
              "type": "text",
              "text": prompt[3] + JSON.stringify(patientData)
            }
          ]  
  
  const tokens = enc.encode(message[0].text);
  
  console.log("Token count:", tokens.length);
 
  if (tokens.length < 128000) {
    const client = initializeClient('o3-mini');
    const llmResponse = await openaiClient(client, message);
    console.timeEnd('openaiClient Call');
    console.log('\n################################# Response from LLM: ############################');
    console.log(llmResponse);
  }else{
    console.log('token size is too large for the model, please reduce the input size, please decrease to less than 128000 tokens');
  }

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();