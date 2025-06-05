const { openaiClient,initializeClient } = require('./openaiClient.js');

// Main function to orchestrate the API call
async function main() {
  try {
    // Initialize client
    const client = initializeClient();
    
    // Test message
    const testMessage = "Hello! What was Lincoln's promise to veterans?";
    
    // Get response from LLM
    const response = await openaiClient(client, testMessage);
    
    // Print the response
    console.log('\nResponse from LLM:');
    console.log(response);
    
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

// Run the main function
main();