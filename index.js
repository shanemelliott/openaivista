const {vistaClient} = require('./vistaClient');
const { openaiClient,initializeClient } = require('./openaiClient.js');
const { processPatientData } = require('./processPatientData');
const dotenv = require('dotenv');
const path = require('path');
const {prompt} = require('./prompt.js')

dotenv.config({ path: path.resolve(__dirname, '.env') });



// Main function to test the vistaClient
async function main() {
  try {
  
    // Define parameters for the RPC call
    const context = 'LHS RPC CONTEXT';
    const stationNo = '500';
    const duz = process.env.DUZ;
    const rpc = 'VPR GET PATIENT DATA JSON';
    const params = [{
      "namedArray": {
        "patientId": "237"
            }
        }
    ]

    // Call the vistaClient function
   console.time('VISTA RPC Call');
   console.log('Calling VISTA RPC...');
   const response = await vistaClient(stationNo, duz, context,rpc, params);
   console.timeEnd('VISTA RPC Call');

   const patientData = processPatientData(JSON.parse(response).data.items);
  Object.keys(patientData).forEach(type => {
    if(patientData[type].length === 0) return; // Skip empty types
    console.log(`Patient Data: ${patientData[type].length} ${type}s found`);
  });

  console.time('openaiClient Call');
  console.log('Calling OpenAI client...');
  // Try to call the OpenAI client with the patient data
  //const prompt = 'Analyze the following patient data and provide insights:'
  console.log(prompt)
  const client = initializeClient();  
  const message = prompt + JSON.stringify(patientData);
  const llmResponse = await openaiClient(client, message);
  console.timeEnd('openaiClient Call');
  console.log('\nResponse from LLM:');
  console.log(llmResponse);


  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();