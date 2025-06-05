const {vistaClient} = require('./vistaClient');
const { openaiClient,initializeClient } = require('./openaiClient.js');
const { processPatientData } = require('./processPatientData');
const dotenv = require('dotenv');
const path = require('path');

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
  

  //console.log('Patient Data:', patientData);
  console.log('Patient Data:', patientData.consult.length, 'consults found');
  console.log('Patient Data:', patientData.problem.length, 'problems found');
  console.log('Patient Data:', patientData.allergy.length, 'allergies found');
  console.log('Patient Data:', patientData.visit.length, 'visits found');
  console.log('Patient Data:', patientData.document.length, 'documents found');

  // Try to call the OpenAI client with the patient data
  const client = initializeClient();  
  const message = `Analyze the following patient data and provide insights: ${JSON.stringify(patientData)}`;
  const llmResponse = await openaiClient(client, message);
  console.log('\nResponse from LLM:');
  console.log(llmResponse);


  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();