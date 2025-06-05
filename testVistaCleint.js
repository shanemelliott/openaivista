const {vistaClient} = require('./vistaClient');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

// Main function to test the vistaClient
async function main() {
  try {
    // Define parameters for the RPC call
    const context = 'OR CPRS GUI CHART';
    const stationNo = '500';
    const duz = process.env.DUZ;
    const rpc = 'ORWU DT';
    const params = [
      {"string": "NOW"}
    ];

    // Call the vistaClient function
    const response = await vistaClient(stationNo, duz, context,rpc, params);

    // Print the response
    console.log('\nResponse from VISTA RPC:');
    console.log(response);

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();