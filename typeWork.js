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
    const response = await vistaClient(stationNo, duz, context,rpc, params);
   const patientData = processPatientData(JSON.parse(response).data.items);

  Object.keys(patientData).forEach(type => {
    if(patientData[type].length === 0) return; // Skip empty types
    console.log(`Patient Data: ${patientData[type].length} ${type}s found`);
  });

  Object.keys(patientData).forEach(type => {
    if (patientData[type].length === 0) return; // Skip empty types
    console.log(`First ${type}:`, patientData[type][0]);  
  });

   } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();