var axios = require('axios');
const https = require('https');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

async function vistaClient(stationNo, duz, context, rpc, params) {
    try {
        const url = process.env.URL
        const httpsAgent = new https.Agent({
            ca: [
                process.env.S2RCA2,
                process.env.S2ICA11,
            ],
        });

        const api_client = axios.create({ url, httpsAgent });

        const { data: { data: { token } } } = await api_client.post(
            url + "/api/auth/token",
            {
                "key": process.env.KEY_X
            }
        );

        const { data: { payload } } = await api_client.post(
            url + '/api/vista-sites/' + stationNo + '/users/' + duz + '/rpc/invoke',
            {
                "context": context,
                "rpc": rpc,
                "jsonResult": false,
                "parameters": params
            },
            {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            });

        return payload;
    } catch (error) {
        if (error.response) {
            console.error('HTTP error:', error.response.status, error.response.statusText);
            console.error('Response data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        throw error; // Re-throw the error for further handling if needed
    }
}

module.exports = { vistaClient };