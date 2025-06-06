const {vistaClient} = require('./vistaClient');
const dotenv = require('dotenv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

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
        "start": "3240105",
        "stop":"3250605"
            }
        }
    ]

    // Call the vistaClient function
    const response = await vistaClient(stationNo, duz, context,rpc, params);

    // Print the response
    console.log('\nResponse from VISTA RPC:');
    
    const doc = new PDFDocument();
    const outputPath = path.resolve(__dirname,'output', 'vista_response.pdf');
    doc.pipe(fs.createWriteStream(outputPath));
    doc.fontSize(12).text(response, { width: 500 });
    doc.end();
    console.log('PDF written to', outputPath);  
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

main();