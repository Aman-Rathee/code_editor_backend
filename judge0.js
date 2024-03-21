// judge0.js

const axios = require('axios');

const JUDGE0_API_URL = 'https://api.judge0.com';

async function executeCode() {
    console.log('hi api');
    try {
        const response = await axios.post(`https://judge0-ce.p.rapidapi.com/submissions`, {
            source_code: 'console.log("hadkl")',
            language_id: 63,
        }, {
            headers: {
                'Content-Type': 'application/json',
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                'X-RapidAPI-Key': process.env.RapidAPI_Key, // Include your API key here
            }
        });

        const submissionToken = response.data.token;
        console.log(submissionToken);

        let output = '';

        while (true) {
            const resultResponse = await axios.get(`${JUDGE0_API_URL}/submissions/${submissionToken}`);
            

            if (resultResponse.data.status.description !== 'Processing') {
                output = resultResponse.data.stdout;
                break;
            }
        }
        console.log(output);

        return output;
    } catch (error) {
        // console.error('Error executing code:', error.response.data);
        throw new Error(error);
    }
}

module.exports = {
    executeCode,
};
